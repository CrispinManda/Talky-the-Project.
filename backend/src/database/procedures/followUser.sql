CREATE OR ALTER PROCEDURE followUser(
    @followerId VARCHAR(100),
    @followingUserId VARCHAR(100),
    @followedUserId VARCHAR(100)
)
AS
BEGIN
    INSERT INTO Followers (followerId, followingUserId, followedUserId)
    VALUES (@followerId, @followingUserId,@followedUserId)
END