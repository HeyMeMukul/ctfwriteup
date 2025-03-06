import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Clock, User, Edit, Trash, X, ArrowLeft, Share2, Bookmark, BookmarkCheck, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export default function Post() {
    const [post, setPost] = useState(null);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showEditOptions, setShowEditOptions] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true);
            if (slug) {
                try {
                    const fetchedPost = await appwriteService.getPost(slug);
                    if (fetchedPost) {
                        setPost(fetchedPost);
                        // Check if post is bookmarked in localStorage
                        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
                        setIsBookmarked(bookmarks.includes(fetchedPost.$id));
                    } else {
                        navigate("/");
                    }
                } catch (error) {
                    console.error("Error fetching post:", error);
                    navigate("/");
                } finally {
                    setIsLoading(false);
                }
            } else {
                navigate("/");
            }
        };

        fetchPost();
    }, [slug, navigate]);

    const deletePost = () => {
        if (post) {
            if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
                appwriteService.deletePost(post.$id).then((status) => {
                    if (status) {
                        appwriteService.deleteFile(post.featuredImage);
                        navigate("/");
                    }
                });
            }
        }
    };

    const toggleBookmark = () => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        if (isBookmarked) {
            const updatedBookmarks = bookmarks.filter(id => id !== post.$id);
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        } else {
            bookmarks.push(post.$id);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }
        setIsBookmarked(!isBookmarked);
    };

    const sharePost = () => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                url: window.location.href,
            })
            .catch((error) => console.error("Error sharing:", error));
        } else {
            // Fallback for browsers that don't support the Web Share API
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const toggleEditOptions = () => {
        setShowEditOptions(!showEditOptions);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return post ? (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-8 md:py-16"
        >
            <Container>
                {/* Navigation */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                >
                    <Button 
                        onClick={() => navigate("/")}
                        className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 
                        text-gray-800 dark:text-gray-200 flex items-center gap-2 rounded-full px-4 py-2 shadow-md"
                    >
                        <ArrowLeft size={16} />
                        <span>Back to Posts</span>
                    </Button>
                </motion.div>

                {/* Post Card */}
                <div className="max-w-4xl mx-auto">
                    {/* Post Top Actions */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex justify-between items-center mb-4"
                    >
                        <div className="flex items-center space-x-2">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                {post.authorName?.charAt(0).toUpperCase() || 'A'}
                            </div>
                            <div>
                                <div className="font-medium text-gray-900 dark:text-gray-100">{post.authorName}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                    <Clock size={14} className="mr-1" /> {formatDate(post.$createdAt)}
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            {isAuthor && (
                                <div className="relative">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={toggleEditOptions}
                                        className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <Edit className="text-blue-500" size={20} />
                                    </motion.button>
                                    
                                    <AnimatePresence>
                                        {showEditOptions && (
                                            <motion.div 
                                                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-30 overflow-hidden"
                                            >
                                                <Link to={`/edit-post/${post.$id}`} className="flex items-center gap-2 w-full text-left px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                                                    <Edit size={16} className="text-blue-500" />
                                                    <span>Edit Post</span>
                                                </Link>
                                                <button 
                                                    onClick={deletePost}
                                                    className="flex items-center gap-2 w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                                >
                                                    <Trash size={16} />
                                                    <span>Delete</span>
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                            
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleBookmark}
                                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                {isBookmarked ? 
                                    <BookmarkCheck className="text-blue-500" size={20} /> : 
                                    <Bookmark className="text-gray-500" size={20} />
                                }
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={sharePost}
                                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <Share2 className="text-gray-500" size={20} />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Main Post Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Post Image with Enhanced Interaction */}
                        {post.featuredImage && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="relative group"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                    <img
                                        src={appwriteService.getFilePreview(post.featuredImage)}
                                        alt={post.title}
                                        className="w-full h-[500px] object-cover
                                            group-hover:brightness-110 transition-all duration-300"
                                    />
                                    
                                    {/* Title overlaid on image */}
                                    <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
                                        <motion.h1
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            className="text-4xl md:text-5xl font-black text-white leading-tight 
                                            drop-shadow-lg"
                                        >
                                            {post.title}
                                        </motion.h1>
                                    </div>

                                    {/* View fullscreen button */}
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => setIsImageOpen(true)}
                                        className="absolute top-4 right-4 flex items-center space-x-2 bg-black/50 hover:bg-black/70 
                                        text-white rounded-full p-3 backdrop-blur-sm z-20 shadow-lg"
                                    >
                                        <Eye size={20} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* Full-Screen Image Modal with Framer Motion */}
                        <AnimatePresence>
                            {isImageOpen && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                                    onClick={() => setIsImageOpen(false)}
                                >
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.9, opacity: 0 }}
                                        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                                        className="relative max-w-7xl max-h-screen"
                                    >
                                        <img
                                            src={appwriteService.getFilePreview(post.featuredImage)}
                                            alt={post.title}
                                            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
                                        />
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsImageOpen(false);
                                            }}
                                            className="absolute -top-16 right-0 text-white hover:text-gray-300 p-2 
                                            bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-colors"
                                        >
                                            <X size={32} />
                                        </button>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Post Content Container */}
                        <div className="p-8 md:p-12 space-y-8">
                            {/* Only show title here if no featured image */}
                            {!post.featuredImage && (
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white 
                                    leading-tight text-center md:text-left bg-clip-text bg-gradient-to-r 
                                    from-blue-600 to-purple-600"
                                >
                                    {post.title}
                                </motion.h1>
                            )}

                            {/* Post Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="prose prose-lg md:prose-xl max-w-full dark:prose-invert 
                                text-gray-800 dark:text-gray-200 leading-relaxed"
                            >
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </motion.div>

                           
                        </div>
                    </motion.div>
                </div>
            </Container>
        </motion.div>
    ) : null;
}