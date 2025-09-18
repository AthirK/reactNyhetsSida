import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);

  // load the article from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("userArticles");
    if (saved) {
      const articles = JSON.parse(saved);
      const found = articles.find((a) => a.id === id);
      setArticle(found || null);
    }
  }, [id]);

  const handleLike = () => {
    if (!article) return;
    const updated = { ...article, reactions: { ...article.reactions, likes: article.reactions.likes + 1 } };
    setArticle(updated);
    updateLocalStorage(updated);
  };

  const handleDislike = () => {
    if (!article) return;
    const updated = { ...article, reactions: { ...article.reactions, dislikes: article.reactions.dislikes + 1 } };
    setArticle(updated);
    updateLocalStorage(updated);
  };

  // helper to update this article in localStorage
  const updateLocalStorage = (updatedArticle) => {
    const saved = localStorage.getItem("userArticles");
    if (saved) {
      const articles = JSON.parse(saved);
      const newList = articles.map((a) => (a.id === updatedArticle.id ? updatedArticle : a));
      localStorage.setItem("userArticles", JSON.stringify(newList));
    }
  };

  if (!article) {
    return (
      <div className="p-6">
        <button
          onClick={() => navigate("/")}
          className="mb-4 bg-gray-300 px-3 py-1 rounded"
        >
          ← Back to Home
        </button>
        <p>Article not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6">
      <button
        onClick={() => navigate("/")}
        className="self-start mb-4 bg-gray-300 px-3 py-1 rounded"
      >
        ← Back to Home
      </button>

      <Card className="w-3/4">
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{article.body}</p>
          <small>{new Date(article.date).toLocaleString()}</small>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleLike}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              👍 {article.reactions.likes}
            </button>
            <button
              onClick={handleDislike}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              👎 {article.reactions.dislikes}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ArticleDetail;