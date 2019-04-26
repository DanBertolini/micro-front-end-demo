// import { declareChildApplication, start } from 'single-spa';
import { declareChildApplication, start } from 'single-spa';
import { myAccount } from './shared/account';

declareChildApplication('navbar', () => import('./navbar/navbar.app.js'), () => true);
declareChildApplication('my-account', () => import('./my-account/my-account.app.js'), () => location.pathname === "" || location.pathname === "/");
declareChildApplication('cotation', () => import('./cotation/cotation.app.js'), pathPrefix('/cotacao'));
declareChildApplication('ballot', () => import('./ballot/ballot.js'), pathPrefix('/boleta'));
// declareChildApplication('position', () => import('./position/position.app.js'), pathPrefix('/posicao'));

start();

function pathPrefix(prefix) {
    return function(location) {
        return location.pathname.indexOf(`${prefix}`) === 0;
    }
}

window.myAccount = myAccount;