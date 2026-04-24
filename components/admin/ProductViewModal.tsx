'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Package, Tag, Star, Settings, Eye, Calendar, DollarSign } from 'lucide-react';

interface ProductViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

export default function ProductViewModal({ isOpen, onClose, product }: ProductViewModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const images = product.images || [];
  const videos = product.videos || [];
  const features = product.features || [];
  const information = product.information || [];
  const dimensions = product.dimensions || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Product Details</h3>
              <p className="text-sm text-gray-500">View complete product information</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-200 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Left Column - Images & Media */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="bg-gray-50 rounded-xl p-4">
                {images.length > 0 ? (
                  <div className="space-y-4">
                    <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
                      <Image
                        src={images[activeImageIndex]?.url || images[activeImageIndex]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    
                    {/* Image Thumbnails */}
                    {images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {images.map((img: any, index: number) => (
                          <button
                            key={index}
                            onClick={() => setActiveImageIndex(index)}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                              activeImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                            }`}
                          >
                            <Image
                              src={img?.url || img}
                              alt={`${product.name} ${index + 1}`}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                              unoptimized
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <Package className="w-16 h-16 mx-auto mb-2" />
                      <p>No images available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Videos */}
              {videos.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Videos ({videos.length})
                  </h4>
                  <div className="space-y-2">
                    {videos.map((video: string, index: number) => (
                      <div key={index} className="bg-white rounded-lg p-3 border">
                        <video controls className="w-full h-32 rounded">
                          <source src={video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Product Information */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        ID: {product.id?.slice(0, 8)}...
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(product.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {product.is_featured && (
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                    {product.is_customizable && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center gap-1">
                        <Settings className="w-3 h-3" />
                        Customizable
                      </span>
                    )}
                  </div>
                </div>

                {product.description && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </div>
                )}

                {product.short_description && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Short Description</h4>
                    <p className="text-gray-600">{product.short_description}</p>
                  </div>
                )}
              </div>

              {/* Specifications */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  Specifications
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Base Weight</span>
                    <p className="font-medium text-gray-900">{product.base_weight}g</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Category</span>
                    <p className="font-medium text-gray-900">{product.category_name || '—'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Metal Type</span>
                    <p className="font-medium text-gray-900 capitalize">{product.metal_type || '—'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Length Metric</span>
                    <p className="font-medium text-gray-900">{product.length_metric || '—'}</p>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              {(product.dynamic_price || product.cached_price || product.price_breakup) && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Pricing Information
                  </h4>
                  
                  {product.dynamic_price && (
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-green-600">
                        ₹{product.dynamic_price.toLocaleString('en-IN')}
                      </div>
                      <p className="text-sm text-gray-500">Dynamic Price</p>
                    </div>
                  )}

                  {product.price_breakup && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gold Value:</span>
                        <span className="font-medium">₹{product.price_breakup.gold_value?.toLocaleString('en-IN') || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Silver Value:</span>
                        <span className="font-medium">₹{product.price_breakup.silver_value?.toLocaleString('en-IN') || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Making Charges:</span>
                        <span className="font-medium">₹{product.price_breakup.making_charges?.toLocaleString('en-IN') || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gemstone Value:</span>
                        <span className="font-medium">₹{product.price_breakup.gemstone_value?.toLocaleString('en-IN') || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">GST:</span>
                        <span className="font-medium">₹{product.price_breakup.gst?.toLocaleString('en-IN') || 0}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>₹{product.price_breakup.total?.toLocaleString('en-IN') || 0}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Features */}
              {features.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Features</h4>
                  <div className="space-y-2">
                    {features.map((feature: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{feature.key}:</span>
                        <span className="font-medium text-gray-900">{feature.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Information */}
              {information.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Additional Information</h4>
                  <div className="space-y-2">
                    {information.map((info: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{info.key}:</span>
                        <span className="font-medium text-gray-900">{info.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dimensions */}
              {dimensions.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Dimensions</h4>
                  <div className="space-y-2">
                    {dimensions.map((dim: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{dim.key}:</span>
                        <span className="font-medium text-gray-900">{dim.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SEO Information */}
              {(product.seo_title || product.seo_description) && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">SEO Information</h4>
                  {product.seo_title && (
                    <div className="mb-3">
                      <span className="text-sm text-gray-600">SEO Title:</span>
                      <p className="font-medium text-gray-900">{product.seo_title}</p>
                    </div>
                  )}
                  {product.seo_description && (
                    <div>
                      <span className="text-sm text-gray-600">SEO Description:</span>
                      <p className="font-medium text-gray-900">{product.seo_description}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}