const getService = async (url) => {
    const api = await fetch(url).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Qualcosa è andato storto');
      })
    const data = await api;
    return data;
}

export { getService };
