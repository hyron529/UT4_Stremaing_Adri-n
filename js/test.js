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
    }
}

// Definimos el popstate
window.addEventListener('popstate', (event) => {
    if (event.state) {
        historyActions[event.state.action](event);
    }
});

// Envento inicial
history.replaceState({action: 'init'}, null);