export interface Post {
  Content:string;
  ImageUrl: string;
  PostId: string;
  UserId: string;
}

export interface Comment {
  Content: string;
  CommentId: string;
  PostId: string;
  UserId: string;
}