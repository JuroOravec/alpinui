"""
Tests focusing on the Component class.
For tests focusing on the `component` tag, see `test_templatetags_component.py`
"""

from django.template import Context, Template
from django.test import SimpleTestCase, override_settings

from django_expr.templatetags.expr import register
from .django_test_setup import setup_test_config

setup_test_config()


class ComponentTest(SimpleTestCase):
    def test_expr_tag_empty(self):
        template = Template("""
            {% load expr %}
            {% expr "" %}
        """)
        rendered = template.render(Context({}))
        self.assertHTMLEqual(
            rendered,
            """
            None
            """,
        )

    def test_expr_tag(self):
        template = Template("""
            {% load expr %}
            {% expr "[{k: not v} for k, v in ({'a': 'b', 'c': 0}).items()]" %}
        """)
        rendered = template.render(Context({}))
        self.assertHTMLEqual(
            rendered,
            """
            [{'a': False}, {'c': True}]
            """,
        )

    def test_expr_tag_as_var(self):        
        # Confirm that the value from the filter is not a string, but the result value
        called = False
        @register.filter
        def assert_result(val):
            nonlocal called
            called = True
            self.assertEqual(val, [{'a': False}, {'c': True}])
            return val

        template = Template("""
            {% load expr %}
            {% expr "[{k: not v} for k, v in ({'a': 'b', 'c': 0}).items()]" as x %}
            x: {{ x|assert_result }}
        """)
        rendered = template.render(Context({}))
        self.assertHTMLEqual(
            rendered,
            """
            x: [{'a': False}, {'c': True}]
            """,
        )
        self.assertEqual(called, True)

        del register.filters['assert_result']

    def test_expr_filter_empty(self):
        template = Template("""
            {% load expr %}
            {{ ""|expr }}
        """)
        rendered = template.render(Context({}))
        self.assertHTMLEqual(
            rendered,
            """
            None
            """,
        )

    def test_expr_filter(self):
        # Confirm that the value from the filter is not a string, but the result value
        called = False
        @register.filter
        def assert_result(val):
            nonlocal called
            called = True
            self.assertEqual(val, [{'a': False}, {'c': True}])
            return val

        template = Template("""
            {% load expr %}
            {{ "[{k: not v} for k, v in ({'a': 'b', 'c': 0}).items()]"|expr|assert_result }}
        """)
        rendered = template.render(Context({}))
        self.assertHTMLEqual(
            rendered,
            """
            [{'a': False}, {'c': True}]
            """,
        )
        self.assertEqual(called, True)

        del register.filters['assert_result']

    def test_expr_filter_chained_empty(self):
        template = Template("""
            {% load expr %}
            {{ "abc"|expr:"" }}
        """)
        rendered = template.render(Context({}))
        self.assertHTMLEqual(
            rendered,
            """
            None
            """,
        )

    def test_expr_filter_chained(self):
        # Confirm that the value from the filter is not a string, but the result value
        called = False
        @register.filter
        def assert_result(val):
            nonlocal called
            called = True
            self.assertEqual(val, [{'a': False, 'x': 'abc'}, {'c': True, 'x': 'abc'}])
            return val

        template = Template("""
            {% load expr %}
            {{ "abc"|expr:"lambda x: [{k: not v, 'x': x} for k, v in ({'a': 'b', 'c': 0}).items()]"|assert_result }}
        """)
        rendered = template.render(Context({}))
        self.assertHTMLEqual(
            rendered,
            """
            [{'a': False, 'x': 'abc'}, {'c': True, 'x': 'abc'}]
            """,
        )
        self.assertEqual(called, True)

        del register.filters['assert_result']

    @override_settings(EXPR_ALLOW_FUNC_CALLS=True)
    def test_fn_calls_when_allowed(self):
        template = Template("""
            {% load expr %}
            {{ "abc"|expr:"lambda x: [{k: not v, 'x': x} for k, v in ({'a': 'b', 'c': 0}).items()]" }}
        """)
        template.render(Context({}))

    @override_settings(EXPR_ALLOW_FUNC_CALLS=False)
    def test_raises_on_fn_when_not_allowed(self):
        template = Template("""
            {% load expr %}
            {{ "abc"|expr:"lambda x: [{k: not v, 'x': x} for k, v in ({'a': 'b', 'c': 0}).items()]" }}
        """)
        with self.assertRaisesMessage(ValueError, "Forbidden syntax"):    
            template.render(Context({}))
