import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CarouselTable.css"; // Add styles
import { Link } from "react-router-dom";
import SummaryApi from "../common";

const CarouselTable = () => {
    const [loggedInUser] = useState(() => localStorage.getItem("loggedInUser") || "User");
    const [carouselItems, setCarouselItems] = useState([]);

    // Fetch carousel data from API
    useEffect(() => {
        fetchCarousel();
    }, []);

    const fetchCarousel = async () => {
        try {
            const response = await fetch(SummaryApi.getCarousels.url);
            const result = await response.json();

            if (result.success && Array.isArray(result.data)) {
                setCarouselItems(result.data); // ✅ Correctly set the array
            } else {
                setCarouselItems([]); // Handle empty case
            }
        } catch (error) {
            toast.error("Failed to load carousel data.");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${SummaryApi.deleteCarousel.url}/${id}`, { method: SummaryApi.deleteCarousel.method });
            console.log(response);
            
            toast.success("Carousel item deleted!");
            fetchCarousel(); // Refresh data
        } catch (error) {
            toast.error("Error deleting item.");
        }
    };

    return (

        <div className="carousel-table">
            <div className="dashboard-header">
                <h1 aria-label={`Welcome ${loggedInUser}`}>Welcome, {loggedInUser} 👋</h1>
                <Link to="/add-carousel" className="btn-btn">Add Carousel</Link>
            </div>
            <div className="carousel-card">
                <h2>Carousel Management</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carouselItems.length > 0 ? (
                            carouselItems.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.title}</td>
                                    <td>
                                    <img src={`https://api.primelendinghub.in${item.imageUrl}`} alt={item.title} className="carousel-image" />
                                                           </td>
                                    <td>
                                        <button className="edit-btn">
                                            <FaEdit /> Edit
                                        </button>
                                        <button className="delete-btn" onClick={() => handleDelete(item._id)}>
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No carousel items available</td>
                            </tr>
                        )}

                    </tbody>
                </table> </div>
            <ToastContainer />
        </div>
    );
};

export default CarouselTable;
