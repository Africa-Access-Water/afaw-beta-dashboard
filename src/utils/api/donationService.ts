import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/donations`;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return {
    Authorization: user?.token ? `Bearer ${user.token}` : "",
  };
};

// GET all Donations (includes both one-time donations and subscriptions)
export const fetchDonations = async () => {
  const res = await axios.get(API_URL, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// GET all Donors
export const fetchDonors = async () => {
  const res = await axios.get(`${API_URL}/donors`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// GET donations by donor ID
export const fetchDonationsByDonor = async (donorId: number) => {
  const res = await axios.get(`${API_URL}/donor/${donorId}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// GET project with donations
export const fetchProjectWithDonations = async (projectId: number) => {
  const res = await axios.get(`${API_URL}/project/${projectId}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};
