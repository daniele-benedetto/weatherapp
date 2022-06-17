import styled from "styled-components";

const BackgroundColor = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
    transition: all .5s cubic-bezier(.215, .61, .355, 1);
`;

export default BackgroundColor;