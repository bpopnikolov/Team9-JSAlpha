import * as RecipesService from './recipes-service.js';

export function init() {

    RecipesService.getRecipes().then(function (data) {
        var $container = $('.recipes-list-container');
        var result = [];
        for (const key in data) {
            if (typeof data.key === 'undefined') {
                result.push(data[key]);
            }
        }

        result.forEach(recipe => {
            var $wrapper = $('<div>');
            $wrapper.addClass('');
            var $title = $('<p>');
            $title.addClass('');
            var $imgUrl = $('<img>');
            $imgUrl.addClass('');

            $title.text(recipe.name);
            $imgUrl.attr('src', recipe.imgUrl);
            $wrapper.append($title);
            $wrapper.append($imgUrl);
            $container.append($wrapper);
        }); 
    });

    $('#add-recipe').on('click', function() {
        RecipesService.saveRecipe({
            name: 'Yogurt and blueberry popsicles',
            description: `Good Living/Sweets/Desserts`,
            ingredients: ['yogurt', 'blueberries']
        });
    });
}
