# ✨ Task Manager Pro

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

> A modern, feature-rich Todo application built with React.js, Node.js, and SQLite that helps you organize your tasks efficiently.

![Divider](https://user-images.githubusercontent.com/41123719/116673043-30853800-a9a7-11eb-9395-a49c1fa8fdec.png)

## ✨ Features

🔐 **User Authentication**
- Secure user registration and login system
- Password encryption and secure credential storage
- Reliable session management

📝 **Task Management**
- Full CRUD operations for todo items
- Date and time scheduling
- Priority color coding system
- Smart search functionality

## 🛠️ Tech Stack

### Frontend
```
📱 HTML5    → Structure
🎨 CSS3     → Styling
⚛️ React.js → UI Components
```

### Backend
```
🚀 Node.js  → Runtime
⚡ Express  → API Framework
🔄 CORS     → Cross-Origin
🗄️ SQLite3  → Database
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 14.x
- npm >= 6.x

### Installation Steps

1️⃣ **Clone the repository**
```bash
git clone https://github.com/yourusername/task-manager-pro.git
cd task-manager-pro
```

2️⃣ **Install backend dependencies**
```bash
cd backend
npm install express sqlite3 cors
```

3️⃣ **Install frontend dependencies**
```bash
cd ../frontend
npm install react react-dom
```

4️⃣ **Set up environment**
```bash
PORT=5000
```

5️⃣ **Initialize database**
```bash
cd backend
npm run init-db
```

## 🎯 Running the App

**Start backend:**
```bash
cd backend
node server.js
```

**Start frontend:**
```bash
cd frontend
npm run dev
```

> 🌐 Access the app at `http://localhost:5000`

## 📡 API Endpoints

### 🔑 Authentication
```http
POST   /api/auth/register  # Register new user
POST   /api/auth/login     # Login user
```

### 📝 Todo Operations
```http
GET    /api/todos          # Get all todos
POST   /api/todos          # Create todo
PUT    /api/todos/:id      # Update todo
DELETE /api/todos/:id      # Delete todo
```

## 📊 Database Schema

### 👤 Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 📝 Todos Table
```sql
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATETIME,
    priority_color TEXT,
    completed BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
```

## 📁 Project Structure

```
todo-app/
├── 📂 backend/
│   ├── 📄 server.js
│   ├── 📄 database.js
│   ├── 📂 routes/
│   │   ├── 📄 auth.js
│   │   └── 📄 todos.js
│   └── 📄 package.json
└── 📂 frontend/
    ├── 📂 public/
    ├── 📂 src/
    │   ├── 📂 components/
    │   ├── 📄 App.js
    │   └── 📄 index.js
    └── 📄 package.json
```

## 🤝 Contributing

We love your input! We want to make contributing as easy and transparent as possible.

1. 🍴 Fork the repository
2. 🌿 Create your feature branch: `git checkout -b feature/AmazingFeature`
3. 💾 Commit changes: `git commit -m 'Add AmazingFeature'`
4. 📤 Push to branch: `git push origin feature/AmazingFeature`
5. 🔄 Submit a pull request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

Need help? Open an issue in the repository or contact our team:

- 📧 Email: nhlakaniphoradebe337@gmail.com
- 💬 GitHub Issues: [Create New Issue](https://github.com/yourusername/task-manager-pro/issues)

---

<div align="center">
  
### Show your support

Give a ⭐️ if this project helped you!

</div>
