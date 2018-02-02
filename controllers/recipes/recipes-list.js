import * as RecipesService from './recipes-service.js';


export function init() {

    //domCashe
    var $container = $('.recipes-list-container');

    var allRecipes = [];

    RecipesService.getRecipes().then(function(data) {
        for (const key in data) {
            if (typeof data.key === 'undefined') {
                var currRecipe = data[key];
                currRecipe.id = key;
                allRecipes.push(currRecipe);
                renderRecipe(currRecipe);
            }
        }
    });


    // Listens for change in the DB. Be careful when using!
    // RecipesService.onRecipesChange(function (data, err) {
    //     var updated = [];
    //     for (const key in data) {
    //         if (typeof data.key === 'undefined') {
    //             var currRecipe = data[key];
    //             currRecipe.id = key;
    //             updated.push(currRecipe);
    //             renderRecipe(currRecipe);
    //         }
    //     }
    // });


    $('#addRecipe').on('click', function() {
        RecipesService.saveRecipe({
            name: 'Yogurt and blueberry popsicles',
            description: `Good Living/Sweets/Desserts`,
            ingredients: ['yogurt', 'blueberries','blueberries','blueberries','blueberries','blueberries','blueberries','blueberries','blueberries','blueberries','blueberries'],
            imgUrl: `https://www.daringgourmet.com/wp-content/uploads/2015/01/Greek-Yogurt-2-web-728px.jpg`
        }).then(function (savedRecipe) {
            allRecipes.push(savedRecipe);
            renderRecipe(savedRecipe);
        }).catch(function(err) {
            console.log(err);
        });

    });


    $('.recipes-list-container').on('click', '.foodBox', function() {
        var $recipe = $(this);
        var recipeId = $(this).attr('data-id');
        var recipeObj = allRecipes.find(function(el) {
            if (el.id === recipeId) {
                return el;
            }
        });

        $recipe.toggleClass('active').siblings().removeClass('active');

        if ($recipe.hasClass('active')) {
            PubSub.publish('recipe-was-selected', recipeObj);
        } else {
            PubSub.publish('recipe-was-unselected', recipeObj);
        }
    });

    function renderRecipe(recipe) {

        var $wrapper = $('<div>');
        $wrapper.attr('data-id', recipe.id);
        $wrapper.addClass('foodBox');
        var $title = $('<h3>');
        var $desc = $('<p>');
        // ------------------------------------
        var $descFrame = $('<div>');
        $descFrame.append($title);
        $descFrame.append($desc);
        $descFrame.addClass('texts');
        // ------------------------------------
        var $imgUrl = $('<img>');
        // ------------------------------------ 
        var $imgFrame = $('<div>');
        $imgFrame.append($imgUrl);
        $imgFrame.addClass('image');
        // ------------------------------------

        $title.text(recipe.name);
        $desc.text(recipe.description);
        $imgUrl.attr('src', recipe.imgUrl);
        // ------------------------------------
        $wrapper.append($descFrame);
        $wrapper.append($imgFrame);
        // ------------------------------------

        $container.append($wrapper);
    }
}
