import { getService } from "./http.service";
import { serviceUrl, generateUrl, serviceMultiUrl } from "./url";

const getWeatherServiceSearch = async (q = '', l = 'it', u = 'metric') => {

    const params = [
        {key: 'q', value: q},
        {key: 'lang', value: l},
        {key: 'units', value: u},
    ];

    const url = generateUrl(serviceUrl, params);
    return await getService(url);
}

const getMultiWeatherServiceSearch = async (q = '', l = 'it', u = 'metric') => {

    const params = [
        {key: 'q', value: q},
        {key: 'lang', value: l},
        {key: 'units', value: u},
    ];

    const url = generateUrl(serviceMultiUrl, params);
    return await getService(url);
}

export { getWeatherServiceSearch, getMultiWeatherServiceSearch };
