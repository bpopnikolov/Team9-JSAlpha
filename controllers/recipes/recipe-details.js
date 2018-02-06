import * as RecipesService from './recipes-service.js';
import * as RecipeFormController from './recipes-form.js';

var $container;
var $editFormComponent;
var recipeWasSelectedSub;
var recipeWasUnselectedSub;
var recipeWasUpdatedSub;

export function init() {

    $container = $('.recipe-desc');
    $container.css('display', 'none');
    $editFormComponent = $('#editFormComponent');
    $editFormComponent.hide();
    var currentLoadedRecipe;

    recipeWasSelectedSub = PubSub.subscribe('recipe-was-selected', function(msg, data) {
        console.log(data);
        showContainer();
        currentLoadedRecipe = data;
        renderDetails(data);
    });

    recipeWasUnselectedSub = PubSub.subscribe('recipe-was-unselected', function(msg, data) {
        console.log('unselected');
        console.log(data);
        resetContainer();
        currentLoadedRecipe = null;
    });

    recipeWasUpdatedSub = PubSub.subscribe('recipe-was-updated', function(msg, data) {
        renderDetails(data);
    });

    $container.on('click', '#settingsButton, .dropdownMenu li', function() {
        $container.find('.dropdownMenu').slideToggle(200);
        $container.find('.icon-gear').toggleClass('down');
    });


    $container.on('click', '#editRecipeBtn', function() {
        $editFormComponent.load('./views/recipes/recipes-form.html', function () {
            RecipeFormController.init();
            $editFormComponent.show();
            PubSub.publish('recipe-form-mode', {mode: 'edit', recipe: currentLoadedRecipe});
        });
    });


    $container.on('click', '#deleteRecipeBtn', function() {
        RecipesService.deleteRecipe(currentLoadedRecipe.id).then(function(msg) {
            console.log(msg);
            resetContainer();
        }).catch(function(err) {
            console.log(err);
        });
    });

}

function renderDetails(recipe) {
    //clear current loaded recipe
    $container.html('');

    var $imgContainer = $('<div>');
    $imgContainer.addClass('recipe-image');

    var $buttonContainer = $('<div>');
    $buttonContainer.addClass('settingsContainer');

    var $settingsButton = $('<a>');
    $settingsButton.addClass('icon-btn');
    $settingsButton.attr('id', 'settingsButton');
    var $settingsSpan = $('<span>');
    $settingsButton.append($settingsSpan);
    $settingsSpan.addClass('icon icon-gear rotate');
    $buttonContainer.append($settingsButton);

    var $settingsDropdown = $('<ul>');
    $settingsDropdown.addClass('dropdownMenu')
    var $menuEditBtn = $('<li>');
    $menuEditBtn.addClass('item');
    $menuEditBtn.attr('id', 'editRecipeBtn');
    $menuEditBtn.text('Edit');
    var $menuDeleteBtn = $('<li>');
    $menuDeleteBtn.addClass('item');
    $menuDeleteBtn.attr('id', 'deleteRecipeBtn');
    $menuDeleteBtn.text('Delete');
    $settingsDropdown.append($menuEditBtn);
    $settingsDropdown.append($menuDeleteBtn);
    $buttonContainer.append($settingsDropdown);

    var $recipeImg = $('<img>');
    $recipeImg.attr('src', recipe.imgUrl);

    $imgContainer.append($buttonContainer);
    $imgContainer.append($recipeImg);

    var $recipeInfoContainer = $('<div>');
    $recipeInfoContainer.addClass('recipe-info');
    var $title = $('<div>');
    $title.addClass('title');
    $title.html(`<h3>${recipe.name}</h3>`);

    var $descriptionContainer = $('<div>');
    $descriptionContainer.addClass('description');
    $descriptionContainer.text(recipe.description);


    var $ingredientsContainer = $('<div>');
    $ingredientsContainer.addClass('ingredients');
    $ingredientsContainer.html(`<p>Ingredients:</p>`);
    var $list = $('<ul>');
    $list.addClass('list');
    recipe.ingredients.forEach(ingr => {
        var $item = $('<li>');
        $item.addClass('item');
        $item.text(ingr);
        $list.append($item);
    });
    $ingredientsContainer.append($list);

    $recipeInfoContainer.append($title);
    $recipeInfoContainer.append($descriptionContainer);
    $recipeInfoContainer.append($ingredientsContainer);


    $container.append($imgContainer);
    $container.append($recipeInfoContainer);

}

function showContainer() {
    $container.css('display', 'flex');
    $container.html('');
}

function resetContainer() {
    $container.css('display', 'none');
    $container.html('');
}

export function destroyComponent() {
    $container = null;
    PubSub.unsubscribe(recipeWasSelectedSub);
    PubSub.unsubscribe(recipeWasUnselectedSub);
    PubSub.unsubscribe(recipeWasUpdatedSub);
}
