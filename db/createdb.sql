CREATE TABLE user (
    	user_ID int NOT NULL PRIMARY KEY,
    	Name varchar(255) NOT NULL,
    	email varchar(319) NOT NULL,
    	password varchar(255) NOT NULL,
	user_role varchar(255),
	created_at datetime NOT NULL,
	updated_at datetime
); 
