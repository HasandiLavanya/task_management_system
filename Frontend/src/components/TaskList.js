import API from "../api/axios";
import "../styles/TaskList.css";

export default function TaskList({ tasks, fetchTasks, setEditTask }) {
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="task-list-wrapper">
      <div className="task-list-header">
        <h3>Tasks</h3>
        <span className="task-count">{tasks.length} total</span>
      </div>

      {tasks.length === 0 && (
        <div className="task-empty">No tasks yet. Create your first task!</div>
      )}

      <div className="task-list-grid">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <div className="task-card-header">
              <div>
                <div className="task-title">{task.title}</div>
                {task.category?.name && (
                  <span className="task-chip">{task.category.name}</span>
                )}
              </div>
              <span className={`task-status status-${task.status}`}>
                {task.status.replace("_", " ")}
              </span>
            </div>

            {task.description && (
              <p className="task-description">{task.description}</p>
            )}

            <div className="task-meta">
              {/* Adapt if you expose createdAt/updatedAt differently */}
              <span>
                Created:{" "}
                {task.created_at
                  ? new Date(task.created_at).toLocaleString()
                  : "-"}
              </span>
              {task.dueDate && (
                <span>
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>

            <div className="task-buttons">
              <button
                className="btn btn-edit"
                onClick={() => setEditTask(task)}
              >
                Edit
              </button>
              <button
                className="btn btn-delete"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}