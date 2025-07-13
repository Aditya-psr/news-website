import { useEffect, useState } from "react";
import axios from "../services/axios";

const AdminDashboard = () => {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    image: "",
    date: "",
  });

  const [articles, setArticles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("token");

  const fetchArticles = () => {
    axios.get("/articles").then((res) => setArticles(res.data));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.put(`/articles/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("/articles", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setForm({
        title: "",
        summary: "",
        content: "",
        category: "",
        image: "",
        date: "",
      });
      setIsEditing(false);
      setEditId(null);
      fetchArticles();
    } catch (err) {
      alert("Error saving article.");
    }
  };

  const handleEdit = (article) => {
    setForm({
      title: article.title,
      summary: article.summary,
      content: article.content,
      category: article.category,
      image: article.image || "",
      date: article.date ? article.date.slice(0, 10) : "",
    });
    setIsEditing(true);
    setEditId(article._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    await axios.delete(`/articles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchArticles();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          placeholder="Summary"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Full Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="border p-2 rounded h-32"
          required
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value.toUpperCase() })}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="border p-2 rounded"
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
          type="submit"
        >
          {isEditing ? "Update Article" : "Post Article"}
        </button>
      </form>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">All Articles</h2>
        <ul className="space-y-2">
          {articles.map((article) => (
            <li
              key={article._id}
              className="border rounded p-3 flex justify-between items-start flex-col sm:flex-row sm:items-center gap-2"
            >
              <div>
                <p className="font-semibold">{article.title}</p>
                <p className="text-sm text-gray-500">
                  {new Date(article.date).toLocaleDateString()} |{" "}
                  {article.category}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(article)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
