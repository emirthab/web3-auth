from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import app.config as config
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = config.DATABASE["URI"]
cors = CORS(app)

db = SQLAlchemy(app, session_options=config.DATABASE["SESSION_OPTIONS"])
