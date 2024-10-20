-- TODO : add unspecified types and check if all foreign key REFERENCES are correct 

CREATE TABLE user (
    	user_ID int NOT NULL PRIMARY KEY,
    	Name varchar(255) NOT NULL,
    	email varchar(319) NOT NULL,
    	password varchar(255) NOT NULL,
	user_role varchar(255),
	created_at datetime NOT NULL,
	updated_at datetime
);

CREATE TABLE collection (
	collection_ID int NOT NULL PRIMARY KEY,
	name varchar(255) NOT NULL,
	description varchar(255),
	create_user_ID int FOREIGN KEY REFERENCES user(user_ID),--added type here
	last_updated timestamp
);

CREATE TABLE media_categories (
	category_ID int NOT NULL PRIMARY KEY,
	name varchar(255) NOT NULL,
	description varchar(255),
	def_app varchar(255)
);

CREATE TABLE media (
	media_ID int NOT NULL PRIMARY KEY,
	title varchar(255) NOT NULL,
	description varchar(255),
	type varchar(255) NOT NULL,-- added type here
	url VARCHAR(2083) NOT NULL,
	size_kb int NOT NULL,
	duration int,
	resolution varchar(255),
	format varchar(255) NOT NULL,
	category_ID int FOREIGN KEY REFERENCES media_categories(category_ID), /* added types here*/
	upload_time timestamp NOT NULL,
	last_updated timestamp NOT NULL,
	collection_ID int FOREIGN KEY REFERENCES collection(collection_ID)
);


CREATE TABLE user_preferences (
	pref_ID int NOT NULL PRIMARY KEY,
	user_ID int NOT NULL,
	category_ID int NOT NULL,
	pref_app varchar(255),
	FOREIGN KEY (user_ID) REFERENCES user(user_ID),
	FOREIGN KEY (category_ID) REFERENCES media_categories(category_ID)
);


CREATE TABLE media_metadata (
	meta_id int NOT NULL,
	media_id int FOREIGN KEY REFERENCES media(media_id),
	data_type varchar(255),
	key varchar(255) NOT NULL,-- added type here
	value varchar(255) NOT NULL
)

	
