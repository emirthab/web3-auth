from app import db
from sqlalchemy import inspect, func
from datetime import datetime


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    wallet_address = db.Column(db.String(60), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, unique=False,
                        nullable=False, default=datetime.utcnow)

    def get_max_id():
        try:
            max_id = db.session.query(func.max(User.id)).first().id
        except:
            max_id = 0
        return max_id

    def __repr__(self) -> str:
        return f"<User {self.username}>"


class Nonce(db.Model):
    wallet_address = db.Column(db.String(60), primary_key=True)
    nonce = db.Column(db.String(120), unique=False, nullable=False)
    registered = db.Column(db.Boolean, unique=False, nullable=False)


def serialize(obj) -> dict:
    return {c: getattr(obj, c) for c in inspect(obj).attrs.keys()}
