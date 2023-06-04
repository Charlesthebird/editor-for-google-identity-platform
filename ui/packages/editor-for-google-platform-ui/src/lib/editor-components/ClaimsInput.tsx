import { useState } from "react";
import { ButtonRow } from "./modal/Modal.styles";

const ClaimsInput = ({
	claims,
	onClaimsChange: setClaims,
}: {
	claims: Record<string, string>;
	onClaimsChange: (newClaims: Record<string, string>) => void;
}) => {
	const [newClaimKey, setNewClaimKey] = useState("");
	const [newClaimValue, setNewClaimValue] = useState("");

	const addClaims = () => {
		setClaims({
			...claims,
			[newClaimKey]: newClaimValue,
		});
		setNewClaimKey("");
		setNewClaimValue("");
	};

	return (
		<>
			<h4>Custom Claims</h4>
			{Object.keys(claims).map((k) => (
				<ButtonRow key={k} flexGrow={1}>
					<input type="text" value={k} readOnly />
					<input
						type="text"
						value={claims[k]}
						onChange={(e) => setClaims({ ...claims, [k]: e.target.value })}
					/>
					<button
						onClick={() => {
							const newClaims = { ...claims };
							delete newClaims[k];
							setClaims(newClaims);
						}}
					>
						X
					</button>
				</ButtonRow>
			))}
			<ButtonRow flexGrow={1}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						addClaims();
					}}
				>
					<input type="text" value={newClaimKey} onChange={(e) => setNewClaimKey(e.target.value)} />
					<input type="text" value={newClaimValue} onChange={(e) => setNewClaimValue(e.target.value)} />
					<button disabled={!newClaimKey || !newClaimValue} type="submit">
						Add Claim
					</button>
				</form>
			</ButtonRow>
		</>
	);
};

export default ClaimsInput;
