import type { Todo } from '../api/todoApi';

//Este componente se encargará de renderizar la lista de tareas y de gestionar las acciones de actualizar y eliminar.

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: string, completed: boolean) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoList = ({ todos, onUpdateTodo, onDeleteTodo }: TodoListProps) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo._id} className="flex items-center gap-2 p-3 border-b border-gray-200 last:border-b-0">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onUpdateTodo(todo._id, !todo.completed)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className={`flex-grow text-gray-700 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.task}
          </span>
          <button
            onClick={() => onDeleteTodo(todo._id)}
            className="bg-red-500 text-white p-1 rounded-md text-xs hover:bg-red-600 transition duration-300"
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;