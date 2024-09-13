
import { IBodyResponseGetAllPosts, BodyRequestCreatePost, BodyResponseCreatePost, BodyResponseUpdatePost, BodyResponseDeletePost, BodyrequestUpdatePost, Datum } from '../interfaces/post.interface';

const BASE_URL = 'https://simuate-test-backend-1.onrender.com/api/posts/1';


export const getAllPosts = async (): Promise<IBodyResponseGetAllPosts | null> => {
  try {
    const response = await fetch(`https://simuate-test-backend-1.onrender.com/api/posts/`, { method: 'GET' });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: IBodyResponseGetAllPosts = await response.json();
    return data; 
} catch (error) {
    console.error('Error fetching posts:', error);
    return null;
}
};

  export const createPost = async (post: BodyRequestCreatePost): Promise<BodyResponseCreatePost | null> => {
    try {
      const response = await fetch('https://simuate-test-backend-1.onrender.com/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data: BodyResponseCreatePost = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating post:', error);
      return null;
    }
  };
  export const updatePost = async (id: number, post: BodyrequestUpdatePost): Promise<BodyResponseUpdatePost | null> => {
    try {
      const response = await fetch(`https://simuate-test-backend-1.onrender.com/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data: BodyResponseUpdatePost = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating post:', error);
      return null;
    }
  };
  export const deletePost = async (id: string): Promise<BodyResponseDeletePost | null> => {
    try {
      const response = await fetch(`https://simuate-test-backend-1.onrender.com/api/posts/${id}`, { method: 'DELETE' });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data: BodyResponseDeletePost = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting post:', error);
      return null;
    }
  };