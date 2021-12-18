DROP TRIGGER IF EXISTS after_insert_femail;
DELIMITER $$

CREATE TRIGGER after_insert_femail
	AFTER INSERT ON Department_Faculty
		FOR EACH ROW
    BEGIN
		INSERT INTO Rating_score(purdue_email,rating)
				VALUES(new.faculty_email,null);
	END $$
    
DELIMITER ;


DROP TRIGGER IF EXISTS after_insert_temail;
DELIMITER $$

CREATE TRIGGER after_insert_temail
	AFTER INSERT ON TA
		FOR EACH ROW
    BEGIN
		INSERT INTO Rating_score(purdue_email,rating)
				VALUES(new.TA_email,null);
	END $$
    
DELIMITER ;


DROP TRIGGER IF EXISTS after_insert_rating;
DELIMITER $$

CREATE TRIGGER after_insert_rating
	AFTER INSERT ON Rating_data
		FOR EACH ROW
    BEGIN
		SET @avg_rating=(SELECT AVG(rating) 
						 FROM Rating_data
						 WHERE Rating_data.purdue_email=new.purdue_email);
		UPDATE Rating_score SET rating=@avg_rating WHERE purdue_email=new.purdue_email;

	END $$
    
DELIMITER ;


INSERT INTO `Department` VALUES('CS','Computer Science'),
							   ('STAT','STATISTICS'),
                               ('ECON','Economics'),
                               ('COM','Communication'),
                               ('EAPS','Earth Atmos Planetary Sci'),
                               ('MA','Mathematics'),
                               ('ME','Mechanical Engineering'),
                               ('PHYS','Physics'),
                               ('BIOL','Biological Sciences');
INSERT INTO `Course` VALUES(26857,34800,'Information Systems','CS'),
						   (26858,34800,'Information Systems','CS'),
                           (26866,34800,'Information Systems','CS'),
                           (26867,34800,'Information Systems','CS'),
                           (26868,34800,'Information Systems','CS'),
                           (26869,34800,'Information Systems','CS'),
                           (26870,34800,'Information Systems','CS'),
                           (26871,34800,'Information Systems','CS'),
                           (26872,34800,'Information Systems','CS'),
                           (26873,34800,'Information Systems','CS'),
                           (26874,34800,'Information Systems','CS'),
                           (29226,41600,'Probability','STAT'),
                           (61526,41600,'Probability','STAT'),
                           (40115,41600,'Probability','STAT'),
                           (19765,41600,'Probability','STAT'),
                           (15941,41600,'Probability','STAT'),
                           (17701,41600,'Probability','STAT'),
                           (68717,41600,'Probability','STAT');
                           
INSERT INTO `Department_Faculty` VALUES('test@purdue.edu', 'test', 'Professor', 'HAAS 123', 'asd123'),
									   ('test1@purdue.edu', 'test1', 'Professor', 'HAAS 124', 'asd123'),
                                       ('test2@purdue.edu', 'test2', 'Professor', 'HAAS 125', 'asd123'),
                                       ('test3@purdue.edu', 'test3', 'Professor', 'HAAS 126', 'asd123'),
                                       ('test4@purdue.edu', 'test4', 'Professor', 'HAAS 134', 'asd123'),
                                       ('test5@purdue.edu', 'test5', 'Professor', 'HAAS 135', 'asd123'),
                                       ('test6@purdue.edu', 'test6', 'Professor', 'HAAS 136', 'asd123'),
                                       ('test7@purdue.edu', 'test7', 'Professor', 'HAAS 137', 'asd123'),
                                       ('test8@purdue.edu', 'test8', 'Professor', 'HAAS 138', 'asd123'),
                                       ('test9@purdue.edu', 'test9', 'Professor', 'HAAS 139', 'asd123');
                                       

INSERT INTO `Student`VALUES('student1@purdue.edu','Liam','123456'),
						   ('student2@purdue.edu','Noah','323jfedd'),
                           ('student3@purdue.edu','Oliver','983423'),
						   ('student4@purdue.edu','Elijah','12fedd6'),
                           ('student5@purdue.edu','Charlotte','9930022'),
                           ('student6@purdue.edu','Ava','aaakd999'),
                           ('student7@purdue.edu','Emma','000qqq'),
                           ('student8@purdue.edu','Jasper','eight88');
                           
INSERT INTO `Rating_data` VALUES(1,'test@purdue.edu',5),
								(2,'test@purdue.edu',3),
                                (3,'test@purdue.edu',2),
                                (4,'test@purdue.edu',5),
                                (5,'test1@purdue.edu',5),
                                (6,'test1@purdue.edu',5),
                                (7,'test1@purdue.edu',5),
                                (8,'test2@purdue.edu',4),
								(9,'test2@purdue.edu',5),
                                (10,'test2@purdue.edu',1);
				
