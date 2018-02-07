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

    // $submitBtn.on('click', function() {
    //     if (mode === 'add') {
    //         console.log('recipe added');
    //         submitAddForm();
    //     } else if (mode === 'edit') {
    //         submitEditForm();
    //     }
    //     //reset form
    //     // removeForm();
    // });

    $cancelBtn.on('click', function() {
        removeForm();
    });


console.log('FORM INIT');
    $formValidator = $recipeForm.validate({
        rules: {
            titleInput: 'required',
            imageUrlInput: 'required',
            descriptionInput: 'required',
            ingredientsInput: 'required',
        },
        messages: {
            titleInput: {
                required: 'The field is required!',
            },
            imageUrlInput: {
                required: 'The field is required.',
            },
            descriptionInput: {
                required: 'The field is required',
            },
            ingredientsInput: {
                required: 'The field is required',
            },
        }
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
