// ===== UTIL FUNCTIONs =========
function UpdateDropDownList(idDropDown, dataOption) {
    // get DropDownList element.
    let dropDownElement = document.getElementById(idDropDown);

    while (dropDownElement.hasChildNodes()) {
        dropDownElement.removeChild(dropDownElement.firstChild);
    }

    // default
    let temp = document.createElement("OPTION");
    temp.innerHTML = "Pilih Salah Satu";
    temp.value = "-1";

    //Add the Option element to DropDownList.
    dropDownElement.options.add(temp);

    // Add the Options to the DropDownList.
    for (var i = 0; i < dataOption.length; i++) {
        var option = document.createElement("OPTION");
        option.innerHTML = dataOption[i].NamaDiri;
        option.value = dataOption[i].KodeDiri;
        dropDownElement.options.add(option);
    }
    // alert(dataOption[0].NamaDiri);
    // alert("selesai");
};

function disable_dropdown(idDropDown){
    let dd = document.getElementById(idDropDown);
    dd.disabled = true;
}

function enable_dropdown(idDropDown){
    let dd = document.getElementById(idDropDown);
    dd.disabled = false;
}

// ========================================================================= //

// urls tempat json
const url_provinsi = "./json/daerah/provinsi.json";
const url_kabupaten = "./json/daerah/kabupaten.json";
const url_kecamatan = "./json/daerah/kecamatan.json";
const url_kelurahan = "./json/daerah/kelurahan.json";

// --- FUNCTIONS TO FETCH JSON -----
async function getAllProvinsi(){
    // display debug
    let debug = document.getElementById("debugProvinsi");
    debug.innerHTML = "Sedang mengambil data. . .";
    const response = await fetch(url_provinsi);
    const data = await response.json();

    // console.log(data);
    UpdateDropDownList("dropdownProvinsi", data);
    debug.innerHTML = "";

    // disable kabupaten dan kecamatan
    disable_dropdown("dropdownKabupaten");
    disable_dropdown("dropdownKecamatan");
    disable_dropdown("dropdownKelurahan");
}

let fetchedDataKecamatan = null;
let hasfetchKecamatan = false;
async function initKecamatan(){
    // display debug
    let debug = document.getElementById("debugKecamatan");
    debug.innerHTML = "Sedang mengambil data. . .";
    const response = await fetch(url_kecamatan);
    const data = await response.json();

    fetchedDataKecamatan = data;
    hasfetchKecamatan = true;

    // alert("selesai ambil kecamatan");
    // console.log(data);
    // UpdateDropDownList("dropdownProvinsi", data);
    debug.innerHTML = "";
}

let fetchedDataKabupaten = null;
let hasfetchKabupaten = false;
async function initKabupaten(){
    // display debug
    let debug = document.getElementById("debugKabupaten");
    debug.innerHTML = "Sedang mengambil data. . .";
    const response = await fetch(url_kabupaten);
    const data = await response.json();

    fetchedDataKabupaten = data;
    hasfetchKabupaten= true;

    // alert("selesai ambil kabupaten");
    // console.log(data);
    // UpdateDropDownList("dropdownProvinsi", data);
    debug.innerHTML = "";
}

let fetchedDataKelurahan = null;
let hasfetchKelurahan = false;
async function initKelurahan(){
    // display debug
    let debug = document.getElementById("debugKelurahan");
    debug.innerHTML = "Sedang mengambil data. . .";
    const response = await fetch(url_kelurahan);
    const data = await response.json();

    fetchedDataKelurahan = data;
    hasfetchKelurahan = true;

    // alert("selesai ambil kabupaten");
    // console.log(data);
    // UpdateDropDownList("dropdownProvinsi", data);
    debug.innerHTML = "";
}


// async function initTest(){
//     // display debug
//     alert("mulai nih je");
//     let debug = document.getElementById("debugPostal");
//     debug.innerHTML = "Sedang mengambil data. . .";
//     debug.innerHTML = "llll";
//     const response = await fetch("https://raw.githubusercontent.com/ArrayAccess/Indonesia-Postal-And-Area/master/data/json/area/62/11/1101/1101010/1101010.json");
//     const data = await response.json();

//     // fetchedDataKecamatan = data;
//     // hasfetchKecamatan = true;

//     alert("selesai broo");
//     console.log(data);
//     // UpdateDropDownList("dropdownProvinsi", data);
//     // debug.innerHTML = "";
// }

// let fetchedDataPostal = null;
// let hasfetchPostal = false;
// async function initPostal(){
//     // display debug
//     let debug = document.getElementById("debugPostal");
//     debug.innerHTML = "Sedang mengambil data. . .";
//     const response = await fetch(url_postal);
//     const data = await response.json();

//     fetchedDataPostal = data;
//     hasfetchPostal= true;

//     // alert("selesai ambil kabupaten");
//     // console.log(data);
//     // UpdateDropDownList("dropdownProvinsi", data);
//     debug.innerHTML = "";
// }




function binser_data_and_return_all(dataJson, tkodeParent){
    let left = -1;
    let right = dataJson.length+1;

    /*
    misal array ini dan cari 6
    3 4 5 6 6 6 8 9
    0 1 2 3 4 5 6 7
    F F F T F F F F

    l = -1, r = 9
    m = 8/2 = 4
    6 is same, but update r, r = 4
    l = -1 r = 4
    m = 3/2 = 1
    4 is low, update l, l = 2
    l = 2, r = 4
    m = 6/2 = 3
    6 is same, update r, r = 3
    l = 2, r = 3
    m = 2
    5 is low, update l, l = 3
    l = 3, r = 3

    
    */

    while(left < right){
        let middle = Math.floor((left+right)/2);
        console.log(left, middle, right);
        if(dataJson[middle].KodeParent < tkodeParent){
            left = middle+1;
        }
        else if(dataJson[middle] > tkodeParent){
            right = middle-1;
        }
        else{
            // uh mundur sir, but jangan -1
            right = middle;
        }
    }

    // now linear search
    let anakParent = [

    ];

    for(let i = right;i<dataJson.length;i++){
        // console.log(dataJson[i]);
        if(dataJson[i].KodeParent == tkodeParent){
            anakParent.push(dataJson[i]);
            // console.log("tambah");
        }
        else if(dataJson[i].KodeParent > tkodeParent){
            // console.log("selesai");
            break;
        }
    }

    return anakParent;

}


async function getAllKabupaten(kodeProvinsi){
    // display debug
    let debug = document.getElementById("debugKabupaten");
    debug.innerHTML = "Sedang mengambil data. . .";

    let data = null;
    if(! hasfetchKabupaten){
        const response = await fetch(url_kabupaten);
        data = await response.json();
        fetchedDataKabupaten = data;
    }
    else{
        data = fetchedDataKabupaten;
    }
    // console.log(data);
    debug.innerHTML = "Sedang memfilter kabupaten";
    // let filtered_kabupaten = data.filter((kabupaten) => kabupaten.KodeParent == kodeProvinsi);
    let filtered_kabupaten = binser_data_and_return_all(data, kodeProvinsi);
    // console.log(filtered_kabupaten);
    // let jsonfied = JSON.
    UpdateDropDownList("dropdownKabupaten", filtered_kabupaten);
    hasfetchKabupaten = true;
    debug.innerHTML = "";
}

async function getAllKelurahan(kodeKecamatan){
    // display debug
    let debug = document.getElementById("debugKelurahan");
    debug.innerHTML = "Sedang mengambil data. . .";
    // console.log("log");
    // alert("start");
    let data = null;
    if(! hasfetchKelurahan){
        const response = await fetch(url_kecamatan);
        data = await response.json();
        fetchedDataKecamatan = data;
    }
    else{
        data = fetchedDataKelurahan;
    }
    debug.innerHTML = "Sedang memfilter kelurahan";
    // console.log(data);
    // let filtered_kecamatan = data.filter((kecamatan) => kecamatan.KodeParent == kodeKabupaten);
    // console.log(filtered_kabupaten);
    // // let jsonfied = JSON.
    console.log(data[0]);
    let filtered_kelurahan = binser_data_and_return_all(data, kodeKecamatan);
    // console.log(filtered_kecamatan);
    UpdateDropDownList("dropdownKelurahan", filtered_kelurahan);
    hasfetchKelurahan = true;
    debug.innerHTML = "";
}

async function getAllKecamatan(kodeKabupaten){
    // display debug
    let debug = document.getElementById("debugKecamatan");
    debug.innerHTML = "Sedang mengambil data. . .";
    // console.log("log");
    // alert("start");
    let data = null;
    if(! hasfetchKecamatan){
        const response = await fetch(url_kecamatan);
        data = await response.json();
        fetchedDataKecamatan = data;
    }
    else{
        data = fetchedDataKecamatan;
    }
    debug.innerHTML = "Sedang memfilter kecamatan";
    // console.log(data);
    // let filtered_kecamatan = data.filter((kecamatan) => kecamatan.KodeParent == kodeKabupaten);
    // console.log(filtered_kabupaten);
    // // let jsonfied = JSON.
    let filtered_kecamatan = binser_data_and_return_all(data, kodeKabupaten);
    // console.log(filtered_kecamatan);
    UpdateDropDownList("dropdownKecamatan", filtered_kecamatan);
    hasfetchKecamatan = true;
    debug.innerHTML = "";
}

function updateKabupaten(){
    let dde = document.getElementById("dropdownProvinsi");
    let kodeProvinsi = dde.value;
    if(kodeProvinsi != -1){
        getAllKabupaten(kodeProvinsi);
        // enable kabupaten
        enable_dropdown("dropdownKabupaten");
    }
    
    // disable kecamatan, suruh milih kabupaten dulu
    disable_dropdown("dropdownKecamatan");
    disable_dropdown("dropdownKelurahan");
}

function updateKecamatan(){
    let dde = document.getElementById("dropdownKabupaten");
    let kodeKabupaten = dde.value;
    if(kodeKabupaten != -1){
        getAllKecamatan(kodeKabupaten);

        // enable kecamatan
        enable_dropdown("dropdownKecamatan");
    }

    // disable kelurahan
    disable_dropdown("dropdownKelurahan");
}

function updateKelurahan(){
    let dde = document.getElementById("dropdownKecamatan");
    let kodeKecamatan = dde.value;
    if(kodeKecamatan != -1){
        getAllKelurahan(kodeKecamatan);

        // enable kelurahan
        enable_dropdown("dropdownKelurahan");
    }
}



function get_postal_json_url(){
    //example: "https://raw.githubusercontent.com/ArrayAccess/Indonesia-Postal-And-Area/master/data/json/area/62/11/1101/1101010/1101010.json"
    
    let kodeProvinsi = document.getElementById("dropdownProvinsi").value;
    let kodeKabupaten = document.getElementById("dropdownKabupaten").value;
    let kodeKecamatan = document.getElementById("dropdownKecamatan").value;
    let kodeKelurahan = document.getElementById("dropdownKelurahan").value;

    if(kodeKelurahan != -1){
        return `https://raw.githubusercontent.com/ArrayAccess/Indonesia-Postal-And-Area/master/data/json/area/62/${kodeProvinsi}/${kodeKabupaten}/${kodeKecamatan}/${kodeKelurahan}/${kodeKelurahan}.json`;
    }
    return `https://raw.githubusercontent.com/ArrayAccess/Indonesia-Postal-And-Area/master/data/json/area/62/${kodeProvinsi}/${kodeKabupaten}/${kodeKecamatan}/${kodeKecamatan}.json`;

}

async function getKodePos(){
    if(!document.getElementById("dropdownKecamatan").disabled && document.getElementById("dropdownKecamatan").value != -1){
        let data = null;
        // alert("nyari");
        let result = document.getElementById("result");
        
        const response = await fetch(get_postal_json_url());
        data = await response.json();
    
        // alert(data);
        // console.log(data);
        // alert("selesai");
        result.innerHTML = `
        <p>Kode Pos:</p>
        <p>${data.postal}</p>
        `;
        
    }
    else{
        alert("Mohon memilih daerah hingga paling tidak ditingkat kecamatan");
    }


}


// ambil kelurahan
initKelurahan();
// ambil kecamatan dulu deh
initKecamatan();
// ambil kabupaten juga dulu deh
initKabupaten();
// ambil semua data provinsi dan update dropdown list
getAllProvinsi();

// initTest();

// ================= CARA BARU =============
// function get_provinsi_json_url(kodeProvinsi){
//     console.log(`./json/kodepos/${kodeProvinsi}/${kodeProvinsi}.json`);
//     return `./json/kodepos/${kodeProvinsi}/${kodeProvinsi}.json`;
// }

// function get_kabupaten_json_url(kodeProvinsi, kodeKabupaten){
//     console.log( `./json/kodepos/${kodeProvinsi}/${kodeKabupaten}/${kodeKabupaten}.json`);
//     return `./json/kodepos/${kodeProvinsi}/${kodeKabupaten}/${kodeKabupaten}.json`;
// }

// async function get_kode_dan_nama_kabupaten(kodeProvinsi, anakProvinsi){
//     let debug = document.getElementById("debugKabupaten");
//     debug.innerHTML = "Sedang mengambil nama anak provinsi";

//     let dataKabupaten = [

//     ];

//     for(let i = 0;i<anakProvinsi.length;i++){
//         const response = await fetch(get_kabupaten_json_url(kodeProvinsi, anakProvinsi[i]));
//         const data = await response.json();

//         debug.innerHTML = "berhasil mendapatkan anak ke" + i;

//         dataKabupaten.push({"KodeDiri": anakProvinsi[i], "NamaDiri": data.name});
//         console.log("done" + i);
//     }
//     UpdateDropDownList("dropdownKabupaten", dataKabupaten);
//     debug.innerHTML = "";
// }


// async function getAllKabupaten(kodeProvinsi){
//     // display debug
//     let debug = document.getElementById("debugKabupaten");
//     debug.innerHTML = "Sedang mengambil data. . .";

//     const response = await fetch(get_provinsi_json_url(kodeProvinsi));
//     const data = await response.json();

//     debug.innerHTML = "Selesai mengambil anak provinsi";
//     // get nama kabupaten and update dropdown
//     get_kode_dan_nama_kabupaten(kodeProvinsi, data.children);
// }

// function updateKabupaten(){
//     let dde = document.getElementById("dropdownProvinsi");
//     let kodeProvinsi = dde.value;
//     getAllKabupaten(kodeProvinsi);
// }

