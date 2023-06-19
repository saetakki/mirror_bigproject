from typing import Union

from pydantic import BaseModel


class PersonaBase(BaseModel):
    title: str
    description: Union[str, None] = None


class PersonaCreate(PersonaBase):
    pass


class Persona(PersonaBase):
    id: int
    owner_id: int
	# orm_mode는 Pydantic 모델을 읽는데, dict타입 뿐만 아니라 ORM모델일지라도 읽어버린다.
	# data[id], data.id
    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    items: list[Persona] = []

    class Config:
        orm_mode = True