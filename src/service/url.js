const SERVER_URL = 'https://api.openweathermap.org';
const serviceUrl = '/data/2.5/weather';
const serviceMultiUrl  = '/data/2.5/forecast';

const generateUrl = (url, params = []) => {
	const urlServerWithAuth = `${SERVER_URL}${url}?appid=b8faa83090eb21ae0b406f2717c44cb2`;

	if(params && params.length > 0 ) {
		let paramsUrl = new URLSearchParams();

		params.forEach(param => {
			paramsUrl.append(param.key, param.value);
		});
		return urlServerWithAuth + `&${paramsUrl.toString()}`;
	}

	return urlServerWithAuth;
}

export { SERVER_URL, serviceUrl, serviceMultiUrl, generateUrl };
