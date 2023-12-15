CREATE OR ALTER PROCEDURE loginUser
    @Email VARCHAR(255),
    @PasswordHash VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserId VARCHAR(100),
            @Username VARCHAR(50),
            @StoredPasswordHash VARCHAR(255);

    -- Check if the provided email exists in the Users table
    SELECT
        @UserId = UserId,
        @Username = Username,
        @StoredPasswordHash = PasswordHash
    FROM Users
    WHERE Email = @Email;

    -- Check if the user was found
    IF @UserId IS NOT NULL
    BEGIN
        -- Verify the password using the stored hash
        IF @StoredPasswordHash IS NOT NULL AND @StoredPasswordHash = @PasswordHash
        BEGIN
            -- Return user information or set output parameters as needed
            SELECT
                @UserId AS UserId,
                @Username AS Username;
        END
        ELSE
        BEGIN
            -- Incorrect password
            THROW 50001, 'Incorrect password', 1;
        END
    END
    ELSE
    BEGIN
        -- User not found
        THROW 50002, 'Email not found', 1;
    END
END;


CREATE OR ALTER PROCEDURE loginUser ( @Email VARCHAR(255),
    @PasswordHash VARCHAR(255) )
AS
BEGIN

    SELECT * FROM Users WHERE Email= @Email

END