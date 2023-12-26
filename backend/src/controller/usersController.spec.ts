import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { execute, query } from "../dbhelpers/dbHelper";

import {
  registerUser,
  loginUser,
  toggleFollowUser,
} from "./usersController";

jest.mock("../helpers/dbHelper", () => ({
  execute: jest.fn(),
  query: jest.fn(),
}));

describe("user controller", () => {
  //REGISTER A USER
  it("should register a user", async () => {
    // Arrange
    const req: any = {
      body: {
        Email: "janedoe@gmail.com",
        fullname: "Jane Doe",
        username: "janedoe123",
        password: "12345678",
      },
    } as any;

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    // Mock the hashPass function to return a mock password
    jest
      .spyOn(bcrypt, "hash")
      .mockResolvedValueOnce("HashedPass@word123" as never);

    // Mock the execute function to simulate a successful registration
    (execute as jest.Mock).mockResolvedValue({});

    // Act
    await registerUser(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "user registered successfully",
    });
  });
});

describe("loginUser", () => {
  it("should login a user", async () => {
    // Arrange
    const reqLogin: any = {
      body: {
        email: "devngecu@gmail.com",
        password: "12345678",
      },
    };

    const resLogin: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    
    jest.spyOn(bcrypt, "compare");

   
    (execute as jest.Mock).mockResolvedValueOnce({
      recordset: [
        {
          // id: "123",
          email: "devngecu@gmail.com",
          password: "hashedPassword",
        },
      ],
    });

    
    jest.spyOn(jwt, "sign").mockReturnValueOnce("mockToken" as never);

    // Act
    await loginUser(reqLogin, resLogin);

    // Assert
    expect(resLogin.status).toHaveBeenCalledWith(200);
    expect(resLogin.json).toHaveBeenCalledWith({
      message: "Logged in successfully",
      token: "mockToken",
    });
  });

  it("should handle login failure - incorrect password", async () => {
    // Arrange
    const reqLogin: any = {
      body: {
        email: "devngecu@gmail.com",
        password: "wrongPassword",
      },
    };

    const resLogin: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the bcrypt compare function to simulate incorrect password
    jest.spyOn(bcrypt, "compare");

    // Mock the execute function to simulate a user found
    (execute as jest.Mock).mockResolvedValueOnce({
      recordset: [
        {
          // id: "123",
          email: "crispinmanda@gmail.com",
          password: "hashedPassword",
        },
      ],
    });

    // Act
    await loginUser(reqLogin, resLogin);

    // Assert
    expect(resLogin.status).toHaveBeenCalledWith(401);
    expect(resLogin.json).toHaveBeenCalledWith({
      message: "Incorrect password",
    });
  });

  it("should handle login failure - email not found", async () => {
    // Arrange
    const reqLogin: any = {
      body: {
        email: "nonexistent@gmail.com",
        password: "12345678",
      },
    };

    const resLogin: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the execute function to simulate no user found
    (execute as jest.Mock).mockResolvedValueOnce({
      recordset: [],
    });

    // Act
    await loginUser(reqLogin, resLogin);

    // Assert
    expect(resLogin.status).toHaveBeenCalledWith(401);
    expect(resLogin.json).toHaveBeenCalledWith({
      message: "Email not found",
    });
  });
});

describe("updates user", () => {
  it("should update user details successfully", async () => {
    const req: any = {
      body: {
        userID: "user123",
        fullname: "Robin Ngecu",
        profileUrl: "http://example.com/avatar.jpg",
        profileCaption: "I am a web developer",
      },
    };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

   

    //  expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "User updated successfully",
    });
  });

  it("should fails to update user details successfully", async () => {
    const req: any = {
      body: {
        //  userID: "user123",
        //  fullname: "Robin Ngecu",
        //  profileUrl: "http://example.com/avatar.jpg",
        //  profileCaption: "I am a web developer",
      },
    };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

   

    //  expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid request",
      details:
        "Both userID, profileUrl,profileCaption and fullname are required for updating user details.",
    });
  });
});

