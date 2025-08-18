import { Button, Label, TextInput, Select } from "flowbite-react";
import { useNavigate } from "react-router";
import { useState } from "react";

const AuthRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const role = (form.elements.namedItem("role") as HTMLSelectElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const res = await fetch("https://afaw-beta-api.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, role, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful! Please login.");
        navigate("/auth/login"); // redirect to login page
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="name" value="Name" />
          <TextInput
            id="name"
            name="name"
            type="text"
            sizing="md"
            required
            className="form-control form-rounded-xl"
            placeholder="Test User"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="email" value="Email Address" />
          <TextInput
            id="email"
            name="email"
            type="email"
            sizing="md"
            required
            className="form-control form-rounded-xl"
            placeholder="test@email.com"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="role" value="Role" />
          <Select
            id="role"
            name="role"
            required
            className="form-control form-rounded-xl"
            defaultValue="user"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Select>
        </div>

        <div className="mb-6">
          <Label htmlFor="password" value="Password" />
          <TextInput
            id="password"
            name="password"
            type="password"
            sizing="md"
            required
            className="form-control form-rounded-xl"
            placeholder="123456"
          />
        </div>

        <Button
          color={"primary"}
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </>
  );
};

export default AuthRegister;
