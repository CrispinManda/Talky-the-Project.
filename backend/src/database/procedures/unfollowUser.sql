CREATE OR ALTER PROCEDURE unfollowUser(
    @followingUserId VARCHAR(100),
    @followedUserId VARCHAR(100)
)
AS
BEGIN
    DELETE FROM Followers
    WHERE followingUserId = @followingUserId
    AND followedUserId = @followedUserId;
END