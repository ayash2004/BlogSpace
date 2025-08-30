import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import service  from '../appwrite/config' ;

function PostCard({ $id, title, featuredImage, content, status, $createdAt }) {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const getImageUrl = () => {
        if (!featuredImage) return null;
        try {
            return service.getFileView(featuredImage);
        } catch (error) {
            console.error('Error getting image preview:', error);
            return null;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return '';
        }
    };

    const getContentPreview = (htmlContent, maxLength = 100) => {
        if (!htmlContent) return 'No content available...';
        const textContent = htmlContent.replace(/<[^>]*>/g, '');
        return textContent.length <= maxLength ? textContent : `${textContent.substring(0, maxLength)}...`;
    };

    // const imageUrl = getImageUrl();
    const imageUrl = featuredImage ? getImageUrl() : null;
    
    return (
        <Link to={`/post/${$id}`} className="transform hover:scale-105 transition-all duration-300">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col hover:border-t-4 hover:border-blue-500">
                {/* Image Section */}
                <div className="relative h-48 bg-gray-100 overflow-hidden ">
                    {imageUrl && !imageError ? (
                        <>
                            <img
                                src={imageUrl}
                                alt={title || 'Post image'}
                                className={`w-full h-full object-cover transition-opacity duration-300 ${
                                    imageLoading ? 'opacity-0' : 'opacity-100'
                                }`}
                                onLoad={() => setImageLoading(false)}
                                onError={() => {
                                    setImageError(true);
                                    setImageLoading(false);
                                }}
                            />
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                            <div className="text-center text-gray-500">
                                <svg
                                    className="w-12 h-12 mx-auto mb-2 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <p className="text-sm">No Image</p>
                            </div>
                        </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-orange-100 text-orange-800'
                            }`}
                        >
                            {status || 'draft'}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col space-y-3">
                    {/* Title */}
                    <h3 className="text-2xl text-center font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                        {title || 'Untitled Post'}
                    </h3>

                    {/* Content Preview */}
                    <p className="text-gray-600 text-sm mb-3 flex-1 line-clamp-3">
                        {getContentPreview(content)}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                        <div className="text-xs text-gray-500">{formatDate($createdAt)}</div>
                        <div className="text-xs text-blue-600 font-medium hover:text-blue-800 transition-colors">
                            Read More →
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
