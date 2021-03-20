
const form = document.querySelector('#agregar-gasto');
const listado = document.querySelector('gastos ul');

eventListener();
function eventListener(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    form.addEventListener('submit', agregarGasto);
}
// clases
class Presupuesto {
     constructor(presupuesto){
         this.presupuesto = Number(presupuesto);
         this.restante = Number(presupuesto);
         this.gastos = []; 
     }
}

class UI {
    insertarPresupuesto(cantidad){
        const {presupuesto, restante} = cantidad; 
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }
    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert')

        if( tipo === 'error'){
            divMensaje.classList.add('alert-danger');

        }else{
            divMensaje.classList.add('alert-success');
        }
    
        divMensaje.textContent = mensaje;
        document.querySelector('.primario').insertBefore(divMensaje, form);
    }
}

const ui = new UI();

let presupuesto;


// funciones
function preguntarPresupuesto(){
    const presupuestoDisp = prompt('Cual es tu presupuesto disponible?');
    
// validación prompt
    if(presupuestoDisp === '' || presupuestoDisp === null || isNaN(presupuestoDisp) || presupuestoDisp <= 0 ) {
          window.location.reload();
    }
// presupuesto valido
    presupuesto = new Presupuesto(presupuestoDisp)
    console.log(presupuesto);
    
    ui.insertarPresupuesto(presupuesto); // inserta en HTML
}

function agregarGasto (e) {
    e.preventDefault();

    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

// validacion

    if(nombre === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campor son obligatorios', 'error');
    }
}