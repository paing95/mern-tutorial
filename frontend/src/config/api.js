import { config } from "./config";

const dictToQueryParams = (data) => {
    let array = [];
    for (let key in data) {
        array.push(
            encodeURIComponent(key) +
            "=" +
            encodeURIComponent(data[key])
        );
    }
    return array.join('&');
}

export const api = async (url, method, data) => {
    let apiURL = config.url +  url;
    let payload = {};

    if (method === 'GET') {
        apiURL += '?' + dictToQueryParams(data);
    } else if (method === 'POST') {
        payload = { 
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    } else if (method === 'DELETE') {
        apiURL += '?' + dictToQueryParams(data);
        console.log('URL:', apiURL);
        payload = { 
            method: "DELETE"
        }
    }

    const response = await fetch(
        apiURL,
        payload
    );
    const json = await response.json();

    return { json, response };
}