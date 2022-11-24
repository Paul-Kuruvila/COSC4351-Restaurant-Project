Our database name is seatyourself and it consists of the following tables:

**UserCredentials** - create table UserCredentials(userid INT NOT NULL AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255) NOT NULL, PRIMARY KEY(userid));
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| userid   | int          | NO   | PRI | NULL    | auto_increment |
| username | varchar(255) | YES  |     | NULL    |                |
| password | varchar(255) | NO   |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+