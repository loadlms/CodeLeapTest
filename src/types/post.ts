export interface Post {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

export interface CreatePostData {
  username: string;
  title: string;
  content: string;
}

export interface UpdatePostData {
  title: string;
  content: string;
} 