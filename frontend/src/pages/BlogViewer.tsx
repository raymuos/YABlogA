import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Container,
    Title,
    Text,
    Group,
    Avatar,
    Skeleton,
    Button,
    Paper,
} from "@mantine/core";

interface Blog {
    _id: string;
    title: string;
    content: string;
    author: { username: string };
    createdAt: string;
}

export function BlogViewer() {
    const { id } = useParams();

    const [Blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSingleBlog = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8008/api/posts/${id}`,
                );

                if (res.ok) {
                    const data = await res.json();
                    setBlog(data);
                } else {
                    setError("Blog not found.");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to connect to server.");
            } finally {
                setLoading(false);
            }
        };

        fetchSingleBlog();
    }, [id]); // id as a dependency so it reruns if the url changes

    if (loading) {
        return (
            <Container size="md" mt={50}>
                <Skeleton height={50} mb="xl" />
                <Skeleton height={20} radius="xl" />
                <Skeleton height={20} mt={6} radius="xl" />
                <Skeleton height={20} mt={6} width="70%" radius="xl" />
            </Container>
        );
    }

    if (error || !Blog) {
        return (
            <Container size="md" mt={50} ta="center">
                <Title order={2} c="red">
                    {error}
                </Title>
                <Button component={Link} to="/" mt="md" variant="light">
                    Go Back to Homepage
                </Button>
            </Container>
        );
    }

    return (
        <Container size="md" mt={40} mb={60}>
            <Title order={1}>{Blog.title}</Title>

            <Group mt="md" mb="xl">
                <Avatar color="blue" radius="xl">
                    {Blog.author.username.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                    <Text size="sm" fw={500}>
                        {Blog.author.username}
                    </Text>
                    <Text size="xs" c="dimmed">
                        Published on{" "}
                        {new Date(Blog.createdAt).toLocaleDateString()}
                    </Text>
                </div>
            </Group>

            <Paper shadow="xs" p="xl" withBorder radius="md">
                {/* CSS 'pre-wrap' preserves the line breaks and spacing from Textarea */}
                <Text
                    size="lg"
                    style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}
                >
                    {Blog.content}
                </Text>
            </Paper>
        </Container>
    );
}
