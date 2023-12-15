CREATE PROCEDURE updateComment
    @PostId VARCHAR(100),
    @UserId VARCHAR(100),
    @Content VARCHAR(MAX),
    @CommentId VARCHAR(100)
AS
BEGIN
    UPDATE Comments
    SET Content = @Content
    WHERE CommentId = @CommentId AND PostId = @PostId AND UserId = @UserId;

    IF @@ROWCOUNT > 0
        SELECT 'Comment updated successfully' AS Message;
    ELSE
        SELECT 'Comment not found or update failed' AS Message;
END;
