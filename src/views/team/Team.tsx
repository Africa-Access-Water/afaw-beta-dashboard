// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from "react";
import CardBox from "../../components/shared/CardBox";
import { Modal, Button, TextInput, Label, Select } from "flowbite-react";
import { TbEdit, TbTrash, TbEyeOff } from "react-icons/tb";

const Team = () => {
  const [showModal, setShowModal] = useState(false);

  const teamMembers = [
    {
      id: 4,
      type: "Volunteer",
      full_name: "Aniket Chopade",
      title: "Mr.",
      socials: "https://www.linkedin.com/in/achopade",
      position: "Software and Web developer",
      image_url:
        "https://res.cloudinary.com/dz3tgvaiw/image/upload/v1754943779/teams/1754943775461-aaaa.JPG.jpg",
      bio: "",
      created_at: "2025-08-11T20:23:00.303Z",
    },
    {
      id: 3,
      type: "Volunteer",
      full_name: "Bupe Katongo",
      title: "Mr",
      socials: "https://web.facebook.com/profile.php?id=100092203206527",
      position: "Web Developer",
      image_url:
        "https://res.cloudinary.com/dz3tgvaiw/image/upload/v1754681924/teams/1754681904439-1.png.png",
      bio: "Grad School — Networking and Telecommunications Technology, Software engineering(Full stack developer) and Professional Graphic Design, Web Design and Freelancing Course",
      created_at: "2025-08-08T19:38:51.436Z",
    },
    {
      id: 2,
      type: "Volunteer",
      full_name: "Ifeoma Campos",
      title: "Deserunt cupiditate ",
      socials: "Quidem exercitation ",
      position: "Reprehenderit eius c",
      image_url:
        "https://res.cloudinary.com/dz3tgvaiw/image/upload/v1754659420/teams/1754691744023-afaw-logo-black.png.png",
      bio: "Enim consequuntur et",
      created_at: "2025-08-08T13:23:41.492Z",
    },
  ];

  return (
    <CardBox>
      <div className="flex justify-between items-center mb-6">
        <h5 className="card-title">Team Members</h5>
        <Button onClick={() => setShowModal(true)}>Add New Member</Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-4 relative"
          >
            <img
              src={member.image_url}
              alt={member.full_name}
              className="rounded-md mb-4 w-full h-48 object-cover"
            />
            <h5 className="text-lg font-semibold">{member.full_name}</h5>
            <p className="text-sm text-gray-600 dark:text-gray-300">{member.position}</p>
            {member.bio && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-3">
                {member.bio}
              </p>
            )}
            <div className="flex justify-between items-center mt-4">
              <a
                href={member.socials}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View Profile
              </a>
              <div className="flex gap-2">
                <TbEdit className="text-blue-600 cursor-pointer" size={20} />
                <TbTrash className="text-red-600 cursor-pointer" size={20} />
                <TbEyeOff className="text-gray-600 cursor-pointer" size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Member Modal */}
      <Modal
        show={showModal}
        size="4xl"
        onClose={() => setShowModal(false)}
        className="rounded-xl shadow-lg dark:bg-darkgray"
      >
        <Modal.Header className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Add New Team Member
        </Modal.Header>

        <Modal.Body>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
              <div>
                <Label htmlFor="full_name" value="Full Name" className="mb-1" />
                <TextInput
                  id="full_name"
                  placeholder="Enter full name"
                  className="rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-darkgray dark:text-gray-100"
                  required
                />
              </div>

              <div>
                <Label htmlFor="position" value="Position" className="mb-1" />
                <TextInput
                  id="position"
                  placeholder="Enter position"
                  className="rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-darkgray dark:text-gray-100"
                  required
                />
              </div>

              <div>
                <Label htmlFor="type" value="Type" className="mb-1" />
                <Select
                  id="type"
                  required
                  className="rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-darkgray dark:text-gray-100"
                >
                  <option>Volunteer</option>
                  <option>Staff</option>
                  <option>Manager</option>
                </Select>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
              <div>
                <Label htmlFor="socials" value="Social/Profile Link" className="mb-1" />
                <TextInput
                  id="socials"
                  placeholder="https://linkedin.com/in/username"
                  className="rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-darkgray dark:text-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="image_file" value="Profile Image" className="mb-1" />
                <input
                  type="file"
                  id="image_file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:bg-darkgray dark:text-gray-100 focus:outline-none p-2"
                />
              </div>

              <div>
                <Label htmlFor="bio" value="Bio" className="mb-1" />
                <textarea
                  id="bio"
                  placeholder="Enter biography"
                  className="block w-full rounded-md border border-gray-300 text-gray-900 dark:text-gray-100 dark:bg-darkgray focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
                  rows={4}
                />
              </div>
            </div>

            <div className="col-span-12 flex gap-3 mt-4">
              <Button color="primary" className="px-6 py-2 rounded-md">
                Submit
              </Button>
              <Button
                color="failure"
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-md"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </CardBox>
  );
};

export default Team;
