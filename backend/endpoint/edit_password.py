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
        
        # print("email: ", email, ", new_passowrd: ", new_password, ", old_passowrd: ", old_password)

        mycursor = self.mydb.cursor()
        mycursor.execute("SELECT * FROM student WHERE purdue_email=" + "\"" + email + "\";")
        result = mycursor.fetchall()
        if len(result) != 1:
            return {'status': 1}
        if result[0][2] != old_password:
            return {'status': 2}
        mycursor.execute("UPDATE cs348_project.student SET password=" + "\"" + new_password +"\"" + " WHERE purdue_email=" + "\"" + email + "\";")
        self.mydb.commit()
        mycursor.close()
        return {'status': 0}