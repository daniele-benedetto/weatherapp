import styled from 'styled-components';

const Card = styled.div`
	width: 20%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 10px;
	box-shadow: 0 5px 5px rgba(0,0,0,.3);

	p {
		font-weight: bold;
		width: 100%;
		text-align: center;
		font-size: 20px;
	}
	img {
		width: auto;
	}
	i {
		font-size: 12px;
		text-align: center;
		width: 100%;
	}
`;

export default Card;