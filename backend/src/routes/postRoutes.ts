import Router from "express";

import { verifyToken } from "../middleware/verifyToken";
import { createComment,
     createPost,
      //deleteComment,
       deletePost, 
      getAllComments, 
      // getAllComments, 
       getAllPosts,
       // getPostComments, 
        getSinglePost, 
        updateComment, 
        //updateComment, 
        updatePost } from "../controller/postController";


const post_router = Router();

post_router.post("/create", createPost);
post_router.get("/single/:ID", getSinglePost);
post_router.get("/Allposts", getAllPosts)
post_router.put("/update", updatePost);
post_router.delete("/delete/:ID", deletePost);
post_router.post("/createcomment", createComment)
post_router.put("/updatecomment", updateComment)
 post_router.get("/allcomments", verifyToken, getAllComments)

// post_router.delete("/deletecomment/:ID", deleteComment)
// post_router.get("/getcomments/:ID", verifyToken, getPostComments)

export default post_router;