DROP PROCEDURE IF EXISTS insert_instuctor_office_hours;
DELIMITER $$
CREATE PROCEDURE insert_instuctor_office_hours(IN faculty_email CHAR(50), IN weekdays CHAR(10), IN start_time TIME, IN end_time TIME, IN lasting int)
    BEGIN
        DECLARE num INT DEFAULT 0;
        DECLARE begin_hour INT;
        DECLARE begin_minute INT;
        DECLARE end_hour INT;
        DECLARE end_minute INT;
        IF (SELECT MAX(office_hour.num) + 1 FROM cs348_project.office_hour) != NULL THEN
			SET num = (SELECT MAX(office_hour.num) + 1 FROM cs348_project.office_hour);
		END IF;
        SET begin_hour = (start_time / 10000) mod 100;
        SET begin_minute = (start_time / 100) mod 100;
        set end_hour = (end_time / 10000) mod 100;
        SET end_minute = (end_time / 100) mod 100;
        loop_1: LOOP
            IF begin_hour >= end_hour AND begin_minute >= end_minute THEN
                LEAVE loop_1;
            END IF;
            INSERT INTO office_hour VALUES(num, weekdays, CONCAT(CONVERT(begin_hour,CHAR),":",CONVERT(begin_minute,CHAR)),CONCAT(CONVERT(begin_hour,CHAR),":",CONVERT(begin_minute + lasting,CHAR)));
            INSERT INTO faculty_officehour VALUES(faculty_email, num)
            SET begin_minute = begin_minute + lasting;
            IF begin_minute >= 60 THEN
                SET begin_hour = begin_hour + 1;
                SET begin_minute = begin_minute - 60;
            END IF;
            SET num = num + 1;
        END LOOP loop_1;
	END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS insert_ta_office_hours;
DELIMITER $$
CREATE PROCEDURE insert_ta_office_hours(IN faculty_email CHAR(50), IN weekdays CHAR(10), IN start_time TIME, IN end_time TIME, IN lasting int)
    BEGIN
        DECLARE num INT DEFAULT 0;
        DECLARE begin_hour INT;
        DECLARE begin_minute INT;
        DECLARE end_hour INT;
        DECLARE end_minute INT;
        IF (SELECT MAX(office_hour.num) + 1 FROM cs348_project.office_hour) != NULL THEN
			SET num = (SELECT MAX(office_hour.num) + 1 FROM cs348_project.office_hour);
		END IF;
        SET begin_hour = (start_time / 10000) mod 100;
        SET begin_minute = (start_time / 100) mod 100;
        set end_hour = (end_time / 10000) mod 100;
        SET end_minute = (end_time / 100) mod 100;
        loop_1: LOOP
            IF begin_hour >= end_hour AND begin_minute >= end_minute THEN
                LEAVE loop_1;
            END IF;
            INSERT INTO office_hour VALUES(num, weekdays, CONCAT(CONVERT(begin_hour,CHAR),":",CONVERT(begin_minute,CHAR)),CONCAT(CONVERT(begin_hour,CHAR),":",CONVERT(begin_minute + lasting,CHAR)));
            INSERT INTO ta_officehour VALUES(faculty_email, num)
            SET begin_minute = begin_minute + lasting;
            IF begin_minute >= 60 THEN
                SET begin_hour = begin_hour + 1;
                SET begin_minute = begin_minute - 60;
            END IF;
            SET num = num + 1;
        END LOOP loop_1;
	END$$
DELIMITER ;

