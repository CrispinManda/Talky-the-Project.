
DROP TABLE Posts
CREATE TABLE Posts (
    PostID INT PRIMARY KEY,
    UserID INT,
    PostText TEXT,
    ImageURL VARCHAR(255),
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    LikesCount INT DEFAULT 0,
    CommentsCount INT DEFAULT 0,
    TaggedUsers VARCHAR(MAX),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
