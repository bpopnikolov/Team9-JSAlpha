import * as RecipesService from './recipes-service.js';
import * as RecipeFormController from './recipes-form.js';
//domCashe
var $container;
var $addFormComponent;
var recipesHasChangedSub;
var recipeWasDeletedSub;
var recipeWasAddedSub;
var recipeWasUpdatedSub;

export function init() {

    $container = $('.recipes-list-container');

    $addFormComponent = $('#addFormComponent');
    $addFormComponent.hide();
    var $addRecipeBtn = $('#addRecipe');

    var allRecipes = RecipesService.allRecipes;
    renderRecipes(allRecipes, true);

    recipesHasChangedSub = PubSub.subscribe('recipes-has-changed', function(msg, data) {
        allRecipes = data;
        $container.html('');
        renderRecipes(data, true);
    });

    recipeWasDeletedSub = PubSub.subscribe('recipes-was-deleted', function(msg, recipeId) {
        allRecipes = allRecipes.filter(function(recipe) {
            if (recipe.id !== recipeId) {
                return recipe;
            }
        });
        $container.find(`.foodBox[data-id=${recipeId}]`).remove();
    });

    recipeWasAddedSub = PubSub.subscribe('recipe-was-added', function(msg, data) {
        var recipe = data;
        allRecipes.push(recipe);
        renderRecipe(recipe);
    });

    recipeWasUpdatedSub = PubSub.subscribe('recipe-was-updated', function(msg, data) {
        $container.html('');
        renderRecipes(allRecipes);
    });


    $container.on('click', '.foodBox', function () {
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
        $addFormComponent.show();
        $addFormComponent.load('./views/recipes/recipes-form.html', function() {
            RecipeFormController.init();
            PubSub.publish('recipe-form-mode', {
                mode: 'add'
            });
        });
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

function renderRecipes(recipes, sort) {
    if (recipes.length > 0) {
        if (sort) {
            recipes.sort(compareRecipesByName);
        }
        recipes.forEach(function(recipe) {
            renderRecipe(recipe);
        });
    } else {
        return;
    }
}

function compareRecipesByName(a, b) {
    var name1 = a.name.toLowerCase();
    var name2 = b.name.toLowerCase();

    if (name1 < name2) {
        return -1;
    }
    if (name1 > name2) {
        return 1;
    }
    return 0;
}

export function destroyComponent() {
    $container = null;
    PubSub.unsubscribe(recipesHasChangedSub);
    PubSub.unsubscribe(recipeWasDeletedSub);
    PubSub.unsubscribe(recipeWasAddedSub);
    PubSub.unsubscribe(recipeWasUpdatedSub);
}
