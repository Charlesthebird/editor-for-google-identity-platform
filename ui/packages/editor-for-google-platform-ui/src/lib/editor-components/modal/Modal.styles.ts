import { CSSProperties } from "react";
import styled, { css } from "styled-components";

export const Modal = styled.div`
	padding: 30px;
	background-color: white;
	border: 1px solid #aaa;
	border-radius: 5px;
`;

export const ModalContainer = styled.div`
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	background-color: #dddd;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ModalHeader = styled.h3`
	margin: 0;
	padding-bottom: 15px;
`;

export const ModalBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	h4 {
		margin: 5px 0;
	}
`;

export const ButtonRow = styled.div<{
	flexGrow?: CSSProperties["flexGrow"];
	justifyContent?: CSSProperties["justifyContent"];
}>(
	({ justifyContent = "flex-end", flexGrow = 0 }) => css`
		display: flex;
		gap: 15px;
		form {
			display: flex;
			gap: 15px;
		}
		justify-content: ${justifyContent};
		margin-top: 15px;
		* {
			flex-grow: ${flexGrow};
		}
	`
);
