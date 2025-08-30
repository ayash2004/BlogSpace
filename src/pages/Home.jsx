import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import appwriteservice from "../appwrite/config";
import { Container, PostCard, Button } from "../components";
import { Query } from "appwrite";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Get authentication status
    const authStatus = useSelector(state => state.auth.status);
    const userData = useSelector(state => state.auth.userData);
    
    
    useEffect(() => {
        if (!authStatus || !userData?.$id) {
            setPosts([]);
            setError(null);
            setLoading(false);
            return
        }
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);

                console.log("Fetching posts...");
                const queries = [Query.equal("userId", userData.$id)];
                const response = await appwriteservice.getPosts(queries);

                // const response = await appwriteservice.getPosts();
                
                if (response && response.documents) {
                    console.log("Posts fetched:", response.documents.length);
                    setPosts(response.documents);
                } else {
                    console.log("No posts found");
                    setPosts([]);
                }
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError("Failed to load posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    
    },[authStatus, userData?.$id]);

    // Loading state
    if (loading) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading posts...</p>
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
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h2>
                            <p className="text-gray-600 mb-4">{error}</p>
                            <Button 
                                onClick={() => { 
                                    setError(null);
                                    setLoading(true);
                                    
                                    // Optionally re-trigger fetch if auth/userData is valid()} 
                                    className="bg-blue-500 hover:bg-blue-600 transition-colors"
                                }}
                            >   
                                Try Again
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    
    // No posts found - different messages based on auth status
    if (posts.length === 0) {
        if ((!authStatus || !userData?.$id)) {
            // User not logged in
            return (
                <div className="w-full text-center  ">
                    <Container>
                        <div className="flex flex-wrap justify-center inset-0 ">
                            {/* <div className=" inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"> */}
                            <div className="p-2 w-full max-w-md space-y-8">
                                <div className=" text-2xl font-bold text-blue-800  bg-gradient-to-r from-blue-600/10 to-purple-600/10 py-8 rounded-2xl mt-24 ">Welcome to BlogSpace!</div>
                                    <p className="text-blue-600 ">
                                        Please log in to read and create amazing posts from our community.
                                    </p>
                                    <Link to="/login">
                                        <Button className=" mb-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                          ✨ Login to Continue
                                        </Button>
                                    </Link>
                             </div>

                            </div>
                        {/* </div> */}
                    </Container>
                </div>
            );  
        } else {
            // User logged in but no posts exist
            return (
                <div className="w-full text-center">
                    <Container>
                        <div className="flex flex-wrap justify-center">
                            <div className="p-2 w-full max-w-md">
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                        No Posts Yet
                                    </h1>
                                    <p className="text-gray-600 mb-6">
                                        Be the first to share something amazing! Create your first post and start the conversation.
                                    </p>
                                    <Link to="/add-post">
                                        <Button className="bg-green-600 hover:bg-green-700 transition-colors">
                                            Create First Post
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            );
        }
    }

   
    // Posts found - display them
    return (
        <div className="w-full py-8 ">
            <Container>
                {/* Header Section */}
                <div className="space-y-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 ">
                        Latest Posts
                    </h1>
                    <p className="text-gray-600">
                        Discover amazing content from our community
                    </p>
                    {authStatus && (    
                        <div className="">  
                            <Link to="/add-post">
                                <Button type="button" className=" mb-12 bg-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">✨ Create New Post 
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Posts Grid */}
                {/* gap-x-0.5 */}
                <div className="flex flex-wrap justify-center mx-4 ">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center text-gray-500">
                    <p>Showing {posts.length} post{posts.length !== 1 ? 's' : ''}</p>
                </div>
            </Container>
        </div>
    );
    
}

export default Home;