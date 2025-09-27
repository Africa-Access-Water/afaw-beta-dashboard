import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/projects`;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return {
    Authorization: user?.token ? `Bearer ${user.token}` : "",
  };
};

// GET all Projects
export const fetchProjects = async () => {
  const res = await axios.get(API_URL, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// GET a single Project by ID
export const fetchProjectById = async (id: number) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};
