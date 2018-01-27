import * as RecipeController from '../controllers/recipes/recipes.js';

export function init() {
    var routes = ['/', '#home', '#recipes'];
    var activeRoute = window.location.hash;

    // if route is '/'  load home.html
    if (!window.location.hash) {
        window.location.hash = routes[1];
        $('.app-container').load(`../views/core/home.html`);
    }

    if (window.location.hash) {
        if (routes.includes(activeRoute)) {
            var page = activeRoute.substring(1);
            var $button = $(`#${page}-btn`);
            $button.addClass('active');

            // load current page html into app-container
            if (page === 'home') {
                $('.app-container').load(`../../views/core/${page}.html`);
            } else if (page === 'recipes') {
                $('.app-container').load(`../../views/recipes/${page}.html`, RecipeController.init);
            }
        }
    }


    $(window).on('hashchange', function(e) {
        var currentRoute = e.target.location.hash;
        if (routes.includes(currentRoute)) {
            console.log('has route');
            if (currentRoute !== activeRoute) {
                // change which button is active depending on the route
                $('.list .active').removeClass('active');
                activeRoute = currentRoute;
                var page = currentRoute.substring(1);
                var $button = $(`#${page}-btn`);
                $button.addClass('active');

                // load current page html into app-container
                if (page === 'home') {
                    $('.app-container').load(`../../views/core/${page}.html`);
                } else if (page === 'recipes') {
                    $('.app-container').load(`../../views/recipes/${page}.html`, RecipeController.init);
                }
            }
        } else {
            console.log('no route');
            $('.list .active').removeClass('active');
        }
    });
}
