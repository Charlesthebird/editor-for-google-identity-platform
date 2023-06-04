import styled, { css } from "styled-components";

export const AboveTableRow = styled.div`
	display: flex;
	gap: 15px;
	justify-content: space-between;
	margin-bottom: 10px;
	input {
		flex-grow: 1;
	}
`;

export const TableContainer = styled.div(
	() => css`
		margin: 1.5em 0;
		position: relative;

		input {
			border: 1px solid #aaa;
			&:read-only {
				background-color: #eee;
				cursor: not-allowed;
			}
		}

		table {
			font-family: arial, sans-serif;
			border-collapse: collapse;
			width: 100%;
		}

		td,
		th {
			border: 1px solid #dddddd;
			text-align: left;
			padding: 8px;
			font-size: 0.75rem;
			button {
				font-size: 1.25rem;
			}
		}

		tr:nth-child(even) {
			background-color: #efefef;
		}

		button {
			border: 1px solid #aaa;
			color: #575757;
			border-radius: 5px;
			&:disabled {
				cursor: not-allowed;
			}
			&:not(:disabled) {
				cursor: pointer;
				&:hover {
					background-color: #eee;
					&:active {
						background-color: #ddd;
					}
				}
			}
		}
	`
);
