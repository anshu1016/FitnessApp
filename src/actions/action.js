export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: "LOGIN_START" });

  try {
    const response = await fetch(
      "https://fitnessapi2.arunshukla.repl.co/api/users/login", // I assumed the URL for login based on your signup URL. Please correct if it's different.
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error logging in");
    }

    // Store the token securely, usually in an HTTP-only cookie or React context
    // For this example, we're dispatching it to the reducer.
    // However, remember, storing tokens in Redux might expose it to potential XSS attacks.
    dispatch({ type: "LOGIN_SUCCESS", payload: data.token });

    // Optionally, after logging in successfully, fetch user's data (like goals, food, etc.)
    // dispatch(Get_Goal(data.token));
    // dispatch(fetchExercises(data.token));
    // Add other fetch actions as needed
  } catch (error) {
    console.error("Error during login:", error);
    dispatch({ type: "LOGIN_FAILURE", payload: error.message });
  }
};

export const Get_Goal = (token) => async (dispatch) => {
  // Start the fetch and inform the store that loading has begun
  dispatch({ type: "FETCH_GOAL_START" });

  try {
    const response = await fetch(
      "https://fitnessapi2.arunshukla.repl.co/api/goals",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          email: "john.doe@example.com",
          password: "SecurePassword123"
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Server responded with status: ${response.status}`
      );
    }

    dispatch({ type: "FETCH_GOAL_SUCCESS", payload: data });
  } catch (error) {
    console.error("Error fetching Goal:", error);

    // Dispatching error message to the store
    dispatch({ type: "FETCH_GOAL_FAILURE", payload: error.message });
  }
};

//add goal
// actions/goalActions.js
// actions/goalActions.js

export const addGoal = (token, goalBody) => async (dispatch) => {
  dispatch({ type: "ADD_GOAL_START" });

  try {
    const response = await fetch(
      "https://fitnessapi2.arunshukla.repl.co/api/addGoal",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          EMAIL: "john.doe@example.com",
          PASSWORD: "SecurePassword123",
          GoalBody: goalBody
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error adding goal");
    }

    dispatch({ type: "ADD_GOAL_SUCCESS", payload: data.addedGoal });

    // Fetch the latest goals after successfully adding a new goal
    dispatch(Get_Goal());
  } catch (error) {
    console.error("Error adding goal:", error);
    dispatch({ type: "ADD_GOAL_FAILURE", payload: error.message });
  }
};

//DELETE GOAL

// actions/goalActions.js

export const deleteGoal = (token, goalID) => async (dispatch) => {
  dispatch({ type: "DELETE_GOAL_START" });

  try {
    const response = await fetch(
      "https://fitnessapi2.arunshukla.repl.co/api/deleteGoal",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          EMAIL: "john.doe@example.com",
          PASSWORD: "SecurePassword123",
          Goal_ID: goalID
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error deleting goal");
    }

    dispatch({ type: "DELETE_GOAL_SUCCESS", payload: goalID });
  } catch (error) {
    console.error("Error deleting goal:", error);
    dispatch({ type: "DELETE_GOAL_FAILURE", payload: error.message });
  }
};

//GET EXERCISE
export const fetchExercises = (token) => async (dispatch) => {
  // Accept token as a parameter
  dispatch({ type: "FETCH_EXERCISE_START" });

  try {
    const response = await fetch(
      "https://fitnessapi2.arunshukla.repl.co/api/user/exercises",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          email: "john.doe@example.com",
          password: "SecurePassword123"
        })
      }
    );

    if (!response.ok) {
      const text = await response.text(); // Read the response as plain text
      throw new Error(
        text || `Error ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    dispatch({ type: "FETCH_EXERCISE_SUCCESS", payload: data.data });
  } catch (error) {
    console.error("Error fetching exercises:", error);
    dispatch({ type: "FETCH_EXERCISE_FAILURE", payload: error.message });
  }
};
// DELETE exercise
export const deleteExercise = (token, exerciseId) => async (dispatch) => {
  dispatch({ type: "DELETE_EXERCISE_START" });

  try {
    const response = await fetch(
      "https://fitnessapi2.arunshukla.repl.co/api/deleteExercise",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          email: "john.doe@example.com", // Hardcoded for now, better to get dynamically
          password: "SecurePassword123",
          exerciseId
        })
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        text || `Error ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();

    dispatch({ type: "DELETE_EXERCISE_SUCCESS", payload: exerciseId });
  } catch (error) {
    console.error("Error deleting exercise:", error);
    dispatch({ type: "DELETE_EXERCISE_FAILURE", payload: error.message });
  }
};

//ADD the exercise
export const addExercise = (exercise, token) => async (dispatch) => {
  dispatch({ type: "ADD_EXERCISE_START" });

  try {
    const response = await fetch(
      "https://fitnessapi2.arunshukla.repl.co/addExercise",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          email: "john.doe@example.com",
          password: "SecurePassword123",
          exercise
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Error ${response.status}: ${response.statusText}`
      );
    }

    dispatch({ type: "ADD_EXERCISE_SUCCESS", payload: data.data });
  } catch (error) {
    console.error("Error adding exercise:", error);
    dispatch({ type: "ADD_EXERCISE_FAILURE", payload: error.message });
  }
};

//GET FOOD
export const fetchFood = (token) => async (dispatch) => {
  dispatch({ type: "FETCH_FOOD_START" });

  try {
    const response = await fetch(
      "https://fitnessapi2.arunshukla.repl.co/api/food",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token // Pass the token here
        },
        body: JSON.stringify({
          email: "john.doe@example.com",
          password: "SecurePassword123"
        })
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        text || `Error ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log(data, "DATA");
    dispatch({ type: "FETCH_FOOD_SUCCESS", payload: data.foods });
  } catch (error) {
    console.error("Error fetching food:", error);
    dispatch({ type: "FETCH_FOOD_FAILURE", payload: error.message });
  }
};

//Delete food
export const deleteFood = (foodId, token) => async (dispatch) => {
  dispatch({ type: "DELETE_FOOD_START" });

  try {
    const response = await fetch(
      "https://fitnessapi2.arunshukla.repl.co/api/deleteFood",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          email: "john.doe@example.com",
          password: "SecurePassword123",
          foodId
        })
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        text || `Error ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    dispatch({ type: "DELETE_FOOD_SUCCESS", payload: foodId });
  } catch (error) {
    console.error("Error deleting food:", error);
    dispatch({ type: "DELETE_FOOD_FAILURE", payload: error.message });
  }
};

//ADD  FOOD
export const addFood = (foodItem, token) => async (dispatch) => {
  dispatch({ type: "ADD_FOOD_START" });

  try {
    const response = await fetch(
      "https://fitnessapi2.arunshukla.repl.co/api/addFood",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          email: "john.doe@example.com",
          password: "SecurePassword123",
          foodItem
        })
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        text || `Error ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    dispatch({ type: "ADD_FOOD_SUCCESS", payload: data.food });
  } catch (error) {
    console.error("Error adding food:", error);
    dispatch({ type: "ADD_FOOD_FAILURE", payload: error.message });
  }
};
