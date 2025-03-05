import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';
import { Clock, FileEdit } from 'lucide-react';

function PostCard({ $id, title, featuredImage, status, authorName, $createdAt }) {
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link to={`/post/${$id}`} className="block group">
      <div className="w-full bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        {/* Featured Image */}
        <div className="w-full h-48 bg-gray-700 overflow-hidden relative">
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title} 
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110" 
          />
          {/* Status Badge */}
          <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${
            status === 'active' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-gray-800'
          }`}>
            {status}
          </div>
        </div>

        {/* Post Content */}
        <div className="p-5">
          {/* Title */}
          <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
            {title}
          </h2>

          {/* Post Details */}
          <div className="flex items-center justify-between text-gray-400 mb-4">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-blue-400" />
              <span className="text-sm">
                {formatDate($createdAt)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <FileEdit size={16} className="text-green-400" />
              <span className="text-sm">{authorName}</span> {/* Display author's name */}
            </div>
          </div>

          {/* Additional Details */}
          <div className="flex justify-between items-center mt-4">
            <Link 
              to={`/post/${$id}`} 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              Read More
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;