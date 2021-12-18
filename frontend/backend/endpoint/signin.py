from flask import Response
from flask_restful import Resource, reqparse, abort

parser = reqparse.RequestParser()
parser.add_argument("email", type=str)
parser.add_argument("password", type=str)

class Signin(Resource):
    def __init__(self, mydb):
        self.mydb = mydb

    def post(self):
        try: 
            args = parser.parse_args()
            email = args["email"]
            password = args["password"]
        except Exception as e:
            abort(400)
        
        if email == None or password == None:
            abort(400)
        
        print("email: ", email, ", passowrd: ", password)

        mycursor = self.mydb.cursor()
        mycursor.execute("SELECT * FROM student WHERE purdue_email=" + "\"" + email + "\";")
        result = mycursor.fetchall()
        if len(result) != 1:
            return {'status': 1}
        if result[0][2] == "null":
            return {'status': 2}
        if password != result[0][2]:
            return {'status': 3}
        mycursor.close()
        return {'status': 0}


    