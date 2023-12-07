
CREATE OR ALTER PROCEDURE registerUsers
    @UserID VARCHAR(100),
    @Username VARCHAR(255),
    @Email VARCHAR(255),
    @FullName VARCHAR(255),
    @Bio VARCHAR(MAX),
    @ProfilePictureURL VARCHAR(255),
    @Password VARCHAR(255)
AS
BEGIN
    -- Check if the user already exists based on the email
    IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = @Email)
    BEGIN
        -- Insert the new user
        INSERT INTO Users (UserID, Username, Email, FullName, Bio, ProfilePictureURL, Password)
        VALUES (@UserID, @Username, @Email, @FullName, @Bio, @ProfilePictureURL, @Password);

        -- Return success or a meaningful message
        SELECT 'User registered successfully' AS ResultMessage;
    END
    ELSE
    BEGIN
        -- Return a message indicating that the user already exists
        SELECT 'User with the provided email already exists' AS ResultMessage;
    END
END;
