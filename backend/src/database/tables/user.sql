CREATE TABLE Users (
    UserID VARCHAR(100) NOT NULL ,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    FullName VARCHAR(100),
    Bio TEXT,
    ProfilePictureURL VARCHAR(255),
    RegistrationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FollowersCount INT DEFAULT 0,
    FollowingCount INT DEFAULT 0,
    PostsCount INT DEFAULT 0,

);

DROP TABLE Users
SELECT * FROM Users

SELECT name
FROM sys.key_constraints
WHERE parent_object_id = OBJECT_ID('Users') AND type_desc = 'PRIMARY_KEY_CONSTRAINT';



-- Step 1: Drop the existing primary key constraint
IF EXISTS (SELECT * FROM sys.key_constraints WHERE name = 'PK__Users__1788CCACAC669223')
BEGIN
    ALTER TABLE Users
    DROP CONSTRAINT PK__Users__1788CCACAC669223;
END

-- Step 2: Change the data type of UserID to VARCHAR(100)
ALTER TABLE Users
ALTER COLUMN UserID VARCHAR(100) NOT NULL;

-- Step 3: Add a new primary key constraint
ALTER TABLE Users
ADD CONSTRAINT PK_Users_UserID PRIMARY KEY (UserID);
