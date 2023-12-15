import joi from "joi";

export const validateComment = joi.object().keys({
  Content: joi.string().required(),
  UserId: joi.string().uuid().required(),
  PostId: joi.string().required(),
});

export const validateUpdateComment = joi.object().keys({
  PostId: joi.string().required(),
  Content: joi.string().required(),
  UserId: joi.string().required(),
  CommentId: joi.string().required(),
});

export const validateCommentId = joi.object().keys({
  CommentId: joi.string().min(8).required(),
});