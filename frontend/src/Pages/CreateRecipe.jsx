import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api_url from "../utils";
import { useSelector } from "react-redux";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("No file chosen");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(""); // Added missing error state
  const { id } = useParams();
  const email = useSelector((state) => state.auth.email);

  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      setFileName(file.name);
      setUploadProgress(true);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "first_time_using_cloudinary");
      data.append("cloud_name", "dcvodctmi");

      const url = "https://api.cloudinary.com/v1_1/dcvodctmi/image/upload";
      const options = {
        method: "POST",
        body: data,
      };

      const response = await fetch(url, options);
      const uploadedImageUrl = await response.json();
      console.log(uploadedImageUrl.url);
      setImgUrl(uploadedImageUrl.url);
      setUploadProgress(false);
    } catch (error) {
      console.log(error.message);
      setUploadProgress(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      const url = update 
        ? `${api_url}/api/recipe/update/${id}` // Update endpoint
        : `${api_url}/api/recipe/create`; // Create endpoint
      
      const options = {
        method: update ? "PUT" : "POST", // Different method for update
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, imgUrl, email }),
      };

      const response = await fetch(url, options);
      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        console.log(message);
        navigate("/");
      } else {
        console.log(message, error);
        setError(message || error || "Something went wrong");
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchById = async () => {
    try {
      const response = await fetch(`${api_url}/api/recipe/fetch/${id}`);
      const result = await response.json();
      const { success, message, recipeList } = result;

      if (success) {
        console.log(message);
        setTitle(recipeList.title);
        setDescription(recipeList.description);
        setImgUrl(recipeList.imgUrl || ""); // Also set the image URL if available
      } else {
        console.log(message);
        setError(message);
      }
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  // FIXED: Moved the logic inside useEffect to prevent infinite re-renders
  useEffect(() => {
    if (id && !update) {
      setUpdate(true);
      handleFetchById();
    }
  }, [id]); // Only run when id changes

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6">
            <h1 className="text-3xl font-bold text-white text-center">
              {update ? "Update Recipe" : "Create New Recipe"}
            </h1>
            <p className="text-orange-100 text-center mt-2">
              {update 
                ? "Edit your delicious creation" 
                : "Share your delicious creation with the world"
              }
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-8">
            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                  <div className="ml-auto pl-3">
                    <button
                      onClick={() => setError("")}
                      className="inline-flex text-red-400 hover:text-red-600"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Input Fields */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                  Recipe Title *
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter your recipe title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                  Description *
                </label>
                <textarea
                  id="description"
                  placeholder="Describe your recipe, ingredients, cooking method..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 resize-none"
                  required
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200 hover:border-orange-300 transition-colors duration-200">
              <div className="text-center space-y-4">
                {/* Upload Icon or Preview */}
                {imgUrl ? (
                  <div className="space-y-4">
                    <img
                      src={imgUrl}
                      alt="Recipe preview"
                      className="w-32 h-32 mx-auto rounded-lg object-cover shadow-md"
                    />
                    <p className="text-sm text-green-600 font-medium">
                      ✓ Image {update ? "loaded" : "uploaded"} successfully
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Upload Recipe Image</p>
                      <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                )}

                {/* File Input */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className={`px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                      uploadProgress ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {uploadProgress ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Uploading...
                      </span>
                    ) : imgUrl ? 'Change Image' : 'Choose Image'}
                  </label>

                  <span className="text-sm text-gray-500 max-w-xs truncate">
                    {fileName}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={isLoading || !title.trim() || !description.trim()}
                className={`w-full py-4 px-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  isLoading || !title.trim() || !description.trim()
                    ? 'opacity-50 cursor-not-allowed transform-none'
                    : 'hover:from-green-600 hover:to-emerald-600'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {update ? "Updating..." : "Creating Recipe..."}
                  </span>
                ) : (
                  update ? "Update Recipe" : "Create Recipe"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;