import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";
import { Clock, User, Edit, Trash } from "lucide-react"; // Import icons
import { motion } from "framer-motion"; // For animations

export default function Post() {
    const [post, setPost] = useState(null);
    const [isImageOpen, setIsImageOpen] = useState(false); // State for full-screen image
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // Check if the logged-in user is the author
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        if (post) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            });
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return post ? (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen"
        >
            <Container>
                {/* Post Image */}
                {post.featuredImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full flex justify-center mb-8 relative rounded-xl overflow-hidden shadow-2xl cursor-pointer"
                        onClick={() => setIsImageOpen(true)} // Open full-screen image on click
                    >
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-auto max-h-96 object-cover transform hover:scale-105 transition-transform duration-300"
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-6 flex space-x-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button
                                        bgColor="bg-green-500 hover:bg-green-600"
                                        className="flex items-center space-x-2"
                                    >
                                        <Edit size={18} />
                                        <span>Edit</span>
                                    </Button>
                                </Link>
                                <Button
                                    bgColor="bg-red-500 hover:bg-red-600"
                                    onClick={deletePost}
                                    className="flex items-center space-x-2"
                                >
                                    <Trash size={18} />
                                    <span>Delete</span>
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Full-Screen Image Modal */}
                {isImageOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
                        onClick={() => setIsImageOpen(false)} // Close modal on click outside
                    >
                        <div className="relative max-w-4xl max-h-screen p-4">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                            />
                            <button
                                className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                                onClick={() => setIsImageOpen(false)} // Close modal on button click
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Post Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-5xl font-bold text-gray-900 dark:text-white text-center mb-6"
                >
                    {post.title}
                </motion.h1>

                {/* Author and Date Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-center justify-center space-x-6 mb-8 text-gray-600 dark:text-gray-400"
                >
                    <div className="flex items-center space-x-2">
                        <User size={20} className="text-blue-500" />
                        <span className="text-lg font-medium">{post.authorName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock size={20} className="text-blue-500" />
                        <span className="text-lg font-medium">{formatDate(post.$createdAt)}</span>
                    </div>
                </motion.div>

                {/* Post Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="prose prose-lg max-w-4xl mx-auto dark:prose-invert bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl"
                >
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </motion.div>
            </Container>
        </motion.div>
    ) : null;
}