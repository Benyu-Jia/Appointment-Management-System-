import json

from flask import Response
from flask_restful import Resource, reqparse, abort

parser = reqparse.RequestParser()



class Appointment_history(Resource):
    def __init__(self, mydb):
        self.mydb = mydb

    def get(self):
        mycursor = self.mydb.cursor()
        mycursor.execute("SELECT Weekdays,DATE_FORMAT(start_time,'%H:%i:%S'),DATE_FORMAT(end_time,'%H:%i:%S') FROM "
                       "cs348_project.office_hour;")
        aa = mycursor.fetchall()
        print(aa)
        key = ("weekday", "start_time", "end_time")
        ans = []
        for tp in aa:
            it = dict(zip(key, tp))
            ans.append(it)
        print(ans)
        
        result = {"key":ans}
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