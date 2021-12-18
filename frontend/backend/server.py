from flask import Flask
from flask_restful import Resource, Api
from database_util import *
from endpoint.signup import Signup
from endpoint.signin import Signin
from endpoint.edit_password import Edit_password
from endpoint.reset_password import Reset_password
from endpoint.appointment_history import Appointment_history
from endpoint.rate_data import Rate_data
from endpoint.techer_appointment import Teacher_appointment


def init_server():
    app = Flask(__name__)
    api = Api(app)
    return app, api

def add_sources(api: Api, mydb):
    api.add_resource(Signup, "/api/signup", resource_class_args=(mydb,))
    api.add_resource(Signin, "/api/signin", resource_class_args=(mydb,))
    api.add_resource(Edit_password, "/api/edit_password", resource_class_args=(mydb,))
    api.add_resource(Reset_password, "/api/reset_password", resource_class_args=(mydb,))
    api.add_resource(Appointment_history, "/api/appointment_history", resource_class_args=(mydb,))
    api.add_resource(Rate_data, "/api/rate_data", resource_class_args=(mydb,))
    api.add_resource(Teacher_appointment, "/api/teacher_appointment", resource_class_args=(mydb,))


if __name__ == "__main__":
    mydb = init_db()
    app, api = init_server()
    add_sources(api, mydb)
    app.run(debug=True, host="127.0.0.1")
    close_db(mydb)
