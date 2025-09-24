// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState, useEffect } from 'react';
import CardBox from '../../components/shared/CardBox';
import { Modal, Button, TextInput, Label } from 'flowbite-react';
import { TbEdit, TbTrash, TbEyeOff } from 'react-icons/tb';

import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../../utils/api/projectsService';

type Project = {
  id: number;
  name: string;
  description: string;
  category?: string;
  donation_goal?: number;
  donation_raised?: number;
  cover_image?: string;
  media?: string[];
  created_at: string;
  updated_at: string | null;
  is_hidden: boolean;
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showHideConfirm, setShowHideConfirm] = useState(false);

  const [showViewModal, setShowViewModal] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const handleOpenView = (project: Project) => {
    setSelectedProject(project);
    setCurrentMediaIndex(0); // start slideshow at first image
    setShowViewModal(true);
  };

  const handlePrevMedia = () => {
    if (!selectedProject?.media) return;
    setCurrentMediaIndex((prev) => (prev === 0 ? selectedProject.media.length - 1 : prev - 1));
  };

  const handleNextMedia = () => {
    if (!selectedProject?.media) return;
    setCurrentMediaIndex((prev) => (prev === selectedProject.media.length - 1 ? 0 : prev + 1));
  };

  const handleSelectMedia = (index: number) => {
    setCurrentMediaIndex(index);
  };

  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // CREATE a Project
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      setLoadingBtn(true);

      // Send to backend
      const newProject = await createProject(formData);

      // Update local state
      setProjects((prev) => [...prev, newProject]);
      setShowCreateModal(false);
    } catch (err) {
      console.error('Error adding project:', err);
    } finally {
      loadProjects();
      setLoadingBtn(false);
    }
  };

  // UPDATE a Project
  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // ✅ Include media to remove
    if (selectedProject.mediaToRemove && selectedProject.mediaToRemove.length > 0) {
      selectedProject.mediaToRemove.forEach((url) => {
        formData.append('remove_media', url);
      });
    }

    try {
      setLoadingBtn(true);

      const updatedProject = await updateProject(selectedProject.id, formData);

      // Update local projects state
      setProjects((prev) => prev.map((p) => (p.id === selectedProject.id ? updatedProject : p)));

      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating project:', err);
    } finally {
      loadProjects();
      setLoadingBtn(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!selectedProject) return;
    try {
      setLoadingBtn(true);
      await deleteProject(selectedProject.id);
      setProjects((prev) => prev.filter((m) => m.id !== selectedProject.id));
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error('Error deleting project:', err);
    } finally {
      setLoadingBtn(false);
    }
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <CardBox>
      <div className="flex justify-between items-center mb-6">
        <h5 className="card-title">Manage Projects</h5>
        <Button onClick={() => setShowCreateModal(true)}>Create New Project</Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl shadow-md bg-white dark:bg-darkgray p-4 relative cursor-pointer hover:shadow-lg transition"
            onClick={() => handleOpenView(project)} // opens the full-screen modal
          >
            {/* Cover Image */}
            {project.cover_image && (
              <img
                src={project.cover_image}
                alt={project.name}
                className="rounded-md mb-4 w-full h-48 object-cover"
              />
            )}

            <h5 className="text-lg font-semibold mb-2">{project.name}</h5>
            <p className="text-sm mb-2">{project.description}</p>

            {project.category && (
              <p className="text-xs text-gray-600 mb-2">Category: {project.category}</p>
            )}

            {project.donation_goal !== undefined && (
              <p className="text-sm font-bold mb-1">Goal: ${project.donation_goal}</p>
            )}
            {project.donation_raised !== undefined && (
              <p className="text-sm text-green-600 mb-2">Raised: ${project.donation_raised}</p>
            )}

            {project.media && project.media.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-2">
                {project.media.map((file, idx) => (
                  <img
                    key={idx}
                    src={file}
                    alt="media"
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}

            {/* Admin Actions */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <TbEdit
                  className="text-blue-600 cursor-pointer"
                  size={20}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent modal open
                    setSelectedProject(project);
                    setShowEditModal(true);
                  }}
                />
                <TbTrash
                  className="text-red-600 cursor-pointer"
                  size={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                    setShowDeleteConfirm(true);
                  }}
                />
                <TbEyeOff
                  className="text-gray-600 cursor-pointer"
                  size={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                    setShowHideConfirm(true);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      <Modal show={showCreateModal} size="4xl" onClose={() => setShowCreateModal(false)}>
        <Modal.Header>Create New Project</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddProject} className="grid grid-cols-12 gap-6">
            <div className="col-span-12 flex flex-col gap-4">
              {/* Title */}
              <div>
                <Label htmlFor="name" value="Title" />
                <TextInput id="name" name="name" placeholder="Enter project title" required />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" value="Description" />
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter project description"
                  required
                  className="block w-full rounded border border-gray-300 text-sm text-gray-900 bg-gray-50"
                  rows={3}
                />
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category" value="Category" />
                <TextInput id="category" name="category" placeholder="Enter category" />
              </div>

              {/* Donation Goal + Raised */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="donation_goal" value="Donation Goal" />
                  <TextInput
                    id="donation_goal"
                    name="donation_goal"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="donation_raised" value="Donation Raised" />
                  <TextInput
                    id="donation_raised"
                    name="donation_raised"
                    type="number"
                    step="0.01"
                    defaultValue={0}
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <Label htmlFor="cover_image" value="Cover Image" />
                <input
                  type="file"
                  id="cover_image"
                  name="cover_image"
                  accept="image/*"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50"
                />
              </div>

              {/* Media */}
              <div>
                <Label htmlFor="media" value="Media (Images / Videos)" />
                <input
                  type="file"
                  id="media"
                  name="media"
                  accept="image/*,video/*"
                  multiple
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50"
                />
              </div>
            </div>

            <div className="col-span-12 flex gap-3">
              <Button type="submit" color="primary" isProcessing={loadingBtn}>
                Create Project
              </Button>
              <Button color="failure" onClick={() => setShowCreateModal(false)}>
                Close
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} size="4xl" onClose={() => setShowEditModal(false)}>
        <Modal.Header>Update Project</Modal.Header>
        <Modal.Body>
          {selectedProject && (
            <form onSubmit={handleUpdateProject} className="grid grid-cols-12 gap-6">
              <div className="col-span-12 flex flex-col gap-4">
                {/* Title */}
                <TextInput id="name" name="name" defaultValue={selectedProject.name} required />

                {/* Description */}
                <textarea
                  id="description"
                  name="description"
                  defaultValue={selectedProject.description}
                  required
                  className="block w-full rounded border border-gray-300 text-sm text-gray-900 bg-gray-50"
                  rows={3}
                />

                {/* Category */}
                <TextInput
                  id="category"
                  name="category"
                  defaultValue={selectedProject.category || ''}
                />

                {/* Donation Goal / Raised */}
                <div className="grid grid-cols-2 gap-4">
                  <TextInput
                    id="donation_goal"
                    name="donation_goal"
                    type="number"
                    step="0.01"
                    defaultValue={selectedProject.donation_goal ?? 0}
                  />
                  <TextInput
                    id="donation_raised"
                    name="donation_raised"
                    type="number"
                    step="0.01"
                    defaultValue={selectedProject.donation_raised ?? 0}
                  />
                </div>

                {/* Cover Image */}
                <div>
                  <Label htmlFor="cover_image" value="Replace Cover Image" />
                  <input
                    type="file"
                    id="cover_image"
                    name="cover_image"
                    accept="image/*"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50"
                  />
                  <small className="text-gray-500">Leave blank to keep current cover image.</small>
                </div>

                {/* Existing Media Preview */}
                {selectedProject.media && selectedProject.media.length > 0 && (
                  <div className="mb-2">
                    <Label value="Current Media" />
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.media.map((file: string, idx: number) => (
                        <div key={idx} className="relative">
                          <img src={file} alt="media" className="w-20 h-20 object-cover rounded" />
                          <button
                            type="button"
                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                            onClick={() => {
                              // Track removed media
                              setSelectedProject((prev: any) => {
                                const removed = prev.mediaToRemove ?? [];
                                return {
                                  ...prev,
                                  media: prev.media.filter((m: string) => m !== file),
                                  mediaToRemove: [...removed, file],
                                };
                              });
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add New Media */}
                <div>
                  <Label htmlFor="media" value="Add New Media (Images / Videos)" />
                  <input
                    type="file"
                    id="media"
                    name="media"
                    accept="image/*,video/*"
                    multiple
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="col-span-12 flex gap-3">
                <Button type="submit" color="primary" isProcessing={loadingBtn}>
                  Update Project
                </Button>
                <Button color="failure" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Modal.Body>
      </Modal>

      {showViewModal && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6">
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-5xl h-[90vh] flex flex-col sm:flex-row overflow-hidden">
            {/* Close Button Top-Right */}
            <button
              onClick={() => setShowViewModal(false)}
              className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center z-20"
            >
              ×
            </button>

            {/* Left Column - Text Info */}
            <div className="w-full sm:w-1/2 p-4 sm:p-6 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">{selectedProject.name}</h2>
              <p className="mb-4">{selectedProject.description}</p>

              {selectedProject.category && (
                <p className="mb-2 text-sm text-gray-600">
                  <span className="font-semibold">Category:</span> {selectedProject.category}
                </p>
              )}

              {selectedProject.donation_goal !== undefined && (
                <p className="mb-1 text-sm font-semibold">Goal: ${selectedProject.donation_goal}</p>
              )}
              {selectedProject.donation_raised !== undefined && (
                <p className="mb-4 text-sm text-green-600">
                  Raised: ${selectedProject.donation_raised}
                </p>
              )}

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto w-full pb-2">
                {[
                  ...(selectedProject.cover_image ? [selectedProject.cover_image] : []),
                  ...(selectedProject.media || []),
                ].map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`thumb-${idx}`}
                    className={`w-16 h-16 object-cover rounded cursor-pointer border-2 flex-shrink-0 ${
                      idx === currentMediaIndex ? 'border-blue-500' : 'border-transparent'
                    }`}
                    onClick={() => setCurrentMediaIndex(idx)}
                  />
                ))}
              </div>
            </div>

            {/* Right Column - Media Slider */}
            <div className="w-full sm:w-1/2 p-4 sm:p-6 flex flex-col items-center bg-gray-50 overflow-y-auto">
              {[
                ...(selectedProject.cover_image ? [selectedProject.cover_image] : []),
                ...(selectedProject.media || []),
              ].length > 0 && (
                <div className="flex flex-col items-center w-full">
                  {/* Main Image */}
                  <div className="relative w-full h-64 sm:h-80 mb-4 flex items-center justify-center flex-shrink-0">
                    <button
                      className="absolute left-2 text-white bg-black bg-opacity-50 p-2 rounded-full z-10"
                      onClick={handlePrevMedia}
                    >
                      ‹
                    </button>

                    <img
                      src={
                        [
                          ...(selectedProject.cover_image ? [selectedProject.cover_image] : []),
                          ...(selectedProject.media || []),
                        ][currentMediaIndex]
                      }
                      alt={`media-${currentMediaIndex}`}
                      className="max-h-full max-w-full object-contain rounded"
                    />

                    <button
                      className="absolute right-2 text-white bg-black bg-opacity-50 p-2 rounded-full z-10"
                      onClick={handleNextMedia}
                    >
                      ›
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <Modal show={showDeleteConfirm} size="md" onClose={() => setShowDeleteConfirm(false)}>
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the project "{selectedProject?.name}"?</p>
          <div className="mt-4 flex gap-3">
            <Button color="failure" onClick={handleDeleteProject} isProcessing={loadingBtn}>
              Yes, Delete
            </Button>
            <Button color="gray" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Hide Modal */}
      <Modal show={showHideConfirm} size="md" onClose={() => setShowHideConfirm(false)}>
        <Modal.Header>Confirm Hide</Modal.Header>
        <Modal.Body>
          <p>Do you want to hide the project "{selectedProject?.name}" from public view?</p>
          <div className="mt-4 flex gap-3">
            <Button
              color="warning"
              onClick={() => {
                /* TODO: call handleHideProject() */
              }}
            >
              Yes, Hide
            </Button>
            <Button color="gray" onClick={() => setShowHideConfirm(false)}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </CardBox>
  );
};

export default Projects;
