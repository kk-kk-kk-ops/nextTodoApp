"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { Todo } from "@/types/todo";
import { AuthForm } from "@/components/AuthForm";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchTodos = async (currentUser: User) => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", currentUser.id)
      .order("id", { ascending: false });

    if (error) {
      console.error("取得エラー:", error.message);
      return;
    }

    setTodos(data ?? []);
  };

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (user) {
      fetchTodos(user);
    }
  };

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("サインアップエラー:", error.message);
      alert(error.message);
      return;
    }

    alert("サインアップしました。メール確認が必要な場合は確認してください。");
  };

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("ログインエラー:", error.message);
      alert(error.message);
      return;
    }

    checkUser();
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("ログアウトエラー:", error.message);
      return;
    }

    setUser(null);
    setTodos([]);
  };

  const addTodo = async () => {
    if (!title.trim() || !user) return;

    const { error } = await supabase.from("todos").insert([
      {
        title,
        user_id: user.id,
      },
    ]);

    if (error) {
      console.error("追加エラー:", error.message);
      alert(error.message);
      return;
    }

    setTitle("");
    fetchTodos(user);
  };

  const toggleTodo = async (id: number, current: boolean) => {
    if (!user) return;

    const { error } = await supabase
      .from("todos")
      .update({ is_completed: !current })
      .eq("id", id);

    if (error) {
      console.error("更新エラー:", error.message);
      alert(error.message);
      return;
    }

    fetchTodos(user);
  };

  const deleteTodo = async (id: number) => {
    if (!user) return;

    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      console.error("削除エラー:", error.message);
      alert(error.message);
      return;
    }

    fetchTodos(user);
  };

  useEffect(() => {
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        fetchTodos(currentUser);
      } else {
        setTodos([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <AuthForm
          email={email}
          password={password}
          onChangeEmail={setEmail}
          onChangePassword={setPassword}
          onSignUp={signUp}
          onSignIn={signIn}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Todoアプリ</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <button
            onClick={signOut}
            className="rounded bg-gray-700 px-4 py-2 text-white"
          >
            ログアウト
          </button>
        </div>

        <TodoForm title={title} onChangeTitle={setTitle} onAddTodo={addTodo} />

        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
        />
      </div>
    </main>
  );
}
