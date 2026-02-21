import { useState, useEffect } from "react";
import API from "../api/axios";
import "../styles/CategoryForm.css";

export default function CategoryForm({
  fetchCategories,
  editCategory,
  setEditCategory,
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editCategory) {
      setName(editCategory.name);
    } else {
      setName("");
    }
  }, [editCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editCategory) {
        await API.put(`/categories/${editCategory.id}`, { name });
        setEditCategory(null);
      } else {
        await API.post("/categories", { name });
      }

      setName("");
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
      alert("Failed to save category");
    }
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <h3>{editCategory ? "Edit Category" : "Add Category"}</h3>

      <input
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <button type="submit">
        {editCategory ? "Update" : "Create"}
      </button>
    </form>
  );
}