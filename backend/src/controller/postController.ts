import { Request, Response } from "express";
import { v4 } from "uuid";
import {validatePost,validatePostId,validateUpdatePost,} from "../validators/post";
import { Post, Comment } from "../interfaces/post";
import { execute, query } from "../dbhelpers/dbHelper";
import { validateComment, validateCommentId, validateUpdateComment } from "../validators/comments";
import dbHelper from "../dbhelpers/dbhelpers";

//CREATE POSTS
export const createPost = async (req: Request, res: Response) => {
  try {
    const { ImageUrl, Content, UserId } = req.body;

    const { error } = validatePost.validate(req.body);

    

    // console.log("Received request body:", req.body);


    if (error) {
      return res.status(400).json({ error: error });
    }

    const newPost: Post = {
      PostId: v4(),
      Content,
      ImageUrl,
      UserId,
    };

    const procedure = "createPost";
    const params = newPost;

    await execute(procedure, params);

    return res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error in createPost:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//GET ALL POSTS
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const procedureName = "getPosts";
    const result = await query(`EXEC ${procedureName}`);
    // console.log(result.recordset);

    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};

//UPDATE POSTS
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { PostId, UserId, Content, ImageUrl } = req.body;
    console.log(req.body);

    const { error } = validateUpdatePost.validate(req.body);

    console.log(error);

    if (error)
      return res.status(400).send({ error: "please input correct details" });

    const newProject: Post = {
      PostId,
      UserId,
      Content,
      ImageUrl,
    };

    const ProcedureName = "updatePost";
    const params = newProject;

    await execute(ProcedureName, params);

    return res.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Server Error",
    });
  }
};

//DELETE POST
export const deletePost = async (req: Request, res: Response) => {
  try {
    const PostId = req.params.ID;
    if (!PostId) return res.status(400).send({ error: "Id is required" });

    const { error } = validatePostId.validate({ PostId });

    if (error) return res.status(400).send({ error: "please input id" });

    const procedureName = "deletePost";
    await execute(procedureName, { PostId });

    res.status(201).send({ message: "post deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};

// //GET SINGLE POST
export const getSinglePost = async (req: Request, res: Response) => {
  try {
    const PostId = req.params.ID;
    console.log(PostId);

    if (!PostId) return res.status(400).send({ error: "Id is required" });

    const { error } = validatePostId.validate({ PostId });
    console.log(error);

    if (error) return res.status(400).send({ error: error.details[0].message });
    // console.log("hello");

    const procedureName = "getPostById";
    const result = await execute(procedureName, { PostId });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};

//CREATE COMMENT
export const createComment = async (req: Request, res: Response) => {
  try {
    const { Content, UserId, PostId } = req.body;

    const { error } = validateComment.validate(req.body);

    console.log(req.body);
    

    if (error)
      return res.status(400).send({ error:"hello" });

    const newcomment: Comment = {
      CommentId: v4(),
      Content,
      PostId,
      UserId,
    };

    const procedure = "addCommentAndUpdateCount";
    //"createComment";
    const params = newcomment;

    await execute(procedure, params);
    return res.send({ message: "Comment created successfully" });
  } catch (error) {
    console.log(error);
    res.send((error as Error).message);
  }
};



export const createComments = async (req: Request, res: Response) => {
  try {
    const { Content, UserId, PostId } = req.body;
    const CommentId = v4();
  
  console.log("This is the" + req.body);
  
    // Call the stored procedure to handle the comment creation
    const createCommentProcedure = "createComments";
    const createCommentParams = { CommentId, Content, PostId, UserId };

    const result = await execute(createCommentProcedure, createCommentParams);

    console.log("This is the", result);
    

    // Check the result from the stored procedure and send an appropriate response
    if (result && result.recordset.length !== 0) {
      console.log(result.recordset);
      
      const message = result.recordset[0].Message;

      if (message.includes("Comment created successfully")) {
        // Update the comments count in the corresponding post
       const updateCommentsQuery = `UPDATE Posts SET Comments = Comments + 1 WHERE PostId = '${PostId}'`;
       await dbHelper.execute(updateCommentsQuery);


        return res.status(200).json({ message });
      }

      return res.status(500).json({ error: message });
    } else {
      return res
        .status(500)
        .json({ error: "Failed to process the comment creation" });
    }
  } catch (error) {
    console.error("Error in createComment:", error);
    return res.status(500).json({ error: error });
  }
};



export const updateComment = async (req: Request, res: Response) => {
  try {
    const { PostId, UserId, Content, CommentId } = req.body;
    console.log(req.body);

    const { error } = validateUpdateComment.validate(req.body);

    console.log(error);

    if (error)
      return res.status(400).send({ error:error });

    const newProject: Comment = {
      PostId,
      UserId,
      Content,
      CommentId,
    };

    const ProcedureName = "updateComment";
    const params = newProject;

    await execute(ProcedureName, params);

    return res.status(200).send({ message: "Comment updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Server Error",
    });
  }
};

//GET ALL COMMENTS
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const procedureName = "getComments";
    const result = await query(`EXEC ${procedureName}`);
    // console.log(result.recordset);
    
    

    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: error });
  }
};

//GET ALL COMMENTS USING POSTID
export const getPostComments = async (req: Request, res: Response) => {
  try {
    const PostId = req.params.ID;
    console.log(PostId);

    if (!PostId) return res.status(400).send({ error: "Id is required" });

    const { error } = validatePostId.validate({ PostId });
    console.log(error);

    if (error) return res.status(400).send({ error: error.details[0].message });
    // console.log("hello");

    const procedureName = "getAllComments";
    const result = await execute(procedureName, { PostId });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};




