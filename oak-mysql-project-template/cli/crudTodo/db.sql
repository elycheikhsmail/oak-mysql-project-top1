-- SQLite 
CREATE TABLE IF NOT EXISTS tasks (
	id	INTEGER ,
	task	TEXT ,  
	PRIMARY KEY( id )
) ;

CREATE TABLE IF NOT EXISTS tables_list(
	id	INTEGER ,
	tableName	TEXT , 
	PRIMARY KEY( id )
)
;
CREATE TABLE IF NOT EXISTS describe_tables (
	id	INTEGER ,
	tables_list_id	TEXT ,  
	colName  Text,
	PRIMARY KEY( id )
) ;