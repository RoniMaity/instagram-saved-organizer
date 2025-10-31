'use client'

import { useState } from "react"
import { Box, Button, HStack, Image } from "@chakra-ui/react"

export default function SideCarComponent({ post }) {
  const [index, setIndex] = useState(0)
  const media = post.media || []
  console.log(post.media[0].url)

  if (media.length === 0) return null

  const next = () => setIndex((i) => (i + 1) % media.length)
  const prev = () => setIndex((i) => (i - 1 + media.length) % media.length)

  let current = media[index]

  return (
    <Box
      borderRadius="xl"
      overflow="hidden"
      boxShadow="lg"
      bg="gray.800"
      p={2}
      display="flex"
      flexDir="column"
      alignItems="center"
    >
      {current.type === "video" ? (
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
          <source src={current.url} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={current.url}
          alt={`Slide ${index + 1}`}
          borderRadius="xl"
          maxH="600px"
          objectFit="contain"
        />
      )}

      {media.length > 1 && (
        <HStack spacing={4} mt={3}>
          <Button onClick={prev} size="sm" colorScheme="teal" variant="outline">
            ◀ Prev
          </Button>
          <Button onClick={next} size="sm" colorScheme="teal" variant="outline">
            Next ▶
          </Button>
        </HStack>
      )}
    </Box>
  )
}
