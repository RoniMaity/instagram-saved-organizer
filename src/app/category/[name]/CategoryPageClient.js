'use client';

import { useEffect, useState } from 'react';
import { AbsoluteCenter, Box, Highlight, Heading, Stack } from '@chakra-ui/react';
import { upperFirst } from 'lodash';
import Video from '@/components/VideoComponent';
import Image from '@/components/ImageComponent';
import SideCar from '@/components/SideCarComponent';
import Loading from '@/components/Loading'

export default function CategoryPageClient({ name, token }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const namee = upperFirst(name);

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

  if (loading) return (
    <AbsoluteCenter suppressHydrationWarning={true} >
      <Loading />
    </AbsoluteCenter>
  )

  return (
    <AbsoluteCenter w="full" h="full">
      <Stack spacing={6} w="full" maxW="4xl">
        <Heading size="6xl">
          Category:
          <Highlight query={namee} styles={{ color: "teal.600" }}>
            {" " + namee}
          </Highlight>
        </Heading>

        {posts.length === 0 ? (
          <Heading size="2xl">
            Nothing in
            <Highlight query={namee} styles={{ color: "teal.600" }}>
              {" " + namee + " "}
            </Highlight>
            category
          </Heading>
        ) : (
          <Box
            maxH="70vh"      // Scrollable container height
            overflowY="auto" // Enable vertical scrolling
            p={2}
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
          >
            <Stack spacing={6}>
              {posts.map((post) => {
                if (post.postType.toLowerCase() === "video") {
                  return <Video key={post.id} post={post} />;
                } else if (post.postType.toLowerCase() === "image") {
                  return <Image key={post.id} post={post} alt="image" />;
                } else {
                  return <SideCar key={post.id} post={post} />;
                }
              })}
            </Stack>
          </Box>
        )}
      </Stack>
    </AbsoluteCenter>
  );
};