// Dummy Input
import listKaryawan from "./KaryawanDummy.json" assert {type: "json"}
let list = listKaryawan.list

// No Dummy Input
/*let list = []*/

let page = 2;
let minIndex = (page - 1) * 10 + 1; let maxIndex = page * 10;
let arrSize = list.length;
let viewIndexMax;

const submit = document.getElementById("submit_button");
const list_back = document.querySelector("#list-controller svg:first-child a path")
const list_next = document.querySelector("#list-controller svg:last-child a path")

class Karyawan{
    constructor(nama, telp, email, gender, tglLahir){
        this.nama = nama;
        this.telp = telp;
        this.email = email;
        this.gender = gender;
        this.tglLahir = tglLahir;
    }
};

function usiaCounter(dob) {
    return (Math.abs((new Date(Date.now() - new Date(dob))).getUTCFullYear() - 1970))
}

function refresh(){
    if (page > 1) {list_back.classList.remove("button-disabled")}
    else {list_back.classList.add("button-disabled")}
    
    minIndex = (page - 1) * 10 + 1;
    maxIndex = page * 10;
    arrSize = list.length;

    if (arrSize <= maxIndex) {
        viewIndexMax = arrSize;
        list_next.classList.add("button-disabled");
    } else {
        viewIndexMax = maxIndex
        list_next.classList.remove("button-disabled");
    }
    
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

function listBack() {
    if (page > 1) {page--}
    refresh();
}

function listNext() {
    if (arrSize > maxIndex) {page++}
    refresh();
}

submit.addEventListener("click", processData);
list_back.addEventListener("click", listBack);
list_next.addEventListener("click", listNext);

refresh();