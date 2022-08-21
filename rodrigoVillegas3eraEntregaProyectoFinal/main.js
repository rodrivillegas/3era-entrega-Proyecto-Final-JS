const DateTime = luxon.DateTime;
const now = DateTime.now();
console.log(now.toLocaleString(DateTime.DATETIME_HUGE));

const clientesRegistrados = [];
console.log(JSON.parse(localStorage.getItem("clientesRegistrados")));

const listaUsuarios = document.querySelector("#usuarios");
const inputNombre = document.querySelector("#validationCustom01");
const inputApellido = document.querySelector("#validationCustom02");
const inputEdad = document.querySelector("#validationCustom03");
const inputDocumento = document.querySelector("#validationCustom04");
const inputTelefono = document.querySelector("#validationCustom05");
const inputEmail = document.querySelector("#validationCustom06");
const inputDireccion = document.querySelector("#validationCustom07");
const form = document.querySelector("#formulario");
const btnRegistraClientesLocalStorage = document.querySelector("#btn-submit");

const btnDarkMode = document.querySelector("#flexSwitchDarkMode");

const btnSimulaTuCredito = document.querySelector("#botonSimulaTuCredito");
const divPrimeraPregunta = document.querySelector("#primeraPregunta");
const btnContinuarPrimeraPregunta = document.querySelector("#botonContinuarPrimeraPregunta");
const inputPrimeraPregunta = document.querySelector("#inputPrimeraPregunta");
const divSolvenciaMayorDoscientos = document.querySelector("#solvenciaMayorDoscientos");
const divsolvenciaMenorDoscientosMayorCientoCincuenta = document.querySelector("#solvenciaMenorDoscientosMayorCientoCincuenta");
const divsolvenciaMenorCientoCincuentaMayorCien = document.querySelector("#solvenciaMenorCientoCincuentaMayorCien");
const divsolvenciaMenorCien = document.querySelector("#solvenciaMenorCien");

const divSegundaPregunta = document.querySelector("#segundaPregunta");
const btnContinuarSegundaPregunta = document.querySelector("#botonContinuarSegundaPregunta");
const inputSegundaPregunta = document.querySelector("#inputSegundaPregunta");
const divsolicitudMayorUnMillon = document.querySelector("#solicitudMayorUnMillon");
const divsolicitudCreditoAceptada = document.querySelector("#solicitudCreditoAceptada");

btnDarkMode.addEventListener("click", () => {
  document.body.classList.toggle("darkMode");
});

function ordenarAlfabeticamente() {
  const ordenAlfabetico = clientesRegistrados.sort((a, b) => {
    if (a.apellido > b.apellido) {
      return 1;
    } else if (a.apellido < b.apellido) {
      return -1;
    }
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const nombre = inputNombre.value;
  const apellido = inputApellido.value;
  const edad = inputEdad.value;
  const documento = inputDocumento.value;
  const telefono = inputTelefono.value;
  const email = inputEmail.value;
  const direccion = inputDireccion.value;

  if (
    nombre.length < 1 ||
    apellido.length < 1 ||
    edad.length < 1 ||
    documento.length < 1 ||
    telefono.length < 1 ||
    email.length < 1 ||
    direccion.length < 1
  ) {
    swal({
      title: "Oops...!",
      text: "¡No se admiten campos vacíos!",
      icon: "error",
      dangerMode: true,
    });
    return;
  }

  if (edad <= 17) {
    swal({
      title: "Oops...",
      text: "Lo sentimos, pero debes ser MAYOR DE 18 para utilizar nuestra aplicación.",
      icon: "warning",
    });
    return;
  }

  const usuario = {
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    documento: documento,
    telefono: telefono,
    email: email,
    direccion: direccion,
  };

  clientesRegistrados.push(usuario);
  form.reset();
  ordenarAlfabeticamente();

  const li = document.createElement("li");
  li.innerHTML = `
                <h3>Nombre y Apellido: ${usuario.nombre} ${usuario.apellido}.<h4>
                <p>Edad: ${usuario.edad}.</p>
                <p>D.N.I.: ${usuario.documento}.</p>
                <p>Teléfono: ${usuario.telefono}.</p>
                <p>E-mail: ${usuario.email}.</p>
                <p>Direccion: ${usuario.direccion}.</p>`;
  listaUsuarios.append(li);
  swal({
    title: "Felicitaciones!",
    text: "Usuario registrado correctamente",
    icon: "success",
  });

  localStorage.setItem("clientesRegistrados", JSON.stringify(clientesRegistrados));
    console.log(clientesRegistrados)
});

btnSimulaTuCredito.addEventListener("click", () => {
  if (clientesRegistrados.length >= 1) {
    divPrimeraPregunta.classList.remove("hidden");
  } else {
    Toastify({
      text: "Debes encontrarte registrado para simular tu préstamo.",
      duration: 3000,
      gravity: "bottom",
      position: "right",
      style: { background: "linear-gradient(to right, #037DC6, #79C1ED)" },
    }).showToast();
    return;
  }
});

btnContinuarPrimeraPregunta.addEventListener("click", () => {
  if (inputPrimeraPregunta.value == "" || inputPrimeraPregunta.value == 0) {
    swal({
      title: "Oops...",
      text: "No se admiten campos vacíos ni igual a '0'",
      icon: "error",
      dangerMode: true,
    });
    return;
  }
  divSolvenciaMayorDoscientos.classList.add("hidden");
  divsolvenciaMenorDoscientosMayorCientoCincuenta.classList.add("hidden");
  divsolvenciaMenorCientoCincuentaMayorCien.classList.add("hidden");
  divsolvenciaMenorCien.classList.add("hidden");
  divSegundaPregunta.classList.remove("hidden");
  if (inputPrimeraPregunta.value > 200000) {
    divSolvenciaMayorDoscientos.classList.remove("hidden");
  } else if (
    inputPrimeraPregunta.value <= 200000 &&
    inputPrimeraPregunta.value >= 150000
  ) {
    divSolvenciaMayorDoscientos.classList.add("hidden");
    divsolvenciaMenorDoscientosMayorCientoCincuenta.classList.remove("hidden");
  } else if (
    inputPrimeraPregunta.value < 150000 &&
    inputPrimeraPregunta.value >= 100000
  ) {
    divsolvenciaMenorDoscientosMayorCientoCincuenta.classList.add("hidden");
    divsolvenciaMenorCientoCincuentaMayorCien.classList.remove("hidden");
  } else {
    divsolvenciaMenorCientoCincuentaMayorCien.classList.add("hidden");
    divsolvenciaMenorCien.classList.remove("hidden");
    divSegundaPregunta.classList.add("hidden");
  }
  inputPrimeraPregunta.value = "";
});

function operacionFinal() {
  let interes = 1.53;
  let div = document.createElement("div");
  div.innerHTML = `<h4> En función del dinero que solicitas, deberás devolver en calidad de préstamo personal, <b>36 cuotas fijas, mensuales y finales de $${
    (inputSegundaPregunta.value * interes) / 36
  }</b>. Un asesor comercial te contactará a la brevedad. Gracias por confiar en nosotros y hasta pronto!!</h4>`;
  divsolicitudCreditoAceptada.appendChild(div);
}

btnContinuarSegundaPregunta.addEventListener("click", () => {
  if (inputSegundaPregunta.value == "" || inputSegundaPregunta.value == 0) {
    swal({
      title: "Oops...",
      text: "El monto debe ser consignado y ser mayor a '0'",
      icon: "error",
      dangerMode: true,
    });
    return;
  }

  inputSegundaPregunta.value > 1000000 ? divsolicitudMayorUnMillon.classList.remove("hidden") : divsolicitudMayorUnMillon.classList.add("hidden", operacionFinal());
  inputSegundaPregunta.value = "";
});