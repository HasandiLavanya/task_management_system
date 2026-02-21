import { useState, useEffect } from "react";
import API from "../api/axios";
import "../styles/TaskForm.css";

export default function TaskForm({ fetchTasks, editTask, setEditTask, categories }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "TODO",
    categoryId: "",
    dueDate: "",
  });

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title || "",
        description: editTask.description || "",
        status: editTask.status || "TODO",
        // Sequelize: category has id, not _id
        categoryId: editTask.category?.id || editTask.categoryId || "",
        dueDate: editTask.dueDate ? editTask.dueDate.substring(0, 10) : "",
      });
    } else {
      setForm({
        title: "",
        description: "",
        status: "TODO",
        categoryId: "",
        dueDate: "",
      });
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      status: form.status,
      categoryId: form.categoryId || null,
      dueDate: form.dueDate || null,
    };

    try {
      if (editTask) {
        // use editTask.id (Sequelize primary key)
        await API.patch(`/tasks/${editTask.id}`, payload);
        setEditTask(null);
      } else {
        await API.post("/tasks", payload);
      }

      setForm({
        title: "",
        description: "",
        status: "TODO",
        categoryId: "",
        dueDate: "",
      });

      fetchTasks();
    } catch (err) {
      console.error("Error saving task:", err);
      alert("Failed to save task");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{editTask ? "Edit Task" : "Add Task"}</h3>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>

      <select
        value={form.categoryId}
        onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
      >
        <option value="">No Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
      />

      <button type="submit">
        {editTask ? "Update" : "Create"}
      </button>
    </form>
  );
}