var $container;
var $editRecipeForm;
var sub1;
var sub2;

export function init() {

    $container = $('.recipe-desc');
    $container.css('display', 'none');
    $editRecipeForm = $('#editRecipeForm');
    var currentLoadedRecipe;

    sub1 = PubSub.subscribe('recipe-was-selected', function(msg, data) {
        console.log(data);
        $container.css('display', 'flex');
        $container.html('');
        currentLoadedRecipe = data;
        renderDetails(data);
    });

    sub2 = PubSub.subscribe('recipe-was-unselected', function(msg, data) {
        console.log('unselected');
        console.log(data);
        $container.css('display', 'none');
        $container.html('');
        currentLoadedRecipe = null;
    });


    $container.on('click', '#settingsButton, .dropdownMenu li', function() {
        $container.find('.dropdownMenu').slideToggle(200);
        $container.find('.icon-gear').toggleClass('down');
    });


    $container.on('click', '#editRecipeBtn', function () {
        $editRecipeForm.show();
    });

    $editRecipeForm.on('click', '#closeEditForm', function () {
        $editRecipeForm.hide();
    });

    $container.on('click', '#deleteRecipeBtn', function() {
        console.log('DELETEd');
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

function resetContainer() {

}

export function destroyComponent() {
    $container = null;
    PubSub.unsubscribe(sub1);
    PubSub.unsubscribe(sub2);
}
