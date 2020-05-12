//Variables
//promp:alerta del navegador que permita ingresar datos
const presupuestoUsuario=prompt("Ingresa tu presupuesto para los gastos de la esta semana.")
const formulario=document.getElementById("agregar-gasto")
let valorPresupuesto

//validar ingreso numeros
Number.isFloat = Number.isFloat || function(value) {
     return typeof value === 'number' && 
       isFinite(value) &&
       Math.floor(value) !== value;
};
function isInt(n){
     return Number(n) === n && n % 1 === 0;
 }

//Clases
//Clase Presupuesto
class Presupuesto{
     constructor(presupuesto){
          this.presupuesto=parseFloat(presupuesto)
          this.presupuesto=this.presupuesto.toFixed(2) 
          this.restante=parseFloat(presupuesto) 
          this.restante=this.restante.toFixed(2)
     }

     cantidadRestante(cantidad=0){
          cantidad=parseFloat(cantidad)
          this.restante-=cantidad.toFixed(2)
          this.restante=this.restante.toFixed(2)
          
     }
}

//clase Interfaz
//Maneja todo lo relacionado al documento html
class Interfaz{
     insertarPresupuesto(cantidad=0){
          const presupuestoIngresado=document.querySelector('span#total')
          const presupuestoRestante=document.querySelector('span#restante')

          presupuestoIngresado.innerHTML=`${cantidad}`
          presupuestoRestante.innerHTML=`${cantidad}`
     }

     imprimirMensaje(mensaje,tipo){
          const divMensaje=document.createElement('div')
          divMensaje.classList.add('text-center','alert')
          
          if (tipo=='error') {
               divMensaje.classList.add('alert-danger')
          } else {
               divMensaje.classList.add('alert-success')
          }
          divMensaje.textContent=mensaje
          // insertar en el DOM
          //insertbefore: me permite ingresar un elemento antes de otro elemento ya existente (elementonuevo,elemento existente)
          document.querySelector('.primario').insertBefore(divMensaje,formulario)
          
          setTimeout(() => {
               document.querySelector('.primario .alert').remove()
               formulario.reset()
          }, 2000);
     }

     agregarGastoListado(nombre,cantidad){
          const gastoListado=document.querySelector('#gastos ul')

          //crear un li
          const li=document.createElement('li')
          li.className='list-group-item d-flex justify-content-between align-items-center';       
          li.innerHTML=`${nombre}<span> $${parseFloat(cantidad).toFixed(2) } </span>`
          gastoListado.appendChild(li)   
     }

     presupuestoRestante(cantidad=0){
          const presupuestoRestante=document.querySelector('span#restante')
          valorPresupuesto.cantidadRestante(cantidad)
          presupuestoRestante.innerHTML=`${valorPresupuesto.restante}`
          this.comprobarPresupuesto()
     }

     comprobarPresupuesto(){
          //25%
          let porcentajeGastado=valorPresupuesto.presupuesto*0.25
          porcentajeGastado=porcentajeGastado.toFixed(2)
          if (porcentajeGastado>=valorPresupuesto.restante) {
               const restante=document.querySelector('.restante')
               restante.classList.remove('alert-success','alert-warning')
               restante.classList.add('alert-danger')
          } else {
               //50%
               porcentajeGastado=valorPresupuesto.presupuesto*0.5
               porcentajeGastado=porcentajeGastado.toFixed(2)
               if(porcentajeGastado>=valorPresupuesto.restante){
                    const restante=document.querySelector('.restante')
                    restante.classList.remove('alert-success')
                    restante.classList.add('alert-warning')
               }
               
          }
     }
}

//Event Listeners
document.addEventListener('DOMContentLoaded',()=>{
     if (presupuestoUsuario===null ||presupuestoUsuario==='') {
          //recargar pagina
          window.location.reload()
     } else {
          valorPresupuesto=new Presupuesto(presupuestoUsuario);
          const ui=new Interfaz()
          ui.insertarPresupuesto(valorPresupuesto.presupuesto)
     }
})


formulario.addEventListener('submit',(e)=>{
     e.preventDefault()
     //Leer el formulario de gastos
     const tipogasto=document.querySelector('#gasto').value;
     const cantidadgasto=document.querySelector('#cantidad').value;
    
     //validar que solo se ingrese numeros
     const cgastof=Number.isFloat(parseFloat(cantidadgasto))
     const cgastoI=isInt(parseFloat(cantidadgasto))

     const ui=new Interfaz()

     if (tipogasto==='' || cantidadgasto==='' || (!cgastof && !cgastoI)) {
          ui.imprimirMensaje("Hubo un error","error")
     }else{
          ui.imprimirMensaje("Correcto","correcto")
          ui.agregarGastoListado(tipogasto,cantidadgasto)
          ui.presupuestoRestante(cantidadgasto)
     }
})
