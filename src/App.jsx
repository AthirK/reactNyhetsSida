import { Button } from "@/components/ui/button"

const fetchArticlesFromAPI = async () => {
  try {
    const apiResponse = await fetch('https://dummyjson.com/posts');
    const dummyData = await apiResponse.json();
    console.log(dummyData.posts);
  } catch (error) {
    console.error("Kunde inte hämta artiklar:", error);
  }
};

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button onClick={fetchArticlesFromAPI}>Click me</Button>
    </div>
  )
}

export default App