import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts({ posts: initialPosts }) { // Accept posts prop
    const [posts, setPosts] = useState(initialPosts || []);
    const [loading, setLoading] = useState(!initialPosts); // Skip loading if posts are provided

    useEffect(() => {
        // Fetch posts only if not provided via props
        if (!initialPosts) {
            const fetchPosts = async () => {
                setLoading(true);
                const postsData = await appwriteService.getPosts();
                if (postsData) {
                    setPosts(postsData.documents);
                }
                setLoading(false);
            };
            fetchPosts();
        }
    }, [initialPosts]); // Dependency on initialPosts

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold hover:text-gray-500">Loading posts...</h1>
                </Container>
            </div>
        );
    }

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

export default AllPosts;