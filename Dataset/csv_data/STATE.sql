DROP TABLE IF EXISTS STATE;
CREATE TABLE `STATE` (
   `STATE_ID` varchar(8) NOT NULL,
   `STATENAME` varchar(50) DEFAULT NULL,
   
   PRIMARY KEY (`STATE_ID`)
 ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
 
 load data local infile '.\\Dataset\\csv_data\\STATE.csv' 
 into TABLE STATE 
 IGNORE 1 ROWS