# Django Expressions

Django template tag and filter for evaluating Python expressions.

## Demo

As a template tag `{% expr "<expression>" %}`

```django
{% expr "[a for a in range(n)]" %}
```

Save the result to a variable using `as var` at the end of the tag:
```django
{% expr "[a for a in range(n)]" as result %}
{{ result }}
```

As a filter `"<expression>" | expr`:

```django
{{ "{k: v.name for k, v in employees_dict.values() }" | expr }}
```

To chain an expression after another filter, define a lambda expression
as the filter argument `value | expr:"lambda x: <expression>"`:

```django
{{ employees_list | first | expr:"lambda x: x.first_name + ' ' + x.last_name" }}
```

## Installation

1. Install dependencies

    ```sh
    pip install django_expr
    ```

2. Add `django_expr` to `INSTALLED_APPS` in your `settings.py`

    ```py
    INSTALLED_APPS = [
        "django_expr",
        ...
    ]
    ```

3. Inside templates, load the tags with `{% load expr %}`:

    ```django
    {% load expr %}
    {% expr "[{k: not v} for k, v in ({'a': 'b', 'c': 0}).items()]" %}
    ```

4. If you want to automatically include the `expr` tag and filter, add the tags as a 'builtin' in `settings.py`:

```python
TEMPLATES = [
    {
        ...,
        'OPTIONS': {
            'context_processors': [
                ...
            ],
            'builtins': [
                'django_expr.templatetags.expr',
            ]
        },
    },
]
```
