import { UserInfo } from "firebase/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import ClaimsInput from "./ClaimsInput";
import { useUpdateUser } from "./hooks";
import { ButtonRow, Modal, ModalBody, ModalContainer, ModalHeader } from "./modal/Modal.styles";

const UserToEditModal = ({ user, onClose }: { user: UserInfo; onClose: () => void }) => {
	const { editorForGooglePlatformApiUrl, latestIdToken } = useContext(AuthContext);
	const { trigger: updateUser, isMutating } = useUpdateUser(editorForGooglePlatformApiUrl, latestIdToken);
	const [claims, setClaims] = useState<Record<string, string>>((user as any).customClaims ?? {});

	return (
		<ModalContainer onClick={onClose}>
			<Modal onClick={(e) => e.stopPropagation()}>
				<ModalHeader>Editing User</ModalHeader>
				<ModalBody>
					<ClaimsInput claims={claims} onClaimsChange={setClaims} />
					<ButtonRow>
						<button disabled={isMutating} onClick={onClose}>
							Close
						</button>
						<button
							disabled={isMutating}
							onClick={async () => {
								if (confirm("Are you sure you want to update this user's claims?")) {
									try {
										await updateUser({ uid: user.uid, newClaims: claims });
										alert("User updated!");
										onClose();
									} catch (e) {
										console.error(e);
										alert("There was an error updating the user.");
									}
								}
							}}
						>
							Update
						</button>
					</ButtonRow>
				</ModalBody>
			</Modal>
		</ModalContainer>
	);
};

export default UserToEditModal;
