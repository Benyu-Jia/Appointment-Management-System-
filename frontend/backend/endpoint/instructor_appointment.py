import json

from flask import Response
from flask_restful import Resource, reqparse, abort

parser = reqparse.RequestParser()
parser.add_argument("email", type=str)


class Teacher_appointment(Resource):
    def __init__(self, mydb):
        self.mydb = mydb

    def post(self):
        try:
            args = parser.parse_args()
            email = args["email"]
        except Exception as e:
            abort(400)
        print("email: ", email)
        if email == None:
            abort(400)

        mycursor = self.mydb.cursor()
        a = []
        a.append(email)
        mycursor.execute(
            "SELECT student.name,student.purdue_email,course.courseTitle,DATE_FORMAT(day_time,'%Y-%m-%d'),Weekdays,"
            "DATE_FORMAT(start_time, "
            "'%H:%i:%S'), "
            "DATE_FORMAT(end_time,'%H:%i:%S') ,ap.status FROM "
            "student,course,office_hour as oh,appointment_time as ap,faculty_officehour as fo, course_instructor as "
            "cis where "
            "ap.num = oh.num and fo.f_num = oh.num and ap.purdue_email = student.purdue_email and "
            "cis.faculty_email=fo.faculty_email and cis.crn=course.crn and fo.faculty_email=%s;", a)
        aa = mycursor.fetchall()
        print(aa)
        if not aa:
            mycursor.execute(
                "SELECT student.name,student.purdue_email,course.courseTitle,DATE_FORMAT(day_time,'%Y-%m-%d'),"
                "Weekdays,DATE_FORMAT(start_time, '%H:%i:%S'), "
                "DATE_FORMAT(end_time,'%H:%i:%S'),ap.status FROM "
                "course,course_ta as cta,office_hour as oh,appointment_time as ap,ta_officehour as tof, ta, "
                "student where "
                "ap.num = oh.num and tof.t_num = oh.num and tof.taid=ta.taid and ap.purdue_email=student.purdue_email "
                "and tof.taid = cta.taid and cta.crn = course.crn and "
                "ta.TA_email=%s;", a)
            aa = mycursor.fetchall()
            print(aa)

        key = ("name", "email","course", "day_time", "weekday", "start_time", "end_time")
        ans1 = []
        ans2 = []
        for tp in aa:
            status=tp[-1]
            print(tp[-1])
            it = dict(zip(key, tp[:-1]))
            if tp[-1]=='1':
                ans1.append(it)
            if tp[-1]=='0':
                ans2.append(it)

        result = {"key1": ans1,"key2":ans2}
        print(result)
        resp = Response()
        resp.headers["Access-Control-Allow-Origin"] = "*"
        # dict -> json string
        resp.data = json.dumps(result)
        resp.mimetype = 'application/json'
        return resp

    def options(self):
        resp = Response()
        resp.headers["Access-Control-Allow-Origin"] = "*"
        resp.headers["Access-Control-Allow-Headers"] = "*"
        return resp
