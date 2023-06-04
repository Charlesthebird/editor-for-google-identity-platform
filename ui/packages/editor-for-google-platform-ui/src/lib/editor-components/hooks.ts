import { useMemo } from "react";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";

export async function fetcher(...args: Parameters<typeof fetch>) {
	const res = await fetch(...args);
	return await res.json();
}

export function useAuthSWR<T>(
	editorForGooglePlatformApiUrl: string,
	idToken: string | undefined,
	url: string
) {
	// Skip if idToken is undefined.
	const newInput = useMemo(
		() => (idToken === undefined ? null : `${editorForGooglePlatformApiUrl}${url}`),
		[idToken]
	);
	return useSWR<T>(newInput, async (input: RequestInfo, init?: RequestInit | undefined) => {
		if (!init) init = {};
		init.headers = {
			...(init.headers ?? {}),
			"Content-Type": "application/json",
			Authorization: "Bearer " + idToken,
		};
		return await fetcher(input, init);
	});
}

export function useDeleteUser<T>(editorForGooglePlatformApiUrl: string, idToken: string | undefined) {
	const url = "/admin/users";
	// Skip if idToken is undefined.
	const newInput = useMemo(
		() => (idToken === undefined ? null : `${editorForGooglePlatformApiUrl}${url}`),
		[idToken]
	);
	const deleteUser = async (url: string, { arg }: { arg: { uid: string } }) => {
		let init: RequestInit = {
			method: "DELETE",
			body: JSON.stringify(arg),
		};
		if (!!idToken) {
			init.headers = {
				"Content-Type": "application/json",
				Authorization: "Bearer " + idToken,
			};
		}
		const res = await fetcher(url, init);
		mutate(url);
		return res;
	};
	return useSWRMutation(newInput, deleteUser);
}

export function useUpdateUser<T>(editorForGooglePlatformApiUrl: string, idToken: string | undefined) {
	const url = "/admin/users";
	// Skip if idToken is undefined.
	const newInput = useMemo(
		() => (idToken === undefined ? null : `${editorForGooglePlatformApiUrl}${url}`),
		[idToken]
	);
	const updateUser = async (
		url: string,
		{ arg }: { arg: { uid: string; newClaims: Record<string, string> } }
	) => {
		let init: RequestInit = {
			method: "POST",
			body: JSON.stringify(arg),
		};
		if (!!idToken) {
			init.headers = {
				"Content-Type": "application/json",
				Authorization: "Bearer " + idToken,
			};
		}
		const res = await fetcher(url, init);
		mutate(url);
		return res;
	};
	return useSWRMutation(newInput, updateUser);
}

export function useAddUser<T>(editorForGooglePlatformApiUrl: string, idToken: string | undefined) {
	const url = "/admin/users";
	// Skip if idToken is undefined.
	const newInput = useMemo(
		() => (idToken === undefined ? null : `${editorForGooglePlatformApiUrl}${url}`),
		[idToken]
	);
	const addUser = async (
		url: string,
		{ arg }: { arg: { newEmail: string; newClaims: Record<string, string> } }
	) => {
		let init: RequestInit = {
			method: "PUT",
			body: JSON.stringify(arg),
		};
		if (!!idToken) {
			init.headers = {
				"Content-Type": "application/json",
				Authorization: "Bearer " + idToken,
			};
		}
		const res = await fetcher(url, init);
		mutate(url);
		return res;
	};
	return useSWRMutation(newInput, addUser);
}
