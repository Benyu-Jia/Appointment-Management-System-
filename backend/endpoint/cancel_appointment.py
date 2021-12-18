from flask_restful import Resource, reqparse, abort
from database_util import *
import datetime

parser = reqparse.RequestParser()
parser.add_argument("email", type=str)
parser.add_argument("password", type=str)
parser.add_argument("office_hour_num", type=str)
parser.add_argument("day_time", type=str)

class Cancel_appointment(Resource):
    # construct a db connection
    def __init__(self):
        self.mydb = init_db()

    def post(self):
        # extract necessary parameter
        try: 
            args = parser.parse_args()
            email = args["email"]
            password = args["password"]
            office_hour_num = args["office_hour_num"]
            day_time = args["day_time"]
        # check parameter
        except Exception as e:
            abort(400)
        
        # check parameter
        if email == None or office_hour_num == None or day_time == None:
            abort(400)
        
        # check auth
        mycursor = self.mydb.cursor()
        result = mycursor.callproc("signin", (email, password, "placeholder"))
        # if do not has auth
        # print(result[2] != 0)
        if int(result[2]) != 0: 
            return {"status": 1}
        
        
        # delete record
        mycursor.close()
        mycursor = self.mydb.cursor(prepared=True)
        sql = "DELETE FROM cs348_project.appointment_time WHERE purdue_email=? and num=? and day_time=?;"
        mycursor.execute(sql, (email, office_hour_num, day_time,))
        mycursor.close()
        self.mydb.commit()
        return {"status": 0}