/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

interface User {
    _id: string;
    username: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await fetch("http://localhost:8008/api/users/me", {
                    credentials: "include", // Sends the invisible cookie
                });

                if (res.ok) {
                    const userData = await res.json();
                    setUser(userData);
                }
            } catch (err) {
                console.error(err + "Yes Bitch Yes");
            } finally {
                setLoading(false); // Stop the loading spinner
            }
        };

        checkLoginStatus();
    }, []);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await fetch("http://localhost:8008/api/users/logout", {
                method: "POST",
                credentials: "include", //This is required to modify cookies
            });
        } catch (err) {
            console.error("Failed to clear cookie on backend bitch ass ", err);
        }

        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// A custom hook: `const { user } = useAuth()`
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
