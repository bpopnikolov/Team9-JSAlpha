import * as RecipesListController from './recipes-list.js';
import * as RecipeDetailsController from './recipe-details.js';
import * as RecipeFormController from './recipes-form.js';

export function init() {
    $('.recipes-list-component').load('./views/recipes/recipes-list.html', RecipesListController.init); 
    $('.recipe-details-component').load('./views/recipes/recipe-details.html', RecipeDetailsController.init); 
}

export function destroyComponent() {
    RecipesListController.destroyComponent();
    RecipeDetailsController.destroyComponent();
    RecipeFormController.destroyForm();
}
