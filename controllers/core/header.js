import * as RecipeController from '../recipes/recipes.js';
import * as Router from '../../routes/router.js';


export function init() {
    Router.init({
        routes: ['/', '#home', '#recipes']
    });

    $('#navHamburger').on('click', function() {
        $(this).toggleClass('active');
        $('.shadow').fadeToggle();
        $('.sidenav .list').toggle2Classes('slide-in', 'slide-out');

        if (($('.sidenav-component').css("z-index") === "-1")) {
            $('.sidenav-component').toggleZindex();
        } else {
            setTimeout(function() {
                $('.sidenav-component').toggleZindex();
            }, 500);
        }
    });


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

$.fn.toggle2Classes = function(class1, class2) {
    if (!class1 || !class2) {
        return this;
    }
    return this.each(function() {
        var $elm = $(this);

        if ($elm.hasClass(class1) || $elm.hasClass(class2)) {
            $elm.toggleClass(class1 + ' ' + class2);
        } else {
            $elm.addClass(class1);
        }
    });
};

$.fn.toggleZindex = function() {
    var $this = $(this);
    if ($this.css("z-index") === "-1") {
        $this.css("z-index", "100")
    } else {
        $this.css("z-index", "-1")
    }
    return this;
};
