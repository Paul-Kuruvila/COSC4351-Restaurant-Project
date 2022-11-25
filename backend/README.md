# Our database name is seatyourself and it consists of the following tables:

## UserCredentials
**create table UserCredentials(userid INT NOT NULL AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255) NOT NULL, PRIMARY KEY(userid));**
```
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| userid   | int          | NO   | PRI | NULL    | auto_increment |
| username | varchar(255) | YES  |     | NULL    |                |
| password | varchar(255) | NO   |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
```
## ReservationInfo
**create table ReservationInfo(name VARCHAR(255) NOT NULL, phonenum VARCHAR(255) NOT NULL, email VARCHAR(255), guestnum INT NOT NULL, datetime DATETIME NOT NULL);**
```
+----------+--------------+------+-----+---------+-------+
| Field    | Type         | Null | Key | Default | Extra |
+----------+--------------+------+-----+---------+-------+
| name     | varchar(255) | NO   |     | NULL    |       |
| phonenum | varchar(255) | NO   |     | NULL    |       |
| email    | varchar(255) | YES  |     | NULL    |       |
| guestnum | int          | NO   |     | NULL    |       |
| datetime | datetime     | NO   |     | NULL    |       |
+----------+--------------+------+-----+---------+-------+
```