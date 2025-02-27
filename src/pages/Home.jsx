import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import authService from "../appwrite/auth";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Track auth state

    useEffect(() => {
        // Check if the user is logged in
        authService.isLoggedIn().then((loggedIn) => {
            setIsAuthenticated(loggedIn);
        });

        // Fetch posts
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setLoading(false); // Stop loading after fetching posts
        });
    }, []);

    // Still checking authentication status
    if (isAuthenticated === null) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold hover:text-gray-500">Checking authentication...</h1>
                </Container>
            </div>
        );
    }

    // If user is not logged in, show the message
    if (!isAuthenticated) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        User Not Logged In, Please Login
                    </h1>
                </Container>
            </div>
        );
    }

    // Show loading until posts are fetched
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        Loading.......
                        
                    </h1>
                </Container>
            </div>
        );
    }

    // Show posts if they exist
    return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post.$id} className="p-2 w-1/4">
                                    <PostCard {...post} />
                                </div>
                            ))
                        ) : (
                            <div className="w-full text-center">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    No posts available
                                </h1>
                            </div>
                        )}
                    </div>
                </Container>
           
        </div>
    );
}

export default Home;
