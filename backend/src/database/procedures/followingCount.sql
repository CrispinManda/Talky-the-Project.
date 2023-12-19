CREATE OR ALTER PROCEDURE fetchFollowings
    @followingUserId VARCHAR(100)
AS
BEGIN
    SELECT FollowerId
    FROM Followers
    WHERE followingUserId = @followingUserId;
END