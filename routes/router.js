import * as RecipeController from '../controllers/recipes/recipes.js';

var routes = [];
var activeRoute = getCurrentRoute();

export function init(options) {
    var routes = options.routes;

    // if route is '/'  load home.html
    if (!location.hash) {
        location.hash = routes[1];
        $('.app-container').load(`../views/core/home.html`);
    }

    if (window.location.hash) {
        if (routes.includes(activeRoute) || activeRoute === '') {
            var view = activeRoute.substring(1);
            changeActiveButton(view);

            // load current view html into app-container
            renderView(view);
        } else {
            console.log('no route');
            $('.app-container').load(`../../views/core/page-not-found.html`);
            $('.list .active').removeClass('active');
        }
    }


    $(window).on('hashchange', function(e) {
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
            console.log('no route change');
            $('.app-container').load(`../../views/core/page-not-found.html`);
            $('.list .active').removeClass('active');
        }
        activeRoute = currentRoute;
    });
}



function changeActiveButton(view) {
    $('.list .active').removeClass('active');
    var $button = $(`#${view}-btn`);
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
    if (view === 'home') {
        PubSub.publish('recipe-was-unloaded');
        $('.app-container').load(`../../views/core/${view}.html`);
    } else if (view === 'recipes') {
        $('.app-container').load(`../../views/recipes/${view}.html`, RecipeController.init);
    }
}
