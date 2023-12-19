CREATE OR ALTER PROCEDURE updateCommentsQuery
    @PostId VARCHAR(100)
AS
BEGIN
    UPDATE Posts
    SET Comments = Comments + 1
    WHERE PostId = @PostId;
END
