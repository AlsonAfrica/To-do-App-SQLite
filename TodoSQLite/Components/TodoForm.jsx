import React, { useState } from "react";

const styles = {
  container: `
    .todo-form-container {
      max-width: 600px;
      padding: 6rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .todo-form-title {
      text-align: center;
      color: #1a1a1a;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }

    .todo-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .input-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-input {
      width: 80%;
      padding: 0.75rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.2s ease;
      outline: none;
    }

    .form-input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .title-input {
      font-size: 1.125rem;
    }

    .priority-select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 0.5rem center;
      background-repeat: no-repeat;
      background-size: 1.5em 1.5em;
      padding-right: 2.5rem;
    }

    .priority-select option[value="red"] {
      color: #ef4444;
      font-weight: 500;
    }

    .priority-select option[value="yellow"] {
      color: #eab308;
      font-weight: 500;
    }

    .priority-select option[value="green"] {
      color: #22c55e;
      font-weight: 500;
    }

    .submit-button {
      margin-top: 0.5rem;
      padding: 0.75rem 1.5rem;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .submit-button:hover {
      background-color: #2563eb;
      transform: translateY(-1px);
    }

    .submit-button:active {
      transform: translateY(0);
    }

    .submit-button:disabled {
      background-color: #94a3b8;
      cursor: not-allowed;
      transform: none;
    }

    @media (max-width: 640px) {
      .input-group {
        grid-template-columns: 1fr;
      }

      .todo-form-container {
        margin: 1rem;
        padding: 1.5rem;
      }
    }
  `
};

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("yellow");
  const [datetime, setDatetime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && datetime) {
      addTodo({ title, priority, datetime });
      setTitle("");
      setPriority("yellow");
      setDatetime("");
    }
  };

  return (
    <>
      <style>{styles.container}</style>
      <div className="todo-form-container">
        <h2 className="todo-form-title">Add New Task</h2>
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input title-input"
          />
          
          <div className="input-group">
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
              className="form-input priority-select"
            >
              <option value="red">High Priority</option>
              <option value="yellow">Medium Priority</option>
              <option value="green">Low Priority</option>
            </select>

            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              className="form-input"
            />
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={!title || !datetime}
          >
            Add Task
          </button>
        </form>
      </div>
    </>
  );
};

export default TodoForm;