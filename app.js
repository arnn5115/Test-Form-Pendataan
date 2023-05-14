// Dummy Input
// import listKaryawan from "./KaryawanDummy.json" assert {type: "json"}
// let list = listKaryawan.list

// No Dummy Input
let list = []

// Declaration
let page = 1;
let minIndex = (page - 1) * 10 + 1; let maxIndex = page * 10;
let arrSize = list.length;
let viewIndexMax;

// DOM Declaration
const submit = document.getElementById("submit_button");
const list_back = document.querySelector("#list-controller svg:nth-child(2) a path");
const list_next = document.querySelector("#list-controller svg:nth-child(4) a path");
const list_first = document.querySelector("#list-controller svg:first-child a path");
const list_last = document.querySelector("#list-controller svg:last-child a path");
const pageLabel = document.querySelector("#list-controller p");

// Class Declaration
class Karyawan{
    constructor(nama, telp, email, gender, tglLahir){
        this.nama = nama;
        this.telp = telp;
        this.email = email;
        this.gender = gender;
        this.tglLahir = tglLahir;
    }
};

//Engine
function clearView() {
    const cells = document.querySelectorAll("#list tr td");
    cells.forEach(cell => {
        cell.innerHTML = "&nbsp";
    });
}

function usiaCounter(dob) {
    return (Math.abs((new Date(Date.now() - new Date(dob))).getUTCFullYear() - 1970))
}

function refresh(){
    arrSize = list.length;
    minIndex = (arrSize > 0) ? (page - 1) * 10 + 1 : 0;
    maxIndex = page * 10;

    if (page > 1) {
        list_back.classList.remove("button-disabled");
        list_first.classList.remove("button-disabled");
    }
    else {
        list_back.classList.add("button-disabled");
        list_first.classList.add("button-disabled");
    }

    if (arrSize <= maxIndex) {
        viewIndexMax = arrSize;
        list_next.classList.add("button-disabled");
        list_last.classList.add("button-disabled");
    } else {
        viewIndexMax = maxIndex
        list_next.classList.remove("button-disabled");
        list_last.classList.remove("button-disabled");
    }
    
    pageLabel.innerText = minIndex + " - " + viewIndexMax;

    clearView()
    
    for (let i = minIndex - 1;i < viewIndexMax; i++) {
        const cellNomor = document.querySelector(`#list tr:nth-child(${i%10+2}) td:nth-child(1)`);
        cellNomor.innerText = i + 1;
        const cellNama = document.querySelector(`#list tr:nth-child(${i%10+2}) td:nth-child(2)`);
        cellNama.innerText = list[i].nama;
        const cellTelp = document.querySelector(`#list tr:nth-child(${i%10+2}) td:nth-child(3)`);
        cellTelp.innerText = list[i].telp;
        const cellEmail = document.querySelector(`#list tr:nth-child(${i%10+2}) td:nth-child(4)`);
        cellEmail.innerText = list[i].email;
        const cellGender = document.querySelector(`#list tr:nth-child(${i%10+2}) td:nth-child(5)`);
        cellGender.innerText = list[i].gender;
        const cellUsia = document.querySelector(`#list tr:nth-child(${i%10+2}) td:nth-child(6)`);
        cellUsia.innerText = usiaCounter(list[i].tglLahir);
    }
}

function processData() {
    let nama = document.getElementById("nama").value;
    let telp = document.getElementById("telp").value;
    let email = document.getElementById("email").value;
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let tglLahir = document.getElementById("tgl_lahir").value;
    
    let tempObj = new Karyawan(nama, telp, email, gender, tglLahir);
    list.push(tempObj);

    refresh();
}

// List Navigation
function listBack() {
    if (page > 1) {page--}
    refresh();
}
function listNext() {
    if (arrSize > maxIndex) {page++}
    refresh();
}
function listFirst() {
    if (page > 1) {page = 1}
    refresh();
}
function listLast() {
    if (arrSize > maxIndex) {page = Math.trunc(arrSize/10) + 1}
    refresh();
}

// First Refresh
submit.addEventListener("click", processData);
list_back.addEventListener("click", listBack);
list_next.addEventListener("click", listNext);
list_first.addEventListener("click", listFirst);
list_last.addEventListener("click", listLast);

refresh();