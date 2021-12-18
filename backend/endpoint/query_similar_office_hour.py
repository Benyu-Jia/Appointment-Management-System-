from flask import Response
from flask_restful import Resource, reqparse, abort
from database_util import *

parser = reqparse.RequestParser()
parser.add_argument("office_hour_num", type=str)

class Query_similar_office_hour(Resource):
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
        sql = """SELECT table2.num, table2.weekdays, table2.start_time, table2.end_time, table2.faculty_email, table2.TAID from 
(SELECT * FROM cs348_project.office_hour temp1 LEFT OUTER JOIN cs348_project.faculty_officehour temp2 ON temp1.num = temp2.f_num 
LEFT OUTER JOIN cs348_project.ta_officehour temp3 ON temp1.num = temp3.t_num) table1 
JOIN (SELECT * FROM cs348_project.office_hour temp1 LEFT OUTER JOIN cs348_project.faculty_officehour temp2 ON temp1.num = temp2.f_num 
LEFT OUTER JOIN cs348_project.ta_officehour temp3 ON temp1.num = temp3.t_num) table2
WHERE (table1.faculty_email IS NULL or table1.faculty_email=table2.faculty_email) and (table1.TAID IS NULL or table1.TAID=table2.TAID)
and table1.num != table2.num and table1.num=?;"""
        mycursor.execute(sql, (office_hour_num,))
        results = mycursor.fetchall()
        mycursor.close()
        if len(results) == 0:
            return {"status": 1}
        output = []
        i = 0
        # print(results)
        for result in results:
            i += 1
            if result[4] != None:
                sql2 = "SELECT Name, Title FROM cs348_project.department_faculty WHERE faculty_email=?;"
                mycursor = self.mydb.cursor(prepared=True)
                mycursor.execute(sql2, (result[4],))
                result2 = mycursor.fetchall()
                output.append({"id": i, "name": result2[0][0], "title": result2[0][1], "start_time": str(result[2]), "end_time": str(result[3]), "day": result[1], "num": result[0]})
            else:
                sql2 = """SELECT temp1.Title, temp2.Name FROM cs348_project.ta temp1 JOIN cs348_project.student temp2 ON temp1.TA_email=temp2.purdue_email
WHERE temp1.TAID=?;"""
                mycursor = self.mydb.cursor(prepared=True)
                mycursor.execute(sql2, (result[5],))
                result2 = mycursor.fetchall()
                output.append({"id": i, "name": result2[0][0], "title": result2[0][1], "start_time": str(result[2]), "end_time": str(result[3]), "day": result[1], "num": result[0]})
        return {"status": 0, "data": output}
    
    def options(self):
        resp = Response()
        resp.headers["Access-Control-Allow-Origin"] = None
        resp.headers["Access-Control-Allow-Headers"] = None
        return resp