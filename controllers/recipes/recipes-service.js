import * as DbService from '../../services/db-service/database-service.js';

export var allRecipes = [];

getRecipes().then(function(data) {
    for (const key in data) {
        if (typeof data.key === 'undefined') {
            var currRecipe = data[key];
            currRecipe.id = key;
            allRecipes.push(currRecipe);
        }
    }
    PubSub.publish('recipes-has-changed', allRecipes);
});

export function saveRecipe(recipe) {
    return new Promise(function(resolve, reject) {
        DbService.writeData('recipes/', recipe, function(response, err) {
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

export function getRecipes() {
    return new Promise(function(resolve, reject) {
        DbService.getData('recipes/', function(data, err) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export function updateRecipe(recipe) {
    return new Promise(function(resolve, reject) {
        DbService.updateData('recipes/' + recipe.id, recipe, function(response, err) {
            if (err) {
                reject(err);
            } else {
                var updatedRecipe = response.data;
                updatedRecipe.id = response.key;
                allRecipes.forEach(function(recipe) {
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

export function deleteRecipe(id) {
    return new Promise(function(resolve, reject) {
        DbService.deleteData('recipes/' + id, function(data, err) {
            if (err) {
                reject(err);
            } else {
                allRecipes = allRecipes.filter(function(recipe) {
                    if (recipe.id !== data) {
                        return recipe;
                    }
                });
                PubSub.publish('recipes-was-deleted', data);
                resolve(`The recipe was deleted successfully!`);
            }
        });
    });
}

export function onRecipesChange(cb) {
    DbService.watchForDataChange('recipes/', function(data, err) {
        if (err) {
            cb(null, err);
        } else {
            cb(data);
        }
    });
}
