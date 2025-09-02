

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import service from "../appwrite/config";
import { Container, PostCard, Button } from "../components";
import { Query } from 'appwrite';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'active', 'inactive'
    const [allPostsCount, setAllPostsCount] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const [inactiveCount, setInactiveCount] = useState(0);

    // Get authentication status
    const authStatus = useSelector(state => state.auth.status);
    const userData = useSelector(state => state.auth.userData);

    // Fetch posts based on filter
    const fetchPosts = async (statusFilter = 'all') => {
        try {
            setLoading(true);
            setError(null);
            
            let queries = [];
            
            // Add status filter if not 'all'
            if (statusFilter === 'active') {
                queries = [Query.equal("status", "active")];
            } else if (statusFilter === 'inactive') {
                queries = [Query.equal("status", "inactive")];
            }
            // For 'all', we pass empty array to get all posts
            
            console.log(`Fetching ${statusFilter} posts...`);
            const response = await service.getPosts(queries);
            
            if (response && response.documents) {
                console.log(`Found ${response.documents.length} posts`);
                setPosts(response.documents);
            } else {
                console.log("No posts found");
                setPosts([]);
            }

            if (statusFilter === 'all') {
            const allPostsRes = await service.getPosts([]);
            const all = allPostsRes?.documents || [];

            setAllPostsCount(all.length);
            setActiveCount(all.filter(p => p.status === 'active').length);
            setInactiveCount(all.filter(p => p.status === 'inactive').length);
        }

        } catch (err) {
            console.error("Error fetching posts:", err);
            setError("Failed to load posts. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(filter);
    }, [filter]);

    // Handle filter change
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    // Loading state
    if (loading) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading all posts...</p>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="text-red-500 text-4xl mb-4">⚠️</div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Posts</h2>
                            <p className="text-gray-600 mb-4">{error}</p>
                            <Button 
                                onClick={() => fetchPosts(filter)} 
                                className="bg-blue-500 hover:bg-blue-600 transition-colors"
                            >
                                Retry
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                {/* Header Section */}
                <div className="mb-8">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            All Posts
                        </h1>
                        <p className="text-gray-600">
                            Browse through all posts in our community
                        </p>
                    </div>

                    {/* Filter and Action Bar */}
                    <div className= "flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center px-4">
                        {/* Filter Buttons */}
                        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                            <Button
                                onClick={() => handleFilterChange('all')}
                                className={` px-4 py-2 rounded-lg transition-colors ${
                                    filter === 'all' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                All Posts ({allPostsCount})
                            </Button>
                            <Button
                                onClick={() => handleFilterChange('active')}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    filter === 'active' 
                                        ? 'bg-green-600 text-white' 
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Active ({activeCount})
                            </Button>
                            <Button
                                onClick={() => handleFilterChange('inactive')}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    filter === 'inactive' 
                                        ? 'bg-orange-600 text-white' 
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Inactive ({inactiveCount})
                            </Button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mx-10">
                            <Button
                                onClick={() => fetchPosts(filter)}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                🔄 Refresh
                            </Button>
                            {authStatus && (
                                <Link to="/add-post">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                        ➕ New Post
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Posts Content */}
                {posts.length === 0 ? (
                    /* No Posts Found */
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No {filter === 'all' ? '' : filter} posts found
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {filter === 'all' 
                                ? "It looks like there are no posts yet. Be the first to create one!" 
                                : `There are no ${filter} posts at the moment.`
                            }
                        </p>
                        <div className="flex justify-center gap-4">
                            {filter !== 'all' && (
                                <Button
                                    onClick={() => handleFilterChange('all')}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    View All Posts
                                </Button>
                            )}
                            {authStatus && (
                                <Link to="/add-post">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                                        Create First Post
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Posts Grid */
                    <>
                        <div className="flex flex-wrap justify-center mx-8">
                            {posts.map((post) => (
                                <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>

                        {/* Posts Summary */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-500 text-sm sm:text-base">
                                Showing {posts.length} {filter === 'all' ? '' : filter} post{posts.length !== 1 ? 's' : ''}
                            </p>
                            {posts.length > 0 && (
                                <div className="mt-4 flex justify-center gap-4 text-sm text-gray-400">
                                    <span>Total Active: {posts.filter(p => p.status?.toLowerCase() === 'active').length}</span>
                                    <span>•</span>
                                    <span>Total Inactive: {posts.filter(p => p.status?.toLowerCase() === 'inactive').length}</span>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;