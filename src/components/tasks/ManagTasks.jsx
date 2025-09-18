import { useEffect, useReducer, useState } from "react";

import {
  createTask,
  deleteTask,
  getTasks,
} from "..//..//services/tasks.service";
import tasksReducer from "./tasks.reducer";

const ManagTasks = () => {
  const [inputValue, setInputValue] = useState("");

  const [tasksState, dispatch] = useReducer(tasksReducer, {
    tasks: "",
    count: 0,
    loading: false,
    error: null,
  });

  // Définition des fonctions directement dans le composant
  const handleCreateTask = () => {
    setIsLoading(true);
    setError(null);
    createTask({ title: inputValue })
      .then((createdTask) => {
        setTasks([...tasks, createdTask]);
        setTaskCount(tasksCount + 1);
        setInputValue("");
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteTask = (taskId) => {
    setIsLoading(true);
    setError(null);
    deleteTask(taskId)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        setTaskCount(tasksCount - 1);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getTasks()
      .then((data) => {
        setTasks(data.tasks);
        setTaskCount(data.count);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
              gap: 8,
              border: "1px solid #CFCFCF",
              padding: 8,
            }}
            key={task.id}
          >
            <p style={{ margin: 0 }}>{task.title}</p>
            {/* ... (le reste du code de la balise <li> n'est pas visible) */}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ManagTasks;
