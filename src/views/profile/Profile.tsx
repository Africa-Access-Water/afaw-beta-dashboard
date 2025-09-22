
// import { useState, useEffect } from "react";
// import { getCurrentUser } from "../../utils/api/authService"; 
// import { useNavigate } from "react-router-dom";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   avatar_url: string;
// }

// export default function ProfilePage() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const data = await getCurrentUser();
//         setUser(data.user);
//         console.log(data)
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//         setError("Failed to load profile. Please log in again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);console.log(user)


//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-full">
//         <p className="text-gray-500">Loading profile...</p>
//       </div>
//     );
//   }

//   if (error || !user) {
//     return (
//       <div className="flex flex-col justify-center items-center h-full space-y-4">
//         <p className="text-red-600">{error || "User not found"}</p>
//         <button
//           onClick={() => navigate("/login")}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           Go to Login
//         </button>
//       </div>
//     );
//   }

//   return (
//     <main className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
//         {/* <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//         >
//           LogOut
//         </button> */}
//       </div>

//       {/* Profile Card */}
//       <div className="bg-white shadow rounded-2xl p-6 flex flex-col md:flex-row gap-6">
//         <div className="flex-shrink-0">
//           <img
//             src={user.avatar_url || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
//             alt="avatar"
//             className="w-32 h-32 rounded-full border"
//           />
//         </div>

//         <div className="flex-1 space-y-3">
//           <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//             {/* <User size={20} /> {user.name} */} {user.name} 
//           </h2>
//           <p className="text-gray-600 capitalize">{user.role}</p>

//           <div className="flex flex-col gap-2 text-gray-700">
//             <p className="flex items-center gap-2">
//               {/* <Mail size={16} /> */}
//                {user.email}
//             </p>
           
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


import { useState, useEffect } from "react";
import { getCurrentUser } from "../../utils/api/authService";
import { useNavigate } from "react-router-dom";
import { HiOutlinePencil, HiOutlineKey, HiOutlineHome, HiOutlineLogout } from "react-icons/hi"; // Flowbite/React Icons

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
        console.log(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please log in again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col justify-center items-center h-full space-y-4">
        <p className="text-red-600">{error || "User not found"}</p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <main className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow rounded-2xl p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            src={
              user.avatar_url ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="avatar"
            className="w-32 h-32 rounded-full border"
          />
        </div>

        <div className="flex-1 space-y-3">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {user.name}
          </h2>
          <p className="text-gray-600 capitalize">{user.role}</p>

          <div className="flex flex-col gap-2 text-gray-700">
            <p className="flex items-center gap-2">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate("/posts")}
            className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            <HiOutlinePencil className="w-5 h-5" /> Manage Posts
          </button>
          <button
            onClick={() => navigate("/donations")}
            className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-yellow-600 transition"
          >
            <HiOutlineKey className="w-5 h-5" /> Donations
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-800 transition"
          >
            <HiOutlineHome className="w-5 h-5" /> Dashboard
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
          >
            <HiOutlineLogout className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>
    </main>
  );
}
