import React, { useState } from "react";

const styles = {
  container: `
    .todo-list-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      border: 1px solid #e5e7eb;
      height: 600px;
      display: flex;
      flex-direction: column;
    }

    .todo-list-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
    }

    .todo-list-scroll {
      overflow-y: auto;
      padding: 1rem;
      flex-grow: 1;
    }

    .todo-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .todo-item {
      background: #f8fafc;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      border: 1px solid #e5e7eb;
      transition: all 0.2s ease;
    }

    .todo-item:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    .todo-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }

    .todo-title {
      font-size: 1.1rem;
      cursor: pointer;
      flex-grow: 1;
      padding: 0.25rem 0;
    }

    .todo-title.completed {
      text-decoration: line-through;
      opacity: 0.7;
    }

    .todo-title[data-priority="red"] {
      color: #dc2626;
    }

    .todo-title[data-priority="yellow"] {
      color: #ca8a04;
    }

    .todo-title[data-priority="green"] {
      color: #16a34a;
    }

    .todo-meta {
      margin-top: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .todo-date {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .delete-button, .edit-button, .save-button, .cancel-button {
      padding: 0.5rem 1rem;
      border: none;
      background-color: #3b82f6;
      color: white;
      border-radius: 6px;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .delete-button {
      background-color: #ef4444;
    }

    .delete-button:hover {
      background-color: #dc2626;
    }

    .edit-button:hover, .save-button:hover, .cancel-button:hover {
      background-color: #2563eb;
    }

    .empty-state {
      text-align: center;
      color: #6b7280;
      padding: 2rem;
      font-size: 1.1rem;
    }

    /* Scrollbar styling */
    .todo-list-scroll::-webkit-scrollbar {
      width: 8px;
    }

    .todo-list-scroll::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 4px;
    }

    .todo-list-scroll::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }

    .todo-list-scroll::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    @media (max-width: 640px) {
      .todo-list-container {
        height: 500px;
      }
      
      .todo-content {
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .todo-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  `,
};

const TodoList = ({ todos, toggleTodo, deleteTodo, editTodo }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", priority: "yellow", datetime: "" });

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditData({ title: todo.title, priority: todo.priority, datetime: todo.datetime });
  };

  const handleSave = () => {
    editTodo(editingId, editData);
    setEditingId(null);
  };

  return (
    <>
      <style>{styles.container}</style>
      <div className="todo-list-container">
        <div className="todo-list-header">Tasks ({todos.length})</div>
        <div className="todo-list-scroll">
          <ul className="todo-list">
            {todos.length === 0 ? (
              <li className="empty-state">No tasks yet. Add one above!</li>
            ) : (
              todos.map((todo) => (
                <li key={todo.id} className="todo-item">
                  {editingId === todo.id ? (
                    <div>
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      />
                      <select
                        value={editData.priority}
                        onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                      >
                        <option value="red">High Priority (Red)</option>
                        <option value="yellow">Medium Priority (Yellow)</option>
                        <option value="green">Low Priority (Green)</option>
                      </select>
                      <input
                        type="datetime-local"
                        value={editData.datetime}
                        onChange={(e) => setEditData({ ...editData, datetime: e.target.value })}
                      />
                      <button className="save-button" onClick={handleSave}>
                        Save
                      </button>
                      <button className="cancel-button" onClick={() => setEditingId(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="todo-content">
                        <span
                          className={`todo-title ${todo.completed ? "completed" : ""}`}
                          data-priority={todo.priority}
                          onClick={() => toggleTodo(todo.id, !todo.completed)}
                        >
                          {todo.title}
                        </span>
                      </div>
                      <div className="todo-meta">
                        <div className="todo-date">
                          Due: {new Date(todo.datetime).toLocaleString()}
                        </div>
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(todo)}
                          aria-label="Edit task"
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => deleteTodo(todo.id)}
                          aria-label="Delete task"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoList;
