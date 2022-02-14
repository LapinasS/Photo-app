const ENDPOINT = 'https://api.github.com/users';

document.querySelector('#btn').addEventListener('click', showUsers);



async function showUsers() {
    document.querySelector('#btn').style.display ="none";
    document.querySelector('#message').style.display = 'none';
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    let dataArray = await Object.entries(data);
    console.log(dataArray);
    console.log(dataArray.length);
    for (let i =0; i<= dataArray.length; i++){
        document.querySelector('#output').innerHTML += `<div class ='userContainer'><img src=${dataArray[i][1].avatar_url} class ='avatar'> ${dataArray[i][1].login}  </div>`;
    }
    
    showUsers().catch(error => {
        console.log('caught error');
        console.error(error);
    });    
}
