import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateArticleForm from "@/components/createArticleForm";

function App() {
  const [dummyArticles, setDummyArticles] = useState([]);

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

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mt-4">Nyhetssida med React</h1>
      <CreateArticleForm />

      <div className="mt-8 space-y-4 w-4/5">
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