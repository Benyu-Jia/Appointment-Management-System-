from database_util import *


def import_store_procedure():
    mydb = init_db()

    mydb.cursor().execute("""
    DROP PROCEDURE IF EXISTS resetPassword;
    """)
    mydb.cursor().execute("""
    CREATE PROCEDURE resetPassword(IN email CHAR(50),IN ID CHAR(45),IN birthday CHAR(45), IN new_password CHAR(20), OUT status CHAR(20))
    BEGIN
		SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
        START TRANSACTION;
        SET status = 1;
        IF  EXISTS (SELECT * FROM cs348_project.student WHERE purdue_email=email) THEN
            IF (SELECT Password FROM cs348_project.student WHERE purdue_email=email and PUID=ID and birthday= birthday) != "null" THEN
                UPDATE cs348_project.student SET password=new_password WHERE purdue_email=email;
                SET status=0;
            END IF;
        END IF;
        COMMIT;
        SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
    END
    """)
    mydb.cursor().execute("""
    DROP PROCEDURE IF EXISTS editPassword;
    """)
    mydb.cursor().execute("""
    CREATE PROCEDURE editPassword(IN email CHAR(50), IN old_password CHAR(20),IN new_password CHAR(20), OUT status CHAR(20))
    BEGIN
		SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
        START TRANSACTION;
        SET status = 1;
        IF  EXISTS (SELECT * FROM cs348_project.student WHERE purdue_email=email) THEN
            IF (SELECT Password FROM cs348_project.student WHERE purdue_email=email) != old_password THEN
                SET status=1;
            ELSE
                UPDATE cs348_project.student SET password=new_password WHERE purdue_email=email;
                SET status=0;
            END IF;
        ELSE 
            IF  EXISTS (SELECT * FROM cs348_project.department_faculty WHERE faculty_email=email) THEN
                IF (SELECT Password FROM cs348_project.department_faculty WHERE faculty_email=email) != old_password THEN
                    SET status=1;
                ELSE
                    UPDATE cs348_project.department_faculty SET password=new_password WHERE faculty_email=email;
                    SET status=0;
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
