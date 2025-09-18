import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import CreateArticleForm from "@/components/CreateArticleForm";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function Home() {
    const [dummyArticles, setDummyArticles] = useState([]);
    const [userArticles, setUserArticles] = useState(() => {
        const saved = localStorage.getItem("userArticles");
        return saved ? JSON.parse(saved) : [];
    });

    // Fetch dummy articles
    useEffect(() => {
        const fetchArticlesFromDummyJSON = async () => {
            try {
                const apiResponse = await fetch("https://dummyjson.com/posts");
                const apiData = await apiResponse.json();
                setDummyArticles(apiData.posts);
            } catch (error) {
                console.error("Could not fetch articles:", error);
            }
        };
        fetchArticlesFromDummyJSON();
    }, []); // empty dependency array means this runs once on mount

    // Save user articles to localStorage
    useEffect(() => {
        localStorage.setItem("userArticles", JSON.stringify(userArticles));
    }, [userArticles]);

    const handleAddArticle = (newArticle) => {
        setUserArticles((prev) => [newArticle, ...prev]);
        toast.success("Article Created!");
    };

    const handleDeleteArticle = (id) => {
        setUserArticles((prev) => prev.filter((a) => a.id !== id));
        toast.error("Article Deleted!");
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mt-4">News page</h1>

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