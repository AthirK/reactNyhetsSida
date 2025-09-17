import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateArticleForm from "@/components/createArticleForm";
import { Toaster, toast } from "sonner";

function App() {
  const [dummyArticles, setDummyArticles] = useState([]);
  const [userArticles, setUserArticles] = useState(() => {
    const saved = localStorage.getItem("userArticles");
    return saved ? JSON.parse(saved) : [];
  });

  // useEffect med en tom beroende-array [] körs endast en gång när komponenten laddas
  useEffect(() => {
    const fetchArticlesFromDummyJSON = async () => {
      try {
        const apiResponse = await fetch('https://dummyjson.com/posts');
        const apiData = await apiResponse.json();
        setDummyArticles(apiData.posts);
      } catch (error) {
        console.error("Kunde inte hämta artiklar:", error);
      }
    };

    fetchArticlesFromDummyJSON();
  }, []); // <-- Denna tomma array säkerställer att koden bara körs en gång

  // Hämtar userArticles från localStorage
  useEffect(() => {
    const savedArticles = localStorage.getItem("userArticles");
    if (savedArticles) {
      setUserArticles(JSON.parse(savedArticles));
    }
  }, []);

  // Sparar userArticles till localStorage
  useEffect(() => {
    localStorage.setItem("userArticles", JSON.stringify(userArticles));
  }, [userArticles]);

  const handleAddArticle = (newArticle) => {
    setUserArticles([newArticle, ...userArticles]);
    toast.success("Artikel skapad!");
  };

  const handleDeleteArticle = (id) => {
    setUserArticles(userArticles.filter((a) => a.id !== id));
    toast.error("Artikel raderad!");
  };

  return (
    <div className="flex flex-col items-center">

      <Toaster position="top-center" richColors /> {/* Toast container */}
      
      <h1 className="text-2xl font-bold mt-4">Nyhetssida</h1>

      {/* Skapa ny artikel */}
      <CreateArticleForm onAddArticle={handleAddArticle} />

      <div className="mt-8 space-y-4 w-4/5">
        {/* user artiklar */}
        {userArticles.map((article) => (
          <Card key={article.id}>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>{article.title}</CardTitle>
              <button
                onClick={() => handleDeleteArticle(article.id)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
              >
                Radera
              </button>
            </CardHeader>
            <CardContent>
              <p>{article.body}</p>
              <small>{article.date}</small>
              <div className="mt-4 flex gap-2">
                <span>👍 {article.reactions.likes}</span>
                <span>👎 {article.reactions.dislikes}</span>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* dummy artiklar */}
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

export default App;