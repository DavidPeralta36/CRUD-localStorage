window.onload = function () {
    var localStorageKeyName = 'data';

    loadFromLocalStorage();

    document.querySelector('#btnEnviar').addEventListener('click',function () {
        var codBarras = document.getElementById("C_Barras"),
            nomPRODUCTO = document.getElementById("nomProduct"),
            CANTIDAD = document.getElementById("Cantidad"),
            PRECIO = document.getElementById("Precio");

        if (codBarras.value.length === 0 || nomPRODUCTO.value.length === 0 || !parseInt(CANTIDAD.value) || !parseInt(PRECIO.value)) return;

        var productos = {
            codBarras: codBarras.value,
            nomPRODUCTO: nomPRODUCTO.value,
            CANTIDAD: CANTIDAD.value,
            PRECIO: PRECIO.value
        }

        codBarras.value = '';
        nomPRODUCTO.value = '';
        CANTIDAD.value = '';
        PRECIO.value = '';

        appendObjectToLocalStorage(productos);
    })

    function appendObjectToLocalStorage(obj){
        var productos = [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyName);

        if (dataInLocalStorage !== null){
            productos = JSON.parse(dataInLocalStorage);
        }

        productos.push(obj);

        localStorage.setItem(localStorageKeyName, JSON.stringify(productos));

        loadFromLocalStorage();
    }

    function loadFromLocalStorage(){
        var productos= [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyName),
            gridBody = document.querySelector("#Inventario tbody");

            if(dataInLocalStorage !== null){
                productos = JSON.parse(dataInLocalStorage);
            }

            gridBody.innerHTML = '';

        productos.forEach(function (x, i) {
            var tr = document.createElement("tr"),
                tdcodBarras = document.createElement("td"),
                tdnomProduct = document.createElement("td"),
                tdCantidad = document.createElement("td"),
                tdPrecio = document.createElement("td"),
                tdRemove = document.createElement("td"),
                btnRemove = document.createElement("button");

            tdcodBarras.innerHTML = x.codBarras;
            tdnomProduct.innerHTML = x.nomPRODUCTO;
            tdCantidad.innerHTML = x.CANTIDAD;
            tdPrecio.innerHTML = x.PRECIO;
            
            btnRemove.textContent = 'Eliminar';
            btnRemove.className = 'btn btn-xs btn-danger';
            btnRemove.addEventListener('click', function () {
                removefromLocalStorage();
            });

            tdRemove.appendChild(btnRemove);
            
            tr.appendChild(tdcodBarras);
            tr.appendChild(tdnomProduct);
            tr.appendChild(tdCantidad);
            tr.appendChild(tdPrecio);
            tr.appendChild(tdRemove);

            gridBody.appendChild(tr);
        });
    }

    function removefromLocalStorage(index){
        var productos = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyName);

        productos = JSON.parse(dataInLocalStorage);

        productos.splice(index, 1);

        localStorage.setItem(localStorageKeyName, JSON.stringify(productos));

        loadFromLocalStorage();
    }
}