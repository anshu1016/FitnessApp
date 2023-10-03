const initialValue = {
  goal: [],
  exercise: [],
  food: [],
  loading: false,
  error: null,
  token: null,
  isAuthenticating: false,
  loginError: null
};

export const Reducer = (state = initialValue, { type, payload }) => {
  switch (type) {
    case "LOGIN_START":
      return {
        ...state,
        isAuthenticating: true,
        loginError: null
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: payload,
        isAuthenticating: false,
        loginError: null
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticating: false,
        loginError: payload
      };

    case "FETCH_GOAL_START":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "FETCH_GOAL_SUCCESS":
      return {
        ...state,
        goal: payload, // assuming payload is the full array of goals
        loading: false,
        error: null
      };

    case "FETCH_GOAL_FAILURE":
      return {
        ...state,
        loading: false,
        error: payload
      };

    case "ADD_GOAL_START":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "ADD_GOAL_SUCCESS":
      return {
        ...state,
        goal: [...state.goal.goal, payload], // adding the new goal to the existing array
        loading: false,
        error: null
      };

    case "ADD_GOAL_FAILURE":
      return {
        ...state,
        loading: false,
        error: payload
      };
    case "DELETE_GOAL_START":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "DELETE_GOAL_SUCCESS":
      return {
        ...state,
        goal: state.goal.goal.filter((item) => item._id !== payload),
        loading: false,
        error: null
      };

    case "DELETE_GOAL_FAILURE":
      return {
        ...state,
        loading: false,
        error: payload
      };
    case "FETCH_EXERCISE_START":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "FETCH_EXERCISE_SUCCESS":
      return {
        ...state,
        exercise: payload,
        loading: false,
        error: null
      };

    case "FETCH_EXERCISE_FAILURE":
      return {
        ...state,
        loading: false,
        error: payload
      };
    case "DELETE_EXERCISE_START":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "DELETE_EXERCISE_SUCCESS":
      return {
        ...state,
        exercise: state.exercise.filter((item) => item._id !== payload),
        loading: false,
        error: null
      };

    case "DELETE_EXERCISE_FAILURE":
      return {
        ...state,
        loading: false,
        error: payload
      };
    case "ADD_EXERCISE_START":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "ADD_EXERCISE_SUCCESS":
      return {
        ...state,
        exercise: [...state.exercise, payload], // Add the new exercise
        loading: false,
        error: null
      };

    case "ADD_EXERCISE_FAILURE":
      return {
        ...state,
        loading: false,
        error: payload
      };

    case "FETCH_FOOD_START":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "FETCH_FOOD_SUCCESS":
      return {
        ...state,
        food: payload,
        loading: false,
        error: null
      };

    case "FETCH_FOOD_FAILURE":
      return {
        ...state,
        loading: false,
        error: payload
      };

    case "DELETE_FOOD_START":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "DELETE_FOOD_SUCCESS":
      return {
        ...state,
        food: state.food.filter((item) => item._id !== payload),
        loading: false,
        error: null
      };

    case "DELETE_FOOD_FAILURE":
      return {
        ...state,
        loading: false,
        error: payload
      };
    case "ADD_FOOD_START":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "ADD_FOOD_SUCCESS":
      return {
        ...state,
        food: [...state.food, ...payload],
        loading: false,
        error: null
      };

    case "ADD_FOOD_FAILURE":
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};
