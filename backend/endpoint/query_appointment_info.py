import re
from flask_restful import Resource, reqparse, abort
from database_util import *

parser = reqparse.RequestParser()
parser.add_argument("office_hour_num", type=str)

class Query_appointment_info(Resource):
    # construct a db connection
    def __init__(self):
        self.mydb = init_db()

    def post(self):
        # extract necessary parameter
        try: 
            args = parser.parse_args()
            office_hour_num = args["office_hour_num"]
        # check parameter
        except Exception as e:
            abort(400)
        
        # check parameter
        if office_hour_num == None:
            abort(400)
        
        mycursor = self.mydb.cursor(prepared=True)
        sql = """SELECT * FROM cs348_project.office_hour temp1 LEFT OUTER JOIN cs348_project.faculty_officehour temp2 ON temp1.num = temp2.f_num 
LEFT OUTER JOIN cs348_project.ta_officehour temp3 ON temp1.num = temp3.t_num
WHERE temp1.num = ?;"""
        mycursor.execute(sql, (office_hour_num,))
        result = mycursor.fetchall()
        mycursor.close()
        if len(result) != 1:
            return {"status": 1}
        if result[0][4] != None:
            sql2 = "SELECT Name, Title FROM cs348_project.department_faculty WHERE faculty_email=?;"
            mycursor = self.mydb.cursor(prepared=True)
            mycursor.execute(sql2, (result[0][4],))
            result2 = mycursor.fetchall()
            print(result)
            print(result2)
            return {"status": 0, "name": result2[0][0], "title": result2[0][1], "start_time": str(result[0][2]), "end_time": str(result[0][3]), "day": result[0][1]}
        else:
            sql2 = """SELECT temp1.Title, temp2.Name FROM cs348_project.ta temp1 JOIN cs348_project.student temp2 ON temp1.TA_email=temp2.purdue_email
WHERE temp1.TAID=?;"""
            mycursor = self.mydb.cursor(prepared=True)
            mycursor.execute(sql2, (result[0][6],))
            result2 = mycursor.fetchall()
            return {"status": 0, "name": result2[0][0], "title": result2[0][1], "start_time": str(result[0][2]), "end_time": str(result[0][3]), "day": result[0][1]}