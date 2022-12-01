## Our database name is seatyourself and it consists of the following tables:

**UserCredentials**

``create table UserCredentials(userid INT NOT NULL AUTO_INCREMENT, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, phonenum VARCHAR(10) NOT NULL, email VARCHAR(255) NOT NULL, PRIMARY KEY(userid));``
```
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| userid   | int          | NO   | PRI | NULL    | auto_increment |
| username | varchar(255) | NO   |     | NULL    |                |
| password | varchar(255) | NO   |     | NULL    |                |
| phonenum | varchar(10)  | YES  |     | NULL    |                |
| email    | varchar(255) | YES  |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
```
**ReservationInfo**

``create table ReservationInfo(name VARCHAR(255) NOT NULL, phonenum VARCHAR(255) NOT NULL, email VARCHAR(255), guestnum INT NOT NULL, datetime DATETIME NOT NULL, credit VARCHAR(255));``
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

create table ProfileInfo(id INT NOT NULL AUTO_INCREMENT, userid INT, name VARCHAR(255) NOT NULL, email VARCHAR(255), billaddress VARCHAR(255), diner INT NOT NULL, payment VARCHAR(255), PRIMARY KEY(id));
