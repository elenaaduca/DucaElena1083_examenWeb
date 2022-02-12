import express from 'express';
import {
	getAllArticles, getArticleById, postArticle, updateArticle, deleteArticle,
	postReferenceIntoArticle,
	getAllReferences,
	getReferencesFromArticle,
	updateReferenceFromArticle,
	getFilteredSortedArticles,
	deleteReferenceFromArticle
} from './service.mjs';

const router = express.Router();

router.route('/articles')
	.get((request, response) => getAllArticles(request, response))
	.post((request, response) => postArticle(request, response));

router.route('/getFilteredSortedArticles')
	.get((request, response) => getFilteredSortedArticles(request, response))

router.route('/articles/:id')
	.get((request, response) => getArticleById(request, response))
	.put((request, response) => updateArticle(request, response))
	.delete((request, response) => deleteArticle(request, response));


router.route('/references')
	.get((request, response) => getAllReferences(request, response));


router.route('/articles/:articleId/references')
	.post((request, response) => postReferenceIntoArticle(request, response))
	.get((request, response) => getReferencesFromArticle(request, response))


router.route('/articles/:articleId/references/:referenceId')
	.put((request, response) => updateReferenceFromArticle(request, response))
	.delete((request, response) => deleteReferenceFromArticle(request, response))

export default router;