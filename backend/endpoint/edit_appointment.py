from flask_restful import Resource, reqparse, abort
from database_util import *

parser = reqparse.RequestParser()
parser.add_argument("email", type=str)
parser.add_argument("password", type=str)
parser.add_argument("old_office_hour_num", type=str)
parser.add_argument("old_day_time", type=str)
parser.add_argument("new_office_hour_num", type=str)
parser.add_argument("new_day_time", type=str)

class Edit_appointment(Resource):
    # construct a db connection
    def __init__(self):
        self.mydb = init_db()

    def post(self):
        # extract necessary parameter
        try: 
            args = parser.parse_args()
            email = args["email"]
            password = args["password"]
            old_office_hour_num = args["old_office_hour_num"]
            old_day_time = args["old_day_time"]
            new_office_hour_num = args["new_office_hour_num"]
            new_day_time = args["new_day_time"]
        # check parameter
        except Exception as e:
            abort(400)
        
        # check parameter
        if email == None or old_office_hour_num == None or old_day_time == None or new_office_hour_num == None or new_day_time == None:
            abort(400)
        
        # check auth
        mycursor = self.mydb.cursor()
        result = mycursor.callproc("signin", (email, password, "placeholder"))
        # if do not has auth
        # print(result[2] != 0)
        if int(result[2]) != 0: 
            return {"status": 2}

        # check assign ability (have space)
        mycursor.close()
        mycursor = self.mydb.cursor()
        sql1 = "SELECT COUNT(*) FROM cs348_project.appointment_time WHERE num=? and day_time=?;"
        sql2 = "INSERT INTO cs348_project.appointment_time (purdue_email, num, day_time) VALUES (?, ?, ?);"
        sql3 = "DELETE FROM cs348_project.appointment_time WHERE purdue_email=? and num=? and day_time=?;"
        mycursor.execute("SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;")
        mycursor.execute("START TRANSACTION;")
        mycursor = self.mydb.cursor(prepared=True)
        mycursor.execute(sql1, (new_office_hour_num, new_day_time,))
        if mycursor.fetchall()[0][0] >= 1:
            return {"status": 1}
        mycursor.execute(sql2, (email, new_office_hour_num, new_day_time,))
        mycursor.execute(sql1, (new_office_hour_num, new_day_time,))
        if mycursor.fetchall()[0][0] >= 2:
            mycursor.execute("ROLLBACK;")
            return {"status": 1}
        mycursor.execute(sql3, (email, old_office_hour_num, old_day_time))
        mycursor.execute("COMMIT;")
        mycursor.execute("SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;")
        mycursor.close()
        return {"status": 0}