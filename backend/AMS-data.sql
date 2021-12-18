INSERT INTO `Department` VALUES('CS','Computer Science'),
							   ('STAT','STATISTICS'),
                               ('ECON','Economics'),
                               ('COM','Communication'),
                               ('EAPS','Earth Atmos Planetary Sci'),
                               ('MA','Mathematics'),
                               ('ME','Mechanical Engineering'),
                               ('PHYS','Physics'),
                               ('BIOL','Biological Sciences');
INSERT INTO `Course` VALUES(348,01,'Information Systems','CS'),
                           (381,01,'Algorithm Analysis','CS'),
                           (106,01,'Calculus','MA');
INSERT INTO `Department_Faculty` VALUES('fac01', 'faculty01', 'Professor', 'HAAS 123', 'null'),
									   ('fac02', 'faculty02', 'Professor', 'HAAS 124', 'null'),
                                       ('fac03', 'faculty03', 'Advisor', 'HAAS 125', 'null'),
                                       ('fac04', 'faculty04', 'Professor', 'HAAS 126', 'null'),
                                       ('fac05', 'faculty05', 'Advisor', 'HAAS 134', 'null'),
                                       ('fac06', 'faculty06', 'Professor', 'HAAS 135', 'null');

INSERT INTO `Student`VALUES('stu01','student01','null'),
						   ('stu02','student02','null'),
                           ('stu03','student03','null'),
						   ('stu04','student04','null'),
                           ('stu05','student05','null');

INSERT INTO `cs348_project`.`course_instructor` (`CRN`, `faculty_email`) VALUES ('348', 'fac01'),
('381', 'fac02');

INSERT INTO `cs348_project`.`ad_student` (`purdue_email`, `faculty_email`) VALUES ('stu01', 'fac03'),
('stu02', 'fac05');

INSERT INTO `cs348_project`.`course_ta` (`CRN`, `TAID`) VALUES ('348', '01'),
('348', '02');

INSERT INTO `cs348_project`.`depref` (`depID`, `faculty_email`) VALUES ('CS', 'fac01'),
('CS', 'fac02');


INSERT INTO `cs348_project`.`office_hour` (`num`, `Weekdays`, `start_time`, `end_time`) VALUES ('01', 'Monday', '8:00', '8:10'),
('02', 'Monday', '8:00', '8:10'),
('03', 'Monday', '8:00', '8:10');

INSERT INTO `cs348_project`.`faculty_officehour` (`faculty_email`, `f_num`) VALUES ('fac01', '1'),
("fac03","2");

INSERT INTO `cs348_project`.`rating_score` (`purdue_email`, `rating`) VALUES ('fac01', '5.0');

INSERT INTO `cs348_project`.`rating_data` (`student_email`, `purdue_email`, `rating`) VALUES ('stu01', 'fac01', '5.0');

INSERT INTO `cs348_project`.`ta_officehour` (`TAID`, `t_num`) VALUES ('1', '3');

INSERT INTO `cs348_project`.`appointment_time` (`purdue_email`, `num`, `day_time`) VALUES ('stu02', '1', '2021-12-20');




