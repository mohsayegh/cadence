from sqlmodel import SQLModel, Session, create_engine

engine = create_engine("sqlite:///./app.db")

def get_session():
    with Session(engine) as session:
        yield session