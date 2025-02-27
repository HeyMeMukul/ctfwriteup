import React from 'react';
import appwriteService from "../appwrite/config";
import authService from '../appwrite/auth';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage, excerpt, author, date }) {
  return (
    <Link to={`/post/${$id}`} className="block transform transition duration-300 hover:scale-105">
      <div className="w-full bg-gray-800 shadow-lg rounded-xl overflow-hidden">
        <div className="w-full h-48 bg-gray-600 flex items-center justify-center">
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title} 
            className="object-contain h-full w-full" 
          />
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
          <p className="text-gray-400 mb-4">{excerpt}</p>
         
        </div>
      </div>
    </Link>
  );
}

export default PostCard;