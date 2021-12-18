from flask import Flask
from flask_restful import Resource, Api
from database_util import *
from endpoint.signup import Signup
from endpoint.signin import Signin
from endpoint.edit_password import Edit_password
from endpoint.cancel_appointment import Cancel_appointment
from endpoint.edit_appointment import Edit_appointment
from endpoint.rate_instructor import Rate_instructor
from endpoint.query_appointment_info import Query_appointment_info
from endpoint.query_similar_office_hour import Query_similar_office_hour
from endpoint.query_instructor import Query_instructor

def init_server():
    app = Flask(__name__)
    api = Api(app)
    return app, api

def add_sources(api: Api, mydb):
    api.add_resource(Signup, "/api/signup")
    api.add_resource(Signin, "/api/signin")
    api.add_resource(Edit_password, "/api/edit_password")
    api.add_resource(Cancel_appointment, "/api/cancel_appointment")
    api.add_resource(Edit_appointment, "/api/edit_appointment")
    api.add_resource(Rate_instructor, "/api/rate_instructor")
    api.add_resource(Query_appointment_info, "/api/query_appointment_info")
    api.add_resource(Query_similar_office_hour, "/api/query_similar_office_hour")
    api.add_resource(Query_instructor, "/api/query_instructor")

if __name__ == "__main__":
    mydb = init_db()
    app, api = init_server()
    add_sources(api, mydb)
    app.run(debug=True, host="0.0.0.0")
    close_db(mydb)
