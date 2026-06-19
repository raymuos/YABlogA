import {
    TextInput,
    Textarea,
    Button,
    Paper,
    Title,
    Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function CreateBlog() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const form = useForm({
        mode: "uncontrolled", // better performance
        initialValues: {
            title: "",
            content: "",
            authorId: "",
        },
        validate: {
            title: (value) =>
                value.length < 5 ? "Title must be at least 5 characters" : null,
            content: (value) =>
                value.length < 25 ? "Content is too short" : null,
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        if (!user) {
            console.error("You must be logged in to write a blog");
            return;
        }
        values.authorId = user._id;
        console.log("Blog sent to backend:", values);

        try {
            const res = await fetch("http://localhost:8008/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();

            if (!res.ok)
                throw new Error(
                    data.message || "Something went wrong. Try refreshing.",
                );
            console.log(data);

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
            maw={800}
            mx="auto"
        >
            <Title order={2} ta="center" mb="lg">
                Create a Blog
            </Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        label="Blog Title"
                        placeholder="Enter a title"
                        required
                        key={form.key("title")}
                        {...form.getInputProps("title")}
                    />

                    <Textarea
                        label="Content"
                        placeholder="Write your blog here..."
                        required
                        autosize
                        minRows={10}
                        key={form.key("content")}
                        {...form.getInputProps("content")}
                    />

                    <Button type="submit" mt="xl">
                        Post
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}
