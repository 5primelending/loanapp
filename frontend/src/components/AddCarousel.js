import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SummaryApi from "../common";


const AddCarousel = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    // Handle file selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); // Preview image before upload
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !image) {
            toast.error("Title and Image are required!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);

        try {
            const response = await fetch(SummaryApi.createCarousel.url, {
                method: SummaryApi.createCarousel.method,
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                toast.success("Carousel image added successfully!");
                setTimeout(() => navigate("/carousel"), 1500); // Redirect to carousel page
            } else {
                toast.error(result.message || "Failed to add image.");
            }
        } catch (error) {
            toast.error("Error uploading image.");
        }
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={12}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-left mb-4">Add New Carousel Image</h2>
                            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                <Row>
                                    <Col md={4}>
                                        <Form.Group controlId="title">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter title..."
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="image">
                                            <Form.Label>Upload Image</Form.Label>
                                            <Form.Control type="file" accept="image/*" onChange={handleImageChange} required />
                                            {preview && <img src={preview} alt="Preview" className="mt-3 img-thumbnail" />}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                    <Form.Label></Form.Label>
                                        <Button variant="primary" type="submit" className="w-100" style={{ marginTop: "36px" }}>
                                            Add Carousel
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};

export default AddCarousel;
