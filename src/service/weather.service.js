import { getService } from "./http.service";
import { serviceUrl, generateUrl } from "./url";

const getWeatherServiceSearch = async (q = '', l = 'it', u = 'metric') => {

    const params = [
        {key: 'q', value: q},
        {key: 'lang', value: l},
        {key: 'units', value: u},
    ];

    const url = generateUrl(serviceUrl, params);
    return await getService(url);
}

export { getWeatherServiceSearch };
