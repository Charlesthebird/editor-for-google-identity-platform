import { UserInfo } from "firebase/auth";
import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../AuthContext";
import AddUserModal from "./AddUserModal";
import { AboveTableRow, TableContainer } from "./UserTable.styles";
import UserToEditModal from "./UserToEditModal";
import { useAuthSWR, useDeleteUser } from "./hooks";

const UserTable = () => {
	const { editorForGooglePlatformApiUrl, latestIdToken } = useContext(AuthContext);
	const { data: users } = useAuthSWR<UserInfo[]>(
		editorForGooglePlatformApiUrl,
		latestIdToken,
		"/admin/users"
	);
	const { trigger: deleteUser, isMutating } = useDeleteUser<any>(
		editorForGooglePlatformApiUrl,
		latestIdToken
	);
	const [userToEdit, setUserToEdit] = useState<UserInfo>();
	const [showAddUserModal, setShowAddUserModal] = useState(false);

	const [searchText, setSearchText] = useState("");
	const filteredUsers = useMemo(() => {
		return (
			users?.filter((u) => {
				const ltext = searchText.toLowerCase();
				return (
					u.displayName?.toLowerCase().includes(ltext) ||
					u.uid.includes(ltext) ||
					u.email?.includes(ltext) ||
					u.phoneNumber?.includes(ltext)
				);
			}) ?? []
		);
	}, [searchText, users]);

	return (
		<TableContainer>
			<AboveTableRow>
				<input
					type="text"
					placeholder="Search"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>
				<button onClick={() => setShowAddUserModal(true)}>Add User</button>
			</AboveTableRow>
			<table>
				<thead>
					<tr>
						<th>Email</th>
						<th>Name</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map((u) => (
						<tr key={u.uid}>
							<td>{u.email}</td>
							<td>{u.displayName}</td>
							<td>
								<button disabled={isMutating} onClick={() => setUserToEdit(u)}>
									✎
								</button>
							</td>
							<td>
								<button
									disabled={isMutating}
									onClick={async () => {
										if (
											confirm(
												"Are you sure you want to delete " +
													u.email +
													(!!u.displayName ? " (" + u.displayName + ")" : "")
											)
										) {
											try {
												await deleteUser({ uid: u.uid });
												alert("User deleted!");
											} catch (e) {
												console.error(e);
												alert("There was an error deleting the user.");
											}
										}
									}}
								>
									X
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{!!userToEdit && <UserToEditModal user={userToEdit} onClose={() => setUserToEdit(undefined)} />}
			{!!showAddUserModal && <AddUserModal onClose={() => setShowAddUserModal(false)} />}
		</TableContainer>
	);
};

export default UserTable;
