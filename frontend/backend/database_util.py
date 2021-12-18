import mysql.connector
import pandas


def init_db() -> mysql.connector.connection.MySQLConnection:
    try:
        mydb = mysql.connector.connect(
            host="localhost",
            port=3306,
            user="root",
            password="981102abcd",
            database="cs348_project"
            # auth_plugin='mysql_native_password'
        )
        return mydb
    except:
        mydb = mysql.connector.connect(
            host="localhost",
            port=3306,
            user="root",
            password="981102abcd",
            # auth_plugin='mysql_native_password'
        )
        mycursor = mydb.cursor()
        mycursor.execute("CREATE DATABASE CS348_PROJECT")
        mycursor.execute("use CS348_PROJECT")
        import_sql("AMS-schema.sql", mycursor)
        return mydb


def close_db(mydb: mysql.connector.connection.MySQLConnection):
    mydb.close


def import_sql(filepath, cursor):
    filepath = "AMS-data.sql"
    with open(filepath, mode='r') as f:
        sql_list = f.read().split('\n')
        print(sql_list)
        sql_list_change = [x.strip() for x in sql_list if x.strip() != '']  ##数据预处理去掉元素两边的空格和空元素
        print(sql_list_change)
        sql = ""
        flag = 0  # 标识是否在$$里面
        for obj in sql_list_change:
            if obj.startswith("DELIMITER $$"):
                # sql = obj
                # cursor.execute(sql)
                sql = ""
                flag = 1
                continue
            if obj.endswith("$$"):
                sql = sql + obj - "$$"
                cursor.execute(sql)
                sql = ""
            if obj.startswith("DELIMITER  ;"):
                # sql = obj
                flag = 0
                # cursor.execute(sql)
                sql = ""
                continue
            if flag == 0 and obj.endswith(';'):
                sql = sql + obj
                cursor.execute(sql)
                sql = ""
                continue
            sql = sql + obj + ' '


def test():
    filepath = "AMS-data.sql"
    with open(filepath, mode='r') as f:
        sql_list = f.read().split('\n')
        print(sql_list)
        sql_list_change = [x.strip() for x in sql_list if x.strip() != '']  ##数据预处理去掉元素两边的空格和空元素
        print(sql_list_change)
        sql = ""
        flag = 0  # 标识是否在$$里面
        for obj in sql_list_change:
            if obj.startswith("DELIMITER $$"):
                # sql = obj
                # cursor.execute(sql)
                # sql = ""
                flag = 1
                continue
            if obj.endswith("$$"):
                ##sql = sql + obj
                cursor.execute(sql)
                sql = ""
            if obj.startswith("DELIMITER  ;"):
                sql = obj
                flag = 0
                cursor.execute(sql)
                sql = ""
                continue
            if flag == 0 and obj.endswith(';'):
                sql = sql + obj
                cursor.execute(sql)
                sql = ""
                continue
            sql = sql + obj + ' '


if __name__ == "__main__":
    mydb = init_db()
    print("ok")
    cursor = mydb.cursor()
    # import_sql("AMS-data.sql", mydb.cursor())
    # cursor.execute("SELECT department_faculty.faculty_email,department_faculty.name,rating_score.rating from "
    #                "department_faculty,rating_score where rating_score.purdue_email=department_faculty.faculty_email "
    #                "and rating_score.rating>0 ;")
    # b=cursor.fetchall()
    # print(b)
    # cursor.execute("SELECT ap.num,DATE_FORMAT(day_time,'%Y-%m-%d'),Weekdays,DATE_FORMAT(start_time,'%H:%i:%S'),"
    #                "DATE_FORMAT(end_time,'%H:%i:%S') FROM "
    #                "office_hour as oh,appointment_time as ap where ap.num = "
    #                "oh.num;")
    cursor.execute(
        "SELECT student.name,student.purdue_email,course.courseTitle,DATE_FORMAT(day_time,'%Y-%m-%d'),"
        "Weekdays,DATE_FORMAT(start_time, '%H:%i:%S'), "
        "DATE_FORMAT(end_time,'%H:%i:%S'),ap.status FROM "
        "course,course_ta as cta,office_hour as oh,appointment_time as ap,ta_officehour as tof, ta, "
        "student where "
        "ap.num = oh.num and tof.t_num = oh.num and tof.taid=ta.taid and ap.purdue_email=student.purdue_email "
        "and tof.taid = cta.taid and cta.crn = course.crn ;")
    b = cursor.fetchall()
    print(b)
    close_db(mydb)
    # test()
