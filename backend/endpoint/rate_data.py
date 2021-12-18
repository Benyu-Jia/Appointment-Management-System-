import json

from flask import Response
from flask_restful import Resource, reqparse, abort

parser = reqparse.RequestParser()


class Rate_data(Resource):
    def __init__(self, mydb):
        self.mydb = mydb

    def get(self):
        mycursor = self.mydb.cursor()
        mycursor.execute("SELECT department_faculty.name,department_faculty.faculty_email,rating_score.rating from "
                         "department_faculty,rating_score where "
                         "rating_score.purdue_email=department_faculty.faculty_email "
                         "and rating_score.rating>0 ;")
        aa = mycursor.fetchall()
        print(aa)
        key = ("name", "email", "rate")
        ans = []
        for tp in aa:
            it = dict(zip(key, tp))
            ans.append(it)
        print(ans)
    
        result = {"key": ans}
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
