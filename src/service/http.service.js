const getService = async (url) => {
    const api = await fetch(url).then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
    const data = await api;
    return data;
}

export { getService };
