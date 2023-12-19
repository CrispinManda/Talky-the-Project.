CREATE OR ALTER PROCEDURE addCommentAndUpdateCount
(
    @CommentId VARCHAR(100),
    @Content VARCHAR(MAX),
    @PostId VARCHAR(100),
    @UserId VARCHAR(100)
)
AS
BEGIN
    SET NOCOUNT ON;

    
    INSERT INTO Comments (CommentId, Content, PostId, UserId, CommentDate)
    VALUES (@CommentId, @Content, @PostId, @UserId, GETDATE());

   
    UPDATE Posts SET Comments = Comments + 1 WHERE PostId = @PostId;

    
    SELECT 'Comment added successfully and post updated' AS Message;
END;
