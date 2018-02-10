import * as DbService from '../../services/db-service/database-service.js';

export function saveRecipe(recipe) {
    return new Promise(function(resolve, reject) {
        DbService.writeData('recipes/', recipe, function(response, err) {
            if (err) {
                reject(err);
            } else {
                var savedRecipe = response.data;
                savedRecipe.id = response.key;
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
                var currRecipes = [];
                for (const key in data) {
                    if (typeof data.key === 'undefined') {
                        var currRecipe = data[key];
                        currRecipe.id = key;
                        currRecipes.push(currRecipe);
                    }
                }
                resolve(currRecipes.slice());
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
