from flask_restful import Resource, reqparse, abort

parser = reqparse.RequestParser()
parser.add_argument("email", type=str)
parser.add_argument("password", type=str)

class Signup(Resource):
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

        # print("email: ", email, ", passowrd: ", password)

        mycursor = self.mydb.cursor()
        mycursor.execute("SELECT * FROM cs348_project.student WHERE purdue_email=" + "\"" + email + "\";")
        result = mycursor.fetchall()
        if len(result) == 1:
            if result[0][2] == "null":
                mycursor.execute("UPDATE cs348_project.student SET password=" + "\"" + password +"\"" + " WHERE purdue_email=" + "\"" + email + "\";")
                self.mydb.commit()
            else:
                return {'status': 1}
        else:
            return {'status': 2}
        mycursor.close()
        return {'status': 0}