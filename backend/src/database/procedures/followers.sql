CREATE OR ALTER PROCEDURE followUser
    @FollowerId VARCHAR(100),
    @FollowerUserId VARCHAR(100),
    @FollowingUserId VARCHAR(100)
AS
BEGIN
    -- Check if the follower relationship already exists
    IF NOT EXISTS (SELECT 1 FROM Followers WHERE FollowerUserId = @FollowerUserId AND FollowingUserId = @FollowingUserId)
    BEGIN
        -- Insert a new follower relationship
        INSERT INTO Followers (FollowerId, FollowerUserId, FollowingUserId)
        VALUES (@FollowerId, @FollowerUserId, @FollowingUserId);

        -- Return a success message
        SELECT 'User followed successfully' AS Message;
    END
    ELSE
    BEGIN
        -- Return a message indicating that the follower relationship already exists
        SELECT 'User is already being followed' AS Message;
    END
END;
