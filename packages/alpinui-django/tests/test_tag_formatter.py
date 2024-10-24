from django.template import Context, Template

import django_components as dc
from django_components.tag_formatter import ShorthandTagFormatter

from .django_test_setup import setup_test_config
from .testutils import BaseTestCase, parametrize_context_behavior


setup_test_config()


class MultiwordBlockStartTagFormatter(ShorthandTagFormatter):
    def format_block_start_tag(self, name):
        return f"{name} comp"


class MultiwordBlockEndTagFormatter(ShorthandTagFormatter):
    def format_block_end_tag(self, name):
        return f"end {name}"


class MultiwordInlineTagFormatter(ShorthandTagFormatter):
    def format_inline_tag(self, name):
        return f"#{name} comp"


# Create a TagFormatter class to validate the public interface
def create_validator_tag_formatter(tag_name: str):
    class ValidatorTagFormatter(ShorthandTagFormatter):
        def format_block_start_tag(self, name):
            assert name == tag_name
            return super().format_block_start_tag(name)

        def format_block_end_tag(self, name):
            assert name == tag_name
            return super().format_block_end_tag(name)

        def format_inline_tag(self, name):
            assert name == tag_name
            return super().format_inline_tag(name)

        def parse_block_start_tag(self, tokens):
            assert isinstance(tokens, list)
            assert tokens[0] == tag_name
            return super().parse_block_start_tag(tokens)

        def parse_inline_tag(self, tokens):
            assert isinstance(tokens, list)
            assert tokens[0] == f"#{tag_name}"
            return super().parse_inline_tag(tokens)

    return ValidatorTagFormatter


class ComponentTagTests(BaseTestCase):
    @parametrize_context_behavior(["django", "isolated"])
    def test_formatter_default_inline(self):
        @dc.register("simple")
        class SimpleComponent(dc.Component):
            template: dc.django_html = """
                {% load component_tags %}
                hello1
                <div>
                    {% slot "content" default %} SLOT_DEFAULT {% endslot %}
                </div>
                hello2
            """

        template = Template(
            """
            {% load component_tags %}
            {% #component "simple" %}
        """
        )
        rendered = template.render(Context())
        self.assertHTMLEqual(
            rendered,
            """
            hello1
            <div>
                SLOT_DEFAULT
            </div>
            hello2
            """,
        )

    @parametrize_context_behavior(["django", "isolated"])
    def test_formatter_default_block(self):
        @dc.register("simple")
        class SimpleComponent(dc.Component):
            template: dc.django_html = """
                {% load component_tags %}
                hello1
                <div>
                    {% slot "content" default %} SLOT_DEFAULT {% endslot %}
                </div>
                hello2
            """

        template = Template(
            """
            {% load component_tags %}
            {% component "simple" %}
                OVERRIDEN!
            {% endcomponent %}
        """
        )
        rendered = template.render(Context())
        self.assertHTMLEqual(
            rendered,
            """
            hello1
            <div>
                OVERRIDEN!
            </div>
            hello2
            """,
        )

    @parametrize_context_behavior(
        cases=["django", "isolated"],
        settings={
            "COMPONENTS": {
                "tag_formatter": "django_components.tag_formatter.ComponentTagFormatter",
            },
        },
    )
    def test_formatter_component_inline(self):
        @dc.register("simple")
        class SimpleComponent(dc.Component):
            template: dc.django_html = """
                {% load component_tags %}
                hello1
                <div>
                    {% slot "content" default %} SLOT_DEFAULT {% endslot %}
                </div>
                hello2
            """

        template = Template(
            """
            {% load component_tags %}
            {% #component "simple" %}
        """
        )
        rendered = template.render(Context())
        self.assertHTMLEqual(
            rendered,
            """
            hello1
            <div>
                SLOT_DEFAULT
            </div>
            hello2
            """,
        )

    @parametrize_context_behavior(
        cases=["django", "isolated"],
        settings={
            "COMPONENTS": {
                "tag_formatter": "django_components.tag_formatter.ComponentTagFormatter",
            },
        },
    )
    def test_formatter_component_block(self):
        @dc.register("simple")
        class SimpleComponent(dc.Component):
            template: dc.django_html = """
                {% load component_tags %}
                hello1
                <div>
                    {% slot "content" default %} SLOT_DEFAULT {% endslot %}
                </div>
                hello2
            """

        template = Template(
            """
            {% load component_tags %}
            {% component "simple" %}
                OVERRIDEN!
            {% endcomponent %}
        """
        )
        rendered = template.render(Context())
        self.assertHTMLEqual(
            rendered,
            """
            hello1
            <div>
                OVERRIDEN!
            </div>
            hello2
            """,
        )

    @parametrize_context_behavior(
        cases=["django", "isolated"],
        settings={
            "COMPONENTS": {
                "tag_formatter": "django_components.tag_formatter.ShorthandTagFormatter",
            },
        },
    )
    def test_formatter_shorthand_inline(self):
        @dc.register("simple")
        class SimpleComponent(dc.Component):
            template: dc.django_html = """
                {% load component_tags %}
                hello1
                <div>
                    {% slot "content" default %} SLOT_DEFAULT {% endslot %}
                </div>
                hello2
            """

        template = Template(
            """
            {% load component_tags %}
            {% #simple %}
        """
        )
        rendered = template.render(Context())
        self.assertHTMLEqual(
            rendered,
            """
            hello1
            <div>
                SLOT_DEFAULT
            </div>
            hello2
            """,
        )

    @parametrize_context_behavior(
        cases=["django", "isolated"],
        settings={
            "COMPONENTS": {
                "tag_formatter": "django_components.tag_formatter.ShorthandTagFormatter",
            },
        },
    )
    def test_formatter_shorthand_block(self):
        @dc.register("simple")
        class SimpleComponent(dc.Component):
            template: dc.django_html = """
                {% load component_tags %}
                hello1
                <div>
                    {% slot "content" default %} SLOT_DEFAULT {% endslot %}
                </div>
                hello2
            """

        template = Template(
            """
            {% load component_tags %}
            {% simple %}
                OVERRIDEN!
            {% endsimple %}
        """
        )
        rendered = template.render(Context())
        self.assertHTMLEqual(
            rendered,
            """
            hello1
            <div>
                OVERRIDEN!
            </div>
            hello2
            """,
        )

    @parametrize_context_behavior(
        cases=["django", "isolated"],
        settings={
            "COMPONENTS": {
                "tag_formatter": ShorthandTagFormatter,
            },
        },
    )
    def test_import_formatter_by_value(self):
        @dc.register("simple")
        class SimpleComponent(dc.Component):
            template: dc.django_html = """
                {% load component_tags %}
                <div>
                    {% slot "content" default %} SLOT_DEFAULT {% endslot %}
                </div>
            """

        template = Template(
            """
            {% load component_tags %}
            {% simple %}
                OVERRIDEN!
            {% endsimple %}
        """
        )
        rendered = template.render(Context())
        self.assertHTMLEqual(
            rendered,
            """
            <div>
                OVERRIDEN!
            </div>
            """,
        )

    @parametrize_context_behavior(
        cases=["django", "isolated"],
        settings={
            "COMPONENTS": {
                "tag_formatter": MultiwordBlockStartTagFormatter,
            },
        },
    )
    def test_raises_on_invalid_block_start_tag(self):
        with self.assertRaisesMessage(
            ValueError, "MultiwordBlockStartTagFormatter returned an invalid tag for block_start_tag: 'simple comp'"
        ):

            @dc.register("simple")
            class SimpleComponent(dc.Component):
                template = """{% load component_tags %}"""

    @parametrize_context_behavior(
        cases=["django", "isolated"],
        settings={
            "COMPONENTS": {
                "tag_formatter": MultiwordBlockEndTagFormatter,
            },
        },
    )
    def test_raises_on_invalid_block_end_tag(self):
        with self.assertRaisesMessage(
            ValueError, "MultiwordBlockEndTagFormatter returned an invalid tag for block_end_tag: 'end simple'"
        ):

            @dc.register("simple")
            class SimpleComponent(dc.Component):
                template: dc.django_html = """
                    {% load component_tags %}
                    <div>
                        {% slot "content" default %} SLOT_DEFAULT {% endslot %}
                    </div>
                """

            Template(
                """
                {% load component_tags %}
                {% simple %}
                    OVERRIDEN!
                {% bar %}
            """
            )

    @parametrize_context_behavior(
        cases=["django", "isolated"],
        settings={
            "COMPONENTS": {
                "tag_formatter": MultiwordInlineTagFormatter,
            },
        },
    )
    def test_raises_on_invalid_inline_tag(self):
        with self.assertRaisesMessage(
            ValueError, "MultiwordInlineTagFormatter returned an invalid tag for inline_tag: '#simple comp'"
        ):

            @dc.register("simple")
            class SimpleComponent(dc.Component):
                template: dc.django_html = """
                    {% load component_tags %}
                    <div>
                        {% slot "content" default %} SLOT_DEFAULT {% endslot %}
                    </div>
                """

    @parametrize_context_behavior(
        cases=["django", "isolated"],
        settings={
            "COMPONENTS": {
                "tag_formatter": create_validator_tag_formatter("simple"),
            },
        },
    )
    def test_method_args(self):
        @dc.register("simple")
        class SimpleComponent(dc.Component):
            template: dc.django_html = """
                {% load component_tags %}
                hello1
                <div>
                    {% slot "content" default %} SLOT_DEFAULT {% endslot %}
                </div>
                hello2
            """

        template = Template(
            """
            {% load component_tags %}
            {% #simple %}
        """
        )
        rendered = template.render(Context())
        self.assertHTMLEqual(
            rendered,
            """
            hello1
            <div>
                SLOT_DEFAULT
            </div>
            hello2
            """,
        )

        template = Template(
            """
            {% load component_tags %}
            {% simple %}
                OVERRIDEN!
            {% endsimple %}
        """
        )
        rendered = template.render(Context())
        self.assertHTMLEqual(
            rendered,
            """
            hello1
            <div>
                OVERRIDEN!
            </div>
            hello2
            """,
        )


# TODO:
# - Add tests for defining multiple components that produce the same tag, then render both
#   components in the same template. Then do `registry.clear`, try to render components now
#   (should fail), and then register the components again and render them again.
# - DOCUMENT CHANGED API
#   - types...
#   - component.Component -> dc.Component
#   - component.registry -> dc.registry
# - ADD TESTS TO COMPONENT REGISTRY
# - UPDATE README - API changes, tag_formatter, ComponentRegistry, Inline vs Block tags
