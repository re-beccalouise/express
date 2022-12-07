const login = async () => {

    let obj = {
        username: 'bec',
        password: 'password'
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
}

login();