import {
    TextInput,
    Button,
    Paper,
    Title,
    Stack,
    PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
    const form = useForm({
        mode: "uncontrolled", // Better performance
        initialValues: {
            username: "",
            password: "",
        },
    });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (values: typeof form.values) => {
        console.log("Sending to backend:", values);
        try {
            const res = await fetch("http://localhost:8008/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
                credentials: "include",
            });

            const data = await res.json();
            login(data.user);

            if (!res.ok)
                throw new Error(
                    data.message || "Something went wrong. Login failed.",
                );
            console.log("The bitch who logged in", data);

            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Paper
            withBorder
            shadow="md"
            p={30}
            mt={30}
            radius="md"
            maw={600}
            mx="auto"
        >
            <Title order={2} ta="center" mb="lg">
                Login
            </Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack align="stretch">
                    <TextInput
                        label="Username"
                        placeholder="Enter username"
                        required
                        key={form.key("username")}
                        {...form.getInputProps("username")}
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Enter password"
                        required
                        key={form.key("password")}
                        {...form.getInputProps("password")}
                    />

                    <Button type="submit" mt="xl">
                        Login
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}
