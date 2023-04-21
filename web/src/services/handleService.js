import { toast } from 'react-toastify';
import { CHECK_ISAUTH } from '../types';
function handleResponse(response, dispatch) {

    return response.text().then(text => {
        if (!response.ok && response.status == 401) {
            localStorage.clear();
            dispatch({
                type: CHECK_ISAUTH,
                payload: false
            });
            toast.error('Token expired. Please login again.')
            return Promise.reject()
        }
        let data = "";
        if (response.status !== 401) {
            data = text && JSON.parse(text);
        }

        if (!response.ok || (data && (data.status === false || data.success === false))) {

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        } else {
            return data;
        }
    });
}

export default handleResponse;