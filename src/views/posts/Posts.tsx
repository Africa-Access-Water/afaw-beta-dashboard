// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from "react";
import CardBox from "../../components/shared/CardBox";
import { Modal, Button, TextInput, Label, Select } from "flowbite-react";
import { TbEdit, TbTrash, TbEyeOff } from "react-icons/tb";
import { posts } from "../../utils/data/PostsData";

const Posts = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showHideConfirm, setShowHideConfirm] = useState(false);

  const [selectedPost, setSelectedPost] = useState<any>(null);

  const handleEditClick = (post: any) => {
    setSelectedPost(post);
    setShowEditModal(true);
  };

  const handleDeleteClick = (post: any) => {
    setSelectedPost(post);
    setShowDeleteConfirm(true);
  };

  const handleHideClick = (post: any) => {
    setSelectedPost(post);
    setShowHideConfirm(true);
  };

  return (
    <CardBox>
      <div className="flex justify-between items-center mb-6">
        <h5 className="card-title">Manage Posts</h5>
        <Button onClick={() => setShowCreateModal(true)}>Create New Post</Button>
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
                <TbEdit
                  className="text-blue-600 cursor-pointer"
                  size={20}
                  onClick={() => handleEditClick(post)}
                />
                <TbTrash
                  className="text-red-600 cursor-pointer"
                  size={20}
                  onClick={() => handleDeleteClick(post)}
                />
                <TbEyeOff
                  className="text-gray-600 cursor-pointer"
                  size={20}
                  onClick={() => handleHideClick(post)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Post Modal */}
      <Modal show={showCreateModal} size="4xl" onClose={() => setShowCreateModal(false)}>
        <Modal.Header>Publish New Post</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
              <TextInput id="title" placeholder="Enter title" required />
              <Select id="type" required>
                <option>Post Type</option>
                <option>Article</option>
                <option>News</option>
                <option>Project</option>
              </Select>
              <div>
                <Label htmlFor="image_file" value="Image File" />
                <input
                  type="file"
                  id="image_file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50"
                  required
                />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
              <textarea
                id="content"
                placeholder="Enter post content"
                required
                className="block w-full rounded border border-gray-300 text-sm text-gray-900 bg-gray-50"
                rows={8}
              />
            </div>
            <div className="col-span-12 flex gap-3">
              <Button color="primary">Publish Post</Button>
              <Button color="failure" onClick={() => setShowCreateModal(false)}>
                Close Form
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit Post Modal */}
      <Modal show={showEditModal} size="4xl" onClose={() => setShowEditModal(false)}>
        <Modal.Header>Update your Post</Modal.Header>
        <Modal.Body>
          {selectedPost && (
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
                <TextInput
                  id="title"
                  defaultValue={selectedPost.title}
                  placeholder="Enter title"
                  required
                />
                <Select id="type" defaultValue={selectedPost.type} required>
                  <option>Article</option>
                  <option>News</option>
                  <option>Project</option>
                </Select>
                <div>
                  <Label htmlFor="image_file" value="Replace Image" />
                  <input
                    type="file"
                    id="image_file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50"
                  />
                  <small className="text-gray-500">
                    Leave blank to keep the current image.
                  </small>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
                <textarea
                  id="content"
                  defaultValue={selectedPost.content}
                  required
                  className="block w-full rounded border border-gray-300 text-sm text-gray-900 bg-gray-50"
                  rows={8}
                />
              </div>
              <div className="col-span-12 flex gap-3">
                <Button color="primary">Update Post</Button>
                <Button color="failure" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} size="md" onClose={() => setShowDeleteConfirm(false)}>
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the post "{selectedPost?.title}"?</p>
          <div className="mt-4 flex gap-3">
            <Button color="failure">Yes, Delete</Button>
            <Button color="gray" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Hide Confirmation Modal */}
      <Modal show={showHideConfirm} size="md" onClose={() => setShowHideConfirm(false)}>
        <Modal.Header>Confirm Hide</Modal.Header>
        <Modal.Body>
          <p>Do you want to hide the post "{selectedPost?.title}" from public view?</p>
          <div className="mt-4 flex gap-3">
            <Button color="warning">Yes, Hide</Button>
            <Button color="gray" onClick={() => setShowHideConfirm(false)}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </CardBox>
  );
};

export default Posts;
