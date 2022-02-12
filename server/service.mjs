import Sequelize from 'sequelize';
import { Article, Reference} from './repository.mjs';

const Op = Sequelize.Op

//o	Operație GET pentru prima entitate 


async function getAllArticles(request, response) {
	try {

        const articles = await Article.findAll();
        if (articles.length > 0) {
          response.json(articles);
        } else {
          response.sendStatus(204);
        }


      } catch (error) {
        next(error);
      }
    }
	

//get cu filtrare, ordonare si paginare

async function getFilteredSortedArticles(req,res){
	try {
		const query = {}
		let pageSize = 2
		const allowedFilters = ['titlu', 'rezumat']
		const filterKeys = Object.keys(req.query).filter(e => allowedFilters.indexOf(e) !== -1)
		if (filterKeys.length > 0) {
		  query.where = {}
		  for (const key of filterKeys) {
			query.where[key] = {
			  [Op.like]: `%${req.query[key]}%`
			}
		  }
		}
	
		const sortField = req.query.sortField
		let sortOrder = 'ASC'
		if (req.query.sortOrder && req.query.sortOrder === '-1') {
		  sortOrder = 'DESC'
		}
	
		if (req.query.pageSize) {
		  pageSize = parseInt(req.query.pageSize)
		}
	
		if (sortField) {
		  query.order = [[sortField, sortOrder]]
		}
	
		if (!isNaN(parseInt(req.query.page))) {
		  query.limit = pageSize
		  query.offset = pageSize * parseInt(req.query.page)
		}
	
		const records = await Article.findAll(query)
		const count = await Article.count()
		res.status(200).json({ records, count })
	  } catch (e) {
		console.warn(e)
		res.status(500).json({ message: 'server error' })
	  }
}

//get pentru un anumit Article

async function getArticleById(request, response) {
	try {
		if (request.params.id) {
			const article = await Article.findByPk(request.params.id);
			if (article) {
				response.json(article);
			} else {
				response.status(404).send();
			}
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

//o	Operație POST pentru prima entitate 

async function postArticle(request, response) {
	try {
		if (request.body.titlu) {
			await Article.create(request.body);
			response.status(201).send();
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}


//o	Operație PUT pentru prima entitate 
async function updateArticle(request, response) {
	try {
		const article = await Article.findByPk(request.params.id);
		if (article) {
			Object.entries(request.body).forEach(([name, value]) => article[name] = value);
			await article.save();
			response.status(204).send();
		} else {
			response.status(404).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

//o	Operație DELETE pentru prima entitate 

async function deleteArticle(request, response) {
	try {
		if (request.params.id) {
			const article = await Article.findByPk(request.params.id);
			if (article) {
				await article.destroy();
				response.status(204).send();
			} else {
				response.status(404).send();
			}
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}





//get all references (utila)

async function getAllReferences(request, response) {
	try {
		const references = await Reference.findAll();
		if (references.length > 0) {
			response.status(200).json(references);
		} else {
			response.status(204).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}


//o	Operație POST pentru a doua entitate ca subresursă 
//post Reference into Article

async function postReferenceIntoArticle(request, response) {
	try {
		const article = await Article.findByPk(request.params.articleId);
		if (article) {
		  const reference = await Reference.create(request.body);
		  article.addReference(reference);
		  await article.save();
		  response.status(201).location(reference.id).send();
		} else {
		  response.sendStatus(404);
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

//o	Operație GET pentru a doua entitate ca subresursă
//referintele unui anumit articol

async function getReferencesFromArticle(request, response) {
	try {
		const article = await Article.findByPk(request.params.articleId);
		if (article) {
		  const references = await article.getReferences();
		  if (references.length > 0) {
			response.json(references);
		  } else {
			response.sendStatus(204);
		  }
		  
		} else {
		  response.sendStatus(404);
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

//o	Operație PUT pentru a doua entitate ca subresursă 
//update o anumita Reference dintr-un anumit Article

async function updateReferenceFromArticle(request, response) {
	try {
		const article = await Article.findByPk(request.params.articleId);
		if (article) {
		  const references = await article.getReferences({id: request.params.referenceId});
		  const reference = references.shift();
		  if (reference) {
			await reference.update(request.body);
			response.status(204);
		  } else {
			response.sendStatus(404);
		  }
		} else {
		  response.sendStatus(404);
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

//o	Operație DELETE pentru a doua entitate ca subresursă 
//sterge o anumita Reference dintr-un anumit Article

async function deleteReferenceFromArticle(request, response) {
	try {
		const article = await Article.findByPk(request.params.articleId);
		if (article) {
		  const references = await article.getReferences({id: request.params.referenceId});
		  const reference = references.shift();
		  if (reference) {
			await reference.destroy();
			response.sendStatus(204);
		  } else {
			response.sendStatus(404);
		  }
		} else {
		  response.sendStatus(404);
		}
	} catch (error) {
		response.status(500).json(error);
	}
}







export {
	getAllArticles, getArticleById, postArticle, updateArticle, deleteArticle,
	getAllReferences,postReferenceIntoArticle,
	getReferencesFromArticle,updateReferenceFromArticle,
	deleteReferenceFromArticle,
	getFilteredSortedArticles
}