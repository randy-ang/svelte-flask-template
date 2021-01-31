from flask import Blueprint, Response
from random import random

api = Blueprint('api', __name__)

@api.after_request
def after_request_func(response: Response):
    response.content_type = "application/json"
    return response

@api.route("/rand")
def generate_random_number():
    return str(random())