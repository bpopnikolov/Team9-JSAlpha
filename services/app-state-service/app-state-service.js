import * as RecipeController from '../../controllers/recipes/recipes.js';

var recipeSelectedSub = PubSub.subscribe('recipe-was-unloaded', function () {
    console.log('recipe destroyed');
    RecipeController.destroyComponent();
});

