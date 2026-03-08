import type { Todo } from "@/types/todo";
import { TodoItem } from "./TodoItem";

type Props = {
  todos: Todo[];
  onToggleTodo: (id: number, current: boolean) => void;
  onDeleteTodo: (id: number) => void;
};

export const TodoList = ({ todos, onToggleTodo, onDeleteTodo }: Props) => {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
};
