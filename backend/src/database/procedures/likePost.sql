CREATE OR ALTER PROCEDURE likePost
(
    @LikeId VARCHAR(100),
    @PostId VARCHAR(100),
    @UserId VARCHAR(100)
)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the user has already liked the post
    IF NOT EXISTS (SELECT 1 FROM PostLikes WHERE PostId = @PostId AND UserId = @UserId)
    BEGIN
        -- Increment the Likes count in the Posts table
        UPDATE Posts SET Likes = Likes + 1 WHERE PostId = @PostId;

        -- Record the like in the PostLikes table
        INSERT INTO PostLikes (LikeId,PostId, UserId, LikeDate)
        VALUES (@LikeId,@PostId, @UserId, GETDATE());
        
        -- Return a success message
        SELECT 'Post liked successfully' AS Message;
    END
    ELSE
    BEGIN
        -- Return a message indicating that the user has already liked the post
        SELECT 'User has already liked the post' AS Message;
    END
END;


CREATE OR ALTER PROCEDURE likePost
    @LikeId VARCHAR(100),
    @UserId VARCHAR(100),
    @PostId VARCHAR(100)
AS
BEGIN
    INSERT INTO PostLikes (LikeId, UserId, PostId)
    VALUES (@LikeId, @UserId, @PostId);
END;



CREATE OR ALTER PROCEDURE unLikePost
    @UserId VARCHAR(100),
    @PostId VARCHAR(100)
AS
BEGIN
    DELETE FROM PostLikes
    WHERE UserID = @UserId AND PostId = @PostId ;
END;