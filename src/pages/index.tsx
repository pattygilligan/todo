import Head from "next/head";
import { useState, useEffect } from "react";

import { api } from "~/utils/api";

interface TodoItem {
  text: string;
  date: string;
  done: boolean;
  id: string;
}

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const [textInput, setTextInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  function handleCreateTodo() {
    const newTodo = {
      text: textInput,
      date: dateInput,
      id: Date.now().toString(),
      done: false,
    };
    setTodoList([...todoList, newTodo]);
    setTextInput("");
    setDateInput("");
  }

  function handleTodoChange(id: string) {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  }

  function handleTodoDelete(id: string) {
    setTodoList(todoList.filter((item) => item.id !== id));
  }

  const handleSave = async () => {
    const response = await fetch("api/todo", {
      method: "POST",
      headers: {
        Content: "application/json",
      },
      body: JSON.stringify({ data: todoList }),
    });
    if (!response.ok) {
      throw new Error("error saving data");
    }
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    fetch("api/todo", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTodoList(data.todoList);
      })
      .catch((error) =>
        console.log("there's been an error retrieving the data", error),
      );
  }, []);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="flex gap-12">
          <div className="flex min-h-96 min-w-96  flex-col gap-4 rounded border bg-white p-4">
            <h1 className="text-2xl font-bold">Todo List</h1>
            {todoList.map((item) => (
              <div key={item.id} className="flex gap-2">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => handleTodoChange(item.id)}
                />
                <div
                  className="flex flex-col"
                  style={
                    item.done
                      ? { color: "grey", textDecoration: "line-through" }
                      : {}
                  }
                >
                  <p>{item.text}</p>
                  <p className="text-xs text-slate-500">{item.date}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleTodoDelete(item.id)}
                  className="flex-grow text-sm text-red-500"
                >
                  delete
                </button>
              </div>
            ))}
            <div className=" 0 flex flex-grow flex-col justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="rounded bg-slate-800 p-2 text-white"
              >
                Save TodoList
              </button>
            </div>
          </div>
          <div className="flex min-h-96 min-w-96 flex-col gap-4 rounded border bg-white p-4">
            <h1 className="text-2xl font-bold">Create Todo</h1>
            <form className="flex flex-grow flex-col justify-between gap-4">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="new todo here"
                  className="rounded border p-2 "
                />
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="rounded border p-2"
                />
              </div>
              <button
                type="button"
                onClick={handleCreateTodo}
                className="rounded bg-slate-800 p-2 text-white"
              >
                Create todo
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
