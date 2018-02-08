import * as RecipesService from './recipes-service.js';

var modeSub;
var mode;
var $recipeFormComponent;
var $recipeForm;
var $formValidator;
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
    $recipeForm = $('#recipeForm');
    $titleInput = $recipeFormComponent.find('#titleInput');
    $imgUrlInput = $recipeFormComponent.find('#imageUrlInput');
    $imgPreview = $recipeFormComponent.find('#imgPreview');
    $descInput = $recipeFormComponent.find('#descriptionInput');
    $ingrInput = $recipeFormComponent.find('#ingredientsInput');
    $submitBtn = $recipeFormComponent.find('#submitBtn');
    $cancelBtn = $recipeFormComponent.find('#cancelBtn');

    var $formTitle = $('#formTitle');

    modeSub = PubSub.subscribe('recipe-form-mode', function(msg, data) {
        mode = data.mode;
        $formTitle.text('Add Recipe');
        if (data.recipe) {
            recipeToEdit = data.recipe;
            $formTitle.text('Edit Recipe');
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


    $cancelBtn.on('click', function() {
        removeForm();
    });

    $.validator.setDefaults({
        submitHandler: function() {
            if (mode === 'add') {
                console.log('recipe added');
                submitAddForm();
            } else if (mode === 'edit') {
                submitEditForm();
            }

            removeForm();
        }
    });

    $formValidator = $recipeForm.validate({
        rules: {
            titleInput: {
                required: true,
                minlength: 3,
                maxlength: 35,
            },
            imageUrlInput: {
                required: true,
            },
            descriptionInput: {
                required: true,
                minlength: 5,
            },
            ingredientsInput: {
                required: true,
            },
        },
        messages: {
            titleInput: {
                required: 'The field is required!',
                minlength: 'The title is too short',
                maxlength: 'The title is too long',
            },
            imageUrlInput: {
                required: 'The field is required.',
            },
            descriptionInput: {
                required: 'The field is required',
                minlength: 'The description is too short',
            },
            ingredientsInput: {
                required: 'The field is required',
            },
        }
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

function removeForm() {
    $recipeFormComponent.html('');
    $recipeFormComponent.hide();
    destroyForm();
}
export function destroyForm() {
    $recipeFormComponent = null;
    mode = null;
    PubSub.unsubscribe(modeSub);
    if ($formValidator) {
        $formValidator.destroy();
    }
}
