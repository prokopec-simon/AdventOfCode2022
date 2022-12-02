CREATE TABLE AoC2022_2 (
    FirstPick NVARCHAR(1) NOT NULL,
    SecondPick NVARCHAR(1) NOT NULL,
)

BULK INSERT AoC2022_2
  FROM 'C:\input.txt'
  WITH  
     (
        ROWTERMINATOR ='\n',
        FIELDTERMINATOR = ' '
     );

ALTER TABLE AoC2022_2 ADD TranslatedSecondPick nvarchar NULL

UPDATE AoC2022_2 SET TranslatedSecondPick=CASE  
                        WHEN SecondPick = 'X' THEN 'A' 
                        WHEN SecondPick = 'Y' THEN 'B' 
                        WHEN SecondPick = 'Z' THEN 'C'
                        END

CREATE FUNCTION GetRpsResult(@pickA nvarchar(1), @pickB nvarchar(1))
RETURNS int AS
BEGIN
    DECLARE @TotalPoints int;
    DECLARE @PointsForPick int;
    DECLARE @PointsForResult int;

    IF(@pickB = 'A') SET @PointsForPick=1
    IF(@pickB = 'B') SET @PointsForPick=2
    IF(@pickB = 'C') SET @PointsForPick=3

    IF(@pickA=@pickB) SET @PointsForResult=3

    IF(@pickA='A' AND @pickB='B') SET @PointsForResult=6
    IF(@pickA='A' AND @pickB='C') SET @PointsForResult=0

    IF(@pickA='B' AND @pickB='A') SET @PointsForResult=0
    IF(@pickA='B' AND @pickB='C') SET @PointsForResult=6

    IF(@pickA='C' AND @pickB='A') SET @PointsForResult=6
    IF(@pickA='C' AND @pickB='B') SET @PointsForResult=0

    SET @TotalPoints=@PointsForPick + @PointsForResult
    RETURN @TotalPoints
END

CREATE FUNCTION GetRpsReverseResult(@pickA nvarchar(1), @pickB nvarchar(1))
RETURNS int AS
BEGIN

    DECLARE @TotalPoints int;
    DECLARE @PointsForPick int;
    DECLARE @PointsForResult int;

    IF(@pickB = 'X') SET @PointsForResult=0
    IF(@pickB = 'Y') SET @PointsForResult=3
    IF(@pickB = 'Z') SET @PointsForResult=6

    IF(@pickA='A' AND @pickB='X') SET @PointsForPick=3
    IF(@pickA='A' AND @pickB='Y') SET @PointsForPick=1
    IF(@pickA='A' AND @pickB='Z') SET @PointsForPick=2

    IF(@pickA='B' AND @pickB='X') SET @PointsForPick=1
    IF(@pickA='B' AND @pickB='Y') SET @PointsForPick=2
    IF(@pickA='B' AND @pickB='Z') SET @PointsForPick=3

    IF(@pickA='C' AND @pickB='X') SET @PointsForPick=2
    IF(@pickA='C' AND @pickB='Y') SET @PointsForPick=3
    IF(@pickA='C' AND @pickB='Z') SET @PointsForPick=1

    SET @TotalPoints=@PointsForPick + @PointsForResult
    RETURN @TotalPoints
END