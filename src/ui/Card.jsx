import styled from 'styled-components';

const Card = styled.div`
	width: 20%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	background-color: white;
	padding: 10px;
	border-radius: 10px;
	p {
		font-weight: bold;
		width: 100%;
		text-align: center;
		font-size: 20px;
		color: #909090;
	}
	img {
		width: auto;
	}
	i {
		color: black;
		font-size: 12px;
		text-align: center;
		width: 100%;
	}
`;

export default Card;