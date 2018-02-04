var $container;
var sub1;
var sub2;

export function init() {

    sub1 = PubSub.subscribe('recipe-was-selected', function(msg, data) {
        console.log(data);
        $container.css('display', 'flex');
        renderDetails(data);
    });
    
    sub2 = PubSub.subscribe('recipe-was-unselected', function(msg, data) {
        console.log('unselected');
        console.log(data);
        $container.css('display', 'none');
        $container.html('');
    });

    $container = $('.recipe-desc');
    $container.css('display', 'none');

    $container.on('click', '#settingsButton', function () {
        var ul = $container.find('.dropdownMenu').slideToggle(200);
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
    $settingsSpan.addClass('icon icon-gear');
    $buttonContainer.append($settingsButton);

    var $settingsDropdown = $('<ul>');
    $settingsDropdown.addClass('dropdownMenu')
    var $menuEditBtn = $('<li>');
    $menuEditBtn.addClass('item');
    $menuEditBtn.text('Edit');
    var $menuDeleteBtn = $('<li>');
    $menuDeleteBtn.addClass('item');
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

export function destroyComponent() {
    $container = null;
    PubSub.unsubscribe(sub1);
    PubSub.unsubscribe(sub2);
}
