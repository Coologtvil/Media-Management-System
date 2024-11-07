CREATE TABLE user (
    	user_ID integer PRIMARY KEY autoincrement,
    	Name varchar(255) NOT NULL,
    	email varchar(319) NOT NULL,
    	password varchar(255) NOT NULL,
	user_role varchar(255),
	created_at datetime NOT NULL,
	updated_at datetime
);

CREATE TABLE collection (
	collection_ID integer NOT NULL PRIMARY KEY autoincrement,
	name varchar(255) NOT NULL,
	description varchar(255),
	create_user_ID int ,
	last_updated timestamp,
	FOREIGN KEY (create_user_ID) REFERENCES user(user_ID)--added type here
);

CREATE TABLE media_categories (
	category_ID integer NOT NULL PRIMARY KEY autoincrement,
	name varchar(255) NOT NULL,
	description varchar(255),
	def_app varchar(255)
);

CREATE TABLE media (
	media_ID integer NOT NULL PRIMARY KEY autoincrement,
	title varchar(255) NOT NULL,
	description varchar(255),
	type varchar(255) NOT NULL,-- added type here
	url VARCHAR(2083) NOT NULL,
	size_kb int NOT NULL,
	duration int,
	resolution varchar(255),
	format varchar(255) NOT NULL,
	category_ID int ,
	upload_time timestamp NOT NULL,
	last_updated timestamp NOT NULL,
	collection_ID int ,
	FOREIGN KEY (category_ID) REFERENCES media_categories(category_ID), /* added types here*/
	FOREIGN KEY (collection_ID) REFERENCES collection(collection_ID)
);


CREATE TABLE user_preferences (
	pref_ID integer NOT NULL PRIMARY KEY autoincrement,
	user_ID int NOT NULL,
	category_ID int NOT NULL,
	pref_app varchar(255),
	FOREIGN KEY (user_ID) REFERENCES user(user_ID),
	FOREIGN KEY (category_ID) REFERENCES media_categories(category_ID)
);


CREATE TABLE media_metadata (
	meta_id integer NOT NULL,
	media_id int ,
	data_type varchar(255),
	key varchar(255) NOT NULL,-- added type here
	value varchar(255) NOT NULL,
	FOREIGN KEY (media_id) REFERENCES media(media_id)
);

	
