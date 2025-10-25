'use client';

import { useEffect, useState } from 'react';

export default function CategoryPageClient({ name, token }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      console.warn("No token found — user not authenticated");
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        console.log("Fetched Posts from API:", data);
        const filteredPosts = data.posts.filter((post) => post.category.name.toLowerCase() === name.toLowerCase());
        console.log("Fetched Posts Data:", filteredPosts);
        setPosts(filteredPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [name, token]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Posts in Category: {name}</h1>
      {posts.length === 0 ? (
        <p>No posts found in this category.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.caption}</h2>
            <p>Category: {post.category.name}</p>
          </div>
        ))
      )}
    </div>
  );
}
