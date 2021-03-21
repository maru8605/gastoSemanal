
const form = document.querySelector('#agregar-gasto');
const listado = document.querySelector('#gastos ul');

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
     nuevoGasto(gasto){
         this.gastos = [...this.gastos, gasto]
         console.log(this.gastos)
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

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    agregarGastoListado(gastos){
        this.limpiarHtml();
        //iterar sobre gastos
        gastos.forEach(gasto => {
            const {cantidad, nombre, id} = gasto;

            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between aling-items-center';
            nuevoGasto.dataset.id = id;
            // html gasto
            nuevoGasto.innerHTML=`${nombre} <span class='badge badge-primary badge-pill pt-2'>${cantidad}</span>`
            // html boton
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML   = 'X'
            nuevoGasto.appendChild(btnBorrar);
            // agregar gasto al html
            listado.appendChild(nuevoGasto);
        }); 
    }
    limpiarHtml( ){
        while(listado.firstChild){
            listado.removeChild(listado.firstChild);
        }
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
        return;
    }else if (cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no valida', 'error');
        return;
    }

// objeto con gasto
const gasto = {nombre, cantidad, id: Date.now() }
    
presupuesto.nuevoGasto(gasto)

 ui.imprimirAlerta('Gasto agregado correctamente');

// imprimir los gastos
const {gastos} = presupuesto;
 ui.agregarGastoListado(gastos); 

// reiniciar formulario
form.reset();
}