const key = 'AIzaSyAOM2PeAhsSZ1og52KkizFEb1cPwZW41Is';
const lat = 54.698369;
const lng = 25.296383;
let url = `https://geocode.farm/v3/json/reverse/?lat=${lat}&lon=${lng}&country=us&lang=en&count=1`;
const container = document.querySelector('.results');

console.log(url);

// fetch(url)
// .then(response => {
//      return response.json();
// })
// .then(data => {
//     console.log(data.geocoding_results.RESULTS);
//     console.log(data);
// })

async function showAdd() {
    const response = await fetch(url);
    const data = await response.json();  
    const results = await data.geocoding_results.RESULTS[0];
    const resultsAddr = results.ADDRESS;
    document.querySelector('.results').innerHTML += `<div>${results.formatted_address}</div>`;
    document.querySelector('.results').innerHTML += `<div>${resultsAddr.admin_2}, ${resultsAddr.street_name}, ${resultsAddr.street_number}.</div>`;


    console.log(data); 
    console.log (results);
    console.log(resultsAddr);
}
showAdd().catch(error => {
    console.log('caught error');
    console.error(error);
})