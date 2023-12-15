import joi from "joi";

export const validatePost = joi.object().keys({
  Content: joi.string(),
  ImageUrl: joi.string(),
  UserId: joi.string().required(),
});

export const validateUpdatePost = joi.object().keys({
  PostId: joi.string().required(),
  ImageUrl: joi.string().required(),
  UserId: joi.string().required(),
  Content: joi.string().required(),
});

export const validatePostId = joi.object().keys({
  PostId: joi.string().min(8).required(),
});