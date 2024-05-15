import { Coordinate } from "./objects/coordinate.js";
import { Resource } from "./objects/resource.js";

function showFeedBack(input, valid, message) {
    const validClass = valid ? "is-valid" : "is-invalid";
    const messageDiv = valid
      ? input.parentElement.querySelector("div.valid-feedback")
      : input.parentElement.querySelector("div.invalid-feedback");
    for (const div of input.parentElement.getElementsByTagName("div")) {
      div.classList.remove("d-block");
    }
    messageDiv.classList.remove("d-none");
    messageDiv.classList.add("d-block");
    input.classList.remove("is-valid");
    input.classList.remove("is-invalid");
    input.classList.add(validClass);
    if (message) {
      messageDiv.innerHTML = message;
    }
  }
  
  function defaultCheckElement(event) {
    this.value = this.value.trim();
    if (!this.checkValidity()) {
      showFeedBack(this, false);
    } else {
      showFeedBack(this, true);
    }
  }

// Creamos la funcion para la validacion de nuestro formulario de categoria
export function newfCategory(handler) {
    // Obteneemos el formulario
    const form = document.forms.fCategory;
    form.setAttribute("novalidate", true);

    // Recogemos el evento cuando mandemos los valores del formulario
    form.addEventListener("submit", function (event) {
        let booValid = true;
        let invalidElement = null;

        console.log(this.inputNamefCategory);
        if(!this.inputNamefCategory.checkValidity()) {
            booValid = false;
            showFeedBack(this.inputNamefCategory, false);
            invalidElement = this.inputNamefCategory;
        } else {
            showFeedBack(this.inputNamefCategory, true);
        }

        if(!this.inputDesfCategory.checkValidity()) {
            booValid = false;
            showFeedBack(this.inputDesfCategory, false);
            invalidElement = this.inputDesfCategory;
        } else {
            showFeedBack(this.inputDesfCategory, true);
        }

        if (!booValid) {
            invalidElement.focus();
        } else {
            handler(this.inputNamefCategory.value, this.inputDesfCategory.value);
        }

        event.preventDefault();
        event.stopPropagation();
    });


    // evento para cuando le demos al boton de cancelar
    form.addEventListener("reset", function (event) {
        for (const div of this.querySelectorAll(
            "div.valid-feedback, div.invalid-feedback"
          )) {
            div.classList.remove("d-block");
            div.classList.add("d-none");
          }
          for (const input of this.querySelectorAll("input")) {
            input.classList.remove("is-valid");
            input.classList.remove("is-invalid");
          }
       this.inputNamefCategory.focus();
    });


    form.inputNamefCategory.addEventListener("change", defaultCheckElement);
    form.inputDesfCategory.addEventListener("change", defaultCheckElement);

}

// Creamos la funcion para la validacion de nuestro formulario de categoria
export function newfActor(handler) {
  // Obteneemos el formulario
  const form = document.forms.fActor;
  form.setAttribute("novalidate", true);

  // Recogemos el evento cuando mandemos los valores del formulario
  form.addEventListener("submit", function (event) {
      let booValid = true;
      let invalidElement = null;

      if(!this.inputNamefActor.checkValidity()) {
          booValid = false;
          showFeedBack(this.inputNamefActor, false);
          invalidElement = this.inputNamefActor;
      } else {
          showFeedBack(this.inputNamefActor, true);
      }

      if(!this.inputNamefLastname1.checkValidity()) {
          booValid = false;
          showFeedBack(this.inputNamefLastname1, false);
          invalidElement = this.inputNamefLastname1;
      } else {
          showFeedBack(this.inputNamefLastname1, true);
      }

      if(!this.inputNamefLastname2.checkValidity()) {
        booValid = false;
        showFeedBack(this.inputNamefLastname2, false);
        invalidElement = this.inputNamefLastname2;
      } else {
          showFeedBack(this.inputNamefLastname2, true);
      }

      if(!this.inputNamefBorn.checkValidity()) {
        booValid = false;
        showFeedBack(this.inputNamefBorn, false);
        invalidElement = this.inputNamefBorn;
      } else {
          showFeedBack(this.inputNamefBorn, true);
      }

      if(!this.inputNamefPicture.checkValidity()) {
        booValid = false;
        showFeedBack(this.inputNamefPicture, false);
        invalidElement = this.inputNamefPicture;
      } else {
          showFeedBack(this.inputNamefPicture, true);
      }

      if (!booValid) {
          invalidElement.focus();
      } else {
          handler(this.inputNamefActor.value, this.inputNamefLastname1.value, this.inputNamefLastname2.value,  this.inputNamefBorn.value,  this.inputNamefPicture.value);
      }

      event.preventDefault();
      event.stopPropagation();
  });


  // evento para cuando le demos al boton de cancelar
  form.addEventListener("reset", function (event) {
      for (const div of this.querySelectorAll(
          "div.valid-feedback, div.invalid-feedback"
        )) {
          div.classList.remove("d-block");
          div.classList.add("d-none");
        }
        for (const input of this.querySelectorAll("input")) {
          input.classList.remove("is-valid");
          input.classList.remove("is-invalid");
        }

     this.inputNamefActor.focus();
  });


  form.inputNamefActor.addEventListener("change", defaultCheckElement);
  form.inputNamefLastname1.addEventListener("change", defaultCheckElement);
  form.inputNamefLastname2.addEventListener("change", defaultCheckElement);
  form.inputNamefBorn.addEventListener("change", defaultCheckElement);
  form.inputNamefPicture.addEventListener("change", defaultCheckElement);

}

// Creamos la funcion para la validacion de nuestro formulario de categoria
export function newfDirector(handler) {
  // Obteneemos el formulario
  const form = document.forms.fDirector;
  form.setAttribute("novalidate", true);

  // Recogemos el evento cuando mandemos los valores del formulario
  form.addEventListener("submit", function (event) {
      let booValid = true;
      let invalidElement = null;

      if(!this.inputNamefDirector.checkValidity()) {
          booValid = false;
          showFeedBack(this.inputNamefDirector, false);
          invalidElement = this.inputNamefDirector;
      } else {
          showFeedBack(this.inputNamefDirector, true);
      }

      if(!this.inputNamefLastname1.checkValidity()) {
          booValid = false;
          showFeedBack(this.inputNamefLastname1, false);
          invalidElement = this.inputNamefLastname1;
      } else {
          showFeedBack(this.inputNamefLastname1, true);
      }

      if(!this.inputNamefLastname2.checkValidity()) {
        booValid = false;
        showFeedBack(this.inputNamefLastname2, false);
        invalidElement = this.inputNamefLastname2;
      } else {
          showFeedBack(this.inputNamefLastname2, true);
      }

      if(!this.inputNamefBorn.checkValidity()) {
        booValid = false;
        showFeedBack(this.inputNamefBorn, false);
        invalidElement = this.inputNamefBorn;
      } else {
          showFeedBack(this.inputNamefBorn, true);
      }

      if(!this.inputNamefPicture.checkValidity()) {
        booValid = false;
        showFeedBack(this.inputNamefPicture, false);
        invalidElement = this.inputNamefPicture;
      } else {
          showFeedBack(this.inputNamefPicture, true);
      }

      if (!booValid) {
          invalidElement.focus();
      } else {
          handler(this.inputNamefDirector.value, this.inputNamefLastname1.value, this.inputNamefLastname2.value,  this.inputNamefBorn.value,  this.inputNamefPicture.value);
      }

      event.preventDefault();
      event.stopPropagation();
  });


  // evento para cuando le demos al boton de cancelar
  form.addEventListener("reset", function (event) {
      for (const div of this.querySelectorAll(
          "div.valid-feedback, div.invalid-feedback"
        )) {
          div.classList.remove("d-block");
          div.classList.add("d-none");
        }
        for (const input of this.querySelectorAll("input")) {
          input.classList.remove("is-valid");
          input.classList.remove("is-invalid");
        }

     this.inputNamefDirector.focus();
  });


  form.inputNamefDirector.addEventListener("change", defaultCheckElement);
  form.inputNamefLastname1.addEventListener("change", defaultCheckElement);
  form.inputNamefLastname2.addEventListener("change", defaultCheckElement);
  form.inputNamefBorn.addEventListener("change", defaultCheckElement);
  form.inputNamefPicture.addEventListener("change", defaultCheckElement);

}


// Creamos la funcion para la validacion de nuestro formulario de categoria
export function newfProduction(handler) {
  // Obteneemos el formulario
  const form = document.forms.fProdcution;
  form.setAttribute("novalidate", true);

  // Recogemos el evento cuando mandemos los valores del formulario
  form.addEventListener("submit", function (event) {
      let booValid = true;
      let invalidElement = null;

      if(!this.inputNamefProduction.checkValidity()) {
          booValid = false;
          showFeedBack(this.inputNamefProduction, false);
          invalidElement = this.inputNamefProduction;
      } else {
          showFeedBack(this.inputNamefProduction, true);
      }

      if(!this.selectTypeProduction.checkValidity()) {
        booValid = false;
        showFeedBack(this.selectTypeProduction, false);
        invalidElement = this.selectTypeProduction;
      } else {
          showFeedBack(this.selectTypeProduction, true);
      }

      if(!this.inputnationalityfProduction.checkValidity()) {
        booValid = false;
        showFeedBack(this.inputnationalityfProduction, false);
        invalidElement = this.inputnationalityfProduction;
      } else {
          showFeedBack(this.inputnationalityfProduction, true);
      }

      if(!this.inputpublicationfProduction.checkValidity()) {
        booValid = false;
        showFeedBack(this.inputpublicationfProduction, false);
        invalidElement = this.inputpublicationfProduction;
      } else {
          showFeedBack(this.inputpublicationfProduction, true);
      }
      
      if(!this.inputSipnosisfProduction.checkValidity()) {
        booValid = false;
        showFeedBack(this.inputSipnosisfProduction, false);
        invalidElement = this.inputSipnosisfProduction;
      } else {
          showFeedBack(this.inputSipnosisfProduction, true);
      }
       
      if(!this.inputimagefProduction.checkValidity()) {
        booValid = false;
        showFeedBack(this.inputimagefProduction, false);
        invalidElement = this.inputimagefProduction;
      } else {
          showFeedBack(this.inputimagefProduction, true);
      }

      if(!this.inputseasonfProduction.checkValidity()) {
        booValid = false;
        showFeedBack(this.inputseasonfProduction, false);
        invalidElement = this.inputseasonfProduction;
      } else {
          showFeedBack(this.inputseasonfProduction, true);
      }

      if(!this.inputcategoryfProduction.checkValidity()) {
        booValid = false;
        showFeedBack(this.inputcategoryfProduction, false);
        invalidElement = this.inputcategoryfProduction;
      } else {
          showFeedBack(this.inputcategoryfProduction, true);
      }

      if(!this.inputdirectorfProduction.checkValidity()) {
        booValid = false;
        showFeedBack(this.inputdirectorfProduction, false);
        invalidElement = this.inputdirectorfProduction;
      } else {
          showFeedBack(this.inputdirectorfProduction, true);
      }

      if (!booValid) {
          invalidElement.focus();
      } else {

          const categories = [...this.inputcategoryfProduction.selectedOptions].map(
            (option) => option.value
          );

          const directors =  [...this.inputdirectorfProduction.selectedOptions].map(
            (option) => option.value
          );

          handler(this.inputNamefProduction.value, this.selectTypeProduction.value, this.inputnationalityfProduction.value, 
            this.inputpublicationfProduction.value, this.inputSipnosisfProduction.value, this.inputimagefProduction.value, 
            this.inputseasonfProduction.value, categories, directors);
      }

      event.preventDefault();
      event.stopPropagation();
  });

  

  // evento para cuando le demos al boton de cancelar
  form.addEventListener("reset", function (event) {
      for (const div of this.querySelectorAll(
          "div.valid-feedback, div.invalid-feedback"
        )) {
          div.classList.remove("d-block");
          div.classList.add("d-none");
        }
        for (const input of this.querySelectorAll("input")) {
          input.classList.remove("is-valid");
          input.classList.remove("is-invalid");
        }

     this.inputNamefProduction.focus();
  });


  form.inputNamefProduction.addEventListener("change", defaultCheckElement);
  form.selectTypeProduction.addEventListener("change", defaultCheckElement);
  form.inputnationalityfProduction.addEventListener("change", defaultCheckElement);
  form.inputpublicationfProduction.addEventListener("change", defaultCheckElement);
  form.inputSipnosisfProduction.addEventListener("change", defaultCheckElement);
  form.inputimagefProduction.addEventListener("change", defaultCheckElement);
  form.inputseasonfProduction.addEventListener("change", defaultCheckElement);

}


// Creamos la funcion para la validacion de nuestro formulario de categoria
export function newfRemoveProduction(handler) {
  // Obteneemos el formulario
  const form = document.forms.fRemoveProdcution;
  form.setAttribute("novalidate", true);

  // Recogemos el evento cuando mandemos los valores del formulario
  form.addEventListener("submit", function (event) {
      let booValid = true;
      let invalidElement = null;

      if(!this.inputfRemoveProduction.checkValidity()) {
          booValid = false;
          showFeedBack(this.inputfRemoveProduction, false);
          invalidElement = this.inputfRemoveProduction;
      } else {
          showFeedBack(this.inputfRemoveProduction, true);
      }

      if (!booValid) {
          invalidElement.focus();
      } else {

          const productions =  [...this.inputfRemoveProduction.selectedOptions].map(
            (option) => option.value
          );

          handler(productions);
      }

      event.preventDefault();
      event.stopPropagation();
  });

  

  // evento para cuando le demos al boton de cancelar
  form.addEventListener("reset", function (event) {
      for (const div of this.querySelectorAll(
          "div.valid-feedback, div.invalid-feedback"
        )) {
          div.classList.remove("d-block");
          div.classList.add("d-none");
        }
        for (const input of this.querySelectorAll("input")) {
          input.classList.remove("is-valid");
          input.classList.remove("is-invalid");
        }

     this.inputfRemoveProduction.focus();
  });
}


// Creamos la funcion para la validacion de nuestro formulario de categoria
export function newfRemoveCategory(handler) {
  // Obteneemos el formulario
  const form = document.forms.fRemoveCategory;
  form.setAttribute("novalidate", true);

  // Recogemos el evento cuando mandemos los valores del formulario
  form.addEventListener("submit", function (event) {
      let booValid = true;
      let invalidElement = null;

      if(!this.inputcategoryfProduction.checkValidity()) {
          booValid = false;
          showFeedBack(this.inputcategoryfProduction, false);
          invalidElement = this.inputcategoryfProduction;
      } else {
          showFeedBack(this.inputcategoryfProduction, true);
      }

      if (!booValid) {
          invalidElement.focus();
      } else {

          const categories =  [...this.inputcategoryfProduction.selectedOptions].map(
            (option) => option.value
          );

          handler(categories);
      }

      event.preventDefault();
      event.stopPropagation();
  });

  

  // evento para cuando le demos al boton de cancelar
  form.addEventListener("reset", function (event) {
      for (const div of this.querySelectorAll(
          "div.valid-feedback, div.invalid-feedback"
        )) {
          div.classList.remove("d-block");
          div.classList.add("d-none");
        }
        for (const input of this.querySelectorAll("input")) {
          input.classList.remove("is-valid");
          input.classList.remove("is-invalid");
        }

     this.inputcategoryfProduction.focus();
  });
}


// Creamos la funcion para la validacion de nuestro formulario de categoria
export function newfRemoveDirector(handler) {
  // Obteneemos el formulario
  const form = document.forms.fRemoveDirectors;
  form.setAttribute("novalidate", true);

  // Recogemos el evento cuando mandemos los valores del formulario
  form.addEventListener("submit", function (event) {
      let booValid = true;
      let invalidElement = null;

      if(!this.inputdirectorfProduction.checkValidity()) {
          booValid = false;
          showFeedBack(this.inputdirectorfProduction, false);
          invalidElement = this.inputdirectorfProduction;
      } else {
          showFeedBack(this.inputdirectorfProduction, true);
      }

      if (!booValid) {
          invalidElement.focus();
      } else {

          const directors =  [...this.inputdirectorfProduction.selectedOptions].map(
            (option) => option.value
          );

          handler(directors);
      }

      event.preventDefault();
      event.stopPropagation();
  });

  // evento para cuando le demos al boton de cancelar
  form.addEventListener("reset", function (event) {
      for (const div of this.querySelectorAll(
          "div.valid-feedback, div.invalid-feedback"
        )) {
          div.classList.remove("d-block");
          div.classList.add("d-none");
        }
        for (const input of this.querySelectorAll("input")) {
          input.classList.remove("is-valid");
          input.classList.remove("is-invalid");
        }

     this.inputdirectorfProduction.focus();
  });
}




// Creamos la funcion para la validacion de nuestro formulario de categoria
export function newfRemoveActor(handler) {
  // Obteneemos el formulario
  const form = document.forms.fRemoveActor;
  form.setAttribute("novalidate", true);

  // Recogemos el evento cuando mandemos los valores del formulario
  form.addEventListener("submit", function (event) {
      let booValid = true;
      let invalidElement = null;

      if(!this.inputactorfProduction.checkValidity()) {
          booValid = false;
          showFeedBack(this.inputactorfProduction, false);
          invalidElement = this.inputactorfProduction;
      } else {
          showFeedBack(this.inputactorfProduction, true);
      }

      if (!booValid) {
          invalidElement.focus();
      } else {

          const actors =  [...this.inputactorfProduction.selectedOptions].map(
            (option) => option.value
          );

          handler(actors);
      }

      event.preventDefault();
      event.stopPropagation();
  });
  
  // evento para cuando le demos al boton de cancelar
  form.addEventListener("reset", function (event) {
      for (const div of this.querySelectorAll(
          "div.valid-feedback, div.invalid-feedback"
        )) {
          div.classList.remove("d-block");
          div.classList.add("d-none");
        }
        for (const input of this.querySelectorAll("input")) {
          input.classList.remove("is-valid");
          input.classList.remove("is-invalid");
        }

     this.inputactorfProduction.focus();
  });
}



// Creamos la funcion para la validacion de nuestro formulario de categoria
export function newfAssingDirector(handler) {
  // Obteneemos el formulario
  const form = document.forms.fAssignDirector;
  form.setAttribute("novalidate", true);

  // Recogemos el evento cuando mandemos los valores del formulario
  form.addEventListener("submit", function (event) {
      let booValid = true;
      let invalidElement = null;

      if(!this.inputdirectorfProduction.checkValidity()) {
          booValid = false;
          showFeedBack(this.inputdirectorfProduction, false);
          invalidElement = this.inputdirectorfProduction;
      } else {
          showFeedBack(this.inputdirectorfProduction, true);
      }


      if(!this.inputfProduction.checkValidity()) {
        booValid = false;
        showFeedBack(this.inputfProduction, false);
        invalidElement = this.inputfProduction;
    } else {
        showFeedBack(this.inputfProduction, true);
    }


      if (!booValid) {
          invalidElement.focus();
      } else {

          const directors =  [...this.inputdirectorfProduction.selectedOptions].map(
            (option) => option.value
          );


          const productions =  [...this.inputfProduction.selectedOptions].map(
            (option) => option.value
          );

          handler(directors, productions);
      }

      event.preventDefault();
      event.stopPropagation();
  });
  
  // evento para cuando le demos al boton de cancelar
  form.addEventListener("reset", function (event) {
      for (const div of this.querySelectorAll(
          "div.valid-feedback, div.invalid-feedback"
        )) {
          div.classList.remove("d-block");
          div.classList.add("d-none");
        }
        for (const input of this.querySelectorAll("input")) {
          input.classList.remove("is-valid");
          input.classList.remove("is-invalid");
        }

     this.inputdirectorfProduction.focus();
  });
}



// Creamos la funcion para la validacion de nuestro formulario de categoria
export function newfDesAssingDirector(handler) {
  // Obteneemos el formulario
  const form = document.forms.fDesAssignDirector;
  form.setAttribute("novalidate", true);

  // Recogemos el evento cuando mandemos los valores del formulario
  form.addEventListener("submit", function (event) {
      let booValid = true;
      let invalidElement = null;

      if(!this.inputdirectorfProduction.checkValidity()) {
          booValid = false;
          showFeedBack(this.inputdirectorfProduction, false);
          invalidElement = this.inputdirectorfProduction;
      } else {
          showFeedBack(this.inputdirectorfProduction, true);
      }


      if(!this.inputfProduction.checkValidity()) {
        booValid = false;
        showFeedBack(this.inputfProduction, false);
        invalidElement = this.inputfProduction;
    } else {
        showFeedBack(this.inputfProduction, true);
    }


      if (!booValid) {
          invalidElement.focus();
      } else {

          const directors =  [...this.inputdirectorfProduction.selectedOptions].map(
            (option) => option.value
          );


          const productions =  [...this.inputfProduction.selectedOptions].map(
            (option) => option.value
          );

          handler(directors, productions);
      }

      event.preventDefault();
      event.stopPropagation();
  });
  
  // evento para cuando le demos al boton de cancelar
  form.addEventListener("reset", function (event) {
      for (const div of this.querySelectorAll(
          "div.valid-feedback, div.invalid-feedback"
        )) {
          div.classList.remove("d-block");
          div.classList.add("d-none");
        }
        for (const input of this.querySelectorAll("input")) {
          input.classList.remove("is-valid");
          input.classList.remove("is-invalid");
        }

     this.inputdirectorfProduction.focus();
  });
}


// Creamos la funcion para la validacion de nuestro formulario de categoria
export function newfAssingActor(handler) {
  // Obteneemos el formulario
  const form = document.forms.fAssignActor;
  form.setAttribute("novalidate", true);

  // Recogemos el evento cuando mandemos los valores del formulario
  form.addEventListener("submit", function (event) {
      let booValid = true;
      let invalidElement = null;

      if(!this.inputactorfProduction.checkValidity()) {
          booValid = false;
          showFeedBack(this.inputactorfProduction, false);
          invalidElement = this.inputactorfProduction;
      } else {
          showFeedBack(this.inputactorfProduction, true);
      }


      if(!this.inputfProduction.checkValidity()) {
        booValid = false;
        showFeedBack(this.inputfProduction, false);
        invalidElement = this.inputfProduction;
    } else {
        showFeedBack(this.inputfProduction, true);
    }


      if (!booValid) {
          invalidElement.focus();
      } else {

          const actors =  [...this.inputactorfProduction.selectedOptions].map(
            (option) => option.value
          );


          const productions =  [...this.inputfProduction.selectedOptions].map(
            (option) => option.value
          );

          handler(actors, productions);
      }

      event.preventDefault();
      event.stopPropagation();
  });
  
  // evento para cuando le demos al boton de cancelar
  form.addEventListener("reset", function (event) {
      for (const div of this.querySelectorAll(
          "div.valid-feedback, div.invalid-feedback"
        )) {
          div.classList.remove("d-block");
          div.classList.add("d-none");
        }
        for (const input of this.querySelectorAll("input")) {
          input.classList.remove("is-valid");
          input.classList.remove("is-invalid");
        }

     this.inputactorfProduction.focus();
  });
}


// Creamos la funcion para la validacion de nuestro formulario de categoria
export function newfdesAssingActor(handler) {
  // Obteneemos el formulario
  const form = document.forms.fdesAssignActor;
  form.setAttribute("novalidate", true);

  // Recogemos el evento cuando mandemos los valores del formulario
  form.addEventListener("submit", function (event) {
      let booValid = true;
      let invalidElement = null;

      if(!this.inputactorfProduction.checkValidity()) {
          booValid = false;
          showFeedBack(this.inputactorfProduction, false);
          invalidElement = this.inputactorfProduction;
      } else {
          showFeedBack(this.inputactorfProduction, true);
      }


      if(!this.inputfProduction.checkValidity()) {
        booValid = false;
        showFeedBack(this.inputfProduction, false);
        invalidElement = this.inputfProduction;
    } else {
        showFeedBack(this.inputfProduction, true);
    }


      if (!booValid) {
          invalidElement.focus();
      } else {

          const actors =  [...this.inputactorfProduction.selectedOptions].map(
            (option) => option.value
          );


          const productions =  [...this.inputfProduction.selectedOptions].map(
            (option) => option.value
          );

          handler(actors, productions);
      }

      event.preventDefault();
      event.stopPropagation();
  });
  
  // evento para cuando le demos al boton de cancelar
  form.addEventListener("reset", function (event) {
      for (const div of this.querySelectorAll(
          "div.valid-feedback, div.invalid-feedback"
        )) {
          div.classList.remove("d-block");
          div.classList.add("d-none");
        }
        for (const input of this.querySelectorAll("input")) {
          input.classList.remove("is-valid");
          input.classList.remove("is-invalid");
        }

     this.inputactorfProduction.focus();
  });
}






















