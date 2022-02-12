import { useState, useEffect } from "react";
import {useParams, useNavigate} from 'react-router-dom'

function ArticleForm(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState({
        name: '',
        capacity: 0
    })
    const loadArticle = async(id) => {
        const response = await fetch(`/api/articles/${id}`);
        if (response.status===200){
            setArticle(await response.json());
        }
    };

    function set(property, value){
        const newArticle = {...article}; //creeaza un nou obiect cu aceleasi proprietati
        newArticle[property] = value;
        setArticle(newArticle);
    }

    useEffect(() => loadArticle(id), [id]);
    

    return(
        <div>
            <h1>Article</h1>
            <form className="formularArticol">
                <label className="formItem">Name</label>
                <input className="formItem" type="text" value={article.titlu}  
                    onChange={event => set('titlu', event.target.value)}/>
                <label className="formItem" >Rezumat</label>
                <textarea className="formItem" value={article.rezumat} 
                    onChange={event => set('rezumat', event.target.value)}/>
                
                <div>
                    
                    <input className="formItem" type="submit" value = "save"/>
                    <input className="formItem" type="reset" value = "cancel" onClick={() => navigate('/') }/>
                </div>
            </form>

        </div>
    )
}
export default ArticleForm;