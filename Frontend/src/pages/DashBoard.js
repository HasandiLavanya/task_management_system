import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/DashBoard.css";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import CategoryForm from "../components/CategoryForm";
import CategoryList from "../components/CategoryList";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  const [editTask, setEditTask] = useState(null);
  const [editCategory, setEditCategory] = useState(null);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === "DONE").length;

  return (
    <div className="dashboard-root">
      {/* Top bar */}
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <span className="dashboard-logo">✓</span>
          <div>
            <h1 className="dashboard-title">Task Manager</h1>
            <p className="dashboard-subtitle">Organize your work and personal tasks</p>
          </div>
        </div>
        <div className="dashboard-header-right">
          {user && (
            <span className="dashboard-user">
              {user.username}
            </span>
          )}
          <button className="btn btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="dashboard-main">
        {/* Summary cards */}
        <section className="dashboard-summary">
          <div className="summary-card primary">
            <h3>Total Tasks</h3>
            <p className="summary-number">{totalTasks}</p>
          </div>
          <div className="summary-card success">
            <h3>Completed</h3>
            <p className="summary-number">{doneTasks}</p>
          </div>
          <div className="summary-card accent">
            <h3>Categories</h3>
            <p className="summary-number">{categories.length}</p>
          </div>
        </section>

        {/* Two-column layout: left = categories, right = tasks */}
        <section className="dashboard-grid">
          {/* Left: Categories */}
          <div className="dashboard-panel">
            <div className="panel-header">
              <h2>Categories</h2>
              <p className="panel-subtitle">Group your tasks by topic</p>
            </div>

            <CategoryForm
              fetchCategories={fetchCategories}
              editCategory={editCategory}
              setEditCategory={setEditCategory}
            />

            <div className="panel-divider" />

            <CategoryList
              categories={categories}
              fetchCategories={fetchCategories}
              setEditCategory={setEditCategory}
            />
          </div>

          {/* Right: Tasks */}
          <div className="dashboard-panel">
            <div className="panel-header">
              <h2>Tasks</h2>
              <p className="panel-subtitle">Create, edit and track your work</p>
            </div>

            <TaskForm
              fetchTasks={fetchTasks}
              editTask={editTask}
              setEditTask={setEditTask}
              categories={categories}
            />

            <div className="panel-divider" />

            <TaskList
              tasks={tasks}
              fetchTasks={fetchTasks}
              setEditTask={setEditTask}
            />
          </div>
        </section>
      </main>
    </div>
  );
}