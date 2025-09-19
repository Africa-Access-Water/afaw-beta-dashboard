import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/teams`;


// Helper to get auth header
const getAuthHeader = () => {
  const userData = localStorage.getItem("user");
  if (!userData) return {};

  try {
    const parsed = JSON.parse(userData);
    return {
      Authorization: `Bearer ${parsed.token}`,
    };
  } catch {
    return {};
  }
};


// GET all team members
export const fetchTeamMembers = async () => {
  const res = await axios.get(API_URL, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// GET a single team member by ID
export const fetchTeamMemberById = async (id: number) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// CREATE a team member
export const createTeamMember = async (formData: FormData) => {
  const res = await axios.post(API_URL, formData, {
    headers: {
      ...getAuthHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// UPDATE a team member
export const updateTeamMember = async (id: number, formData: FormData) => {
  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      ...getAuthHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// DELETE a team member
export const deleteTeamMember = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};
