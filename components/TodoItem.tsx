import type { Todo } from "@/types/todo";

type Props = {
  todo: Todo;
  onToggleTodo: (id: number, current: boolean) => void;
  onDeleteTodo: (id: number) => void;
};

export const TodoItem = ({ todo, onToggleTodo, onDeleteTodo }: Props) => {
  return (
    <li className="flex items-center justify-between rounded border px-3 py-2">
      <button
        onClick={() => onToggleTodo(todo.id, todo.is_completed)}
        className={`flex-1 text-left ${
          todo.is_completed ? "line-through text-gray-400" : ""
        }`}
      >
        {todo.title}
      </button>

      <button
        onClick={() => onDeleteTodo(todo.id)}
        className="ml-3 rounded bg-red-500 px-3 py-1 text-white"
      >
        削除
      </button>
    </li>
  );
};
