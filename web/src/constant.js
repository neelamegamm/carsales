function backEndConstant() {
    var backendObject = {};
    if (process.env.REACT_APP_CUSTOM_NODE_ENV === 'production')  //production environment variables
    {
        backendObject.backend_url = "https://api.beamfeelgood.com";
        backendObject.frontend_url = "http://beamfeelgood.com";
    }
    else { //local environment variables
        backendObject.backend_url = "http://localhost:8000";
        backendObject.frontend_url = "http://localhost:3000";

    }
    return backendObject;
}

export const FRONTEND_URL = backEndConstant().frontend_url;
export const BACKEND_URL = backEndConstant().backend_url;
