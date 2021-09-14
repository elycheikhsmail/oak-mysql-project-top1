    -- mysql
DROP TABLE IF EXISTS task ; 
CREATE TABLE task (
        id int(11) NOT NULL AUTO_INCREMENT,
        text varchar(100), 
        ownerId int(11) NOT NULL ,
        PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;