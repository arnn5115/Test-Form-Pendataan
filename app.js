// Dummy Input
import listKaryawan from "./KaryawanDummy.json" assert {type: "json"}
let list = listKaryawan.list

// No Dummy Input
/*let list = []*/

let minIndex = 1; let maxIndex = 10;

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
    let arrSize = list.length;
    let viewIndexMax = arrSize < maxIndex ? arrSize : maxIndex;
    
    for (let i = minIndex - 1;i < viewIndexMax; i++) {
        const cellNama = document.querySelector(`#list tr:nth-child(${i+2}) td:nth-child(2)`);
        cellNama.innerText = list[i].nama;
        const cellTelp = document.querySelector(`#list tr:nth-child(${i+2}) td:nth-child(3)`);
        cellTelp.innerText = list[i].telp;
        const cellEmail = document.querySelector(`#list tr:nth-child(${i+2}) td:nth-child(4)`);
        cellEmail.innerText = list[i].email;
        const cellGender = document.querySelector(`#list tr:nth-child(${i+2}) td:nth-child(5)`);
        cellGender.innerText = list[i].gender;
        const cellUsia = document.querySelector(`#list tr:nth-child(${i+2}) td:nth-child(6)`);
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

refresh();

const submit = document.getElementById("submit_button");
submit.addEventListener("click", processData);