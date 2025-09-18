import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CreateArticleForm({ onAddArticle }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create article object
    const newArticle = {
      id: crypto.randomUUID(),
      title,
      body,
      date: new Date().toISOString(),
      reactions: { likes: 0, dislikes: 0 },
    };

    onAddArticle(newArticle); // Notify parent

    // Clear form
    setTitle("");
    setBody("");
  };

  return (
    <Card className="w-4/5 mt-4">
      <CardHeader>
        <CardTitle>Create new article</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="p-4 bg-white">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Titel</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5 mt-2">
            <Label htmlFor="body">Text</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="mt-2 bg-blue-500 text-white px-3 py-1 rounded cursor-pointer">
            Create Article
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default CreateArticleForm;