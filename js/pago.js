$(document).ready(function () {
    //Subtotal que viene del archivo carrito.js
    $("#subtotal").text(calcularTotalCarrito());
    //Para el html al cambiar el select sin que haya un error primero
    $("#metodo-envio").on("change", calcularEnvio);
    $("#metodo-pago").on("change", validarPago);
    //Validar el form 
    validarFormulario();
});

//Validar los campos del form antes del envio
function validarFormulario() {
    $("#form-carrito").submit(function (e) {
        if ($("#nombre").val() == "") {
            e.preventDefault();
            $("#error-nombre").fadeIn();
            $("#nombre").change(function () {
                $("#error-nombre").fadeOut();
            });
        } else if ($("#email").val() == "") {
            e.preventDefault();
            $("#error-email").fadeIn();
            $("#email").change(function () {
                $("#error-email").fadeOut();
            });
        } else if ($("#telefono").val() == "") {
            e.preventDefault();
            $("#error-tel").fadeIn();
            $("#telefono").change(function () {
                $("#error-tel").fadeOut();
            });
        } else if ($("#direccion").val() == "") {
            e.preventDefault();
            $("#error-direccion").fadeIn();
            $("#direccion").change(function () {
                $("#error-direccion").fadeOut();
            });
        } else if (($("#cod-postal").val() == "") || ($("#cod-postal").val().length != 4)) {
            e.preventDefault();
            $("#error-codigopostal").fadeIn();
            $("#cod-postal").change(function () {
                $("#error-codigopostal").fadeOut();
            });
        } else if ($("#provincia").val() == "") {
            e.preventDefault();
            $("#error-provincia").fadeIn();
            $("#provincia").change(function () {
                $("#error-provincia").fadeOut();
            });
        } else if ($("#localidad").val() == "") {
            e.preventDefault();
            $("#error-localidad").fadeIn();
            $("#localidad").change(function () {
                $("#error-localidad").fadeOut();
            });
        } else if ($("#metodo-envio").val() == "defecto") {
            e.preventDefault();
            $("#error-envio").fadeIn();
            //Change que depende de otra funcion y modifica el html
            $("#metodo-envio").on("change", calcularEnvio);
        } else if ($("#metodo-pago").val() == "defecto") {
            e.preventDefault();
            $("#error-pago").fadeIn();
            //Change que depende de otra funcion y modifica el html
            $("#metodo-pago").on("change", validarPago);
        } else if ($("#metodo-pago").val() == "debito" || $("#metodo-pago").val() == "credito") {
            //If el medio de pago es tarjeta se suman dos validaciones mas
            e.preventDefault();
            if (($("#num-tarjeta").val() == "") || ($("#num-tarjeta").val().length != 16)) {
                e.preventDefault();
                $("#error-numtarj").fadeIn();
                $("#num-tarjeta").change(function () {
                    $("#error-numtarj").fadeOut();
                });
            } else if (($("#cod-seguridad").val() == "") || ($("#cod-seguridad").val().length != 3)) {
                e.preventDefault();
                $("#error-codseg").fadeIn();
                $("#cod-seguridad").change(function () {
                    $("#error-codseg").fadeOut();
                });
            } else {
                //Else es para cuando el usuario elige tarjeta
                e.preventDefault();

                //Una vez que se validan los datos se guardan en un array
                let datosCompra = [];
                datosCompra.push($("#nombre").val());
                datosCompra.push($("#email").val());
                datosCompra.push($("#telefono").val());
                datosCompra.push($("#direccion").val());
                datosCompra.push($("#cod-postal").val());
                datosCompra.push($("#provincia").val());
                datosCompra.push($("#localidad").val());
                datosCompra.push($("#metodo-envio").val());
                datosCompra.push($("#metodo-pago").val());
                datosCompra.push($("#num-tarjeta").val());
                datosCompra.push($("#cod-seguridad").val());

                //Convertir array en JSON
                let datosCompraJSON = JSON.stringify(datosCompra);
                enviarDatos(datosCompraJSON);

                //Alert para el user de envio exitoso
                Swal.fire({
                    icon: 'success',
                    title: '¡Compra confirmada!',
                    text: 'Vas a recibir un mail de confirmación con el detalle de la compra en tu casilla',
                    confirmButtonColor: "#444444"
                });

                //Vaciar carrito
                vaciarCarrito();

                //Reset de entradas
                $(".entrada-pago").val('');
                $("#metodo-envio option[value='defecto']").attr("selected", true);
                $("#metodo-pago option[value='defecto']").attr("selected", true);
            };
        } else {
            //Else es para cuando el usuario elige efectivo
            e.preventDefault();

            //Valido datos y guardo en un array
            let datosCompra = [];
            datosCompra.push($("#nombre").val());
            datosCompra.push($("#email").val());
            datosCompra.push($("#telefono").val());
            datosCompra.push($("#direccion").val());
            datosCompra.push($("#cod-postal").val());
            datosCompra.push($("#provincia").val());
            datosCompra.push($("#localidad").val());
            datosCompra.push($("#metodo-envio").val());
            datosCompra.push($("#metodo-pago").val());

            //Convertir el array a JSON 
            let datosCompraJSON = JSON.stringify(datosCompra);
            enviarDatos(datosCompraJSON);

            //Alert para el user de envio exitoso
            Swal.fire({
                icon: 'success',
                title: '¡Compra confirmada!',
                text: 'Vas a recibir un mail de confirmación con el detalle de la compra en tu casilla',
                confirmButtonColor: "#444444"
            });

            //vaciar carrito
            vaciarCarrito();

            //Reset de entradas
            $(".entrada-pago").val('');
            $("#metodo-envio option[value='defecto']").attr("selected", true);
            $("#metodo-pago option[value='defecto']").attr("selected", true);
        };
    });
};

//Calcular el costo de envio segun la opcion seleccionada por el usuario
function calcularEnvio() {
    let envio;
    let metodoEnvio = $("#metodo-envio").val();
    if (metodoEnvio == "caba") {
        envio = 800;
        $("#envio").text(envio);
        $("#total").text(calcularTotalCompra(envio));
        $("#error-envio").hide();
    };
    if (metodoEnvio == "gba") {
        envio = 1100;
        $("#envio").text(envio);
        $("#total").text(calcularTotalCompra(envio));
        $("#error-envio").hide();
    };
    if (metodoEnvio == "interior") {
        envio = 2500;
        $("#envio").text(envio);
        $("#total").text(calcularTotalCompra(envio));
        $("#error-envio").hide();
    };
    if (metodoEnvio == "retiro") {
        envio = 0;
        $("#envio").text(envio);
        $("#total").text(calcularTotalCompra(envio));
        $("#error-envio").hide();
    };
};

//Calcular el total de la compra sumando el total del carrito y el envio
function calcularTotalCompra(envio) {
    let total = 0;
    for (const producto of carrito) {
        total += producto.precio * producto.cantidad;
    }
    return total + envio;
};

//Validar la opcion elegida como metodo de pago
function validarPago() {
    let metodoPago = $("#metodo-pago").val();
    if (metodoPago == "debito" || metodoPago == "credito") {
        $(".pago-tarjeta").fadeIn();
        $("#error-pago").fadeOut();
    };
    if (metodoPago == "efectivo") {
        $(".pago-tarjeta").fadeOut();
        $("#error-pago").fadeOut();
        $("#error-numtarj").fadeOut();
        $("#error-codseg").fadeOut();
    };
};

//Reset de valores una vez finalizada la compra 
function vaciarCarrito() {
    $("#gastoTotal").text("Total: $0");
    $("#cantidad-compra").text("0");
    $(".tabla-carrito").remove();
    localStorage.clear();
    carrito = [];
}

//Function para simular subida de datos a una API
function enviarDatos(datos) {
    const URLPOST = "https://jsonplaceholder.typicode.com/posts";

    $.post(URLPOST, datos).done(function (respuesta, estado) {
        console.log(respuesta);
        console.log(estado);
    })
}