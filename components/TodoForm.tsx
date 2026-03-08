type Props = {
  title: string;
  onChangeTitle: (value: string) => void;
  onAddTodo: () => void;
};

export const TodoForm = ({ title, onChangeTitle, onAddTodo }: Props) => {
  return (
    <div className="mb-6 flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => onChangeTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAddTodo();
          }
        }}
        placeholder="やることを入力"
        className="flex-1 rounded border px-3 py-2"
      />
      <button
        onClick={onAddTodo}
        className="rounded bg-black px-4 py-2 text-white"
      >
        追加
      </button>
    </div>
  );
};
