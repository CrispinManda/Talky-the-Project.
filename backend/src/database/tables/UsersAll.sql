CREATE TABLE Users (
    UserId VARCHAR(100) PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    PasswordHash VARCHAR(100) NOT NULL,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DateOfBirth DATE,
    RegistrationDate DATETIME DEFAULT GETDATE(),
    ProfilePictureUrl VARCHAR(100),
    Bio VARCHAR(MAX),
    Website VARCHAR(100),
    Location VARCHAR(100),
    IsVerified BIT DEFAULT 0,
    OtpSecret VARCHAR(20),
    isWelcomed BIT DEFAULT 0
);

USE TalkyDb

SELECT * FROM Users

CREATE TABLE Posts (
    PostId VARCHAR(100) PRIMARY KEY,
    UserId VARCHAR(100) REFERENCES Users(UserId),
    Content VARCHAR(MAX),
    ImageUrl VARCHAR(100),
    PostDate DATETIME DEFAULT GETDATE(),
    Likes INT DEFAULT 0,
    Comments INT DEFAULT 0,
    isDeleted BIT DEFAULT 0 
);


CREATE TABLE Comments (
    CommentId VARCHAR(100) PRIMARY KEY,
    UserId VARCHAR(100) FOREIGN KEY REFERENCES Users(UserId),
    PostId VARCHAR(100) FOREIGN KEY REFERENCES Posts(PostId),
    ParentCommentId VARCHAR(100) FOREIGN KEY REFERENCES Comments(CommentId),
    Content VARCHAR(MAX),
    CommentDate DATETIME DEFAULT GETDATE(),
    Likes INT DEFAULT 0,
    isDeleted BIT DEFAULT 0 
);

SELECT * FROM Comments

ALTER TABLE Comments
DROP CONSTRAINT DF__Comments__Commen__4D5F7D71;


ALTER TABLE Comments
DROP COLUMN Comments;




CREATE TABLE PostLikes (
    LikeId VARCHAR(100) PRIMARY KEY,
    UserId VARCHAR(100) FOREIGN KEY REFERENCES Users(UserId),
    PostId VARCHAR(100) FOREIGN KEY REFERENCES Posts(PostId),
    LikeDate DATETIME DEFAULT GETDATE()
);

DROP TABLE Followers

SELECT * FROM followers



SELECT * FROM Followers

CREATE TABLE Followers(
    FollowerId VARCHAR(100) PRIMARY KEY, 
    followingUserId VARCHAR(100) NOT NULL, 
    followedUserId VARCHAR(100) NOT NULL, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (followingUserId) REFERENCES Users(UserId),
    FOREIGN KEY (followedUserId) REFERENCES Users(UserId)
)


CREATE TABLE PostTags (
    PostTagId VARCHAR(100) PRIMARY KEY,
    PostId VARCHAR(100) FOREIGN KEY REFERENCES Posts(PostId),
    TaggedUserId VARCHAR(100) FOREIGN KEY REFERENCES Users(UserId)
);

CREATE TABLE Otps (
    OtpId VARCHAR(100) PRIMARY KEY,
    UserId VARCHAR(100) FOREIGN KEY REFERENCES Users(UserId),
    OtpValue VARCHAR(6),
    ExpiryTime DATETIME
);

