
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS Department_Faculty;
DROP TABLE IF EXISTS TA;
DROP TABLE IF EXISTS Office_hour;
DROP TABLE IF EXISTS Register;
DROP TABLE IF EXISTS Appointment_time;
DROP TABLE IF EXISTS RATING_data;
DROP TABLE IF EXISTS Course_TA;
DROP TABLE IF EXISTS DepRef;
DROP TABLE IF EXISTS ad_student;
DROP TABLE IF EXISTS Course_Instructor;
DROP TABLE IF EXISTS TA_officeHour;
DROP TABLE IF EXISTS faculty_officeHour;
DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS Rating_score;

CREATE TABLE Department(depID CHAR(5) NOT NULL, 
						dep_name CHAR(30), 
                        PRIMARY KEY(depID));
                        
CREATE TABLE Course(CRN INTEGER NOT NULL,
					CRSE INTEGER,
                    courseTitle CHAR(45),
                    SUBJ CHAR(5),
                    PRIMARY KEY(CRN),
                    FOREIGN KEY(SUBJ) REFERENCES Department(depID));
                    
CREATE TABLE Department_Faculty(faculty_email CHAR(50) NOT NULL,
								Name CHAR(25) NOT NULL,
                                Title CHAR(25),
                                Office CHAR(15),
                                Password CHAR(20) NOT NULL,
                                PRIMARY KEY(faculty_email));

CREATE TABLE Student(purdue_email CHAR(50) NOT NULL,
					 Name CHAR(25) NOT NULL,
                     Password CHAR(20) NOT NULL,
                     PRIMARY KEY(purdue_email));
                                
CREATE TABLE TA(TAID INTEGER NOT NULL,
				Title CHAR(25),
                Office CHAR(15),
                TA_email CHAR(50) NOT NULL,
                PRIMARY KEY(TAID),
                FOREIGN KEY(TA_email) REFERENCES Student(purdue_email));
                
CREATE TABLE Office_hour(num INTEGER NOT NULL,
						 Weekdays CHAR(10),
                         start_time TIME,
                         end_time TIME,
                         PRIMARY KEY(num));

CREATE TABLE Appointment_time(purdue_email CHAR(50) NOT NULL,
							  num INTEGER NOT NULL,
                              day_time DATE NOT NULL,
                              PRIMARY KEY(purdue_email, num, day_time));
                              
CREATE TABLE Rating_score(purdue_email CHAR(50) NOT NULL,
						  rating INTEGER,
                          PRIMARY KEY(purdue_email));
                          
CREATE TABLE RATING_data(student_email CHAR(50) NOT NULL,
						 purdue_email CHAR(50) NOT NULL,
                         rating INTEGER,
                         PRIMARY KEY(student_email),
                         FOREIGN KEY(purdue_email) REFERENCES Rating_score(purdue_email));
                         
CREATE TABLE Course_TA(CRN INTEGER NOT NULL,
					   TAID INTEGER NOT NULL,
                       PRIMARY KEY(CRN, TAID));
                       
CREATE TABLE DepRef(depID CHAR(5) NOT NULL,
					faculty_email CHAR(50) NOT NULL,
                    PRIMARY KEY(depID, faculty_email));
                    
CREATE TABLE ad_student(purdue_email CHAR(50) NOT NULL,
						faculty_email CHAR(50) NOT NULL,
                        PRIMARY KEY(purdue_email, faculty_email));

CREATE TABLE Course_Instructor(CRN INTEGER NOT NULL,
							   faculty_email CHAR(50) NOT NULL,
                               PRIMARY KEY(CRN, faculty_email));
                               
CREATE TABLE TA_officeHour(TAID INTEGER NOT NULL,
						   t_num INTEGER NOT NULL,
                           PRIMARY KEY(TAID,t_num));
                           
CREATE TABLE faculty_officeHour(faculty_email CHAR(50) NOT NULL,
                                f_num INTEGER NOT NULL,
                                PRIMARY KEY(faculty_email, f_num));

CREATE TABLE Register(purdue_email CHAR(50) NOT NULL,
                                CRN INTEGER NOT NULL,
                                PRIMARY KEY(purdue_email, CRN),
                                FOREIGN KEY(purdue_email) REFERENCES Student(purdue_email),
                                FOREIGN KEY(CRN) REFERENCES Course(CRN));

                    
                    