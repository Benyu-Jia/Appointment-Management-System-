from database_util import *

def import_store_procedure():
    mydb = init_db()

    mydb.cursor().execute("""
    DROP PROCEDURE IF EXISTS edit_appointment;
    """)
    mydb.cursor().execute("""
    CREATE PROCEDURE edit_appointment(IN email CHAR(50), IN old_office_hour_num INT, IN old_day_time CHAR(20), IN new_office_hour_num INT, IN new_day_time CHAR(20), OUT status INT)
    BEGIN
		SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
        START TRANSACTION;
        SET status = 1;
        IF (SELECT COUNT(*) FROM cs348_project.appointment_time WHERE num=new_office_hour_num and day_time=STR_TO_DATE(new_day_time, '%Y-%m-%d')) = 0 THEN
            INSERT INTO cs348_project.appointment_time (purdue_email, num, day_time) VALUES (email, new_office_hour_num, day_time=STR_TO_DATE(new_day_time, '%y-%m-%d'));
            IF (SELECT COUNT(*) FROM cs348_project.appointment_time WHERE num=new_office_hour_num and day_time=STR_TO_DATE(new_day_time, '%Y-%m-%d')) <= 1 THEN
                COMMIT;
                DELETE FROM cs348_project.appointment_time WHERE purdue_email=email and num=old_office_hour_num and day_time=STR_TO_DATE(old_day_time, '%Y-%m-%d');
                set status=0;
            ELSE
                set status=1;
                ROLLBACK;
            END IF;
        ELSE
            set status=1;
            ROLLBACK;
        END IF;
        SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
    END
    """)
    
    mydb.cursor().execute("""
    DROP PROCEDURE IF EXISTS register;
    """)
    mydb.cursor().execute("""
    CREATE PROCEDURE register(IN email CHAR(50), IN input_password CHAR(20), OUT status INT)
    BEGIN
		SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
        START TRANSACTION;
        SET status = 2;
        IF  EXISTS (SELECT * FROM cs348_project.student WHERE purdue_email=email) THEN
            IF (SELECT Password FROM cs348_project.student WHERE purdue_email=email) != "null" THEN
                SET status=1;
            ELSE
                UPDATE cs348_project.student SET password=input_password WHERE purdue_email=email;
                SET status=0;
            END IF;
        ELSE 
            IF EXISTS (SELECT * FROM cs348_project.department_faculty WHERE faculty_email=email) THEN
                IF (SELECT Password FROM cs348_project.department_faculty WHERE faculty_email=email) != "null" THEN
                    SET status = 1;
                ELSE
                    UPDATE cs348_project.department_faculty SET password=input_password WHERE faculty_email=email;
                    SET status = 0;
                END IF;
            END IF;
        END IF;
        COMMIT;
        SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
    END
    """)
    mydb.cursor().execute("""
    DROP PROCEDURE IF EXISTS signin;
    """)
    mydb.cursor().execute("""
    CREATE PROCEDURE signin(IN email CHAR(50), IN input_password CHAR(20), OUT status INT)
    BEGIN
		SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
        START TRANSACTION;
        SET status = 3;
        IF  EXISTS (SELECT * FROM cs348_project.student WHERE purdue_email=email) THEN
            IF (SELECT Password FROM cs348_project.student WHERE purdue_email=email) = "null" THEN
                SET status=2;
            ELSE
                IF (SELECT Password FROM cs348_project.student WHERE purdue_email=email) != input_password THEN
                    SET status=1;
                ELSE
                    SET status=0;
                END IF;
            END IF;
        ELSE 
            IF  EXISTS (SELECT * FROM cs348_project.department_faculty WHERE faculty_email=email) THEN
                IF (SELECT Password FROM cs348_project.department_faculty WHERE faculty_email=email) = "null" THEN
                    SET status=2;
                ELSE
                    IF (SELECT Password FROM cs348_project.department_faculty WHERE faculty_email=email) != input_password THEN
                        SET status=1;
                    ELSE
                        SET status=0;
                    END IF;
                END IF;
            END IF;
        END IF;
        COMMIT;
        SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
    END
    """)
    mydb.cursor().execute("""
    DROP PROCEDURE IF EXISTS check_isolation;
    """)
    mydb.cursor().execute("""
    CREATE PROCEDURE check_isolation()
    BEGIN
		SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
        START TRANSACTION;
        SELECT @@transaction_ISOLATION;
        COMMIT;
        SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
    END
    """)
    close_db(mydb)

if __name__ == "__main__":
    import_store_procedure()

