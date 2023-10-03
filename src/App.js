import Dashboard from "./pages/DashBoard/Dashboard";
import { AddExerciseForm } from "./pages/ExercisePage/AddExercise";
import Exercise from "./pages/ExercisePage/Exercise";
import { AddFoodForm } from "./pages/FoodPages/AddFoodForm";
import Food from "./pages/FoodPages/Food";
import { Goal } from "./pages/GoalPages/Goal";
import { AddGoalForm } from "./pages/GoalPages/GoalForm";
import NavBar from "./pages/Navbar/Navbar";
import "./styles.css";
import { ToastContainer } from "react-toastify";
import { Toast } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import { useToast } from "./context/ToastContext";
import LoginComponent from "./pages/Auth/Login";
export default function App() {
  const { state: toastState, dispatch: toastDispatch } = useToast();
  return (
    <>
      <Toast
        onClose={() => toastDispatch({ type: "HIDE_TOAST" })}
        show={toastState.show}
        delay={3000}
        position="bottom-left"
        autohide
        bg-red
      >
        <Toast.Body>{toastState.message}</Toast.Body>
      </Toast>
      <div className="App">
        <NavBar />
        {/* <LoginComponent/> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/exercises" element={<Exercise />} />
          <Route path="/food" element={<Food />} />
          <Route path="/goal" element={<Goal />} />
          <Route path="/addExercise" element={<AddExerciseForm />} />
          <Route path="/addGoal" element={<AddGoalForm />} />
          <Route path="/addFood" element={<AddFoodForm />} />
        </Routes>
      </div>
    </>
  );
}
