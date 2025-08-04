import { useState } from 'react';

//Este componente se encargará de manejar el estado del input y de llamar a la función para crear una nueva tarea.
interface TodoFormProps {
  onCreateTodo: (task: string) => void;
}

const TodoForm = ({ onCreateTodo }: TodoFormProps) => {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    onCreateTodo(newTask);
    setNewTask('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Añadir nueva tarea"
        className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Añadir
      </button>
    </form>
  );
};

export default TodoForm;