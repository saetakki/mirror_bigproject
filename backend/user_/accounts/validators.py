import re
from django.core import validators
from django.utils.deconstruct import deconstructible
from django.utils.translation import gettext as _

@deconstructible
class CustomASCIIUsernameValidator(validators.RegexValidator):
    regex = r'^[\w]+$'
    message = _(
        '유효한 이름을 입력해 주세요.'
    )