/**
 * Copyright 2025 Aditya Pratap Singh Ravat
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
