import { useState,useEffect } from "react";
import Article from "./Article";


function Main(){
    const [articles, setArticles] = useState([]);

    const loadArticles = async () => {
        const response = await fetch ('/api/articles');
        if (response.status === 200) {
          setArticles(await response.json());
        }
      };
    useEffect(() => loadArticles(), []);

    return (
        <div className="mainMain">
            <div className="mainArticles">
            {
                articles.map((article, index) => 
                <Article key = {index} article={article}/>)
            }
            </div>
            
            <div>
                <button>add new Article</button>
            </div>
            
        </div>

    )
}

export default Main;