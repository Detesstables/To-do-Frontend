import { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo, type Todo } from './api/todoApi';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './index.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await getTodos();
        setTodos(todosData);
      } catch (err) {
        setError('No se pudo cargar la lista de tareas.');
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleCreateTodo = async (task: string) => {
    try {
      const newTodo = await createTodo(task);
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError('Error al crear la tarea.');
    }
  };

  const handleUpdateTodo = async (_id: string, completed: boolean) => {
    try {
      const updatedTodo = await updateTodo(_id, { completed });
      setTodos(todos.map(todo => (todo._id === _id ? updatedTodo : todo)));
    } catch (err) {
      setError('Error al actualizar la tarea.');
    }
  };

  const handleDeleteTodo = async (_id: string) => {
    try {
      await deleteTodo(_id);
      setTodos(todos.filter(todo => todo._id !== _id));
    } catch (err) {
      setError('Error al eliminar la tarea.');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-xl">Cargando...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500 text-xl">{error}</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Lista de Tareas</h1>
        <p className="text-center text-gray-500 mb-6">Desarrollado por Jorge Rebaza</p>
        <TodoForm onCreateTodo={handleCreateTodo} />
        <TodoList 
          todos={todos} 
          onUpdateTodo={handleUpdateTodo} 
          onDeleteTodo={handleDeleteTodo} 
        />
      </div>
    </div>
  );
}

export default App;