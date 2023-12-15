CREATE OR ALTER PROCEDURE createPost
(   @PostId varchar(255) ,
	@Content varchar(4000) ,	
	@ImageUrl varchar(255),
    @UserId VARCHAR (255)   
)
    
AS

BEGIN
    set nocount on;

    INSERT INTO Posts (PostId, Content, ImageUrl, UserId)
    VALUES (@PostId, @Content, @ImageUrl, @UserId)
END

