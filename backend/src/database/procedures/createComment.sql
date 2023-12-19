
CREATE PROCEDURE createComments
    @CommentId VARCHAR(100),
    @Content VARCHAR(MAX),
    @PostId VARCHAR(100),
    @UserId VARCHAR(100)
AS
BEGIN
    -- Your logic to insert a new comment into the Comments table
    INSERT INTO Comments (CommentId, Content, PostId, UserId, CommentDate, Likes, isDeleted)
    VALUES (@CommentId, @Content, @PostId, @UserId, GETDATE(), 0, 0);

    -- Return a success message
    SELECT 'Comment created successfully' AS Message;
END;

























CREATE OR ALTER PROCEDURE createComment
(   
    @PostId varchar(100),
    @Content varchar(MAX),
    @CommentId varchar(100),
    @UserId VARCHAR(100)
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Comments (PostId, Content, CommentId, UserId)
    VALUES (@PostId, @Content, @CommentId, @UserId);
END;