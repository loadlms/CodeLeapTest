import axios from 'axios';
import { Post, CreatePostData, UpdatePostData } from '../types/post';

const api = axios.create({
  baseURL: 'https://dev.codeleap.co.uk/careers/',
});

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>('');
  return response.data;
};

export const createPost = async (data: CreatePostData): Promise<Post> => {
  const response = await api.post<Post>('', data);
  return response.data;
};

export const updatePost = async (id: number, data: UpdatePostData): Promise<Post> => {
  const response = await api.patch<Post>(`${id}/`, data);
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`${id}/`);
}; 