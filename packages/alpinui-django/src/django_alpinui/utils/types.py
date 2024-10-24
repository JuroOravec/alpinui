import sys
from typing import NamedTuple

if sys.version_info >= (3, 10):
    from typing import TypeAlias

    JS: TypeAlias = str
else:
    JS = str

if sys.version_info >= (3, 12):
    from typing import TypedDict
else:
    from typing_extensions import TypedDict

if sys.version_info >= (3, 12):
    from typing import Annotated, NotRequired, TypedDict
else:
    from typing_extensions import Annotated, NotRequired, TypedDict


class PropMeta(NamedTuple):
    required: bool
