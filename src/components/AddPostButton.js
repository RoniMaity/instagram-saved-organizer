import SavePost from "./SavePost"
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"


const AddPostButton = ({ newUrl, setNewUrl, handleSave }) => {
    return (
        <Dialog.Root size={{ mdDown: "full", md: "lg" }} placement={"center"}>
            <Dialog.Trigger asChild>
                <Button variant="outline" size="sm">
                    Add Post
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(10px)"/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <SavePost newUrl={newUrl} setNewUrl={setNewUrl} handleSave={handleSave} />
                    </Dialog.Content>
                </Dialog.Positioner>

            </Portal>
        </Dialog.Root>
    )
}

export default AddPostButton;
