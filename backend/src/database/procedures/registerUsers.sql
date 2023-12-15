CREATE OR ALTER PROCEDURE registerUsers
    @UserId VARCHAR(100),
    @Username VARCHAR(50),
    @Email VARCHAR(255),
    @PasswordHash VARCHAR(255)
    -- Add other parameters as needed
AS
BEGIN
    INSERT INTO Users (UserId, Username, Email, PasswordHash)
    VALUES (@UserId, @Username, @Email, @PasswordHash);
END;

SELECT * FROM Users