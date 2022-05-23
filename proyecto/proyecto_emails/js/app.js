// variables
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const btnEnviar = document.querySelector('#enviar');
const formularioEnviar = document.querySelector('#enviar-mail');
const resetBtn = document.querySelector('#resetBtn');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          
// event Listener

eventListeners();

function eventListeners() {
     // Inicio de la aplicación y deshabilitar submit
     document.addEventListener('DOMContentLoaded', inicioApp);

     // Campos del formulario
     email.addEventListener('blur', validarFormulario);
     asunto.addEventListener('blur', validarFormulario);
     mensaje.addEventListener('blur', validarFormulario);

     // Boton de enviar en el submit
     formularioEnviar.addEventListener('submit', enviarEmail);

     // Boton de reset
     resetBtn.addEventListener('click', resetearFormulario);
}



// funciones
function inicioApp() {
     // deshabilitar el envio
     btnEnviar.disabled = true;
     btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}


// Valida que el campo tengo algo escrito

function validarFormulario(e) {
    
     if(e.target.value.length > 0 ) {
          const error = document.querySelector('p.error');
          if (error){
               error.remove();
          }
          
          e.target.classList.remove('border', 'border-red-500');
          e.target.classList.add('border', 'border-green-500');
       
     } else {
          e.target.classList.remove('border', 'border-green-500');
          e.target.classList.add('border', 'border-red-500');
          mostrarError('Todos los campos son obligatorios')
     }

     // Validar unicamente el email
     if(e.target.type === 'email') {
          
          if (er.test(e.target.value)){
               const error = document.querySelector('p.error');
               if (error){
                    error.remove();
               }

               e.target.classList.remove('border', 'border-red-500');
               e.target.classList.add('border', 'border-green-500');
          }else{
               e.target.classList.remove('border','border-green-500')
               e.target.classList.add('border', 'border-red-500');
               mostrarError('El email no es valido');
          }
     }


     if(er.test(email.value) && asunto.value !== '' && mensaje.value !== '' ) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('opacity-50');
        btnEnviar.classList.remove('cursor-not-allowed');
        formularioEnviar.remove(MensajeError)
     }
}


// Cuando se envia el correo
function enviarEmail(e) {

    e.preventDefault();


     // Spinner al presionar Enviar
     const spinner = document.querySelector('#spinner');
     spinner.style.display = 'flex';

     // Gif que envia email
     const enviado = document.createElement('p');
     enviado.textContent = 'Mensaje Enviado Correctamente';
     enviado.classList.add('bg')

     // Ocultar Spinner y mostrar gif de enviado
     setTimeout( () => {
          spinner.style.display = 'none';
          const parrafo = document.createElement('p');
          parrafo.textContent='El mensaje se envió corectamente'
          parrafo.classList.add('text-center','my-10','p-3','bg-green-500','text-white','font-bold','uppercase')

          formularioEnviar.insertBefore(parrafo, spinner)

          document.querySelector('#loaders').appendChild( enviado );

          setTimeout( () =>  {

               parrafo.remove();
               resetearFormulario();
          }, 5000);
     }, 3000);

     
}


// Resetear el formulario 
function resetearFormulario() {
     formularioEnviar.reset();
     inicioApp();
}

function mostrarError(mensaje){
     const MensajeError = document.createElement('p');
     MensajeError.textContent = mensaje
     MensajeError.classList.add('border', 'border-red-500', 'background-red-100','text-red-500','p-3','mt-5','text-center','error');

     const errores = document.querySelectorAll('.error');
     if (errores.length === 0)
     formularioEnviar.appendChild(MensajeError)
}