const input = document.getElementById('numberInput');
const btn = document.getElementById('btn');
let display = document.getElementById('display');

const getRandNum = async () => {

    let obj = {
        max: input.value,
    }

    console.log(obj);
    console.log(JSON.stringify(obj));

    let response = await fetch('/random-number', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });

    response = await response.json();

    display.textContent = response.randNum;
    //server sending back json / or .text for server sending back json
}

btn.addEventListener('click', getRandNum);


//JSON built in object for working with json
//parse stringify