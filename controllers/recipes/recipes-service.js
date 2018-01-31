import * as DbService from '../../services/db-service/database-service.js';

export function saveRecipe(recipe) {
    return new Promise(function(resolve, reject) {
        DbService.writeData('recipes', recipe, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(`The recipes was saved successfully!`);
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
