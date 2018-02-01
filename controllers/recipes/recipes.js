import * as RecipesListController from './recipes-list.js';
import * as RecipeDetailsController from './recipe-details.js';

export function init() {
    $('.recipes-list-component').load('./views/recipes/recipes-list.html', RecipesListController.init); 
    $('.recipe-details-component').load('./views/recipes/recipe-details.html', RecipeDetailsController.init); 
}

