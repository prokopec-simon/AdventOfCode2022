DECLARE @pickA VARCHAR(1) 
DECLARE @pickB VARCHAR(1) 
DECLARE @pickBTranslated VARCHAR(1) 

DECLARE @totalPoints int
DECLARE @currentPoints int

SET @totalPoints = 0

DECLARE PointCalculatingCursor CURSOR FOR 
SELECT FirstPick,SecondPick,TranslatedSecondPick
FROM AoC2022_2

OPEN PointCalculatingCursor
FETCH NEXT FROM PointCalculatingCursor INTO @pickA, @pickB, @pickBTranslated
WHILE @@FETCH_STATUS = 0  
BEGIN  
    SET @currentPoints = dbo.GetRpsReverseResult(@pickA,@pickB)
    SET @totalPoints = @totalPoints+@currentPoints
    --print(@pickA + '-' + @pickB + '='+ CAST(@currentPoints AS nvarchar))
 	FETCH NEXT FROM PointCalculatingCursor INTO @pickA, @pickB,@pickBTranslated
END 

CLOSE PointCalculatingCursor  
DEALLOCATE PointCalculatingCursor 

print(@totalPoints)