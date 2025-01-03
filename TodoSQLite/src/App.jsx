import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "../Components/TodoForm";
import TodoList from "../Components/TodoList";
import Login from "../Components/Login";
import Register from "../Components/Register";

const styles = {
  container: `
    .todo-app {
      // min-height: 100vh;
      // padding: 2rem 1rem;
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    }

    .todo-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .app-title {
      text-align: center;
      color: #0f172a;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 2rem;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .search-container {
      margin-bottom: 2rem;
      position: relative;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem;
      padding-left: 2.5rem;
      font-size: 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      background-color: white;
      transition: all 0.2s ease;
      outline: none;
    }

    .search-input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1.25rem;
      height: 1.25rem;
      color: #6b7280;
    }

    .main-content {
      display: flex;
      gap: 2rem;
      margin-top: 2rem;
    }

    .form-section {
      flex: 1;
      min-width: 300px;
    }

    .list-section {
      flex: 1.5;
      min-width: 400px;
    }

    @media (max-width: 1024px) {
      .main-content {
        flex-direction: column;
      }

      .form-section,
      .list-section {
        min-width: 100%;
      }
    }

    @media (max-width: 640px) {
      .todo-app {
        padding: 1rem;
      }

      .todo-container {
        padding: 1rem;
      }

      .app-title {
        font-size: 2rem;
        margin-bottom: 1.5rem;
      }
    }
  `,
};

const SearchIcon = () => (
  <svg
    className="search-icon"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const App = () => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addTodo = ({ title, priority, datetime }) => {
    axios
      .post("http://localhost:5000/api/todos", { title, priority, datetime })
      .then((response) => setTodos([...todos, response.data]))
      .catch((error) => console.error(error));
  };

  const toggleTodo = (id, completed) => {
    axios
      .put(`http://localhost:5000/api/todos/${id}`, { completed })
      .then(() =>
        setTodos(
          todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
        )
      )
      .catch((error) => console.error(error));
  };

  const editTodo = (id, updatedTodo) => {
    axios
      .put(`http://localhost:5000/api/todos/${id}`, updatedTodo)
      .then(() =>
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, ...updatedTodo } : todo
          )
        )
      )
      .catch((error) => console.error(error));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((error) => console.error(error));
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <style>{styles.container}</style>
      <div className="todo-app">
        <div className="todo-container">
          <h1 className="app-title">Task Manager</h1>

          <div className="search-container">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="main-content">
            <div className="form-section">
              <TodoForm addTodo={addTodo} />
            </div>

            <div className="list-section">
              <TodoList
                todos={filteredTodos}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
