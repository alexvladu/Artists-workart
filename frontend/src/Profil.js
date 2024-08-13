import React, {useState} from "react";
import { Container, Modal, Button, Form} from "react-bootstrap";
import { useParams } from 'react-router-dom';
import RenderCards from "./RenderCard";
import FileUpload from "./fileUpload";
const addStyle = ({
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: '4px',
    fontWeight: 'bold',
    backgroundColor: 'rgb(40, 167, 69)',
    color: 'white',
    marginTop: "15px",
    cursor:"pointer",
    userSelect:"none"
  });
function ProfilePage({LoggedIn, setLoggedIn, refreshKey, setRefreshKey}){
    const username=useParams().username;

    const [WorkArtTitle, setWorkArtTitle] = useState('');
    const [WorkArtDescription, setWorkArtDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('No file selected');
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('owner', localStorage.getItem("username"));
        formData.append('title', WorkArtTitle);
        formData.append('description', WorkArtDescription);
        fetch('http://localhost:3001/workart/add', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok)
                throw new Error('Response was not ok.');
            return response.json();
        })
        .then(result => {
              handleCloseModal();
              setRefreshKey(refreshKey+1);
        })
        .catch(error => {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
        });
    }
    return (
        <>
        <h1 style={{textAlign:'center'}} >Acesta este profilul lui {useParams().username}</h1>
        <Container>
            {
                username===localStorage.getItem("username")?
                <h1 style={addStyle} onClick={handleOpenModal}>Add WorkArt</h1>:null
            }
            {RenderCards(username, refreshKey, setRefreshKey, setLoggedIn)}
        </Container>
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add workArt</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control type="text" onChange={(e) => setWorkArtTitle(e.target.value)} placeholder="Title" required  />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" onChange={(e) => setWorkArtDescription(e.target.value)} placeholder="Description" required style={{marginTop:"10px"}} />
                    </Form.Group>
                    <Form.Group>
                        <FileUpload setSelectedFile={setSelectedFile} selectedFileName={selectedFileName} setSelectedFileName={setSelectedFileName}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{marginTop:"10px"}}>
                        Add
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    )
}
export default ProfilePage;