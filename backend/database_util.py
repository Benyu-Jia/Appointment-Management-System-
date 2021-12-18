import mysql.connector
import pandas

def init_db() -> mysql.connector.connection.MySQLConnection:
    try:
        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="koala1998120",
            database="CS348_PROJECT"
        )
        return mydb
    except:
        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="koala1998120",
        )
        mycursor = mydb.cursor()
        mycursor.execute("CREATE DATABASE CS348_PROJECT")
        mycursor.execute("use CS348_PROJECT")
        import_sql("backend\AMS-schema.sql", mycursor)
        return mydb

def close_db(mydb: mysql.connector.connection.MySQLConnection):
    mydb.close

def import_sql(filepath, cursor):
    with open(filepath,mode='r') as f:
        sql_list = f.read().split(';')[:-1]
        for x in sql_list:
            line=x.split('\n')
            L=''
            for y in line:
                l=y.split('#',1)[0].split('-- ',1)[0]
                L=L+' '+l
            sql_item = L+';'
            cursor.execute(sql_item)

if __name__ == "__main__":
    mydb = init_db()
    # import_sql("backend\AMS-schema.sql", mydb.cursor())
    import_sql("backend\AMS-data.sql", mydb.cursor())
    close_db(mydb)

