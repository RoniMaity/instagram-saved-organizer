'use client'

import { Box, Image } from "@chakra-ui/react"

export default function ImageComponent({ post }) {
  const image = post.media?.[0]
  if (!image) return null

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
      <Image
        src={image.url}
        alt={post.caption || "Instagram post"}
        borderRadius="xl"
        maxH="600px"
        objectFit="contain"
      />
    </Box>
  )
}
