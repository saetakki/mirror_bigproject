from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=schemas.User)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=list[schemas.User])
async def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
async def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.patch("/users/{user_id}", response_model = schemas.User)
async def update_user(user_id: int, user_update: schemas.UserUpdate, db: Session = Depends(get_db)):
	db_user = crud.get_user(db, user_id)
	if db_user is None:
		raise HTTPException(status_code=404, detail="User not found")
	updated_user = crud.update_user(db, user_id, user_update)
	return updated_user

@app.delete("/users/{user_id}", response_model = schemas.User)
async def delete_user(user_id:int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    deleted_user = crud.delete_user(db, user_id)
    return deleted_user
    

@app.post("/users/{user_id}/items/", response_model=schemas.Persona)
async def create_Persona_for_user(user_id: int, item: schemas.PersonaCreate, db: Session = Depends(get_db)):
    return crud.create_Persona_item(db=db, item=item, user_id=user_id)


@app.get("/personas/", response_model=list[schemas.Persona])
async def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_Personas(db, skip=skip, limit=limit)
    return items

@app.get("/personas/{user_id}", response_model=schemas.Persona)
async def read_item(user_id : int, db : Session = Depends(get_db)):
	item = crud.get_Persona(db, user_id=user_id)
	if item is None:
		raise HTTPException(status_code=404, detail='Persona not found')
	return item

@app.patch("/pernonas/{user_id}", response_model = schemas.Persona)
async def update_Persona(user_id: int, user_update: schemas.PersonaUpdate, db: Session = Depends(get_db)):
	db_Persona = crud.get_Persona(db, user_id)
	if db_Persona is None:
		raise HTTPException(status_code=404, detail="User not found")
	updated_Persona = crud.update_Persona(db, user_id, user_update)
	return updated_Persona

@app.delete("/pernonas/{user_id}", response_model = schemas.Persona)
async def delete_Persona(user_id:int, db: Session = Depends(get_db)):
    db_Persona = crud.get_Persona(db, user_id)
    if db_Persona is None:
        raise HTTPException(status_code=404, detail="User not found")
    deleted_Persona = crud.delete_Persona(db, user_id)
    return deleted_Persona