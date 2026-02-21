# 📌 Task Management Web Application

A Full-Stack Task Management Web Application built using **React (Frontend)** and **Node.js + Express (Backend)**.

This application allows users to:
- ✅ Create Tasks
- ✏️ Edit Tasks
- ❌ Delete Tasks
- 🔄 Update Task Status
- 📂 Organize Tasks by Category
- 🔐 JWT Authentication (Optional)

---

# 🏗️ Project Structure

```
task-management-app/
│
├── backend/        # Node.js + Express API
│   ├── src/
│   ├── .env
│   └── package.json
│
├── frontend/       # React Application
│   ├── src/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```

---

# 🖥️ Backend Setup (Node.js)

## Step 1: Navigate to Backend Folder

```bash
cd backend
```

## Step 2: Install Node Modules

```bash
npm install
```

## Step 3: Create `.env` File

Create a `.env` file inside the backend folder and add the following:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=celatadb
JWT_SECRET=your_secret_key
```

⚠️ Make sure MySQL is running on your local machine.

## Step 4: Run Backend Server

If using nodemon:

```bash
npm run dev
```

Or run normally:

```bash
node server.js
```

Backend will run on:

```
http://localhost:5000
```

---

# 🌐 Frontend Setup (React)

## Step 1: Navigate to Frontend Folder

```bash
cd frontend
```

## Step 2: Install Node Modules

```bash
npm install
```

## Step 3: Start React Application

```bash
npm start
```

Frontend will run on:

```
http://localhost:3000
```

---

# 🛠️ Available Scripts

## Backend

```bash
npm run dev    # Run server using nodemon
npm start      # Run server normally
```

## Frontend

```bash
npm start      # Start development server
npm run build  # Build for production
```

---

# 🗄️ Database Setup (MySQL)

Create the database:

```sql
CREATE DATABASE celatadb;
```

Example Tasks Table:

```sql
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'TODO',
    categoryId INT,
    dueDate DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 🔐 Authentication (If Implemented)

- JWT-based authentication
- Protected routes using middleware
- Token stored in frontend (localStorage/sessionStorage)

---

# 🔌 API Endpoints (Example)

| Method | Endpoint | Description |
|--------|----------|------------|
| GET    | /tasks   | Get all tasks |
| POST   | /tasks   | Create new task |
| PUT    | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |
| POST   | /auth/register | Register user |
| POST   | /auth/login | Login user |

---

# 📦 Technologies Used

- React.js
- Node.js
- Express.js
- MySQL
- Axios
- JWT
- Nodemon

---

# 🚀 Future Improvements

- Task search & filtering
- Role-based authentication
- Dashboard with analytics
- Email reminders for due tasks
- Deployment (Render / Vercel / Railway)
- Dark Mode UI

---

# 📸 Screenshots

(Add screenshots of your application here)

Example:

```
![Dashboard Screenshot](./screenshots/dashboard.png)
```

---

# 👩‍💻 Author

**Lavanya Gunasekera**  
Associate Software Engineer  

---

# ⭐ How to Contribute

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.
