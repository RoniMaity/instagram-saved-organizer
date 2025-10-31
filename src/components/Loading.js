import { Spinner, Center, Box } from "@chakra-ui/react"


const loading = () => {
    return (
        <Box pos="absolute" inset="0" bg="bg/80">
            <Center h="full">
                <Spinner color="teal.500" size='xl' />
            </Center>
        </Box>
    )
}

export default loading;