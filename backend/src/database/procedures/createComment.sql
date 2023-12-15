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
