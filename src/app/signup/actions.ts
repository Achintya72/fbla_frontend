"use server";

import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

export async function signup(prevState: any, formData: FormData) {
	const name = formData.get("name")?.valueOf();
	const username = formData.get("email")?.valueOf();
	const password = formData.get("password")?.valueOf();

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sign_up`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: name, credentials: { username: username, password: password } }),
		});

		// const token = await response.json();

		console.log(response.status);
		console.log(response.text());

		// await createSession(token.toString());
	} catch (e) {
		console.log(e instanceof Error ? e.message : "An unknown error has occurred");
	}
}

export async function logout() {
	await deleteSession();
	redirect("/login");
}
