CREATE PROCEDURE fetchFollowers
    @followed_UserId VARCHAR(100)
AS
BEGIN
    SELECT FollowerUserId
    FROM Followers
    WHERE FollowingUserId = @followed_UserId;
END;
