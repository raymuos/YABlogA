import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import { MainLayout } from "./layouts/MainLayout";
import { AuthProvider } from "./context/AuthContext"; //context provider for user login data
import { Home } from "./pages/Home";
import { CreateBlog } from "./pages/CreateBlog";
import { BlogViewer } from "./pages/BlogViewer";
import Profile from "./pages/Profile";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

export function App() {
    return (
        <MantineProvider defaultColorScheme="dark">
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/blog/:id" element={<BlogViewer />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/write" element={<CreateBlog />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </MantineProvider>
    );
}

export default App;
