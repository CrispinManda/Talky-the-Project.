CREATE PROCEDURE loginUser
    @email NVARCHAR(100),
    @password NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

DECLARE @UserID NVARCHAR(100),
        @Username NVARCHAR(50),
        @FullName NVARCHAR(100),
        @Bio VARCHAR(MAX),  -- Change to VARCHAR(MAX) here
        @Password NVARCHAR(100),
        @ProfilePictureURL NVARCHAR(255)
       

    SELECT TOP 1
        @UserID = UserID,
        @Username = Username,
        @FullName = FullName,
        @Bio = Bio,
        @Password = Password,  -- Assuming your hashed password is stored in the Password column
        @ProfilePictureURL = ProfilePictureURL
      
    FROM Users
    WHERE Email = @email;

    IF @UserID IS NOT NULL
    BEGIN
        -- Check password hash
        IF HASHBYTES('SHA2_256', @password) = CAST('0x' + @Password AS VARBINARY(64))
        BEGIN
            SELECT @UserID AS UserID,
                   @Username AS Username,
                   @FullName AS FullName,
                   @Bio AS Bio,
                   @ProfilePictureURL AS ProfilePictureURL
                   
        END
        ELSE
        BEGIN
            -- Incorrect password
            SELECT 'Incorrect password' AS Error;
        END
    END
    ELSE
    BEGIN
        -- User not found
        SELECT 'User not found' AS Error;
    END
END;


CREATE OR ALTER PROCEDURE loginUser(@email VARCHAR(200), @password VARCHAR(200))
AS
BEGIN

    SELECT * FROM Users WHERE email= @email

END