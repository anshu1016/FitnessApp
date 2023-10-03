import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Get_Goal, addGoal, deleteGoal } from "../../actions/action.js";
import { AddGoalForm } from "./GoalForm.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export const Goal = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const goalData = useSelector((state) => state.goal);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MThmNGFhOGI3YmM4OThjOTk4YTE1NCIsImlhdCI6MTY5NjI5MzI4OCwiZXhwIjoxNjk2MzU4MDg4fQ.DjCg1Jg06mWtr3aOQBUa5P3Wx3oNllRoU7G8TNdApKg";

  const handleDelete = (goalID) => {
    dispatch(deleteGoal(token, goalID));
  };

  useEffect(() => {
    dispatch(Get_Goal(token));
  }, [dispatch]);
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Error: {error}</div>;
  }
  return (
    <div className="container mt-5">
      <div className="card text-center shadow-lg mb-4">
        <div className="card-header bg-primary text-white">
          <h2 className="card-title">Goals</h2>

          <button
            className="btn btn-light"
            onClick={() => setShowForm(!showForm)}
            title="Add New Goal"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Goal
          </button>
        </div>
        <div className="card-body">
          {goalData?.goal?.map((item, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{item.goalName}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">
                  <small className="text-muted">{item.targetDate}</small>
                </p>
                <p className="card-text">
                  Target Calories: {item.targetCaloriesValue}
                </p>
                <p className="card-text">Status: {item.status}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item._id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showForm && (
        <div
          className="fixed-top d-flex justify-content-center align-items-center"
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)"
          }}
        >
          <AddGoalForm showForm={showForm} setShowForm={setShowForm} />
        </div>
      )}
    </div>
  );
};
