import {
    AppShell,
    Burger,
    Group,
    Title,
    Button,
    Skeleton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function MainLayout() {
    const [opened, { toggle, close }] = useDisclosure();
    const { user, loading } = useAuth();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",

                collapsed: { mobile: !opened, desktop: true }, // Hide navbar on desktop
            }}
            padding="md"
        >
            {/* === === === === === === === === === === HEADER === === === === === === === === === === */}
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="sm"
                            size="sm"
                        />
                        <Button variant="transparent" component={Link} to="/">
                            <Title order={2}>Blogga</Title>
                        </Button>
                    </Group>
                    <Group visibleFrom="xs">
                        {loading ? (
                            <Skeleton height={36} width={150} radius="xl" />
                        ) : user ? (
                            <>
                                <Button
                                    variant="outline"
                                    component={Link}
                                    to="/profile"
                                >
                                    Your Profile
                                </Button>
                                <Button
                                    variant="outline"
                                    component={Link}
                                    to="/write"
                                >
                                    Write
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="subtle"
                                    component={Link}
                                    to="/login"
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="filled"
                                    component={Link}
                                    to="/signup"
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Group>
                </Group>
            </AppShell.Header>

            {/* === === === === === === === === === === NAVBAR === === === === === === === === === === */}
            <AppShell.Navbar p="md" my="lg">
                {/* Mobile navigation links go here */}
                <Button
                    variant="subtle"
                    fz="lg"
                    fullWidth
                    onClick={close}
                    component={Link}
                    to="/"
                >
                    Home
                </Button>
                {loading ? (
                    <Skeleton height={36} width={150} radius="lg" />
                ) : user ? (
                    <>
                        <Button
                            variant="subtle"
                            fz="lg"
                            fullWidth
                            onClick={close}
                            component={Link}
                            to="/profile"
                        >
                            Your Profile
                        </Button>
                        <Button
                            variant="subtle"
                            fz="lg"
                            fullWidth
                            onClick={close}
                            component={Link}
                            to="/write"
                        >
                            Write
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            variant="subtle"
                            fz="lg"
                            fullWidth
                            onClick={close}
                            component={Link}
                            to="/login"
                        >
                            Login
                        </Button>
                        <Button
                            variant="subtle"
                            fz="lg"
                            fullWidth
                            onClick={close}
                            component={Link}
                            to="/signup"
                        >
                            Sign Up
                        </Button>
                    </>
                )}
            </AppShell.Navbar>

            {/* === === === === === === === === === MAINPAGE === === === === === === === === === === */}
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
