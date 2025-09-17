// La fonction `delay` est un utilitaire qui simule une latence réseau.
// Elle n'est pas nécessaire dans un vrai service, mais elle rend notre exemple
// plus réaliste.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Cette "base de données" en mémoire simule les données de tâches côté serveur.
let tasksData = [
  { id: 1, title: "Apprendre React", completed: false },
  { id: 2, title: "Faire les courses", completed: false },
  { id: 3, title: "Préparer le projet", completed: false },
];

/**
 * Récupère la liste de toutes les tâches.
 * @returns {Promise<Object>} Une promesse qui résout un objet contenant les tâches et leur nombre.
 */
export const getTasks = () => {
  return delay(500).then(() => {
    // Dans une application réelle, on ferait ici un appel `fetch` à une API.
    // Par exemple : `fetch('/api/tasks')`.
    return {
      tasks: tasksData,
      count: tasksData.length,
    };
  });
};

/**
 * Crée une nouvelle tâche.
 * @param {Object} newTask La nouvelle tâche à créer (ex: { title: 'Nouvelle tâche' }).
 * @returns {Promise<Object>} Une promesse qui résout la tâche créée avec un nouvel ID.
 */
export const createTask = (newTask) => {
  return delay(500).then(() => {
    // On simule l'ajout d'une tâche à la "base de données" en mémoire.
    const createdTask = {
      id: Date.now(), // Utilisation de `Date.now()` pour un ID unique.
      title: newTask.title,
      completed: false,
    };
    tasksData.push(createdTask);
    return createdTask;
  });
};

/**
 * Supprime une tâche existante.
 * @param {number} taskId L'ID de la tâche à supprimer.
 * @returns {Promise<void>} Une promesse qui se résout une fois la suppression terminée.
 */
export const deleteTask = (taskId) => {
  return delay(500).then(() => {
    // On simule la suppression de la tâche de la "base de données".
    tasksData = tasksData.filter((task) => task.id !== taskId);
  });
};
