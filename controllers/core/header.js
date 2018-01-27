import * as RecipeController from '../recipes/recipes.js';
import * as Router from '../../routes/router.js';


export function init() {
    Router.init();

    $('#git-btn').on('click', function() {
        window.open('https://github.com/bpopnikolov/Team9-JSAlpha', '_blank');
    });

    $('.git-logo').attr('src', '../../assets/images/GitHub-Mark-32px.png');

    $('.logo').on('click', function() {
        $('.app-container').load('../../views/core/home.html');
    });

    $('#home-btn').on('click', function() {
        $('.app-container').load('../../views/core/home.html');
    });

    $('#recipes-btn').on('click', function() {
        $('.app-container').load('../../views/recipes/recipes.html', RecipeController.init);
    });

}
