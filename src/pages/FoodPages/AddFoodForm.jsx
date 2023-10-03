import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFood } from "../../actions/action.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const AddFoodForm = ({ showForm, setShowForm }) => {
  const dispatch = useDispatch();

  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);
  const [fat, setFat] = useState(0);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MThmNGFhOGI3YmM4OThjOTk4YTE1NCIsImlhdCI6MTY5NjI5MzI4OCwiZXhwIjoxNjk2MzU4MDg4fQ.DjCg1Jg06mWtr3aOQBUa5P3Wx3oNllRoU7G8TNdApKg";
  const handleSubmit = (e) => {
    e.preventDefault();
    const foodItem = {
      foodName,
      calories: Number(calories),
      protein: Number(protein),
      carbohydrates: Number(carbohydrates),
      fat: Number(fat)
    };

    console.log("Sending food data to server:", foodItem);
    dispatch(addFood(foodItem, token));
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
          <h2 className="card-title">Add Food</h2>
          <button
            className="btn btn-light float-right"
            onClick={() => setShowForm(false)}
            title="Close Form"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="Food Name"
              required
              className="form-control mb-3"
            />
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              required
              className="form-control mb-3"
            />
            <input
              type="number"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              placeholder="Protein (g)"
              required
              className="form-control mb-3"
            />
            <input
              type="number"
              value={carbohydrates}
              onChange={(e) => setCarbohydrates(e.target.value)}
              placeholder="Carbohydrates (g)"
              required
              className="form-control mb-3"
            />
            <input
              type="number"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
              placeholder="Fat (g)"
              required
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-success">
              Add Food
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
