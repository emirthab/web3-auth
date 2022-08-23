from datetime import datetime
from app import db, models
import random
import jwt

from flask import Blueprint, request, make_response
from flask_cors import cross_origin
from web3.auto import w3
from eth_account.messages import encode_defunct

from .config import AUTH_EXP, JWT_SECRET, NONCE_LETTERS

view = Blueprint("view", __name__)


@view.route("/api/available", methods=["GET"])
def available():
    return {
        "username": models.User.query.filter_by(username=request.args.get("username")).first() is None,
        "email": models.User.query.filter_by(email=request.args.get("email")).first() is None
    }, 200


@view.route("/api/nonce", methods=["GET"])
def nonce():
    address = request.args.get("walletAddress")
    nonce = models.Nonce(
        wallet_address=address,
        nonce="".join(random.choice(NONCE_LETTERS) for i in range(100)),
        registered=models.User.query.filter_by(wallet_address=address).first() is not None)
    db.session.merge(nonce)
    db.session.commit()
    return models.serialize(nonce), 200


@view.route("/api/auth", methods=["POST"])
@cross_origin(supports_credentials=True)
def auth():
    content = request.json
    user = models.User.query.filter_by(
        wallet_address=content["wallet_address"]).first()
    if user is None:
        return "User with this address is not registered", 401
    nonce = models.Nonce.query.filter_by(
        wallet_address=content["wallet_address"]).first()
    expected_address = w3.eth.account.recover_message(
        encode_defunct(text=nonce.nonce), signature=content["signature"])
    if expected_address != content["wallet_address"]:
        return "invalid signature", 401
    db.session.delete(nonce)
    db.session.commit()
    access_token = jwt.encode({
        "exp": datetime.utcnow() + AUTH_EXP,
        "iat": datetime.utcnow(),
        "user_id": user.id,
    }, JWT_SECRET, algorithm="HS256")
    response = make_response()
    response.set_cookie("acc_tkn", access_token, max_age=AUTH_EXP)
    return response, 200


@view.route("/api/register", methods=["POST"])
def register():
    content = request.json
    if models.User.query.filter_by(username=content["username"]).first() is not None:
        return "username is already exist", 409
    if models.User.query.filter_by(email=content["email"]).first() is not None:
        return "email is already exist", 409
    if models.User.query.filter_by(email=content["wallet_address"]).first() is not None:
        return "wallet address is already exist", 409
    nonce = models.Nonce.query.filter_by(
        wallet_address=content["wallet_address"]).first()
    expected_address = w3.eth.account.recover_message(
        encode_defunct(text=nonce.nonce), signature=content["signature"])
    if expected_address != content["wallet_address"]:
        return "invalid signature", 401
    user = models.User(id=models.User.get_max_id(),
                       username=content["username"], email=content["email"], wallet_address=expected_address)
    db.session.add(user)
    db.session.delete(nonce)
    db.session.commit()
    access_token = jwt.encode({
        "exp": datetime.utcnow() + AUTH_EXP,
        "iat": datetime.utcnow(),
        "user_id": user.id,
    }, JWT_SECRET, algorithm="HS256")
    response = make_response()
    response.set_cookie("acc_tkn", access_token, max_age=AUTH_EXP)
    return response, 200


@view.after_request
def apply_caching(response):
    print(response.status_code)
    response.headers.add("Access-Control-Allow-Origin",
                         "http://localhost:3000")
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', "*")
    response.headers.add('Access-Control-Allow-Credentials', "true")
    return response
