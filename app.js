import * as HeaderController from './controllers/core/header.js';
import * as DBService from './services/db-service/database-service.js';


$(function() {
    $('header').load('./views/core/header.html', HeaderController.init);
});
