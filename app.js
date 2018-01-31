import * as HeaderController from './controllers/core/header.js';
import * as DBService from './services/db-service/database-service.js';
import * as SidenavController from './controllers/core/sidenav.js';


$(function() {
    $('header').load('./views/core/header.html', HeaderController.init);
    $('.sidenav-container').load('./views/core/sidenav.html', SidenavController.init);
});
