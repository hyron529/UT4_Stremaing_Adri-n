import { streamManagerApp } from "./streamManagerApp.js";

const historyActions = {
    inicio: () => {
        streamManagerApp.handleInit();
    },
    prodcutionCategory: (event) => {
        streamManagerApp.handleProdcutionCategory(event.state.category);
    },
    prodcutionCategoryInNav: (event) => {
        streamManagerApp.handleProdcutionCategory(event.state.category);
    },
    showProduction: (event) => {
        streamManagerApp.handleShowProduction(event.state.production);
    },
    showRandomProduction: (event) => {
        streamManagerApp.handleRandomProduction(event.state.production)
    },
    directorInNav: (event) => {
        streamManagerApp.handleProdcutionDirector(event.state.director)
    },
    actorInNav: (event) => {
        streamManagerApp.handleProdcutionActor(event.state.actor)
    },
    login: () => {RestauranteManagerApp.handleLoginForm()}
    // Navegacion del formulario
}

// Definimos el popstate, con el que controlamos cuando cambia el historial de navegacion, 
//es decir, si el usuario
//avanza o retrocede en la pagina
window.addEventListener('popstate', (event) => {
    if (event.state) {
        historyActions[event.state.action](event);
    }
});

// Establecemos el estado inicial de la pagina
history.replaceState({action: 'init'}, null);