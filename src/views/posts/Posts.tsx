// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from "react";
import CardBox from "../../components/shared/CardBox";
import { Modal, Button, TextInput, Label, Select } from "flowbite-react";
import { TbEdit, TbTrash, TbEyeOff } from "react-icons/tb";

const Posts = () => {
  const [showModal, setShowModal] = useState(false);

  const posts = [
    {
      id: 3,
      title: "Veniam veniam volu",
      slug: null,
      content: "Laboriosam deserunt",
      type: "news",
      image_url:
        "https://res.cloudinary.com/dz3tgvaiw/image/upload/v1754656865/posts/1754689190631-sign.PNG.png",
      created_at: "2025-08-08T12:41:06.303Z",
    },
    {
      id: 2,
      title: "Sed deserunt minus v",
      slug: null,
      content: "Sapiente id fugit v",
      type: "news",
      image_url:
        "https://res.cloudinary.com/dz3tgvaiw/image/upload/v1754656666/posts/1754688990754-afaw-logo-black.png.png",
      created_at: "2025-08-08T12:37:47.350Z",
    },
  ];

  return (
    <CardBox>
      <div className="flex justify-between items-center mb-6">
        <h5 className="card-title">Manage Posts</h5>
        <Button onClick={() => setShowModal(true)}>Create New Post</Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-4 relative"
          >
            <img
              src={post.image_url}
              alt={post.title}
              className="rounded-md mb-4 w-full h-48 object-cover"
            />
            <h5 className="text-lg font-semibold mb-2">{post.title}</h5>
            <p className="text-sm mb-2">{post.content}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-darklink">
                {new Date(post.created_at).toLocaleString()}
              </span>
              <div className="flex gap-2">
                <TbEdit className="text-blue-600 cursor-pointer" size={20} />
                <TbTrash className="text-red-600 cursor-pointer" size={20} />
                <TbEyeOff className="text-gray-600 cursor-pointer" size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Post Modal */}
      <Modal show={showModal} size="4xl" onClose={() => setShowModal(false)}>
        <Modal.Header>Publish New Post</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
              <div>

                <TextInput className="rounded-sm" id="title" placeholder="Enter title" required />
              </div>

              <div>
                <Select id="type" required>
                  <option>Post Type</option>
                  <option>Article</option>
                  <option>News</option>
                  <option>Project</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="image_file" value="Image File" />
                <input
                  type="file"
                  id="image_file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 focus:outline-none"
                  required
                />
              </div>

            </div>
            <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">

              <div>

                <textarea
                  id="content"
                  placeholder="Enter post content"
                  required
                  className="block w-full rounded-sm border border-gray-300 text-sm text-gray-900 bg-gray-50 focus:outline-none"
                  rows={8}
                />
              </div>




            </div>
            <div className="col-span-12 flex gap-3">
              <Button color="primary">Publish Post</Button>
              <Button color="failure" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </CardBox>
  );
};

export default Posts;
