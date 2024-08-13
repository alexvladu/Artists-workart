import React from "react";
import { Container} from "react-bootstrap";
import RenderCards from "./RenderCard"

function HomePage(){
    return (
        <Container>
            {RenderCards()}
        </Container>
    )
}
export default HomePage;