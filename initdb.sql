CREATE TABLE snippet (
	id VARCHAR(8) NOT NULL,
	code TEXT,
	codeformatted TEXT,
	highlight VARCHAR(128),
	creation TIMESTAMP,
	expiration TIMESTAMP,
	title VARCHAR(255),
	username VARCHAR(128),
	PRIMARY KEY (id)
);
