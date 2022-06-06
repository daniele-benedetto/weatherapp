const timeBuilder = (d) => {
    const hours = d.getHours() < 10 ? '0': '';
    const minutes = d.getMinutes() < 10 ? '0': '';

    let time = hours + d.getHours() + '.' + minutes + d.getMinutes();
    
    return time;
}

export default timeBuilder;