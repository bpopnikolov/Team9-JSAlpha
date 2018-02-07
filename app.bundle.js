/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;
exports.destroyComponent = destroyComponent;

var _recipesList = __webpack_require__(7);

var RecipesListController = _interopRequireWildcard(_recipesList);

var _recipeDetails = __webpack_require__(8);

var RecipeDetailsController = _interopRequireWildcard(_recipeDetails);

var _recipesForm = __webpack_require__(2);

var RecipeFormController = _interopRequireWildcard(_recipesForm);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function init() {
    $('.recipes-list-component').load('./views/recipes/recipes-list.html', RecipesListController.init);
    $('.recipe-details-component').load('./views/recipes/recipe-details.html', RecipeDetailsController.init);
}

function destroyComponent() {
    RecipesListController.destroyComponent();
    RecipeDetailsController.destroyComponent();
    RecipeFormController.destroyForm();
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.allRecipes = undefined;
exports.saveRecipe = saveRecipe;
exports.getRecipes = getRecipes;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;
exports.onRecipesChange = onRecipesChange;

var _databaseService = __webpack_require__(3);

var DbService = _interopRequireWildcard(_databaseService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var allRecipes = exports.allRecipes = [];

getRecipes().then(function (data) {
    for (var key in data) {
        if (typeof data.key === 'undefined') {
            var currRecipe = data[key];
            currRecipe.id = key;
            allRecipes.push(currRecipe);
        }
    }
    PubSub.publish('recipes-has-changed', allRecipes);
});

function saveRecipe(recipe) {
    return new Promise(function (resolve, reject) {
        DbService.writeData('recipes/', recipe, function (response, err) {
            if (err) {
                reject(err);
            } else {
                var savedRecipe = response.data;
                savedRecipe.id = response.key;
                allRecipes.push(savedRecipe);
                PubSub.publish('recipe-was-added', savedRecipe);
                resolve(savedRecipe);
            }
        });
    });
}

function getRecipes() {
    return new Promise(function (resolve, reject) {
        DbService.getData('recipes/', function (data, err) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function updateRecipe(recipe) {
    return new Promise(function (resolve, reject) {
        DbService.updateData('recipes/' + recipe.id, recipe, function (response, err) {
            if (err) {
                reject(err);
            } else {
                var updatedRecipe = response.data;
                updatedRecipe.id = response.key;
                allRecipes.forEach(function (recipe) {
                    if (recipe.id === updatedRecipe.id) {
                        recipe = updatedRecipe;
                    }
                });
                PubSub.publish('recipe-was-updated', updatedRecipe);
                resolve(updatedRecipe);
            }
        });
    });
}

function deleteRecipe(id) {
    return new Promise(function (resolve, reject) {
        DbService.deleteData('recipes/' + id, function (data, err) {
            if (err) {
                reject(err);
            } else {
                exports.allRecipes = allRecipes = allRecipes.filter(function (recipe) {
                    if (recipe.id !== data) {
                        return recipe;
                    }
                });
                PubSub.publish('recipes-was-deleted', data);
                resolve('The recipe was deleted successfully!');
            }
        });
    });
}

function onRecipesChange(cb) {
    DbService.watchForDataChange('recipes/', function (data, err) {
        if (err) {
            cb(null, err);
        } else {
            cb(data);
        }
    });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;
exports.destroyForm = destroyForm;

var _recipesService = __webpack_require__(1);

var RecipesService = _interopRequireWildcard(_recipesService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

function init() {

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

    modeSub = PubSub.subscribe('recipe-form-mode', function (msg, data) {
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

    $imgPreview.on('error', function () {
        $(this).hide();
    });

    $('#imageUrlInput').on('input', function () {
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

    $cancelBtn.on('click', function () {
        removeForm();
    });

    $.validator.setDefaults({
        submitHandler: function submitHandler() {
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
            titleInput: 'required',
            imageUrlInput: 'required',
            descriptionInput: 'required',
            ingredientsInput: 'required'
        },
        messages: {
            titleInput: {
                required: 'The field is required!'
            },
            imageUrlInput: {
                required: 'The field is required.'
            },
            descriptionInput: {
                required: 'The field is required'
            },
            ingredientsInput: {
                required: 'The field is required'
            }
        }
    });

    console.log($formValidator);
}

function submitAddForm() {
    var ingr = $ingrInput.val().split('\n');

    RecipesService.saveRecipe({
        name: $titleInput.val(),
        imgUrl: $imgUrlInput.val(),
        description: $descInput.val(),
        ingredients: ingr
    }).then(function (savedRecipe) {}).catch(function (err) {
        console.log(err);
    });
}

function submitEditForm() {
    var ingr = $ingrInput.val().split('\n');

    recipeToEdit.name = $titleInput.val();
    recipeToEdit.imgUrl = $imgUrlInput.val();
    recipeToEdit.description = $descInput.val();
    recipeToEdit.ingredients = ingr;

    RecipesService.updateRecipe(recipeToEdit).then(function (updatedRecipe) {}).catch(function (err) {
        console.log(err);
    });
}

function removeForm() {
    $recipeFormComponent.html('');
    $recipeFormComponent.hide();
    destroyForm();
}
function destroyForm() {
    $recipeFormComponent = null;
    mode = null;
    PubSub.unsubscribe(modeSub);
    if ($formValidator) {
        $formValidator.destroy();
    }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getData = getData;
exports.watchForDataChange = watchForDataChange;
exports.writeData = writeData;
exports.updateData = updateData;
exports.deleteData = deleteData;
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCqHk8WkuwnAgCC_mimicFaBQqgwSMar3c",
    authDomain: "team9-recipe-book.firebaseapp.com",
    databaseURL: "https://team9-recipe-book.firebaseio.com",
    projectId: "team9-recipe-book",
    storageBucket: "team9-recipe-book.appspot.com",
    messagingSenderId: "792166497012"
};
firebase.initializeApp(config);

function getData(dbName, cb) {
    var dbRef = firebase.database().ref(dbName);
    dbRef.once('value').then(function (snap) {
        cb(snap.val(), null);
    }).catch(function (err) {
        cb(null, err);
    });
}

function watchForDataChange(dbName, cb) {
    var dbRef = firebase.database().ref(dbName);
    dbRef.on('value', function (snap) {
        console.log(snap.val(), 'CHANGE WATCHER');
        cb(snap.val(), null);
    });
}

function writeData(dbName, value, cb) {
    var dbRef = firebase.database().ref(dbName);
    var dbEntry = dbRef.push();
    dbEntry.set(value).then(function () {
        dbEntry.once('value').then(function (snap) {
            var data = snap.val();
            cb({
                data: data,
                key: dbEntry.key
            });
        });
    }).catch(function (err) {
        cb(null, err);
    });
}

function updateData(dbName, value, cb) {
    var dbRef = firebase.database().ref(dbName);
    dbRef.set(value).then(function () {
        dbRef.once('value').then(function (snap) {
            var data = snap.val();
            cb({
                data: data,
                key: dbRef.key
            });
        });
    }).catch(function (err) {
        cb(null, err);
    });
}

function deleteData(dbName, cb) {
    var dbRef = firebase.database().ref(dbName);
    dbRef.remove().then(function () {
        cb(dbRef.key, null);
    }).catch(function (err) {
        cb(err);
    });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _appStateService = __webpack_require__(6);

var AppStateService = _interopRequireWildcard(_appStateService);

var _header = __webpack_require__(9);

var HeaderController = _interopRequireWildcard(_header);

var _databaseService = __webpack_require__(3);

var DBService = _interopRequireWildcard(_databaseService);

var _sidenav = __webpack_require__(11);

var SidenavController = _interopRequireWildcard(_sidenav);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

$(function () {
    AppStateService.init();
    $('header').load('./views/core/header.html', HeaderController.init);
    $('.sidenav-container').load('./views/core/sidenav.html', SidenavController.init);
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;

var _recipes = __webpack_require__(0);

var RecipeController = _interopRequireWildcard(_recipes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function init() {
    var recipeSelectedSub = PubSub.subscribe('recipe-was-unloaded', function () {
        console.log('recipe destroyed');
        RecipeController.destroyComponent();
    });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;
exports.destroyComponent = destroyComponent;

var _recipesService = __webpack_require__(1);

var RecipesService = _interopRequireWildcard(_recipesService);

var _recipesForm = __webpack_require__(2);

var RecipeFormController = _interopRequireWildcard(_recipesForm);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//domCashe
var $container;
var $addFormComponent;
var recipesHasChangedSub;
var recipeWasDeletedSub;
var recipeWasAddedSub;
var recipeWasUpdatedSub;

function init() {

    $container = $('.recipes-list-container');

    $addFormComponent = $('#addFormComponent');
    $addFormComponent.hide();
    var $addRecipeBtn = $('#addRecipe');

    var allRecipes = RecipesService.allRecipes;
    renderRecipes(allRecipes, true);

    recipesHasChangedSub = PubSub.subscribe('recipes-has-changed', function (msg, data) {
        allRecipes = data;
        $container.html('');
        renderRecipes(data, true);
    });

    recipeWasDeletedSub = PubSub.subscribe('recipes-was-deleted', function (msg, recipeId) {
        allRecipes = allRecipes.filter(function (recipe) {
            if (recipe.id !== recipeId) {
                return recipe;
            }
        });
        $container.find('.foodBox[data-id=' + recipeId + ']').remove();
    });

    recipeWasAddedSub = PubSub.subscribe('recipe-was-added', function (msg, data) {
        var recipe = data;
        allRecipes.push(recipe);
        renderRecipe(recipe);
    });

    recipeWasUpdatedSub = PubSub.subscribe('recipe-was-updated', function (msg, data) {
        allRecipes.forEach(function (recipe) {
            if (recipe.id === data.id) {
                recipe = data;
            }
        });
        $container.html('');
        renderRecipes(allRecipes);
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


    $container.on('click', '.foodBox', function () {
        var $recipe = $(this);
        var recipeId = $(this).attr('data-id');
        var recipeObj = allRecipes.find(function (el) {
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

    $addRecipeBtn.on('click', function () {
        $addFormComponent.show();
        $addFormComponent.load('./views/recipes/recipes-form.html', function () {
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
        recipes.forEach(function (recipe) {
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

function destroyComponent() {
    $container = null;
    PubSub.unsubscribe(recipesHasChangedSub);
    PubSub.unsubscribe(recipeWasDeletedSub);
    PubSub.unsubscribe(recipeWasAddedSub);
    PubSub.unsubscribe(recipeWasUpdatedSub);
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;
exports.destroyComponent = destroyComponent;

var _recipesService = __webpack_require__(1);

var RecipesService = _interopRequireWildcard(_recipesService);

var _recipesForm = __webpack_require__(2);

var RecipeFormController = _interopRequireWildcard(_recipesForm);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $container;
var $editFormComponent;
var recipeWasSelectedSub;
var recipeWasUnselectedSub;
var recipeWasUpdatedSub;

function init() {

    $container = $('.recipe-desc');
    $container.css('display', 'none');
    $editFormComponent = $('#editFormComponent');
    $editFormComponent.hide();
    var currentLoadedRecipe;

    recipeWasSelectedSub = PubSub.subscribe('recipe-was-selected', function (msg, data) {
        console.log(data);
        showContainer();
        currentLoadedRecipe = data;
        renderDetails(data);
    });

    recipeWasUnselectedSub = PubSub.subscribe('recipe-was-unselected', function (msg, data) {
        console.log('unselected');
        console.log(data);
        resetContainer();
        currentLoadedRecipe = null;
    });

    recipeWasUpdatedSub = PubSub.subscribe('recipe-was-updated', function (msg, data) {
        renderDetails(data);
    });

    $container.on('click', '#settingsButton, .dropdownMenu li', function () {
        $container.find('.dropdownMenu').slideToggle(200);
        $container.find('.icon-gear').toggleClass('down');
    });

    $container.on('click', '#editRecipeBtn', function () {
        $editFormComponent.load('./views/recipes/recipes-form.html', function () {
            RecipeFormController.init();
            $editFormComponent.show();
            PubSub.publish('recipe-form-mode', { mode: 'edit', recipe: currentLoadedRecipe });
        });
    });

    $container.on('click', '#deleteRecipeBtn', function () {
        RecipesService.deleteRecipe(currentLoadedRecipe.id).then(function (msg) {
            console.log(msg);
            resetContainer();
        }).catch(function (err) {
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
    $settingsDropdown.addClass('dropdownMenu');
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
    $title.html('<h3>' + recipe.name + '</h3>');

    var $descriptionContainer = $('<div>');
    $descriptionContainer.addClass('description');
    $descriptionContainer.text(recipe.description);

    var $ingredientsContainer = $('<div>');
    $ingredientsContainer.addClass('ingredients');
    $ingredientsContainer.html('<p>Ingredients:</p>');
    var $list = $('<ul>');
    $list.addClass('list');
    recipe.ingredients.forEach(function (ingr) {
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

function destroyComponent() {
    $container = null;
    PubSub.unsubscribe(recipeWasSelectedSub);
    PubSub.unsubscribe(recipeWasUnselectedSub);
    PubSub.unsubscribe(recipeWasUpdatedSub);
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;

var _recipes = __webpack_require__(0);

var RecipeController = _interopRequireWildcard(_recipes);

var _router = __webpack_require__(10);

var Router = _interopRequireWildcard(_router);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function init() {
    Router.init({
        routes: ['/', '#home', '#recipes']
    });

    $('#navHamburger').on('click', function () {
        $(this).toggleClass('active');
        $('.shadow').fadeToggle();
        $('.sidenav .list').toggle2Classes('slide-in', 'slide-out');

        if ($('.sidenav-component').css("z-index") === "-1") {
            $('.sidenav-component').toggleZindex();
        } else {
            setTimeout(function () {
                $('.sidenav-component').toggleZindex();
            }, 500);
        }
    });

    $('#git-btn').on('click', function () {
        window.open('https://github.com/bpopnikolov/Team9-JSAlpha', '_blank');
    });

    $('.git-logo').attr('src', '../../assets/images/GitHub-Mark-32px.png');

    $('.logo').on('click', function () {
        window.location.hash = '#home';
    });

    $('#home-btn').on('click', function () {
        window.location.hash = '#home';
    });

    $('#recipes-btn').on('click', function () {
        window.location.hash = '#recipes';
    });
}

$.fn.toggle2Classes = function (class1, class2) {
    if (!class1 || !class2) {
        return this;
    }
    return this.each(function () {
        var $elm = $(this);

        if ($elm.hasClass(class1) || $elm.hasClass(class2)) {
            $elm.toggleClass(class1 + ' ' + class2);
        } else {
            $elm.addClass(class1);
        }
    });
};

$.fn.toggleZindex = function () {
    var $this = $(this);
    if ($this.css("z-index") === "-1") {
        $this.css("z-index", "100");
    } else {
        $this.css("z-index", "-1");
    }
    return this;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;

var _recipes = __webpack_require__(0);

var RecipeController = _interopRequireWildcard(_recipes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var routes = [];
var activeRoute = getCurrentRoute();

function init(options) {
    var routes = options.routes;

    // if route is '/'  load home.html
    if (!location.hash) {
        location.hash = routes[1];
        $('.app-container').load('../views/core/home.html');
    }

    if (window.location.hash) {
        if (routes.includes(activeRoute) || activeRoute === '') {
            var view = activeRoute.substring(1);
            changeActiveButton(view);

            // load current view html into app-container
            renderView(view);
        } else {

            loadDefaultRoute();
        }
    }

    $(window).on('hashchange', function (e) {
        var currentRoute = getCurrentRoute();
        var view = currentRoute.substring(1);
        console.log(view);
        if (routes.includes(currentRoute)) {
            console.log('has route change');
            if (currentRoute !== activeRoute) {
                changeActiveButton(view);

                // load current view into app-container
                renderView(view);
            }
        } else {

            loadDefaultRoute();
            location.href = "#page-not-found";
        }
        activeRoute = currentRoute;
    });
}

function changeActiveButton(view) {
    $('.list .active').removeClass('active');
    var $button = $('#' + view + '-btn');
    $button.addClass('active');
}

function clearSlashes(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
}

function checkRoute(route) {
    var fragment = route || getCurrentRoute();

    if (routes.includes(fragment)) {
        return true;
    }

    return false;
}

function getCurrentRoute() {
    return clearSlashes(decodeURI(location.hash + location.search));
}

function renderView(view) {
    if (activeRoute === '#recipes') {
        PubSub.publish('recipe-was-unloaded');
    }
    if (view === 'home') {
        $('.app-container').load('../../views/core/' + view + '.html');
    } else if (view === 'recipes') {
        $('.app-container').load('../../views/recipes/' + view + '.html', RecipeController.init);
    }
}

function loadDefaultRoute() {
    if (activeRoute === '#recipes') {
        PubSub.publish('recipe-was-unloaded');
    }
    $('.app-container').load('../../views/core/page-not-found.html');
    $('.list .active').removeClass('active');
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;
function init() {
    $('.sidenav a, .shadow').on('click', function () {
        $('#navHamburger').toggleClass('active');
        $('.shadow').fadeToggle();
        $('.sidenav .list').toggle2Classes('slide-in', 'slide-out');

        if ($('.sidenav-component').css("z-index") === "-1") {
            $('.sidenav-component').toggleZindex();
        } else {
            setTimeout(function () {
                $('.sidenav-component').toggleZindex();
            }, 500);
        }
    });
}

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map