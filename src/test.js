// import React, {useCallback} from "react";
// import { useEffect } from 'react';
// import {useForm} from 'react-hook-form'
// import {Button, Input ,Select, RTE} from '../index'
// import service from "../../appwrite/config";
// import appwriteService from '../../appwrite/config'
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function PostForm({ post }) {
//     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         defaultValues: {
//             title: post?.title || '',
//             slug: post?.$id || '',
//             content: post?.content || '',
//             status: post?.status || 'active',
//         },
//     });

//     const navigate = useNavigate();
//     const userData = useSelector(state => state.auth.userData);

//     // Add debugging and validation
//     console.log('UserData:', userData);
//     console.log('Auth State:', useSelector(state => state.auth));

// const submit = async (data) => {
//     //     try {
//     //         // Validate userData before proceeding
//     //         if (!userData || !userData.$id) {
//     //             console.error('User not authenticated or userData missing');
//     //             alert('Please log in to create/update posts');
//     //             return;
//     //         }

//     //         if (post) {
//     //             // UPDATE existing post
//     //             const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
                
//     //             if (file) {
//     //                 // Delete old image if new one uploaded
//     //                 service.deleteFile(post.featuredImage);
//     //             }

//     //             const dbPost = await service.updatePost(post.$id, {
//     //                 ...data,
//     //                 featuredImage: file ? file.$id : undefined,
//     //             });

//     //             console.log('Updated post:', dbPost);
                
//     //             if (dbPost) {
//     //                 navigate(`/post/${dbPost.$id}`);
//     //             }
//     //         } else {
//     //             // CREATE new post
//     //             const file = await service.uploadFile(data.image[0]);
                
//     //             if (file) {
//     //                 const fileId = file.$id;
//     //                 data.featuredImage = fileId;
                    
//     //                 const dbPost = await service.createPost({
//     //                     ...data,
//     //                     userId: userData.$id, // Now safely accessed
//     //                 });

//     //                 console.log('Created post:', dbPost);
                    
//     //                 if (dbPost) {
//     //                     navigate(`/post/${dbPost.$id}`);
//     //                 }
//     //             }
//     //         }
//     //     } catch (error) {
//     //         console.error('Error submitting form:', error);
//     //         alert('Something went wrong. Please try again.');
//     //     }
//     // };
//     // Add this check in your form component before calling submit


//     const submit = async (data) => {
//     try {
//         // Enhanced debugging
//         console.log('=== SUBMIT FUNCTION START ===');
//         console.log('Form data received:', data);
//         console.log('userData:', userData);
//         console.log('post (existing):', post);
        
//         // Validate userData before proceeding
//         if (!userData || !userData.$id) {
//             console.error('User not authenticated or userData missing');
//             console.error('userData value:', userData);
//             alert('Please log in to create/update posts');
//             return;
//         }

//         if (post) {
//             // UPDATE existing post
//             console.log('=== UPDATE MODE ===');
//             console.log('Checking for new image:', data.image);
            
//             const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
            
//             if (file) {
//                 console.log('New file uploaded:', file);
//                 // Delete old image if new one uploaded
//                 if (post.featuredImage) {
//                     console.log('Deleting old image:', post.featuredImage);
//                     service.deleteFile(post.featuredImage);
//                 }
//             }

//             console.log('Updating post with data:', {
//                 ...data,
//                 featuredImage: file ? file.$id : undefined,
//             });

//             const dbPost = await service.updatePost(post.$id, {
//                 ...data,
//                 featuredImage: file ? file.$id : undefined,
//             });

//             console.log('Updated post result:', dbPost);
            
//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`);
//             } else {
//                 console.error('Update failed - dbPost is null/undefined');
//             }
//         } else {
//             // CREATE new post
//             console.log('=== CREATE MODE ===');
//             console.log('Image data:', data.image);
//             console.log('Image file:', data.image?.[0]);
            
//             // Check if image is required
//             if (!data.image || !data.image[0]) {
//                 console.error('No image file provided');
//                 alert('Please select an image file');
//                 return;
//             }
            
//             console.log('Uploading file...');
//             const file = await service.uploadFile(data.image[0]);
//             console.log('File upload result:', file);
            
//             if (file) {
//                 const fileId = file.$id;
//                 data.featuredImage = fileId;
                
//                 const postData = {
//                     ...data,
//                     userId: userData.$id,
//                 };
                
//                 console.log('Creating post with data:', postData);
                
//                 const dbPost = await service.createPost(postData);
//                 console.log('Created post result:', dbPost);
                
//                 if (dbPost) {
//                     console.log('Navigating to:', `/post/${dbPost.$id}`);
//                     navigate(`/post/${dbPost.$id}`);
//                 } else {
//                     console.error('Create failed - dbPost is null/undefined');
//                     alert('Failed to create post. Please try again.');
//                 }
//             } else {
//                 console.error('File upload failed');
//                 alert('Failed to upload image. Please try again.');
//             }
//         }
//     } catch (error) {
//         console.error('=== ERROR IN SUBMIT ===');
//         console.error('Error details:', error);
//         console.error('Error message:', error.message);
//         console.error('Error stack:', error.stack);
        
//         // More specific error messages
//         if (error.message?.includes('userId')) {
//             alert('Authentication error. Please log out and log back in.');
//         } else if (error.message?.includes('upload')) {
//             alert('Failed to upload image. Please check your internet connection and try again.');
//         } else if (error.message?.includes('permission') || error.message?.includes('unauthorized')) {
//             alert('Permission denied. Please check your account permissions.');
//         } else {
//             alert('Something went wrong. Please try again. Error: ' + error.message);
//         }
//     }
// };

//     // const submit = async (data) => {
//     // try {
//     //     // Enhanced debugging
//     //     console.log('=== SUBMIT FUNCTION START ===');
//     //     console.log('Form data received:', data);
//     //     console.log('userData:', userData);
//     //     console.log('post (existing):', post);
        
//     //     // Validate userData before proceeding
//     //     if (!userData || !userData.$id) {
//     //         console.error('User not authenticated or userData missing');
//     //         console.error('userData value:', userData);
//     //         alert('Please log in to create/update posts');
//     //         return;
//     //     }

//     //     if (post) {
//     //         // UPDATE existing post
//     //         console.log('=== UPDATE MODE ===');
//     //         console.log('Checking for new image:', data.image);
            
//     //         const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
            
//     //         if (file) {
//     //             console.log('New file uploaded:', file);
//     //             // Delete old image if new one uploaded
//     //             if (post.featuredImage) {
//     //                 console.log('Deleting old image:', post.featuredImage);
//     //                 service.deleteFile(post.featuredImage);
//     //             }
//     //         }

//     //         console.log('Updating post with data:', {
//     //             ...data,
//     //             featuredImage: file ? file.$id : undefined,
//     //         });

//     //         const dbPost = await service.updatePost(post.$id, {
//     //             ...data,
//     //             featuredImage: file ? file.$id : undefined,
//     //         });

//     //         console.log('Updated post result:', dbPost);
            
//     //         if (dbPost) {
//     //             navigate(`/post/${dbPost.$id}`);
//     //         } else {
//     //             console.error('Update failed - dbPost is null/undefined');
//     //         }
//     //     } else {
//     //         // CREATE new post
//     //         console.log('=== CREATE MODE ===');
//     //         console.log('Image data:', data.image);
//     //         console.log('Image file:', data.image?.[0]);
            
//     //         // Check if image is required
//     //         if (!data.image || !data.image[0]) {
//     //             console.error('No image file provided');
//     //             alert('Please select an image file');
//     //             return;
//     //         }
            
//     //         console.log('Uploading file...');
//     //         const file = await service.uploadFile(data.image[0]);
//     //         console.log('File upload result:', file);
            
//     //         if (file) {
//     //             const fileId = file.$id;
//     //             data.featuredImage = fileId;
                
//     //             const postData = {
//     //                 ...data,
//     //                 userId: userData.$id,
//     //             };
                
//     //             console.log('Creating post with data:', postData);
                
//     //             const dbPost = await service.createPost(postData);
//     //             console.log('Created post result:', dbPost);
                
//     //             if (dbPost) {
//     //                 console.log('Navigating to:', `/post/${dbPost.$id}`);
//     //                 navigate(`/post/${dbPost.$id}`);
//     //             } else {
//     //                 console.error('Create failed - dbPost is null/undefined');
//     //                 alert('Failed to create post. Please try again.');
//     //             }
//     //         } else {
//     //             console.error('File upload failed');
//     //             alert('Failed to upload image. Please try again.');
//     //         }
//     //     }
//     // } catch (error) {
//     //     console.error('=== ERROR IN SUBMIT ===');
//     //     console.error('Error details:', error);
//     //     console.error('Error message:', error.message);
//     //     console.error('Error stack:', error.stack);
        
//     //     // More specific error messages
//     //     if (error.message?.includes('userId')) {
//     //         alert('Authentication error. Please log out and log back in.');
//     //     } else if (error.message?.includes('upload')) {
//     //         alert('Failed to upload image. Please check your internet connection and try again.');
//     //     } else if (error.message?.includes('permission') || error.message?.includes('unauthorized')) {
//     //         alert('Permission denied. Please check your account permissions.');
//     //     } else {
//     //         alert('Something went wrong. Please try again. Error: ' + error.message);
//     //     }
//     // }
//     // // };
//     // export default function PostForm({ post }) {
//     // const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//     //     defaultValues: {
//     //         title: post?.title || "",
//     //         slug: post?.$id || "",
//     //         content: post?.content || "",
//     //         status: post?.status || "active",
//     //     },
//     // });

//     // const navigate = useNavigate();
//     // const userData = useSelector((state) => state.auth.userData);
//     // Add this check in your form component before calling submit
  
//     // const submit = async (data) => {
//     //     console.log("Clicked Submit in PostForm");
        
//     //     if (post) {
//     //         const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

//     //         if (file) {
//     //             appwriteService.deleteFile(post.featuredImage);
//     //         }

//     //         const dbPost = await appwriteService.updatePost(post.$id, {
//     //             ...data,
//     //             featuredImage: file ? file.$id : undefined,
//     //         });

//     //         if (dbPost) {
//     //             navigate(`/post/${dbPost.$id}`);
//     //         }
//     //     } else {
//     //         const file = await appwriteService.uploadFile(data.image[0]);

//     //         if (file) {
//     //             const fileId = file.$id;
//     //             data.featuredImage = fileId;
//     //             const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

//     //             if (dbPost) {
//     //                 navigate(`/post/${dbPost.$id}`);
//     //             }
//     //         }
//     //     }
//     // };


//         return (
//         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//             <div className="w-2/3 px-2">
//                 <Input
//                     label="Title :"
//                     placeholder="Title"
//                     className="mb-4"
//                     {...register("title", { required: true })}
//                 />
//                 <Input
//                     label="Slug :"
//                     placeholder="Slug"
//                     className="mb-4"
//                     {...register("slug", { required: true })}
//                     onInput={(e) => {
//                         setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//                     }}
//                 />
//                 <RTE 
//                     label="Content :" 
//                     name="content" 
//                     control={control} 
//                     defaultValue={getValues("content")} 
//                 />
//             </div>
//             <div className="w-1/3 px-2">
//                 <Input
//                     label="Featured Image :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image", { required: !post })}
//                 />
//                 {post && (
//                     <div className="w-full mb-4">
//                         <img
//                             src={service.getFileView(post.featuredImage)}
//                             alt={post.title}
//                             className="rounded-lg"
//                         />
//                     </div>
//                 )}
//                 <Select
//                     options={["active", "inactive"]}
//                     label="Status"
//                     className="mb-4"
//                     {...register("status", { required: true })}
//                 />
//                 <Button 
//                     type="submit" 

//                     bgColor={post ? "bg-green-500" : undefined} 
//                     className="w-full"
//                     disabled={!userData}
//                 >
//                     {post ? "Update" : "Submit"}
//                 </Button>
//             </div>
//         </form>
//     );
// }
// }