import { useEffect, useReducer, useState } from "react";

import {
  createTask,
  deleteTask,
  getTasks,
} from "..//..//services/tasks.service";
import tasksReducer from "./tasks.reducer";

const ManagTasks = () => {
  const [inputValue, setInputValue] = useState("");

  // function tasksReducer(state, action) {
  //   switch (action.type) {
  //     case "setTasks": {
  //       return {
  //         ...state,
  //         tasks: action.payload.tasks,
  //         count: action.payload.count,
  //         loading: false,
  //       };
  //     }
  //     case "loading": {
  //       return {
  //         ...state,
  //         loading: true,
  //         error: null,
  //       };
  //     }

  //     case "error": {
  //       return {
  //         ...state,
  //         error: action.payload,
  //         loading: false,
  //       };
  //     }

  //     case "create": {
  //       return {
  //         ...state,
  //         tasks: [...state.tasks, action.payload],
  //         count: state.count + 1,
  //         loading: false,
  //       };
  //     }

  //     case "delete": {
  //       return {
  //         ...state,
  //         tasks: state.tasks.filter((tasks) => tasks !== action.payload),
  //         count: state.count - 1,
  //         loading: false,
  //       };
  //     }

  //     default:
  //       return state;
  //   }
  // }

  //State Gerer grace à useReducer
  //Mettre en consequence toute L'app //Use tasksState props
  const [tasksState, dispatch] = useReducer(tasksReducer, {
    tasks: [],
    count: 0,
    loading: false,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: "loading" });
    getTasks()
      .then((data) => {
        dispatch({
          type: "setTasks",
          payload: {
            tasks: data.tasks,
            count: data.count,
          },
        });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: "error ", payload: error.message });
      });
  }, []);

  //Définition des fonctions directement dans le composant
  const handleCreateTask = () => {
    dispatch({ type: "loading" });

    createTask({ title: inputValue })
      .then((createdTask) => {
        // setTasks([...tasks, createdTask]);
        // setTaskCount(tasksCount + 1);
        dispatch({ type: "create", payload: createdTask });
        setInputValue("");
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: "error", payload: error.message });
      });
  };

  const handleDeleteTask = (taskId) => {
    dispatch({ type: "loading" });
    deleteTask(taskId)
      .then(() => {
        // setTasks(tasks.filter((task) => task.id !== taskId));
        // setTaskCount(tasksCount - 1);
        dispatch({ type: "delete", payload: taskId });
      })
      .catch((error) => {
        dispatch({ type: "error", payload: error.message });
      });
  };

  const handleChangeInputValue = (e) => setInputValue(e.currentTarget.value);

  return (
    <>
      <h1>Todo List with useReducer</h1>
      <div style={{ display: "flex", gap: "8" }}>
        <input
          type="text"
          onChange={handleChangeInputValue}
          value={inputValue}
        />
        <button type="button" onClick={handleCreateTask}>
          Create
        </button>
      </div>
      <h2>
        {tasksState.count} task{tasksState.count > 1 ? "s" : ""}
      </h2>
      {tasksState.loading ? <p>Loading...</p> : null}
      {tasksState.error ? (
        <p style={{ color: "red" }}>{tasksState.error}</p>
      ) : null}
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {/* Le reste de la liste n'est pas visible */}
        {tasksState.tasks.map((task) => (
          <li
            style={{
              display: "flex",
              justifyContent: "space-between", // espace entre texte et bouton
              alignItems: "center",
              border: "1px solid #CFCFCF",
              padding: 8,
            }}
            key={task.id}
          >
            <span>{task.title}</span>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ManagTasks;
