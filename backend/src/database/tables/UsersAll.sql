CREATE TABLE Users (
    UserId VARCHAR(100) PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DateOfBirth DATE,
    RegistrationDate DATETIME DEFAULT GETDATE(),
    ProfilePictureUrl VARCHAR(255),
    Bio VARCHAR(MAX),
    Website VARCHAR(255),
    Location VARCHAR(100),
    IsVerified BIT DEFAULT 0,
    OtpSecret VARCHAR(20),
    welcomed BIT DEFAULT 0
);

USE TalkyDb

CREATE TABLE Posts (
    PostId VARCHAR(100) PRIMARY KEY,
    UserId VARCHAR(100) REFERENCES Users(UserId),
    Content VARCHAR(MAX),
    ImageUrl VARCHAR(255),
    PostDate DATETIME DEFAULT GETDATE(),
    Likes INT DEFAULT 0,
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


CREATE TABLE PostLikes (
    LikeId VARCHAR(100) PRIMARY KEY,
    UserId VARCHAR(100) FOREIGN KEY REFERENCES Users(UserId),
    PostId VARCHAR(100) FOREIGN KEY REFERENCES Posts(PostId),
    LikeDate DATETIME DEFAULT GETDATE()
);

DROP TABLE Followers

SELECT * FROM followers

CREATE TABLE Followers (
    FollowerId VARCHAR(100) PRIMARY KEY,
    FollowerUserId VARCHAR(100) REFERENCES Users(UserId),
    FollowingUserId VARCHAR(100) REFERENCES Users(UserId)
);


CREATE TABLE Followers (
    FollowerId VARCHAR(100) PRIMARY KEY,
    FollowerUserId VARCHAR(100) FOREIGN KEY REFERENCES Users(UserId),
    FollowingUserId VARCHAR(100) FOREIGN KEY REFERENCES Users(UserId)
);

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


EXEC getUserProfileProcedure @UserId = '22a57df2-7653-4c60-998d-5dd23580df21'