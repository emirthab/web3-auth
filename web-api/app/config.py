from datetime import timedelta


SERVER_SETTINGS = {
    "IP": "127.0.0.1",
    "PORT": 3636,
    "DEBUG": True
}

DATABASE = {
    "URI": "postgresql://pcmxxmyj:rsaVKRsdtZnSCD-LWN_MbFeB1eZ0DXeO@abul.db.elephantsql.com/pcmxxmyj",
    "SESSION_OPTIONS": {
        "autocommit": False,
        "autoflush": False
    }
}

WEBSERVER_URL = "127.0.0.1:3000"

JWT_SECRET = "MySecretKey"
AUTH_EXP = timedelta(days=1, hours=0, minutes=0)
NONCE_LETTERS = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
