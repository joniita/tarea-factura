let productos = [];
const url = "api/productos.json";

function mostrarToast() {
  var miToast = document.getElementById("miToast");
  var cartel = new bootstrap.Toast(miToast);
  cartel.show();
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarToast();
});

// similar a  función getJSONData.
let obtener = (url) => {
  var resultado = {};
  return fetch(url)
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      } else {
        throw Error(respuesta.statusText);
      }
    })
    .then((respuesta) => {
      resultado.status = "ok";
      resultado.data = respuesta;

      return resultado;
    })
    .catch((error) => {
      resultado.status = "error";
      resultado.data = error;

      return resultado;
    });
};

document.addEventListener("DOMContentLoaded", () => {
  obtener(url).then((resultado) => {
    //Agrego los productos a la lista
    if (resultado.status === "ok") {
      productos = resultado.data;
      cargarProductos(productos)
      console.log(productos);
    }
  });

  let productSelect = document.getElementById('inputState')
  function cargarProductos(productos) {
    for (let producto of productos) {
      let nuevaOpcion = document.createElement("option");
      nuevaOpcion.setAttribute("id", producto.id);
      nuevaOpcion.textContent = producto.producto + ' ' + '$' + producto.precio
      productSelect.appendChild(nuevaOpcion)
    }
  }

  let precios = [];

/* addEventListener al botón que agrega productos */

let submit = document.getElementById('submit');
let lista = document.getElementById('listado');
let precioTotal = document.getElementById('precioTotal');

submit.addEventListener('click', (event) => {
  event.preventDefault();
  let valor = productSelect.options[productSelect.selectedIndex].value;
  console.log(valor);
  let arr = valor.split('$')
  console.log(arr)
  let newRow = document.createElement('tr');
  newRow.innerHTML = `<td>${arr[0]}</td><td>$${arr[1]}</td><td></td>`;
  lista.appendChild(newRow);
  precios.push(Number(arr[1]));
  let total = 0;
  precios.forEach(function (a) { total += a; });
  precioTotal.textContent = '$' + total.toFixed(2);
  console.log(total);
  console.log(precios);

  let closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'btn-close';
  closeButton.setAttribute('aria-label', 'Close');
  newRow.cells[2].appendChild(closeButton);

  closeButton.addEventListener('click', () => {
    closeButton.parentElement.parentElement.remove();
    precios.splice(precios.indexOf(Number(arr[1])), 1);
    let total = 0;
    precios.forEach(function (a) { total += a; });
    precioTotal.textContent = '$' + total.toFixed(2);
  });
});




})




