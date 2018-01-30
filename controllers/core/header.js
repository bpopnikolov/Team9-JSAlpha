import * as RecipeController from '../recipes/recipes.js';
import * as Router from '../../routes/router.js';


export function init() {
    Router.init({ routes: ['/', '#home', '#recipes'] });
    

    $('#git-btn').on('click', function() {
        window.open('https://github.com/bpopnikolov/Team9-JSAlpha', '_blank');
    });

    $('.git-logo').attr('src', '../../assets/images/GitHub-Mark-32px.png');

    $('.logo').on('click', function() {
        window.location.hash = '#home';
    });

    $('#home-btn').on('click', function() {
        window.location.hash = '#home';
    });

    $('#recipes-btn').on('click', function() {
        window.location.hash = '#recipes';
    });

}
