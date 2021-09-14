    -- mysql 
CREATE TABLE IF NOT EXIST {{tableName}}(
        id int(11) NOT NULL AUTO_INCREMENT,
        text varchar(100), 
        PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;