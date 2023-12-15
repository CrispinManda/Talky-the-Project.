CREATE OR ALTER PROCEDURE getUserProfileProcedure
    @UserId VARCHAR(100)
AS
BEGIN
    DECLARE @ProfileCount INT;

    -- Check if the user with the specified UserId exists
    SELECT @ProfileCount = COUNT(*)
    FROM Users
    WHERE UserId = @UserId;

    -- If the user exists, fetch the profile; otherwise, return an error
    -- IF @ProfileCount > 0
    -- BEGIN
    --     SELECT 
    --         UserId, 
    --         UserName, 
    --         Email, 
    --         FirstName, 
    --         LastName,
    --         DateOfBirth
    --     FROM Users
    --     WHERE UserId = @UserId;
    -- END
    -- ELSE
    -- BEGIN
    --     SELECT 'User not found' AS ErrorMessage;
    -- END
END;
