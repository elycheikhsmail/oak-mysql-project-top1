    -- mysql 
CREATE TABLE IF NOT EXISTS task (
        id int(11) NOT NULL AUTO_INCREMENT,
        text varchar(100), 
        ownerId int(11) NOT NULL ,
        PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;