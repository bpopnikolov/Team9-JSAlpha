import * as RecipesListController from './recipes-list.js';

export function init() {
    $('.recipes-list').load('./views/recipes/recipes-list.html', RecipesListController.init); 
    $('.recipes-details').load('./views/recipes/recipes-details.html'); 
}

