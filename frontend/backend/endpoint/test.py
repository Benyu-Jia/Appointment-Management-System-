import json

from flask import Response
from flask_restful import Resource, reqparse, abort

parser = reqparse.RequestParser()


class Test(Resource):
    def __init__(self, mydb):
        self.mydb = mydb

    def post(self):
        # mycursor = self.mydb.cursor()
        # mycursor.execute("SELECT * FROM cs348_project.office_hour;")
        # result = mycursor.fetchall()
        # return len(result)
        # mycursor.close()
        result = {'sum': 'post'}
        resp = Response()
        resp.headers["Access-Control-Allow-Origin"] = "*"
        # dict -> json string
        resp.data = json.dumps(result)
        resp.mimetype = 'application/json'

        return resp

    def get(self):
        result = {'sum': 'a'}
        # resp=
        # return Response(json.dumps(result), mimetype='application/json')
        result = {'sum': 'a'}
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
