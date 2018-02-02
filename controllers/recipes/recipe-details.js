export function init() {
    $("#edit-recipe").on('click',function(){
        $('#modalEdit').show();
    });

    var $container = $('.recipe-desc');
    $container.css('display', 'none');

    var sub1 = PubSub.subscribe('recipe-was-selected', function(msg, data) {
        console.log(data);
        $container.css('display', 'flex');
        renderDetails(data);
    });

    var sub2 = PubSub.subscribe('recipe-was-unselected', function(msg, data) {
        console.log('unselected');
        console.log(data);
        $container.css('display', 'none');
        $container.html('');
    });

    function renderDetails(recipe) {
        //clear current loaded recipe
        $container.html('');

        var $imgContainer = $('<div>');
        $imgContainer.addClass('recipe-image');
        var $recipeImg = $('<img>');
        $recipeImg.attr('src', recipe.imgUrl);
        $imgContainer.append($recipeImg);

        var $recipeInfoContainer = $('<div>');
        $recipeInfoContainer.addClass('recipe-info');
        var $title = $('<div>');
        $title.addClass('title');
        $title.html(`<h3> ${recipe.name}</h3>`);

        var $descriptionContainer = $('<div>');
        $descriptionContainer.addClass('description');
        $descriptionContainer.text(recipe.description);


        var $ingredientsContainer = $('<div>');
        $ingredientsContainer.addClass('ingredients');

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
    $('#close-edit').on('click',function(){
        $('#modalEdit').hide();
        
    })

    $('#remove-recipe').on('click',function(){
        var result = confirm("Want to delete?");
        if (result) {
            alert('this recipe is deleted');
        }
    })
}
