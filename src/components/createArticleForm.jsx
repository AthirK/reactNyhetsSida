import { useState } from "react";

function CreateArticleForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Skapa en artikel som objekt
    const newArticle = {
      id: crypto.randomUUID(),
      title,
      body,
      date: new Date().toISOString(),
      reactions: { likes: 0, dislikes: 0 },
    };

    console.log("Ny artikel skapad:", newArticle);

    // Rensa formuläret
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div>
        <label>Titel</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-1 w-full"
          required
        />
      </div>

      <div>
        <label>Text</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border p-1 w-full"
          required
        />
      </div>

      <button type="submit" className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
        Skapa artikel
      </button>
    </form>
  );
}

export default CreateArticleForm;