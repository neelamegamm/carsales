
export function postData(data = {}) {
    // return authorization header with basic auth credentials
    // Default options are marked with *
    if (localStorage.getItem('user')) {
        let authData = JSON.parse(localStorage.getItem('user'));
        return ({
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'bearer ' + authData.token
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
    } else {
        return ({
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
    }
}

export function getData(data = {}) {
    // return authorization header with basic auth credentials
    if (localStorage.getItem('user')) {

        let authData = JSON.parse(localStorage.getItem('user'));
        console.log('authData', authData)
        return ({
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'bearer ' + authData.token
            },
            dataType: 'json'
        });
    }
    else {
        return ({
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            dataType: 'json'

        });
    }
}


export function deleteData(data = {}) {
    if (localStorage.getItem('user')) {

        let authData = JSON.parse(localStorage.getItem('user'));
        return ({
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'bearer ' + authData.token
            },
            dataType: 'json'
        });
    }
    else {
        return ({
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            dataType: 'json'

        });
    }
}