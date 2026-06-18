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

export function Signup() {
    const form = useForm({
        mode: "uncontrolled", // Better performance
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
    });
    const navigate = useNavigate();

    const handleSubmit = async (values: typeof form.values) => {
        console.log("Sending to backend:", values);
        try {
            const res = await fetch("http://localhost:8008/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(values),
            });

            const data = await res.json();

            if (!res.ok)
                throw new Error(
                    data.message || "Something went wrong. Try refreshing.",
                );
            console.log(data);

            navigate("/login");
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
                Sign Up
            </Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack align="stretch">
                    <TextInput
                        label="Username"
                        placeholder="Set a username"
                        required
                        key={form.key("username")}
                        {...form.getInputProps("username")}
                    />
                    <TextInput
                        label="Email"
                        placeholder="Enter email address"
                        required
                        key={form.key("email")}
                        {...form.getInputProps("email")}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Set a password"
                        required
                        key={form.key("password")}
                        {...form.getInputProps("password")}
                    />

                    <Button type="submit" mt="xl">
                        Sign Up
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}
