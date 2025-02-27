import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Container, Button, PostCard } from "../components"; // Import PostCard directly

export default function Profile() {
    const [user, setUser] = useState(null);
    const [writeups, setWriteups] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    
    useEffect(() => {
        // Fetch user profile data
        authService.getCurrentUser().then((userData) => {
            if (userData) {
                setUser({
                    ...userData,
                    id: userData.$id,
                    joined: formatDate(userData.registration),
                });
            }
        });
    }, []);

    // Fetch user's posts when user data is available
    useEffect(() => {
        if (user) {
            setLoadingPosts(true);
            appwriteService.getPosts([['userId', '=', user.id]])
                .then((posts) => {
                    if (posts) {
                        setWriteups(posts.documents);
                    }
                })
                .catch((error) => console.error("Error fetching posts:", error))
                .finally(() => setLoadingPosts(false));
        }
    }, [user]);

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

                
                </div>
            ) : (
                <p className="text-white">Loading user profile...</p>
            )}
        </Container>
    );
}