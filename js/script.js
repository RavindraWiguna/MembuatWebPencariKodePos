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

    debug.innerHTML = "";
}

function binser_data_and_return_all(dataJson, tkodeParent){
    let left = 0;
    let right = dataJson.length;

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

    debug.innerHTML = "Sedang memfilter kabupaten";
    let filtered_kabupaten = binser_data_and_return_all(data, kodeProvinsi);

    UpdateDropDownList("dropdownKabupaten", filtered_kabupaten);
    hasfetchKabupaten = true;
    debug.innerHTML = "";
}

async function getAllKelurahan(kodeKecamatan){
    // display debug
    let debug = document.getElementById("debugKelurahan");
    debug.innerHTML = "Sedang mengambil data. . .";

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

    console.log(data[0]);
    let filtered_kelurahan = binser_data_and_return_all(data, kodeKecamatan);

    UpdateDropDownList("dropdownKelurahan", filtered_kelurahan);
    hasfetchKelurahan = true;
    debug.innerHTML = "";
}

async function getAllKecamatan(kodeKabupaten){
    // display debug
    let debug = document.getElementById("debugKecamatan");
    debug.innerHTML = "Sedang mengambil data. . .";

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

    let filtered_kecamatan = binser_data_and_return_all(data, kodeKabupaten);

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
    }else{
        disable_dropdown("dropdownKabupaten");
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
    else{
        disable_dropdown("dropdownKecamatan");
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
    else{
        disable_dropdown("dropdownKelurahan");
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
