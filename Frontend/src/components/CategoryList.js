import API from "../api/axios";
import "../styles/CategoryList.css";

export default function CategoryList({
  categories,
  fetchCategories,
  setEditCategory,
}) {
  const deleteCategory = async (id) => {
    try {
      await API.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("Failed to delete category");
    }
  };

  return (
    <div>
      <h3>Categories</h3>

      {categories.map((cat) => (
        <div key={cat.id} className="category-card">
          <span>{cat.name}</span>

          <div>
            <button
              className="category-edit"
              onClick={() => setEditCategory(cat)}
            >
              Edit
            </button>

            <button
              className="category-delete"
              onClick={() => deleteCategory(cat.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}