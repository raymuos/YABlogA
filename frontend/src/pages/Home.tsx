import { useAuth } from "../context/AuthContext";

export function Home() {
    const { user } = useAuth();

    return (
        <>
            <h1>{user ? `Welcome, ${user.username}` : "Hello, guest"}!</h1>
        </>
    );
}
