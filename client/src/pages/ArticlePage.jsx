import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../services/axios";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`/articles/${id}`).then((res) => setArticle(res.data));
  }, [id]);

  if (!article) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <p className="text-sm text-gray-500">
        {new Date(article.date).toDateString()}
      </p>
      {article.image && (
        <img
          src={article.image}
          className="w-full mt-4 mb-4 rounded"
          alt="cover"
        />
      )}
      <p className="text-lg">{article.content}</p>
    </div>
  );
};

export default ArticlePage;
