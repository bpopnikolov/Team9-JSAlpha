import * as headerController from './controllers/core/header.js';
import * as recipeController from './controllers/recipes/recipes.js';


$('header').load('./views/core/header.html', headerController.init);
$('.app-container').load('./views/recipes/recipes.html',recipeController.init); 



