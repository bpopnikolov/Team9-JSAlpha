export function init() {
    $('.sidenav a, .shadow').on('click', function() {
        $('#navHamburger').toggleClass('active');
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
}
