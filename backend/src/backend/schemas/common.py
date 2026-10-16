from typing import Annotated

from pydantic import Field

# Limites do INTEGER do Postgres: fora deles, a base de dados dá DataError (500).
INT_MIN = -2147483648
INT_MAX = 2147483647
BIGINT_MAX = 9223372036854775807

DbInt = Annotated[int, Field(ge=INT_MIN, le=INT_MAX)]
