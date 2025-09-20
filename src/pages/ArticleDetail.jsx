import { useParams, useNavigate } from "react-router-dom";
import { useArticleStore } from "@/store/articleStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userArticles, updateReactions } = useArticleStore();

  const article = userArticles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="p-6">
        <Button
          onClick={() => navigate("/")}
          className="self-start mb-4 bg-blue-500 px-3 py-1 rounded cursor-pointer"
        >
          ← Back to Home
        </Button>
        <p>Article not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6">
      <Button
        onClick={() => navigate("/")}
        className="self-start mb-4 bg-blue-500 px-3 py-1 rounded cursor-pointer"
      >
        ← Back to Home
      </Button>

      <Card className="w-3/4">
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{article.body}</p>
          <small>{new Date(article.date).toLocaleString()}</small>

          <div className="mt-6 flex gap-4">
            <Button
              onClick={() => updateReactions(article.id, "likes")}
              className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
            >
              👍 {article.reactions.likes}
            </Button>
            <Button
              onClick={() => updateReactions(article.id, "dislikes")}
              className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
            >
              👎 {article.reactions.dislikes}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ArticleDetail;