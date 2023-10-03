import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExercises, fetchFood, Get_Goal } from "../../actions/action.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.exercise);
  const foods = useSelector((state) => state.food);
  const goals = useSelector((state) => state.goal);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  console.log(exercises, "GOALS");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MThmNGFhOGI3YmM4OThjOTk4YTE1NCIsImlhdCI6MTY5NjI5MzI4OCwiZXhwIjoxNjk2MzU4MDg4fQ.DjCg1Jg06mWtr3aOQBUa5P3Wx3oNllRoU7G8TNdApKg";
  useEffect(() => {
    dispatch(fetchExercises(token));
    dispatch(fetchFood(token));
    dispatch(Get_Goal(token));
  }, [dispatch]);

  const totalCaloriesBurned = exercises.reduce(
    (total, exercise) => total + exercise.caloriesBurned,
    0
  );
  const totalCaloriesConsumed = foods.reduce(
    (total, food) => total + food.calories,
    0
  );
  const totalCaloriesGoal = goals?.goal?.reduce(
    (total, target) => total + target.targetCaloriesValue,
    0
  );
  const remainingCalories =
    totalCaloriesGoal - (totalCaloriesBurned - totalCaloriesConsumed);
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Error: {error}</div>;
  }
  return (
    <div className="container mt-5">
      <div className="card text-center shadow-lg mb-5">
        <div className="card-header bg-primary text-white">
          <h2 className="card-title">Dashboard</h2>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col">
              <div className="card text-white bg-info h-100">
                <div className="card-body">
                  <h5 className="card-title">Total Calories Burned</h5>
                  <p className="card-text display-4">{totalCaloriesBurned}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-white bg-success h-100">
                <div className="card-body">
                  <h5 className="card-title">Total Calories Consumed</h5>
                  <p className="card-text display-4">{totalCaloriesConsumed}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <div className="card text-white bg-warning h-100">
                <div className="card-body">
                  <h5 className="card-title">Total Calories Goal</h5>
                  <p className="card-text display-4">{totalCaloriesGoal}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-white bg-danger h-100">
                <div className="card-body">
                  <h5 className="card-title">Remaining Calories to Goal</h5>
                  <p className="card-text display-4">{remainingCalories}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
