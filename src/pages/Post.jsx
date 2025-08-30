import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);
    
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    // Check if current user is the author
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    
    // Debug logs
    // console.log('Post:', post);
    // console.log('UserData:', userData);
    // console.log('Is Author:', isAuthor);
    // console.log('Post userId:', post?.userId);
    // console.log('Current user $id:', userData?.$id);

    // Fetch post data
    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) {
                navigate("/");
                return;
            }

            try {
                setLoading(true);
                setError(null);
                
                const fetchedPost = await appwriteService.getPost(slug);
                
                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    setError("Post not found");
                    setTimeout(() => navigate("/"), 2000);
                }
            } catch (err) {
                console.error("Error fetching post:", err);
                setError("Failed to load post");
                setTimeout(() => navigate("/"), 2000);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug, navigate]);

    // Handle post deletion
    const handleDeletePost = async () => {
        if (!post) return;

        // Confirm deletion
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${post.title}"? This action cannot be undone.`
        );
        
        if (!confirmDelete) return;

        try {
            setDeleting(true);
            console.log('Deleting post with ID:', post.$id);

            // Delete the post document
            const deleteStatus = await appwriteService.deletePost(post.$id);
            
            if (deleteStatus) {
                console.log('Post deleted successfully, now deleting image...');
                
                // Delete associated image if it exists
                if (post.featuredImage) {
                    try {
                        await appwriteService.deleteFile(post.featuredImage);
                        console.log('Image deleted successfully');
                    } catch (imageError) {
                        console.warn('Failed to delete image, but post was deleted:', imageError);
                        // Don't block navigation if image deletion fails
                    }
                }
                
                // Show success message and navigate
                alert('Post deleted successfully!');
                navigate("/");
            } else {
                throw new Error('Failed to delete post');
            }
        } catch (err) {
            console.error("Error deleting post:", err);
            alert('Failed to delete post. Please try again.');
        } finally {
            setDeleting(false);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="py-8">
                <Container>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                            <p>Loading post...</p>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="py-8">
                <Container>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="text-red-500 text-xl mb-4">⚠️</div>
                            <p className="text-red-600 mb-4">{error}</p>
                            <Button onClick={() => navigate("/")} className="bg-blue-500">
                                Go Back Home
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // Main post display
    return post ? (
        <div className="py-8">
            <Container>
                {/* Featured Image Section */}
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {post.featuredImage ? (
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl object-cover object-center w-80 h-96"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                console.error('Failed to load image');
                            }}
                        />
                    ) : (
                        <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                            <p className="text-gray-500">No image available</p>
                        </div>
                    )}
                    
                    {/* Edit/Delete Buttons - Only show if user is author */}
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button 
                                    bgColor="bg-green-500" 
                                    className="mr-3 hover:bg-green-600 transition-colors"
                                    disabled={deleting}
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button 
                                bgColor="bg-red-500" 
                                className="hover:bg-red-600 transition-colors"
                                onClick={handleDeletePost}
                                disabled={deleting}
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </Button>
                        </div>
                    )}
                </div>

                <div className="w-full max-w-4xl mx-auto px-4 py-12 bg-gradient-to-b from-blue-50 to-purple-50 rounded-xl shadow-lg">
                {/* Title & Metadata (Centered) */}
                <div className="mb-10 border-b border-gray-300 pb-6 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">{post.title}</h1>
                    
                    <div className="mt-4 text-sm text-gray-600 flex flex-wrap justify-center gap-6">
                        <span className="flex items-center gap-1">
                            <span className="font-medium text-gray-700">Status:</span> 
                            <span className={`capitalize font-semibold ${post.status === 'active' ? 'text-green-600' : 'text-orange-600'}`}>
                                {post.status}
                            </span>
                        </span>

                        {post.slug && (
                            <span className="flex items-center gap-1">
                                <span className="font-medium text-gray-700">Slug:</span> 
                                <span className="text-blue-600">{post.slug}</span>
                            </span>
                        )}
                    </div>
                </div>

                {/* Post Content (Left-Aligned) */}
                <div className="prose prose-lg prose-indigo max-w-none text-gray-800 bg-white p-8 rounded-lg shadow-inner">
                    {post.content ? parse(post.content) : <p>No content available</p>}
                </div>

                {/* Back Button (Centered) */}
                <div className="mt-12 text-center">
                    <Button 
                        onClick={() => navigate("/")} 
                        className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-200"
                    >
                        ← Back to Posts
                    </Button>
                </div>
            </div>
            </Container>
        </div>
    ) : null;
}