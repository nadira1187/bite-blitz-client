"use client"

import { useForm } from "react-hook-form"
import useAuth from "../../hooks/useAuth"
import { useState } from "react"
import { WithContext as ReactTags } from "react-tag-input"
import useAxiosPublic from "../../hooks/useAxiosPublic"
import Swal from "sweetalert2"
import axios from "axios"

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddProduct = () => {
  const { user } = useAuth()
  const axiosPublic = useAxiosPublic()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm()
  const [tags, setTags] = useState([])

  const handleAddTag = (tag) => {
    setTags([...tags, tag])
    setValue("Tags", tags)
  }

  const handleDeleteTag = (index) => {
    setTags(tags.filter((tag, i) => i !== index))
    setValue("Tags", tags)
  }

  const today = new Date()
  const formattedDate = today.toLocaleDateString()

  const onSubmit = async (data) => {
    console.log(data)
    const imageFile = { image: data.Product_image[0] }
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    console.log(watch(res.data))

    if (res.data.success) {
      const tagStrings = tags.map((tag) => tag.text)
      const productInfo = {
        Product_name: data.Product_name,
        Description: data.Description,
        Date: formattedDate,
        Status: "pending",
        External_Links: data.External_Links,
        Tags: tagStrings,
        vote: 0,
        report: 0,
        Featured: false,
        Product_image: res.data.data.display_url,
        Owner_email: user?.email,
      }
      console.log(productInfo)
      const productRes = await axiosPublic.post("/addproduct", productInfo)
      console.log(productRes.data)
      if (productRes.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.Product_name} is added to the collection.`,
          showConfirmButton: false,
          timer: 1500,
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-navy-600 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-navy-700 to-blue-600 bg-clip-text text-transparent">
              Add New Product
            </h1>
          </div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Share your amazing product with our community and get valuable feedback from users worldwide.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                src={user?.photoURL || "/placeholder.svg"}
                alt="User"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-navy-500 to-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-navy-700 mb-1">Product Owner</h3>
              <p className="text-navy-600 font-medium">{user?.displayName}</p>
              <p className="text-slate-500">{user?.email}</p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-navy-50 to-blue-50 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-navy-600">Verified Owner</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-navy-700 mb-2">Product Name *</label>
                <input
                  {...register("Product_name", { required: "Product name is required" })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-navy-500 focus:ring-4 focus:ring-navy-100 transition-all duration-200 bg-white/50"
                  placeholder="Enter your product name"
                />
                {errors.Product_name && <p className="text-red-500 text-sm mt-1">{errors.Product_name.message}</p>}
              </div>

              {/* Product Image */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-navy-700 mb-2">Product Image *</label>
                <div className="relative">
                  <input
                    {...register("Product_image", { required: "Product image is required" })}
                    type="file"
                    accept="image/*"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-navy-500 focus:ring-4 focus:ring-navy-100 transition-all duration-200 bg-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-navy-50 file:text-navy-700 hover:file:bg-navy-100"
                  />
                </div>
                {errors.Product_image && <p className="text-red-500 text-sm mt-1">{errors.Product_image.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-navy-700 mb-2">Product Description *</label>
                <textarea
                  {...register("Description", { required: "Description is required" })}
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-navy-500 focus:ring-4 focus:ring-navy-100 transition-all duration-200 bg-white/50 resize-none"
                  placeholder="Describe your product features, benefits, and what makes it special..."
                />
                {errors.Description && <p className="text-red-500 text-sm mt-1">{errors.Description.message}</p>}
              </div>

              {/* External Links */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-navy-700 mb-2">External Links *</label>
                <input
                  {...register("External_Links", { required: "External link is required" })}
                  type="url"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-navy-500 focus:ring-4 focus:ring-navy-100 transition-all duration-200 bg-white/50"
                  placeholder="https://your-product-website.com"
                />
                {errors.External_Links && <p className="text-red-500 text-sm mt-1">{errors.External_Links.message}</p>}

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-navy-700 mb-2">Product Tags</label>
                  <div className="border-2 border-slate-200 rounded-xl p-4 bg-white/50 focus-within:border-navy-500 focus-within:ring-4 focus-within:ring-navy-100 transition-all duration-200">
                    <ReactTags
                      tags={tags}
                      handleDelete={handleDeleteTag}
                      handleAddition={handleAddTag}
                      placeholder="Add tags (press Enter to add)"
                      classNames={{
                        tags: "flex flex-wrap gap-2",
                        tagInput: "flex-1 min-w-0",
                        tagInputField:
                          "w-full border-none outline-none bg-transparent text-navy-700 placeholder-slate-400",
                        tag: "inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-navy-100 to-blue-100 text-navy-700 rounded-full text-sm font-medium",
                        remove: "ml-1 text-navy-500 hover:text-red-500 cursor-pointer font-bold",
                      }}
                    />
                  </div>
                  <p className="text-sm text-slate-500 mt-2">Add relevant tags to help users discover your product</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="group relative px-8 py-4 bg-gradient-to-r from-navy-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-navy-200"
              >
                <span className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Product to Collection
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-navy-700 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-gradient-to-r from-navy-50 to-blue-50 rounded-2xl p-6 border border-navy-100">
          <h3 className="text-lg font-semibold text-navy-700 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Tips for Success
          </h3>
          <ul className="text-navy-600 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-navy-400 mt-1">•</span>
              Use a high-quality image that clearly shows your product
            </li>
            <li className="flex items-start gap-2">
              <span className="text-navy-400 mt-1">•</span>
              Write a detailed description highlighting key features and benefits
            </li>
            <li className="flex items-start gap-2">
              <span className="text-navy-400 mt-1">•</span>
              Add relevant tags to help users discover your product easily
            </li>
            <li className="flex items-start gap-2">
              <span className="text-navy-400 mt-1">•</span>
              Include a working link to your product website or demo
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
