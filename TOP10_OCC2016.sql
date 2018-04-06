Select OCC_CODE, OCC_TITLE, YEAR_ID, max(TOT_EMP) from OCC_STATS 
Where YEAR_ID = 2016 and OCC_TITLE <> 'All Occupations' 
GROUP by YEAR_ID, OCC_CODE order by YEAR_ID,TOT_EMP DESC limit 10
;

