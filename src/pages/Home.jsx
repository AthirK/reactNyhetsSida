import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CreateArticleForm from "@/components/CreateArticleForm";
import { toast } from "sonner";
import { useArticleStore } from "@/store/articleStore";

function Home() {
  const {
    dummyArticles,
    userArticles,
    fetchDummyArticles,
    addUserArticle,
    deleteUserArticle,
  } = useArticleStore();

  useEffect(() => {
    fetchDummyArticles();
  }, [fetchDummyArticles]);

  const handleAddArticle = (newArticle) => {
    addUserArticle(newArticle);
    toast.success("Article Created!");
  };

  const handleDeleteArticle = (id) => {
    deleteUserArticle(id);
    toast.error("Article Deleted!");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mt-4">Nyhetssida</h1>

      <CreateArticleForm onAddArticle={handleAddArticle} />

      <div className="mt-8 space-y-4 w-4/5">
        {/* user articles */}
        {userArticles.map((article) => (
          <Card key={article.id}>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>
                <Link to={`/article/${article.id}`} className="text-blue-600">
                  {article.title}
                </Link>
              </CardTitle>
              <Button
                onClick={() => handleDeleteArticle(article.id)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm cursor-pointer"
              >
                Delete
              </Button>
            </CardHeader>
            <CardContent>
              <p>{article.body}</p>
              <small>{new Date(article.date).toLocaleString()}</small>
              <div className="mt-4 flex gap-2">
                <span>👍 {article.reactions.likes}</span>
                <span>👎 {article.reactions.dislikes}</span>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* dummy articles */}
        {dummyArticles.map((dummyArticle) => (
          <Card key={dummyArticle.id}>
            <CardHeader>
              <CardTitle>{dummyArticle.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{dummyArticle.body}</p>
              <div className="mt-4 flex gap-2">
                <span>👍 {dummyArticle.reactions.likes}</span>
                <span>👎 {dummyArticle.reactions.dislikes}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;