
document.addEventListener("DOMContentLoaded", function() {
    // Obtener el nombre del archivo JSON del parámetro de la URL
    var nombreArchivoJSON = obtenerNombreArchivoJSON(); // Supongamos que implementas esta función

    //Rutas de archivos
    var rutaFiles = "../files"
    var rutaUsers = "../users"

    // Construir la ruta completa del archivo JSON
    var rutaCompletaArchivoJSON = rutaUsers + nombreArchivoJSON;

    // Obtener el archivo JSON
    obtenerArchivoJSON(rutaCompletaArchivoJSON, function(data) {
        // Llenar la tabla con los datos recibidos
        llenarTabla(data);
    });

    // Función para obtener el nombre del archivo JSON del parámetro de la URL
    function obtenerNombreArchivoJSON() {
        // Obtener la URL actual de la página
        var url = window.location.href;

        // Analizar la URL para extraer el nombre del archivo JSON
        // Por ejemplo, si la URL es http://ejemplo.com/?archivo=datos.json,
        // el nombre del archivo JSON sería "datos.json"
        var parametrosURL = new URLSearchParams(window.location.search);
        return parametrosURL.get('enviar');
    }


    // Función para llenar la tabla
    function llenarTabla(data) {
        var cuerpoTabla = document.querySelector('#tabla-reportes tbody');
        cuerpoTabla.innerHTML = ''; // Limpiar el contenido previo de la tabla
        
        data.forEach(function(registro) {
            var fila = document.createElement('tr');
            // Suponiendo que cada registro tiene propiedades 'reporte' y 'fecha'
            fila.innerHTML = `
                <td>${registro.reporte}</td>
                <td><a href="${rutaFiles}${registro.reporte}" role="button" download>Descargar</a></td>
                <!-- Agrega más celdas según la estructura de tus datos -->
            `;
            cuerpoTabla.appendChild(fila);
        });
    }

    // Función para obtener el archivo JSON
    function obtenerArchivoJSON(rutaArchivoJSON, callback) {
        // Realiza una solicitud HTTP para obtener el archivo JSON
        var xhr = new XMLHttpRequest();
        xhr.open('GET', rutaArchivoJSON, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Convertir la respuesta JSON a un objeto JavaScript
                var data = JSON.parse(xhr.responseText);
                callback(data); // Llama a la función de callback con los datos obtenidos
            } else {
                console.error('Error al obtener el archivo JSON. Estado: ' + xhr.status);
            }
        };
        xhr.send();
    }
});
