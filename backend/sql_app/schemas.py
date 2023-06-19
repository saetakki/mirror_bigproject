from typing import Union, Optional
from pydantic import BaseModel


class PersonaBase(BaseModel):
    title: str
    name : str
    age : int
    gender : str
    title : str
    department : str
    status : Union[str, None] = None


class PersonaCreate(PersonaBase):
    pass

class PersonaUpdate(PersonaBase):
    title: Optional[str]
    name : Optional[str]
    age : Optional[int]
    gender : Optional[str]
    title : Optional[str]
    department : Optional[str]
    status : Optional[str]

class PersonaDelete(PersonaBase):
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

class UserUpdate(UserBase):
    email: Optional[str]
    password: Optional[str]

class UserDelete(UserBase):
    pass
class User(UserBase):
    id: int
    is_active: bool
    items: list[Persona] = []

    class Config:
        orm_mode = True