import { useState } from "react";

function Article(props){
    const {article} = props; 
    
    return(
        <div className="articolMain">
            <h1>{article.titlu}</h1>
            <h2>{article.rezumat}</h2>
            <h2>{article.data}</h2>
            <a href={`#/articles/${props.article.id}`}>modify article</a>
			
        </div>
    );
}

export default Article;