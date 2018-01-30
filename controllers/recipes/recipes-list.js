import * as RecipesService from './recipes-service.js';

export function init() {

    RecipesService.getRecipes().then(function (data) {
        var $list = $('#recipesList');
        var result = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                result.push(data[key]);
            }
        }

        result.forEach(recipe => {
            var $listEl = $('<li>');
            $listEl.text(recipe.name);
            $list.append($listEl);
        });
    });

    $('#add-recipe').on('click', function() {
        RecipesService.saveRecipe({
            name: 'Test Recipe',
        });
    });
}
