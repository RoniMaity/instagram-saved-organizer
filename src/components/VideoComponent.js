'use client'

import { Box } from "@chakra-ui/react"

export default function VideoComponent({ post }) {
  const video = post.media?.[0]
  if (!video) return null

  return (
    <Box
      borderRadius="xl"
      overflow="hidden"
      boxShadow="lg"
      bg="gray.800"
      p={2}
      display="flex"
      justifyContent="center"
    >
      <video
        controls
        preload="metadata"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "16px",
          maxWidth: "700px",
          backgroundColor: "#000",
        }}
      >
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  )
}
