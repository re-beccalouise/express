const input = document.getElementById('numberInput');
const btn = document.getElementById('btn');

const login = async () => {

    let obj = {
        max: input.value,
    }

    console.log(obj);
    console.log(JSON.stringify(obj));

    const response = await fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });

    console.log(await response.json());
    //server sending back json / or .text for server sending back json
}

login();

//JSON built in object for working with json
//parse stringify