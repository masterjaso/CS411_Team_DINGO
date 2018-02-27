DROP TABLE IF EXISTS OCC_STATS;
CREATE TABLE `OCC_STATS` (
   `YEAR_ID` INT NOT NULL,
   `STATE_ID` varchar(7) NOT NULL,
   `OCC_CODE` varchar(7) NOT NULL,
   `OCC_TITLE` varchar(200) DEFAULT NULL,
   `OCC_GROUP` varchar(10) DEFAULT NULL,
   `TOT_EMP` INT DEFAULT NULL,
   `EMP_PRSE` decimal(18,9) DEFAULT NULL,
   `JOBS_1000` decimal(18,9) DEFAULT NULL,
   `LOC_Q` decimal(18,9) DEFAULT NULL,
   `H_MEAN` decimal(18,9) DEFAULT NULL,
   `A_MEAN` INT DEFAULT NULL,
   `MEAN_PRSE` decimal(18,9) DEFAULT NULL,
   `H_PCT10` decimal(18,9) DEFAULT NULL,
   `H_PCT25` decimal(18,9) DEFAULT NULL,
   `H_MEDIAN` decimal(18,9) DEFAULT NULL,
   `H_PCT75` decimal(18,9) DEFAULT NULL,
   `H_PCT90` decimal(18,9) DEFAULT NULL,
   `A_PCT10` int(11) DEFAULT NULL,
   `A_PCT25` int(11) DEFAULT NULL,
   `A_MEDIAN` int(11) DEFAULT NULL,
   `A_PCT75` int(11) DEFAULT NULL,
   `A_PCT90` int(11) DEFAULT NULL,
   `HOURLY` int(11) DEFAULT NULL,
   `ANNUAL` int(11) DEFAULT NULL,
   PRIMARY KEY (`YEAR_ID`,`STATE_ID`,`OCC_CODE`)
 ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
 
 load data local infile '.\\Dataset\\csv_data\\OCC_STATS.csv' 
 into TABLE OCC_STATS 
 IGNORE 1 ROWS
 (@vYEAR_ID,@vSTATE_ID,@vOCC_CODE,@vOCC_TITLE,@vOCC_GROUP,@vTOT_EMP,@vEMP_PRSE,@vJOBS_1000,@vLOC_Q,@vH_MEAN,@vA_MEAN,@vMEAN_PRSE,
 @vH_PCT10,@vH_PCT25,@vH_MEDIAN,@vH_PCT75,@vH_PCT90,@vA_PCT10,@vA_PCT25,@vA_MEDIAN,@vA_PCT75,@vA_PCT90,@vHOURLY,@vANNUAL)
set
YEAR_ID   = nullif(@vYEAR_ID  ,''),
STATE_ID  = nullif(@vSTATE_ID ,''),
OCC_CODE  = nullif(@vOCC_CODE ,''),
OCC_TITLE = nullif(@vOCC_TITLE,''),
OCC_GROUP = nullif(@vOCC_GROUP,''),
TOT_EMP   = nullif(@vTOT_EMP  ,''),
EMP_PRSE  = nullif(@vEMP_PRSE ,''),
JOBS_1000 = nullif(@vJOBS_1000,''),
LOC_Q     = nullif(@vLOC_Q    ,''),
H_MEAN    = nullif(@vH_MEAN   ,''),
A_MEAN    = nullif(@vA_MEAN   ,''),
MEAN_PRSE = nullif(@vMEAN_PRSE,''),
H_PCT10   = nullif(@vH_PCT10  ,''),
H_PCT25   = nullif(@vH_PCT25  ,''),
H_MEDIAN  = nullif(@vH_MEDIAN ,''),
H_PCT75   = nullif(@vH_PCT75  ,''),
H_PCT90   = nullif(@vH_PCT90  ,''),
A_PCT10   = nullif(@vA_PCT10  ,''),
A_PCT25   = nullif(@vA_PCT25  ,''),
A_MEDIAN  = nullif(@vA_MEDIAN ,''),
A_PCT75   = nullif(@vA_PCT75  ,''),
A_PCT90   = nullif(@vA_PCT90  ,''),
HOURLY    = nullif(@vHOURLY   ,''),
ANNUAL    = nullif(@vANNUAL   ,'');