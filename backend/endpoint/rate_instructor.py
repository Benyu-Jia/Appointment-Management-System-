from flask_restful import Resource, reqparse, abort
from database_util import *

parser = reqparse.RequestParser()
parser.add_argument("student_email", type=str)
parser.add_argument("password", type=str)
parser.add_argument("instructor_email", type=str)
parser.add_argument("score", type=float)

class Rate_instructor(Resource):
    # construct a db connection
    def __init__(self):
        self.mydb = init_db()
    
    def post(self):
        # extract necessary parameter
        try: 
            args = parser.parse_args()
            student_email = args["student_email"]
            password = args["password"]
            instructor_email = args["instructor_email"]
            score = args["score"]
        # check parameter
        except Exception as e:
            abort(400)
        
        # check parameter
        if student_email == None or instructor_email == None or score == None:
            abort(400)
        
        # check auth
        mycursor = self.mydb.cursor()
        result = mycursor.callproc("signin", (student_email, password, "placeholder"))
        # if do not has auth
        # print(result[2] != 0)
        if int(result[2]) != 0: 
            return {"status": 1}
        
        # record score
        mycursor.close()
        mycursor = self.mydb.cursor()
        mycursor.execute("SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;")
        mycursor.execute("START TRANSACTION;")
        mycursor = self.mydb.cursor(prepared=True)
        sql = "SELECT COUNT(*) FROM cs348_project.rating_data WHERE student_email=? and purdue_email=?;"
        sql2 = "INSERT INTO cs348_project.rating_data (student_email, purdue_email, rating) VALUES (?, ?, ?);"
        mycursor.execute(sql, (student_email, instructor_email,))
        if int(mycursor.fetchall()[0][0]) == 1:
            mycursor.execute("ROLLBACK;")
            mycursor.execute("SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;")
            mycursor.close()
            return {"status": 2}
        mycursor.execute(sql2, (student_email, instructor_email, score,))
        mycursor.execute("COMMIT;")
        mycursor.execute("SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;")
        mycursor.close()
        return {"status": 0}
        
