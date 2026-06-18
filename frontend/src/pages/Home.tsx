import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    SimpleGrid,
    Card,
    Image,
    Text,
    Group,
    Badge,
    Button,
    Title,
    Container,
    Skeleton,
} from "@mantine/core";

interface Blog {
    _id: string;
    title: string;
    content: string;
    author: { username: string };
    createdAt: string;
}

export function Home() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchblogs = async () => {
            try {
                const res = await fetch("http://localhost:8008/api/posts");
                if (res.ok) {
                    const data = await res.json();
                    setBlogs(data);
                }
            } catch (err) {
                console.error("Failed to fetch blogs", err);
            } finally {
                setLoading(false);
            }
        };

        fetchblogs();
    }, []);

    if (loading) {
        return (
            <Container size="xl" mt="xl">
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <Skeleton key={n} height={250} radius="md" />
                    ))}
                </SimpleGrid>
            </Container>
        );
    }

    return (
        <Container size="xl" mt="xl">
            <Title order={2} mb="xl">
                Latest Blogs
            </Title>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                {blogs.map((blog) => (
                    <Card
                        key={blog._id}
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                    >
                        <Card.Section>
                            {/* A generic placeholder image for some color */}
                            <Image
                                src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png`}
                                height={120}
                                alt="Blog cover"
                            />
                        </Card.Section>

                        <Group
                            justify="space-between"
                            wrap="wrap"
                            mt="md"
                            mb="xs"
                        >
                            <Text fw={600} w={"75%"} lineClamp={1}>
                                {blog.title}
                            </Text>
                            <Badge color="blue" variant="default">
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </Badge>
                        </Group>

                        <Text size="sm" c="dimmed" lineClamp={2}>
                            {blog.content}
                        </Text>

                        <Text size="xs" c="dimmed" mt="sm" fw={700}>
                            By {blog.author?.username || "Unknown"}
                        </Text>

                        <Button
                            component={Link}
                            to={`/blog/${blog._id}`}
                            color="blue"
                            fullWidth
                            mt="md"
                            radius="md"
                        >
                            Read Blog
                        </Button>
                    </Card>
                ))}
            </SimpleGrid>
        </Container>
    );
}
