import React, { useState, useEffect } from 'react';
import { Badge } from 'flowbite-react';
import { fetchPosts } from '../../utils/api/postsService';

type Post = {
  id: number;
  title: string;
  slug: string | null;
  content: string;
  type: string;
  image_url: string;
  created_at: string;
  updated_at: string | null;
  is_hidden: boolean;
};

const PostCards = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching team:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {posts.map((post) => (
        <div className="lg:col-span-4 col-span-12" key={post.id}>
          <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray overflow-hidden">
            {/* Image */}
            <div className="relative">
              <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover" />
              <Badge color={'info'} className="absolute top-3 left-3 capitalize">
                {post.type}
              </Badge>
            </div>

            {/* Content */}
            <div className="px-6 pb-4">
              <h5 className="text-lg font-semibold mt-4 mb-2 line-clamp-2">{post.title}</h5>
              <p className="text-sm text-gray-500 line-clamp-3">{post.content}</p>

              {/* Footer with actions */}
              <div className="flex items-center mt-4">
                <span className="text-xs text-gray-400">{formatDate(post.created_at)}</span>
                <div className="flex gap-3 ms-auto text-gray-500"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCards;
