import * as DbService from '../../services/db-service/database-service.js';

export function saveRecipe(recipe) {
    return new Promise(function(resolve, reject) {
        DbService.writeData('recipes', recipe, function(response, err) {
            if (err) {
                reject(err);
            } else {
                var savedRecipe = response.data;
                savedRecipe.id = response.key;
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

export function deleteRecipe(id) {
    return new Promise(function(resolve, reject) {
        DbService.deleteData('recipes/', id, function(err) {
            if (err) {
                reject(err);
            } else {
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
