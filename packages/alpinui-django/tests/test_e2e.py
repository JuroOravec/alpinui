
from playwright.async_api import Page

from django_components import types
from tests.django_test_setup import setup_test_config
from tests.e2e.utils import TEST_SERVER_URL, with_playwright
from tests.testutils import BaseTestCase

setup_test_config()


# NOTE: All views, components,  and associated JS and CSS are defined in
# `tests/e2e/testserver/testserver`
class E2eDependencyRenderingTests(BaseTestCase):
    @with_playwright
    async def test_single_component_dependencies(self):
        single_comp_url = TEST_SERVER_URL + "/single"

        page: Page = await self.browser.new_page()
        await page.goto(single_comp_url)

        test_js: types.js = """() => {
            const bodyHTML = document.body.innerHTML;

            const innerEl = document.querySelector(".inner");
            const innerFontSize = globalThis.getComputedStyle(innerEl).getPropertyValue('font-size');

            const myStyleEl = document.querySelector(".my-style");
            const myStyleBg = globalThis.getComputedStyle(myStyleEl).getPropertyValue('background');

            return {
                bodyHTML,
                componentJsMsg: globalThis.testSimpleComponent,
                scriptJsMsg: globalThis.testMsg,
                innerFontSize,
                myStyleBg,
            };
        }"""

        data = await page.evaluate(test_js)

        # Check that the actual HTML content was loaded
        self.assertIn('Variable: <strong class="inner">foo</strong>', data["bodyHTML"])
        self.assertInHTML('<div class="my-style"> 123 </div>', data["bodyHTML"], count=1)
        self.assertInHTML('<div class="my-style2"> xyz </div>', data["bodyHTML"], count=1)

        # Check components' inlined JS got loaded
        self.assertEqual(data["componentJsMsg"], "kapowww!")

        # Check JS from Media.js got loaded
        self.assertEqual(data["scriptJsMsg"], {"hello": "world"})

        # Check components' inlined CSS got loaded
        self.assertEqual(data["innerFontSize"], "4px")

        # Check CSS from Media.css got loaded
        self.assertIn("rgb(0, 0, 255)", data["myStyleBg"])  # AKA 'background: blue'

        await page.close()
