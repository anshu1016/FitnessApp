import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGoal } from "../../actions/action.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { animated } from "react-spring";

export const AddGoalForm = ({ setShowForm }) => {
  const dispatch = useDispatch();

  const [goalName, setGoalName] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [targetCaloriesValue, setTargetCaloriesValue] = useState("");
  const [status, setStatus] = useState("");
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MThmNGFhOGI3YmM4OThjOTk4YTE1NCIsImlhdCI6MTY5NjI5MzI4OCwiZXhwIjoxNjk2MzU4MDg4fQ.DjCg1Jg06mWtr3aOQBUa5P3Wx3oNllRoU7G8TNdApKg";
  const handleSubmit = (e) => {
    e.preventDefault();
    const goalBody = {
      goalName,
      goalDescription,
      targetDate,
      targetCaloriesValue,
      status
    };
    dispatch(addGoal(token, goalBody));
    setShowForm(false); // close the form after submitting
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
          <h2 className="card-title">Add New Goal</h2>
          <button
            className="btn btn-light float-right"
            onClick={() => setShowForm(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="text-left">
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Goal Name"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Goal Description"
                value={goalDescription}
                onChange={(e) => setGoalDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="date"
                placeholder="Target Date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Target Calories Value"
                value={targetCaloriesValue}
                onChange={(e) => setTargetCaloriesValue(e.target.value)}
              />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="In Progress">In Progress</option>
                <option value="Achieved">Achieved</option>
                <option value="Abandoned">Abandoned</option>
              </select>
            </div>
            <button className="btn btn-success w-100" type="submit">
              Add Goal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
