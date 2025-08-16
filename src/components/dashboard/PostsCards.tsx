import { Badge } from "flowbite-react";
import { Icon } from "@iconify/react";
import { Link } from "react-router";

// Example data (replace with API fetch)
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
    updated_at: "2025-08-08T12:41:06.303Z",
  },
  {
    id: 2,
    title: "Sed deserunt minus v",
    slug: null,
    content: "Sapiente id fugit v",
    type: "project",
    image_url:
      "https://res.cloudinary.com/dz3tgvaiw/image/upload/v1754656666/posts/1754688990754-afaw-logo-black.png.png",
    created_at: "2025-08-08T12:37:47.350Z",
    updated_at: "2025-08-08T12:37:47.350Z",
  },
];

const PostCards = () => {
  // Dummy handlers
  const handleEdit = (id: number) => {
    console.log("Edit post:", id);
  };
  const handleDelete = (id: number) => {
    console.log("Delete post:", id);
  };
  const handleHide = (id: number) => {
    console.log("Hide post:", id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {posts.map((post) => (
        <div className="lg:col-span-4 col-span-12" key={post.id}>
          <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray overflow-hidden">
            {/* Image */}
            <div className="relative">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <Badge
                color={"info"}
                className="absolute top-3 left-3 capitalize"
              >
                {post.type}
              </Badge>
            </div>

            {/* Content */}
            <div className="px-6 pb-4">
              <h5 className="text-lg font-semibold mt-4 mb-2 line-clamp-2">
                {post.title}
              </h5>
              <p className="text-sm text-gray-500 line-clamp-3">
                {post.content}
              </p>

              {/* Footer with actions */}
              <div className="flex items-center mt-4">
                <span className="text-xs text-gray-400">
                  {formatDate(post.created_at)}
                </span>
                <div className="flex gap-3 ms-auto text-gray-500">
                  <button
                    onClick={() => handleEdit(post.id)}
                    className="hover:text-blue-600"
                    title="Edit"
                  >
                    <Icon icon="solar:pen-2-outline" width="18" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="hover:text-red-600"
                    title="Delete"
                  >
                    <Icon icon="solar:trash-bin-trash-outline" width="18" />
                  </button>
                  <button
                    onClick={() => handleHide(post.id)}
                    className="hover:text-yellow-600"
                    title="Hide"
                  >
                    <Icon icon="solar:eye-closed-outline" width="18" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCards;
