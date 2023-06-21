from sqlalchemy.orm import Session

from . import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user_update: schemas.UserUpdate):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        for field, value in user_update.dict(exclude_unset=True).items():
            if field == 'file' and value is not None:
                db_user.file = value
            else:
                setattr(db_user, field, value)
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user


def get_Personas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Persona).offset(skip).limit(limit).all()

def get_Persona(db: Session, user_id: int):
    return db.query(models.Persona).filter(models.Persona.owner_id == user_id).first()

def get_Persona_by_col(db: Session, name: str, age:int, department:int):
    return db.query(models.Persona).filter(models.Persona.persona_name  == name, models.Persona.age == age, models.Persona.department == department).first()

def create_Persona_item(db: Session, item: schemas.PersonaCreate, user_id: int):
    db_item = models.Persona(**item.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_Persona(db: Session, user_id: int, user_update: schemas.PersonaUpdate):
    db_Persona = db.query(models.Persona).filter(models.Persona.owner_id == user_id).first()
    if db_Persona:
        for field, value in user_update.dict(exclude_unset=True).items():
            setattr(db_Persona, field, value)
        db.commit()
        db.refresh(db_Persona)
    return db_Persona

def delete_Persona(db: Session, user_id: int):
    db_Persona = db.query(models.Persona).filter(models.Persona.owner_id == user_id).first()
    if db_Persona:
        db.delete(db_Persona)
        db.commit()
    return db_Persona

def get_Personas_by_id(db: Session, user_id: int):
    return db.query(models.Persona).filter(models.Persona.owner_id == user_id).all()