import {
    TextInput,
    Textarea,
    Button,
    Paper,
    Title,
    Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export function CreatePost() {
    const form = useForm({
        mode: "uncontrolled", // better performance
        initialValues: {
            title: "",
            content: "",
        },
        validate: {
            title: (value) =>
                value.length < 5 ? "Title must be at least 5 characters" : null,
            content: (value) =>
                value.length < 25 ? "Content is too short" : null,
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        console.log("Sending to backend:", values);
        // Here you would make your fetch() or axios.post() call to your backend
        // fetch('http://localhost:5000/api/posts', { method: 'POST', body: JSON.stringify(values) })
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
