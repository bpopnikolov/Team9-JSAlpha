import * as RecipeController from '../../controllers/recipes/recipes.js';

export function init() {
    var recipeSelectedSub = PubSub.subscribe('recipe-was-unloaded', function () {
        console.log('recipe destroyed');
        RecipeController.destroyComponent();
    });
}


