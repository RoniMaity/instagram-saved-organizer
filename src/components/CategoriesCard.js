import { Button, Card } from "@chakra-ui/react"
import { kebabCase } from 'lodash';
import { redirect } from "next/navigation";


const CategoriesCard = ({ category}) => {

    const handleViewPosts = () => {
        redirect(`/category/${kebabCase(category)}`);
    };

    return (
        <Card.Root width="320px">
            <Card.Body gap="2">
                <Card.Title mt="2">{category}</Card.Title>
                <Card.Description>
                    View all posts under the {category} category.
                </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                <Button variant="outline" onClick={handleViewPosts} >View Posts Saved</Button>
            </Card.Footer>
        </Card.Root>
    )
}

export default CategoriesCard;