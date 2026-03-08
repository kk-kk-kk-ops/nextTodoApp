type Props = {
  email: string;
  password: string;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSignUp: () => void;
  onSignIn: () => void;
};

export const AuthForm = ({
  email,
  password,
  onChangeEmail,
  onChangePassword,
  onSignUp,
  onSignIn,
}: Props) => {
  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold">ログイン付きTodoアプリ</h1>

      <div className="space-y-3">
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />

        <div className="flex gap-2">
          <button
            onClick={onSignUp}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            新規登録
          </button>
          <button
            onClick={onSignIn}
            className="rounded bg-black px-4 py-2 text-white"
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
};
