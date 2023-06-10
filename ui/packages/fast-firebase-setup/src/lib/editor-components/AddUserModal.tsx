import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import ClaimsInput from "./ClaimsInput";
import { useAddUser } from "./hooks";
import { ButtonRow, Modal, ModalBody, ModalContainer, ModalHeader } from "./modal/Modal.styles";

const AddUserModal = ({ onClose }: { onClose: () => void }) => {
	const { editorForGooglePlatformApiUrl, latestIdToken } = useContext(AuthContext);
	const { trigger: addUser, isMutating } = useAddUser(editorForGooglePlatformApiUrl, latestIdToken);
	const [claims, setClaims] = useState<Record<string, string>>({});
	const [email, setEmail] = useState("");

	return (
		<ModalContainer onClick={onClose}>
			<Modal onClick={(e) => e.stopPropagation()}>
				<ModalHeader>Adding User</ModalHeader>
				<ModalBody>
					<h4>Email</h4>
					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					<ClaimsInput claims={claims} onClaimsChange={setClaims} />
					<ButtonRow>
						<button disabled={isMutating} onClick={onClose}>
							Close
						</button>
						<button
							disabled={isMutating}
							onClick={async () => {
								if (confirm("Are you sure you want to add this user?")) {
									try {
										await addUser({ newEmail: email, newClaims: claims });
										alert("User added!");
										onClose();
									} catch (e) {
										console.error(e);
										alert("There was an error adding the user.");
									}
								}
							}}
						>
							Add
						</button>
					</ButtonRow>
				</ModalBody>
			</Modal>
		</ModalContainer>
	);
};

export default AddUserModal;
