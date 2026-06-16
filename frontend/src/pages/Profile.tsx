import {
    Container,
    Paper,
    Title,
    Text,
    Avatar,
    Group,
    Skeleton,
    Button,
} from "@mantine/core";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate("/");
    };
    // 1. Loading State
    if (loading) {
        return (
            <Container size="sm" mt={50}>
                <Skeleton height={150} radius="md" />
            </Container>
        );
    }

    // 2. Fallback State
    if (!user) {
        return (
            <Container size="sm" mt={50}>
                <Title order={3} c="red">
                    Access Denied
                </Title>
                <Text>You must be logged in to view this page.</Text>
            </Container>
        );
    }

    // 3. Authenticated State
    return (
        <Container size="sm" mt={50}>
            <Paper withBorder shadow="md" p={30} radius="md">
                <Group>
                    {/* Mantine Avatar automatically extracts a letter if you pass text inside it */}
                    <Avatar color="blue" radius="xl" size="lg">
                        {user.username.charAt(0).toUpperCase()}
                    </Avatar>

                    <div>
                        <Title order={2}>{user.username}</Title>
                        <Text size="md">ID: {user._id}</Text>
                    </div>

                    <Button color="red" fullWidth onClick={handleLogout}>
                        Logout
                    </Button>
                </Group>
            </Paper>
        </Container>
    );
}
