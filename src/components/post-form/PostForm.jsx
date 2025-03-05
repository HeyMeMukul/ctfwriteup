import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE } from ".."; // Removed Select import since it's unused
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion"; // For animations

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
      authorName: post?.authorName || "", // Add authorName field
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);

  // Transform title into slug
  const slugTransform = useCallback((value) => {
    if (typeof value === "string" && value.trim().length > 0) {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");
    }
    return "";
  }, []);

  // Update slug whenever the title changes
  useEffect(() => {
    const subscription = watch((values, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(values.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  const submit = async (data) => {
    setLoading(true);
    try {
      let dbPost;
      let file = null;

      // Upload new file if provided
      if (data.image?.[0]) {
        file = await appwriteService.uploadFile(data.image[0]);
      }

      // If editing an existing post
      if (post) {
        if (file && post.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
        dbPost = await appwriteService.updatePost(post?.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });
      } else {
        // Creating a new post
        if (!file) {
          throw new Error("Image upload failed or missing.");
        }
        data.featuredImage = file.$id;

        // Check user is logged in
        if (!userData?.$id) {
          throw new Error("User is not logged in.");
        }

        dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          authorName: data.authorName, // Include authorName in the post data
        });
      }

      // Navigate on success
      if (dbPost?.$id) {
        navigate(`/post/${dbPost.$id}`);
      } else {
        throw new Error("Failed to create or update post.");
      }
    } catch (error) {
      console.error("Error submitting post:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen"
    >
      <form onSubmit={handleSubmit(submit)} className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Input
              label="Title :"
              placeholder="Title"
              className="w-full mb-4"
              {...register("title", { required: true })}
            />
          </motion.div>

          {/* Slug */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Input
              label="Slug :"
              placeholder="Slug"
              className="w-full mb-4"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
              }}
            />
          </motion.div>

          {/* Author Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Input
              label="Author Name :"
              placeholder="Author Name"
              className="w-full mb-4"
              {...register("authorName", { required: true })}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <RTE
              label="Content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="mt-8 space-y-6">
          {/* File Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Input
              label="Featured Image :"
              type="file"
              className="w-full mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
          </motion.div>

          {/* Existing Image Preview */}
          {post?.featuredImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="w-full mb-4"
            >
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post?.title || "Post image"}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          )}

          {/* Status Radio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="mb-4"
          >
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="active"
                  {...register("status", { required: true })}
                  className="form-radio text-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">Active</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="inactive"
                  {...register("status", { required: true })}
                  className="form-radio text-red-500"
                />
                <span className="text-gray-700 dark:text-gray-300">Inactive</span>
              </label>
            </div>
          </motion.div>

          {/* Loading Spinner */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="flex justify-center mb-4"
            >
              <svg
                className="animate-spin h-6 w-6 text-blue-800"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0116 0h2A10 10 0 004 12z"
                ></path>
              </svg>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            <Button
              type="submit"
              bgColor={post ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}
              className="w-full"
              disabled={loading}
            >
              {loading ? "Submitting..." : post ? "Update" : "Submit"}
            </Button>
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
}