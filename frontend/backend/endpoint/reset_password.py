import json

from flask import Response
from flask_restful import Resource, reqparse, abort

parser = reqparse.RequestParser()
parser.add_argument("PUID", type=str)
parser.add_argument("email", type=str)
parser.add_argument("birthday", type=str)
parser.add_argument("new_password", type=str)


class Reset_password(Resource):
    def __init__(self, mydb):
        self.mydb = mydb

    def post(self):
        try:
            args = parser.parse_args()
            email = args["email"]
            PUID = args["PUID"]
            birthday = args["birthday"]
            new_password = args["new_password"]
        except Exception as e:
            abort(400)
        print("PUID: ",PUID, "email: ", email,"date of birth: ",birthday, ", new_passowrd: ", new_password )
        if email == None or PUID == None or new_password == None or birthday == None:
            abort(400)

        # print("email: ", email, ", new_passowrd: ", new_password, ", old_passowrd: ", old_password)

        mycursor = self.mydb.cursor()
        mycursor.execute("select PUID,purdue_email,birthday from student;")
        result = mycursor.fetchall()
    
        result = {'status': 1}
        resp = Response()
        resp.headers["Access-Control-Allow-Origin"] = "*"
        # dict -> json string
        resp.data = json.dumps(result)
        resp.mimetype = 'application/json'

        if len(result) != 1:
            return resp
        mycursor.execute(
            "UPDATE cs348_project.student SET password=" + "\"" + new_password + "\"" + " WHERE purdue_email=" + "\"" + email + "\";")
        self.mydb.commit()
        mycursor.close()
        result = {'status': 0}
        resp.data = json.dumps(result)
        return resp

    def options(self):
        resp = Response()
        resp.headers["Access-Control-Allow-Origin"] = "*"
        resp.headers["Access-Control-Allow-Headers"] = "*"
        return resp