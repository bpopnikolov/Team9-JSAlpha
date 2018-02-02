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
            $wrapper.addClass('foodBox');
            var $title = $('<h3>');
            $title.addClass('nameOfRecipe');
            // ------------------------------------ 
            //var $titleFrame = $('<div>');
            //$titleFrame.append($title);
            //$titleFrame.addClass('texts');
            // ------------------------------------
            var $desc = $('<p>');
            $desc.addClass('nameOfRecipe');
            // ------------------------------------
            var $descFrame = $('<div>');
            $descFrame.append($title);
            $descFrame.append($desc);
            $descFrame.addClass('texts');
            // ------------------------------------
            var $imgUrl = $('<img>');
            $imgUrl.addClass('recipeImage');
            // ------------------------------------ 
            var $imgFrame = $('<div>');
            $imgFrame.append($imgUrl);
            $imgFrame.addClass('image');
            // ------------------------------------

            $title.text(recipe.name);
            $desc.text(recipe.description);
            $imgUrl.attr('src', recipe.imgUrl);
            //$wrapper.append($title);
            //$wrapper.append($desc);
            //$wrapper.append($imgUrl); 
            // ------------------------------------
            //$wrapper.append($titleFrame);
            $wrapper.append($descFrame);
            $wrapper.append($imgFrame);
            // ------------------------------------

            $container.append($wrapper);
        });
    });


    RecipesService.onRecipesChange(function (data, err) {
        console.log(data);
    });

    $('#add-recipe').on('click', function() {
        RecipesService.saveRecipe({
            name: 'Yogurt and blueberry popsicles',
            description: `Good Living/Sweets/Desserts`,
            ingredients: ['yogurt', 'blueberries'],
            imgUrl: `https://www.daringgourmet.com/wp-content/uploads/2015/01/Greek-Yogurt-2-web-728px.jpg`
        }).then(function (msg) {
            console.log(msg);
        }).catch(function (err) {
            console.log(err);
        });
    });


    $('.recipes-list-container').on('click', '.foodBox', function () {
        $(this).toggleClass('active').siblings().removeClass('active');
    });
}
