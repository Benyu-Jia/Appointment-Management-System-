import json

from flask import Response
from flask_restful import Resource, reqparse, abort

parser = reqparse.RequestParser()
parser.add_argument("email", type=str)
parser.add_argument("old_password", type=str)
parser.add_argument("new_password", type=str)


class Edit_password(Resource):
    def __init__(self, mydb):
        self.mydb = mydb

    def post(self):
        try:
            args = parser.parse_args()
            email = args["email"]
            old_password = args["old_password"]
            new_password = args["new_password"]
        except Exception as e:
            abort(400)
        print("email: ", email, ", new_passowrd: ", new_password, ", old_passowrd: ", old_password)
        if email == None or old_password == None or new_password == None:
            abort(400)

        print("email: ", email, ", new_passowrd: ", new_password, ", old_passowrd: ", old_password)

        state = 0
        #result = {'status': 0}
        result = {'status': state}
        resp = Response()
        resp.headers["Access-Control-Allow-Origin"] = "*"
        # dict -> json string
        resp.data = json.dumps(result)
        resp.mimetype = 'application/json'

        mycursor = self.mydb.cursor()
        ret=mycursor.callproc("editPassword",[email,old_password,new_password, 0])
        state=ret[-1]
        if state==0:
            mycursor.close()
            return resp
        else:
            result = {'status': state}
            resp.data = json.dumps(result)
            mycursor.close()
            return resp

    def options(self):
        resp = Response()
        resp.headers["Access-Control-Allow-Origin"] = "*"
        resp.headers["Access-Control-Allow-Headers"] = "*"
        return resp
