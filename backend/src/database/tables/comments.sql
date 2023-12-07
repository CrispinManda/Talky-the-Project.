CREATE TABLE Comments (
    CommentID INT PRIMARY KEY,
    UserID INT,
    PostID INT,
    ParentCommentID INT, -- Nullable for top-level comments
    CommentText TEXT,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    LikesCount INT DEFAULT 0,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (ParentCommentID) REFERENCES Comments(CommentID)
);
