import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/axios";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      axios.get("/articles").then((res) => {
        setArticles(res.data);
        setLoading(false);
      });
    }, 1000);
  }, []);

  // Normalize categories to lowercase for consistency
  const normalizedArticles = articles.map((article) => ({
    ...article,
    category: article.category.toLowerCase(),
  }));

  const categories = [
    "All",
    ...new Set(normalizedArticles.map((a) => a.category)),
  ];

  const filtered = normalizedArticles.filter((article) => {
    const searchLower = search.toLowerCase();
    const matchSearch =
      article.title.toLowerCase().includes(searchLower) ||
      article.summary.toLowerCase().includes(searchLower) ||
      article.category.toLowerCase().includes(searchLower);

    const matchCategory =
      selectedCategory === "All" || article.category === selectedCategory;

    const matchDate =
      selectedDate === "" ||
      new Date(article.date).toDateString() ===
        new Date(selectedDate).toDateString();

    return matchSearch && matchCategory && matchDate;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* === Top Navbar === */}
      <nav className="sticky top-0 z-10 bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto gap-4 flex-wrap">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="h-8" />
          </div>

          {/* Center: Search */}
          <input
            type="text"
            placeholder="Search title, summary, or category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border p-2 rounded shadow-sm max-w-md w-full"
          />

          {/* Right: Date Picker */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border p-2 rounded shadow-sm"
          />
        </div>

        {/* === Category Bar === */}
        <div className="overflow-x-auto border-t bg-gray-100">
          <div className="flex px-4 py-2 gap-2 max-w-7xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1 rounded-full text-sm border whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* === Articles Section === */}
      <div className="px-4 py-6 max-w-7xl mx-auto">
        {/* Go to Admin Panel */}
        <div className="mb-6 text-right">
          <Link
            to="/admin"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Admin Panel
          </Link>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-200 h-48 rounded-lg"
                ></div>
              ))}
          </div>
        )}

        {/* Nothing found */}
        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-10 col-span-full">
            🔍 Nothing found
          </p>
        )}

        {/* Articles Grid */}
        {!loading && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <div
                key={article._id}
                className="bg-white shadow-md rounded-lg p-4"
              >
                <Link
                  to={`/article/${article._id}`}
                  className="text-blue-600 mt-2 block"
                >
                  {article.image ? (
                    <img
                      src={article.image}
                      className="h-40 w-full object-cover mb-2 rounded"
                      alt="cover"
                    />
                  ) : (
                    <div className="h-40 w-full bg-gray-200 mb-2 rounded"></div>
                  )}
                  <h2 className="text-xl font-semibold">{article.title}</h2>
                  <p className="text-gray-600">{article.summary}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(article.date).toDateString()}
                  </p>
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
