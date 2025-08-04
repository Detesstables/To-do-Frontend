const API_URL = 'http://localhost:3000/api/todos';

// Definición de la interfaz Todo
export interface Todo {
  _id: string;
  task: string;
  completed: boolean;
}

// Obtener todas las tareas
export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener las tareas');
  }
  return response.json();
};

// Crear una nueva tarea
export const createTodo = async (task: string): Promise<Todo> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task }),
  });
  if (!response.ok) {
    throw new Error('Error al crear la tarea');
  }
  return response.json();
};

// Actualizar una tarea
export const updateTodo = async (_id: string, updates: Partial<Todo>): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar la tarea');
  }
  return response.json();
};

// Eliminar una tarea
export const deleteTodo = async (_id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${_id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar la tarea');
  }
};