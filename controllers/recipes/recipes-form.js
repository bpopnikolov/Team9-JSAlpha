import * as RecipesService from './recipes-service.js';
var modeSub;
var mode;
var $recipeFormComponent;
var recipeToEdit;

var $titleInput;
var $imgUrlInput;
var $imgPreview;
var $descInput;
var $ingrInput;
var $submitBtn;
var $cancelBtn;

export function init() {

    // domCache
    $recipeFormComponent = $('.recipeFormComponent');
    $titleInput = $recipeFormComponent.find('#titleInput');
    $imgUrlInput = $recipeFormComponent.find('#imageUrlInput');
    $imgPreview = $recipeFormComponent.find('#imgPreview');
    $descInput = $recipeFormComponent.find('#descriptionInput');
    $ingrInput = $recipeFormComponent.find('#ingredientsInput');
    $submitBtn = $recipeFormComponent.find('#submitBtn');
    $cancelBtn = $recipeFormComponent.find('#cancelBtn');

    modeSub = PubSub.subscribe('recipe-form-mode', function(msg, data) {
        mode = data.mode;
        if (data.recipe) {
            recipeToEdit = data.recipe;

            $titleInput.val(recipeToEdit.name);
            $imgUrlInput.val(recipeToEdit.imgUrl);
            $imgPreview.attr('src', recipeToEdit.imgUrl);
            $imgPreview.fadeIn();
            $descInput.val(recipeToEdit.description);
            $ingrInput.val(recipeToEdit.ingredients.join('\n'));
        }
    });


    $imgPreview.on('error', function() {
        $(this).hide();
    });

    $('#imageUrlInput').on('input', function() {
        $imgPreview.attr('src', $(this).val()).fadeIn();
    });

    $submitBtn.on('click', function() {
        if (mode === 'add') {
            console.log('recipe added');
            submitAddForm();
        } else if (mode === 'edit') {
            submitEditForm();
        }
        //reset form
        destroyForm();
    });

    $cancelBtn.on('click', function() {
        destroyForm();
    });
}

function submitAddForm() {

    var ingr = $ingrInput.val().split('\n');

    RecipesService.saveRecipe({
        name: $titleInput.val(),
        imgUrl: $imgUrlInput.val(),
        description: $descInput.val(),
        ingredients: ingr,
    }).then(function(savedRecipe) {

    }).catch(function(err) {
        console.log(err);
    });
}

function submitEditForm() {
    var ingr = $ingrInput.val().split('\n');

    recipeToEdit.name = $titleInput.val();
    recipeToEdit.imgUrl = $imgUrlInput.val();
    recipeToEdit.description = $descInput.val();
    recipeToEdit.ingredients = ingr;

    RecipesService.updateRecipe(recipeToEdit).then(function(updatedRecipe) {

    }).catch(function(err) {
        console.log(err);
    });

}

export function destroyForm() {
    $recipeFormComponent.html('');
    $recipeFormComponent.hide();
    PubSub.unsubscribe(modeSub);
    mode = null;
}
