import * as headerController from './controllers/core/header.js';


$('header').load('./views/core/header.html', headerController.init);
$('.app-container').load('../../views/core/home.html'); 

