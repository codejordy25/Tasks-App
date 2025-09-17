import { useEffect, useReducer, useState } from "react";

import {
  createTask,
  deleteTask,
  getTasks,
} from "..//..//services/tasks.service";

const Tasks = () => {
  const [inputValue, setInputValue] = useState("");

  const [tasksState, dispatch] = useReducer(reducer, {});

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
};

export default Tasks;
