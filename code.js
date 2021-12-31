var selectedRow = null;
function EnviarDatos(e){
    event.preventDefault();
    var formData = readFormData();
    if(selectedRow === null){
        insertNewRecord(formData);
    }
    else{
        updateRecord(formData);
    }
    resetForm();
}

//Retrieve the data
function readFormData(){
    var formData = {};
    formData["C_Barras"] = document.getElementById("C_Barras").value;
    formData["nomProduct"] = document.getElementById("nomProduct").value;
    formData["Cantidad"] = document.getElementById("Cantidad").value;
    formData["Precio"] = document.getElementById("Precio").value;
    return formData;
}

//Insert the data
function insertNewRecord(data){
    var table = document.getElementById("Inventario").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.C_Barras;
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.nomProduct;
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.Cantidad;
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.Precio;
    var cell5 = newRow.insertCell(4);
        cell5.innerHTML = `<button onClick='onEdit(this)'>Edit</button> <button onClick='onDelete(this)'>Delete</button>`
}

//Edit the data
function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('C_Barras').value = selectedRow.cells[0].innerHTML;
    document.getElementById('nomProduct').value = selectedRow.cells[1].innerHTML;
    document.getElementById('Cantidad').value = selectedRow.cells[2].innerHTML;
    document.getElementById('Precio').value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.C_Barras;
    selectedRow.cells[1].innerHTML = formData.nomProduct;
    selectedRow.cells[2].innerHTML = formData.Cantidad;
    selectedRow.cells[3].innerHTML = formData.Precio;
}

//Delete the data
function onDelete(td){
    if(confirm('¿Esta seguro que desea eliminar el registro?')){
        row = td.parentElement.parentElement;
        document.getElementById('Inventario').deleteRow(row.rowIndex);
    }
    resetForm();
}

//Reset the data
function resetForm(){
    document.getElementById('C_Barras').value = '';
    document.getElementById('nomProduct').value = '';
    document.getElementById('Cantidad').value = '';
    document.getElementById('Precio').value = '';
}