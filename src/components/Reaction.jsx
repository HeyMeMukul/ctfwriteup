import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

const reactionsList = ["👍", "❤️", "🔥", "😂", "😮"];

export default function Reactions({ postId, initialReactions }) {
    const [reactions, setReactions] = useState(initialReactions || {});
    const userData = useSelector((state) => state.auth.userData);
    
    useEffect(() => {
        setReactions(initialReactions || {});
    }, [initialReactions]);
    
    const handleReaction = async (selectedReaction) => {
        if (!user) {
            alert("You must be logged in to react!");
            return;
        }
    
        const currentReactions = JSON.parse(post.reactions || "{}");
    
        // Update the reaction for the current user
        if (currentReactions[user.$id] === selectedReaction) {
            delete currentReactions[user.$id]; // Remove reaction if clicking again
        } else {
            currentReactions[user.$id] = selectedReaction; // Set new reaction
        }
    
        const updatedData = { reactions: JSON.stringify(currentReactions) };
    
        const updatedPost = await appwriteService.updatePost(post.$id, updatedData);
        
        if (updatedPost) {
            setPost(updatedPost); // Update UI
        }
    };
    

    return (
        <div className="flex gap-3 mt-4">
            {reactionsList.map((emoji) => (
                <button
                    key={emoji}
                    className={`px-3 py-2 text-lg rounded-lg border transition ${
    userData && reactions[userData.$id] === emoji ? "bg-blue-500 text-white" : "bg-gray-800 text-white"
  }`}
                    onClick={() => handleReaction(emoji)}
                >
                    {emoji} ({Object.values(reactions).filter((r) => r === emoji).length})
                </button>
            ))}
        </div>
    );
}
