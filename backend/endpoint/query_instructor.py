from flask_restful import Resource, reqparse, abort
from database_util import *

parser = reqparse.RequestParser()
parser.add_argument("student_email", type=str)

class Query_instructor(Resource):
    # construct a db connection
    def __init__(self):
        self.mydb = init_db()
    
    def post(self):
        # extract necessary parameter
        try: 
            args = parser.parse_args()
            student_email = args["student_email"]
        # check parameter
        except Exception as e:
            abort(400)
        
        # check parameter
        if student_email == None:
            abort(400)
        
        mycursor = self.mydb.cursor(prepared=True)
        sql = """(SELECT temp1.CRN, temp4.Title, temp4.faculty_email FROM cs348_project.register temp1 JOIN cs348_project.course temp2 ON temp1.CRN=temp2.CRN
JOIN cs348_project.course_instructor temp3 ON temp2.CRN=temp3.CRN 
JOIN cs348_project.department_faculty temp4 ON temp3.faculty_email=temp4.faculty_email
WHERE temp1.purdue_email=?)
UNION
(SELECT "Advise", temp2.Title, temp2.Name FROM cs348_project.ad_student temp1 JOIN cs348_project.department_faculty temp2 ON temp1.faculty_email=temp2.faculty_email
WHERE temp1.purdue_email=?)
UNION
(SELECT temp1.CRN, temp4.Title, temp4.TA_email FROM cs348_project.register temp1 JOIN cs348_project.course temp2 ON temp1.CRN=temp2.CRN
JOIN cs348_project.course_ta temp3 ON temp3.CRN=temp2.CRN
JOIN cs348_project.ta temp4 ON temp4.TAID=temp3.TAID
WHERE temp1.purdue_email != temp4.TA_email and temp1.purdue_email=?)
"""
        mycursor.execute(sql, (student_email, student_email, student_email, ))
        results = mycursor.fetchall()
        mycursor.close()

        if len(results) == 0:
            return {"status": 1}
        output = []
        i = 0
        for result in results:
            i += 1
            output.append({"id": i, "type": result[0], "title": result[1], "name": result[2]})
        return {"status": 0, "data": output}