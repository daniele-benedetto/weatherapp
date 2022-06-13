import styled from 'styled-components';

const WeatherContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    color: white;
    h1 {
        margin-top: 20px;
        font-weight: bold;
        font-size: 80px;
        margin-left: 40px;
        text-align: center;
    }
    h2 {
        font-weight: bold;
        font-size: 48px;
        text-align: center;
    }
    h3 {
        font-weight: bold;
        font-size: 32px;
        text-align: center;
    }
    p{
        text-align: center;
    }
    svg {
        fill: white;
        width: 120px;
        height: 120px;
    }
    form {
        width: 100%;
        height: 100%;
        display:flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        position: relative;
        max-width: 400px;
        padding: 20px;
        div {
            width: 100%;
            input {
                width: 100%;
                height: 60px;
                border: none;
                border-radius: 20px;
                padding: 20px;
                font-size: 20px;
                box-shadow: 0 5px 20px rgba(0,0,0,.1);
            }
        }
    }
    button {
        background: none!important;
        border: none;
        position: absolute;
        top: 30px;
        right: 30px;
        height: 40px!important;
        width: 40px;
        svg {
            width: 100%;
            height: 100%;
            fill: black;
        }
    }
`;

export default WeatherContainer;