from flask_restful import Resource, reqparse, abort
from database_util import *

parser = reqparse.RequestParser()
parser.add_argument("email", type=str)
parser.add_argument("password", type=str)


class Signup(Resource):
    # contruct a db connection
    def __init__(self):
        self.mydb = init_db()

    def post(self):
        # extract necessary parameter
        try:
            args = parser.parse_args()
            email = args["email"]
            password = args["password"]
        # check parameter
        except Exception as e:
            abort(400)

        # check paramter
        if email == None or password == None:
            abort(400)

        # print("email: ", email, ", passowrd: ", password)

        # register account
        # return 0 if success, 1 if already registered, 2 if no such student
        mycursor = self.mydb.cursor()
        result = mycursor.callproc("register", (email, password, "placeholder"))
        mycursor.close()
        self.mydb.close()
        return {'status': result[2]}
