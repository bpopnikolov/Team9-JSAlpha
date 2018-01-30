import * as DbService from '../../services/db-service/database-service.js';

export function saveRecipe(recipe) {
    DbService.writeData('recipes', recipe, function(err) {
        if (err) {
            console.log(err);
        }
    })
}

export function getRecipes() {
    return new Promise(function (resolve, reject) {
        DbService.getData('recipes/', function (recipes, err) {
            if (err) {
                reject(err);
            } else {
                resolve(recipes);
            }

        });

    });

}
