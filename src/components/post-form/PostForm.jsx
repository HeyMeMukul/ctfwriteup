import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE } from ".."; // Removed Select import since it's unused
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
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
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* Left Column */}
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right Column */}
      <div className="w-1/3 px-2">
        {/* File Input */}
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {/* Existing Image Preview */}
        {post?.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post?.title || "Post image"}
              className="rounded-lg"
            />
          </div>
        )}

        {/* Status Radio */}
        <div className="mb-4">
          <label className="block text-white mb-2">Status</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="active"
                {...register("status", { required: true })}
                className="form-radio text-blue-500"
              />
              <span>Active</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="inactive"
                {...register("status", { required: true })}
                className="form-radio text-red-500"
              />
              <span>Inactive</span>
            </label>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center mb-4">
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
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
