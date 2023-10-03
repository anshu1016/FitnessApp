import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExercise } from "../../actions/action.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { useNavigate, Link } from "react-router-dom";
export const AddExerciseForm = ({ showForm, setShowForm }) => {
  const dispatch = useDispatch();

  const [exerciseName, setExerciseName] = useState("");

  const [exerciseDuration, setExerciseDuration] = useState(5);

  const navigate = useNavigate();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MThmNGFhOGI3YmM4OThjOTk4YTE1NCIsImlhdCI6MTY5NjI5MzI4OCwiZXhwIjoxNjk2MzU4MDg4fQ.DjCg1Jg06mWtr3aOQBUa5P3Wx3oNllRoU7G8TNdApKg";
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const handleSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      exerciseName,
      exerciseDuration: parseInt(exerciseDuration, 10)
    };

    dispatch(addExercise(exercise, token));

    setShowForm(!showForm);
  };

  const handleCrossClick = () => {
    setShowForm(!showForm);
    navigate("/exercises");
  };
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Error: {error}</div>;
  }
  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content animate__animated animate__fadeIn">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Add Exercise</h5>
            <button
              className="btn btn-light float-right"
              onClick={handleCrossClick}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Exercise Type</label>
                <select
                  className="form-select"
                  value={exerciseName}
                  onChange={(e) => setExerciseName(e.target.value)}
                >
                  <option value="">--Select Exercise Type--</option>
                  <option value="running">Running</option>
                  <option value="cycling">Cycling</option>
                  <option value="swimming">Swimming</option>
                  <option value="walking">Walking</option>
                  <option value="weightlifting">Weightlifting</option>
                  <option value="yoga">Yoga</option>
                  <option value="dancing">Dancing</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Duration (in minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  value={exerciseDuration}
                  onChange={(e) => setExerciseDuration(e.target.value)}
                  min="5"
                  max="30"
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onMouseOver={(e) =>
                    e.target.classList.add(
                      "animate__animated",
                      "animate__pulse"
                    )
                  }
                  onMouseOut={(e) =>
                    e.target.classList.remove(
                      "animate__animated",
                      "animate__pulse"
                    )
                  }
                >
                  Add Exercise
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
