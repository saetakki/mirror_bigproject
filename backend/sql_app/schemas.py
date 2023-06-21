from typing import Union, Optional
from pydantic import BaseModel


class PersonaBase(BaseModel):
    persona_name : str
    age : int
    gender : str
    position : str
    department : str    
    state : Union[str, None] = None


class PersonaCreate(PersonaBase):
    pass

class PersonaUpdate(PersonaBase):
    persona_name : Optional[str]
    age : Optional[int]
    gender : Optional[str]
    position : Optional[str]
    department : Optional[str]
    state : Optional[str]

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
    file : Union[str, None] = None

class UserUpdate(UserBase):
    email: Optional[str]
    password: Optional[str]
    file : Optional[bytes]

class UserDelete(UserBase):
    pass
class User(UserBase):
    id: int
    is_active: bool
    items: list[Persona] = []

    class Config:
        orm_mode = True