import * as RecipesService from './recipes-service.js';
//domCashe
var $container;
var $addRecipeForm;
var recipesHasChangedSub;
var recipeWasDeletedSub;

export function init() {

    $container = $('.recipes-list-container');
    $addRecipeForm = $('#addRecipeForm');
    var allRecipes = RecipesService.allRecipes;
    renderRecipes(allRecipes);
    var $addRecipeBtn = $('#addRecipe');
    var $addRecipeFormBtn = $('#addFormAddRecipeBtn');
    var $closeAddForm = $('#closeAddForm');

    recipesHasChangedSub = PubSub.subscribe('recipes-has-changed', function(msg, data) {
        allRecipes = data;
        $container.html('');
        renderRecipes(data);
    });

    recipeWasDeletedSub = PubSub.subscribe('recipes-was-deleted', function(msg, recipeId) {
        allRecipes = allRecipes.filter(function(recipe) {
            if (recipe.id !== recipeId) {
                return recipe;
            }
        });
        $container.find(`.foodBox[data-id=${recipeId}]`).remove();
    });


    // RecipesService.getRecipes().then(function(data) {
    //     for (const key in data) {
    //         if (typeof data.key === 'undefined') {
    //             var currRecipe = data[key];
    //             currRecipe.id = key;
    //             allRecipes.push(currRecipe);
    //             renderRecipe(currRecipe);
    //         }
    //     }
    // });


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



    $container.on('click', '.foodBox', function() {
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

    $addRecipeBtn.on('click', function() {
        $addRecipeForm.show();
    });

    $addRecipeFormBtn.on('click', function() {
        var $titleInput = $('#addFormTitleInput');
        var $imgUrlInput = $('#addFormImageInput');
        var $descInput = $('#addFormDescInput');
        var $ingrInput = $('#addFormIngrInput');

        var ingr = $ingrInput.val().split('\n');

        RecipesService.saveRecipe({
            name: $titleInput.val(),
            imgUrl: $imgUrlInput.val(),
            description: $descInput.val(),
            ingredients: ingr,
        }).then(function(savedRecipe) {
            //reset form
            $addRecipeForm.find('input[type=text], textarea').val('');

            $addRecipeForm.hide();

            allRecipes.push(savedRecipe);
            renderRecipe(savedRecipe);
        }).catch(function(err) {
            console.log(err);
        });
    });

    $closeAddForm.on('click', function() {
        $addRecipeForm.hide();
    });
}

function renderRecipe(recipe) {

    // TODO check for recipe name, description, imgUrl
    // testing
    if (recipe) {
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
    } else {
        return;
    }

}

function renderRecipes(recipes) {
    if (recipes.length > 0) {
        recipes.forEach(function(recipe) {
            renderRecipe(recipe);
        });
    } else {
        return;
    }
}

export function destroyComponent() {
    $container = null;
    PubSub.unsubscribe(recipesHasChangedSub);
    PubSub.unsubscribe(recipeWasDeletedSub);
}
