export function init() {

    var activeRoute = window.location.hash;

    $(window).on('hashchange', function(e) {
        var currentRoute = e.target.location.hash;
        if (currentRoute !== activeRoute) {
            $('.list .active').removeClass('active');
            activeRoute = currentRoute;
            var buttonId = currentRoute.substring(1) + '-btn';
            $(`#${buttonId}`).addClass('active');
        }
    });

    $('#git-btn').on('click', function() {
        window.open('https://github.com/bpopnikolov/Team9-JSAlpha', '_blank');
    });

    // $('.git-logo').attr('src', '../../assets/images/GitHub-Mark-32px.png');

    $('.logo').on('click', function() {
        $('.app-container').load('../../views/core/home.html');
    });

    $('#home-btn').on('click', function() {
        $('.app-container').load('../../views/core/home.html');
    });

    $('#recipes-btn').on('click', function() {
        $('.app-container').load('../../views/recipes/recipes.html');
    });

}
