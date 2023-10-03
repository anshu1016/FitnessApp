import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExercise, fetchExercises } from "../../actions/action.js";
import { AddExerciseForm } from "./AddExercise.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../../context/ToastContext.jsx";

export const Exercise = () => {
  const dispatch = useDispatch();
  const exerciseData = useSelector((state) => state.exercise);
  const [showForm, setShowForm] = useState(false);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MThmNGFhOGI3YmM4OThjOTk4YTE1NCIsImlhdCI6MTY5NjI5MzI4OCwiZXhwIjoxNjk2MzU4MDg4fQ.DjCg1Jg06mWtr3aOQBUa5P3Wx3oNllRoU7G8TNdApKg";

  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const { dispatch: toastDispatch } = useToast();
  const handleDelete = (exerciseId) => {
    try {
      dispatch(deleteExercise(token, exerciseId));
      toastDispatch({
        type: "SHOW_TOAST",
        payload: { message: "Exercise Deleted!", type: "success" }
      });
    } catch (error) {
      toastDispatch({
        type: "SHOW_TOAST",
        payload: { message: "Error deleting exercise!", type: "error" }
      });
    }
  };

  useEffect(() => {
    dispatch(fetchExercises(token));
  }, [dispatch]);

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
          <h2 className="card-title">Exercises</h2>

          <button
            className="btn btn-light"
            onClick={() => setShowForm(!showForm)}
            title="Add New Exercise"
          >
            <FontAwesomeIcon icon={faPlus} size="lg" /> Add Exercise
          </button>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {exerciseData.map((exercise, index) => (
              <li key={index} className="list-group-item">
                <strong>Name:</strong> {exercise.exerciseName} <br />
                <strong>Duration:</strong> {exercise.exerciseDuration} minutes{" "}
                <br />
                <strong>Calories Burned:</strong> {exercise.caloriesBurned}{" "}
                <br />
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleDelete(exercise._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showForm && (
        <AddExerciseForm showForm={showForm} setShowForm={setShowForm} />
      )}{" "}
    </div>
  );
};
export default Exercise;
