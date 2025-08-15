import axios from "axios";

const API_URL = "https://afaw-beta-api.onrender.com/api/teams";


// GET all team members
export const fetchTeamMembers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// GET a single team member by ID
export const fetchTeamMemberById = async (id: number) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// CREATE a team member
export const createTeamMember = async (formData: FormData) => {
  const res = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// UPDATE a team member
export const updateTeamMember = async (id: number, formData: FormData) => {
  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// DELETE a team member
export const deleteTeamMember = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
