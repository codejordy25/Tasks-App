const tasksReducer = (state, action) => {
  switch (action.type) {
    case "setTasks": {
      return {
        ...state,
        tasks: action.payload.tasks,
        count: action.payload.count,
        loading: false,
      };
    }
    case "loading": {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case "error": {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    case "create": {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        count: state.count + 1,
        loading: false,
      };
    }

    case "delete": {
      return {
        ...state,
        tasks: state.tasks.filter((tasks) => tasks.id !== action.payload),
        count: state.count - 1,
        loading: false,
      };
    }

    default:
      return state;
  }
};
export default tasksReducer;
