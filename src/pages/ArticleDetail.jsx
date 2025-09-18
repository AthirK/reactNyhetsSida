import { useParams } from "react-router-dom";

function ArticleDetail() {
    const { id } = useParams();

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold">Artikel {id}</h2>
            <p>more info coming soon.</p>
        </div>
    );
}

export default ArticleDetail;
