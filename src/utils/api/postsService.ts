import axios from "axios";

const API_URL = "https://afaw-beta-api.onrender.com/api/posts";


// GET all Posts
export const fetchPosts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// GET a single Post by ID
export const fetchPostById = async (id: number) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// CREATE a Post
export const createPost = async (formData: FormData) => {
  const res = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// UPDATE a Post
export const updatePost = async (id: number, formData: FormData) => {
  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// DELETE a Post
export const deletePost = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
