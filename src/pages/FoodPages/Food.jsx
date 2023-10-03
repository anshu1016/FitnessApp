import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFood, fetchFood } from "../../actions/action.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { animated, useSpring } from "react-spring";
import { Link } from "react-router-dom";
import { AddFoodForm } from "./AddFoodForm.jsx";
export const Food = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const foodData = useSelector((state) => state.food);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MThmNGFhOGI3YmM4OThjOTk4YTE1NCIsImlhdCI6MTY5NjI5MzI4OCwiZXhwIjoxNjk2MzU4MDg4fQ.DjCg1Jg06mWtr3aOQBUa5P3Wx3oNllRoU7G8TNdApKg";
  useEffect(() => {
    dispatch(fetchFood(token));
  }, [dispatch]);

  const handleDelete = (foodId) => {
    dispatch(deleteFood(foodId, token));
  };
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card text-center shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="card-title">Foods</h2>

          <button
            className="btn btn-light"
            onClick={() => setShowForm(!showForm)}
            title="Add New Food"
          >
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {foodData &&
              foodData.map((food, index) => (
                <li key={index} className="list-group-item">
                  <strong>Name:</strong> {food.foodName} <br />
                  <strong>Calories:</strong> {food.calories} <br />
                  <strong>Protein:</strong> {food.protein}g <br />
                  <strong>Carbohydrates:</strong> {food.carbohydrates}g <br />
                  <strong>Fat:</strong> {food.fat}g <br />
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => handleDelete(food._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
      {showForm && (
        // <animated.div style={formAnimation}>
        <div
          className="fixed-top d-flex justify-content-center align-items-center"
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)"
          }}
        >
          <AddFoodForm showForm={showForm} setShowForm={setShowForm} />
        </div>
        // </animated.div>
      )}
    </div>
  );
};

export default Food;
