
import { Input, InputGroup, AbsoluteCenter, Button, Stack, Heading, Highlight, ProgressCircle, Text, Box } from "@chakra-ui/react"

const SavePost = ({ newUrl, setNewUrl, handleSave }) => {
    return (
        <AbsoluteCenter  >
            <Stack spacing={10} >
                <Box>
                    <Heading size="6xl" letterSpacing="tight">
                        <Highlight query="Saved" styles={{ color: "teal.600" }}>
                            No Saved Post
                        </Highlight>
                    </Heading>
                </Box>
                <Text fontSize="md" color="fg.muted">
                    Paste the instagram post link to turn chaos into order
                </Text>

                <InputGroup>
                    <Input
                        placeholder="Paste Instagram URL"
                        value={newUrl}
                        onChange={e => setNewUrl(e.target.value)}
                    />
                </InputGroup>
                <Button colorScheme="blue" onClick={handleSave}>Save Post</Button>
            </Stack>
        </AbsoluteCenter>
    )
}

export default SavePost