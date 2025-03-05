import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Query } from "appwrite";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Container, Button, PostCard } from "../components";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [writeups, setWriteups] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    
    useEffect(() => {
        const fetchUserAndPosts = async () => {
            try {
                // Fetch user profile data
                const userData = await authService.getCurrentUser();
                if (userData) {
                    setUser({
                        ...userData,
                        id: userData.$id,
                        joined: formatDate(userData.registration),
                    });

                    // Fetch user's posts
                    const posts = await appwriteService.getPosts([
                        Query.equal("userId", userData.$id),
                        Query.equal("status", "active")
                    ]);

                    if (posts && posts.documents) {
                        setWriteups(posts.documents);
                    }
                }
            } catch (error) {
                console.error("Error in profile page:", error);
            } finally {
                setLoadingPosts(false);
            }
        };

        fetchUserAndPosts();
    }, []);

    // Function to format dates
    const formatDate = (dateString) => {
        if (!dateString) return "Unknown";
        const parsedDate = new Date(dateString);
        return isNaN(parsedDate) ? "Unknown" : parsedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Get a random hacker avatar
    const getRandomHackerAvatar = () => {
        const avatars = [
            "https://api.dicebear.com/7.x/bottts/svg?seed=Hacker1",
            "https://api.dicebear.com/7.x/bottts/svg?seed=Hacker2",
            "https://api.dicebear.com/7.x/bottts/svg?seed=Hacker3",
            "https://api.dicebear.com/7.x/bottts/svg?seed=Hacker4",
            "https://api.dicebear.com/7.x/bottts/svg?seed=Hacker5",
            "https://api.dicebear.com/7.x/bottts/svg?seed=Hacker6",
        ];
        return avatars[Math.floor(Math.random() * avatars.length)];
    };

    return (
        <Container>
            {user ? (
                <div className="profile-page p-6 bg-gray-800 text-white rounded-lg">
                    <div className="flex items-center gap-4 mb-6">
                        <img src={getRandomHackerAvatar()} alt="Avatar" className="w-16 h-16 rounded-full" />
                        <div>
                            <h1 className="text-2xl font-bold">{user.name}</h1>
                            <p className="text-gray-400">Joined: {user.joined}</p>
                        </div>
                    </div>

                    {/* User's Posts Section */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
                        {loadingPosts ? (
                            <p className="text-gray-400">Loading posts...</p>
                        ) : writeups.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {writeups.map((post) => (
                                    <PostCard key={post.$id} {...post} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center bg-gray-700 p-6 rounded-lg">
                                <p className="text-gray-400 mb-4">You haven't created any posts yet.</p>
                                <Link to="/add-post">
                                    <Button bgColor="bg-blue-600" textColor="text-white">
                                        Create Your First Post
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-white">Loading user profile...</p>
            )}
        </Container>
    );
}