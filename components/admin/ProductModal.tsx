'use client';

import { useState, useEffect, useMemo } from 'react';
import { handleUnauthorized } from '@/lib/api';

interface KeyValue {
  key: string;
  value: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  product?: any;
  mode: 'create' | 'edit';
}

export default function ProductModal({ isOpen, onClose, onSubmit, product, mode }: ProductModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [baseWeight, setBaseWeight] = useState('');
  const [lengthMetric, setLengthMetric] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isCustomizable, setIsCustomizable] = useState(false);
  const [cachedPrice, setCachedPrice] = useState('');
  const [metalType, setMetalType] = useState<'gold' | 'silver' | ''>('');
  const [makingCharges, setMakingCharges] = useState('');
  const [gemstoneValue, setGemstoneValue] = useState('');
  const [wastage, setWastage] = useState('');
  const [gst, setGst] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<Array<{ url: string; alt: string }>>([]);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadingVideos, setUploadingVideos] = useState(false);
  const [lengths, setLengths] = useState<string>('');
  const [features, setFeatures] = useState<KeyValue[]>([{ key: '', value: '' }]);
  const [information, setInformation] = useState<KeyValue[]>([{ key: '', value: '' }]);
  const [dimensions, setDimensions] = useState<KeyValue[]>([{ key: '', value: '' }]);
  const [livePrice, setLivePrice] = useState<any>(null);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    
    // Fetch categories when modal opens
    fetchCategories();
    
    if (product && mode === 'edit') {
      console.log('Loading product data:', product);
      
      setName(product.name || '');
      setDescription(product.description || '');
      setShortDescription(product.short_description || '');
      setCategoryId(product.category_id || '');
      setBaseWeight(product.base_weight !== undefined ? String(product.base_weight) : '');
      setLengthMetric(product.length_metric || '');
      setSeoTitle(product.seo_title || '');
      setSeoDescription(product.seo_description || '');
      setIsFeatured(!!product.is_featured);
      setIsCustomizable(!!product.is_customizable);
      setCachedPrice(product.cached_price !== undefined && product.cached_price !== null ? String(product.cached_price) : '');
      setMetalType(product.metal_type || '');
      setMakingCharges(product.making_charges !== undefined && product.making_charges !== null ? String(product.making_charges) : '');
      setGemstoneValue(product.gemstone_value !== undefined && product.gemstone_value !== null ? String(product.gemstone_value) : '');
      setWastage(product.wastage !== undefined && product.wastage !== null ? String(product.wastage) : '');
      setGst(product.gst !== undefined && product.gst !== null ? String(product.gst) : '');
      setLengths(product.length?.join(',') || '');
      
      // Load existing images and videos
      setImageUrls(product.images || []);
      setVideoUrls(product.videos || []);
      
      console.log('Loaded values:', {
        description: product.description,
        categoryId: product.category_id,
        lengthMetric: product.length_metric,
        seoTitle: product.seo_title,
        metalType: product.metal_type,
        makingCharges: product.making_charges
      });
      
      // Features: convert array of strings to array of {key: '', value: string}
      if (product.features && Array.isArray(product.features) && product.features.length > 0) {
        setFeatures(product.features.map((f: any) => ({ key: '', value: typeof f === 'string' ? f : f.value || '' })));
      } else {
        setFeatures([{ key: '', value: '' }]);
      }
      
      // Information: already in correct format {key, value}
      setInformation(product.information?.length ? product.information : [{ key: '', value: '' }]);
      
      // Dimensions: already in correct format {key, value}
      setDimensions(product.dimensions?.length ? product.dimensions : [{ key: '', value: '' }]);
      
      fetchLivePrice();
    } else {
      resetForm();
      fetchLivePrice();
    }
    setError('');
  }, [isOpen, product?.id, mode]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setShortDescription('');
    setCategoryId('');
    setBaseWeight('');
    setLengthMetric('');
    setSeoTitle('');
    setSeoDescription('');
    setIsFeatured(false);
    setIsCustomizable(false);
    setCachedPrice('');
    setImages([]);
    setVideos([]);
    setImageUrls([]);
    setVideoUrls([]);
    setLengths('');
    setFeatures([{ key: '', value: '' }]);
    setInformation([{ key: '', value: '' }]);
    setDimensions([{ key: '', value: '' }]);
    setLivePrice(null);
    setMetalType('');
    setMakingCharges('');
    setGemstoneValue('');
    setWastage('');
    setGst('');
  };

  const metalValue = useMemo(() => {
    if (!livePrice || !metalType) return 0;
    const metalPrice = metalType === 'gold' 
      ? parseFloat(livePrice.gold_price || 0) 
      : parseFloat(livePrice.silver_price || 0);
    return metalPrice;
  }, [livePrice, metalType]);

  const totalPrice = useMemo(() => {
    const metal = metalValue;
    const making = parseFloat(makingCharges) || 0;
    const gemstone = parseFloat(gemstoneValue) || 0;
    const wastageAmt = parseFloat(wastage) || 0;
    const gstAmt = parseFloat(gst) || 0;
    return metal + making + gemstone + wastageAmt + gstAmt;
  }, [metalValue, makingCharges, gemstoneValue, wastage, gst]);

  const fetchLivePrice = async () => {
    setLoadingPrice(true);
    try {
      const token = typeof window !== 'undefined' ? sessionStorage.getItem('admin_access_token') : '';
      const res = await fetch('https://sree-ganesh-api.sriganeshjewellersofficial.workers.dev/api/pricing/live', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.status === 401) {
        handleUnauthorized();
        return;
      }
      
      const data = await res.json();
      if (data.success && data.data) {
        setLivePrice(data.data);
      }
    } catch (err) {
      // Silent error handling
    } finally {
      setLoadingPrice(false);
    }
  };

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const token = typeof window !== 'undefined' ? sessionStorage.getItem('admin_access_token') : '';
      const API = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${API}/categories?t=${Date.now()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.status === 401) {
        handleUnauthorized();
        return;
      }
      
      const data = await res.json();
      if (data.success && data.data) {
        // Keep all categories with nested structure
        setCategories(data.data);
      }
    } catch (err) {
      // Silent error handling
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleMetalTypeChange = (newType: 'gold' | 'silver' | '') => {
    setMetalType(newType);
    if (newType) {
      fetchLivePrice();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setVideos(Array.from(e.target.files));
  };

  const handleUploadImages = async () => {
    if (images.length === 0) return;
    setUploadingImages(true);
    try {
      const { uploadImage } = await import('@/lib/services/uploadService');
      const uploadedUrls: Array<{ url: string; alt: string }> = [];
      
      for (const file of images) {
        const result = await uploadImage(file);
        const url = result.url || result.image_url || result.file_url || '';
        if (url) {
          uploadedUrls.push({ url, alt: file.name });
        }
      }
      
      setImageUrls([...imageUrls, ...uploadedUrls]);
      setImages([]);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to upload images');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleUploadVideos = async () => {
    if (videos.length === 0) return;
    setUploadingVideos(true);
    try {
      const { uploadImage } = await import('@/lib/services/uploadService');
      const uploadedUrls: string[] = [];
      
      for (const file of videos) {
        const result = await uploadImage(file);
        const url = result.url || result.image_url || result.file_url || '';
        if (url) {
          uploadedUrls.push(url);
        }
      }
      
      setVideoUrls([...videoUrls, ...uploadedUrls]);
      setVideos([]);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to upload videos');
    } finally {
      setUploadingVideos(false);
    }
  };

  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const removeVideoUrl = (index: number) => {
    setVideoUrls(videoUrls.filter((_, i) => i !== index));
  };

  const updateImageAlt = (index: number, alt: string) => {
    const updated = [...imageUrls];
    updated[index].alt = alt;
    setImageUrls(updated);
  };

  const addKeyValue = (type: 'features' | 'information' | 'dimensions') => {
    if (type === 'features') setFeatures([...features, { key: '', value: '' }]);
    if (type === 'information') setInformation([...information, { key: '', value: '' }]);
    if (type === 'dimensions') setDimensions([...dimensions, { key: '', value: '' }]);
  };

  const removeKeyValue = (type: 'features' | 'information' | 'dimensions', index: number) => {
    if (type === 'features') setFeatures(features.filter((_, i) => i !== index));
    if (type === 'information') setInformation(information.filter((_, i) => i !== index));
    if (type === 'dimensions') setDimensions(dimensions.filter((_, i) => i !== index));
  };

  const updateKeyValue = (type: 'features' | 'information' | 'dimensions', index: number, field: 'key' | 'value', val: string) => {
    if (type === 'features') {
      const updated = [...features];
      updated[index][field] = val;
      setFeatures(updated);
    }
    if (type === 'information') {
      const updated = [...information];
      updated[index][field] = val;
      setInformation(updated);
    }
    if (type === 'dimensions') {
      const updated = [...dimensions];
      updated[index][field] = val;
      setDimensions(updated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Product name is required');
      return;
    }
    if (!baseWeight || parseFloat(baseWeight) <= 0) {
      setError('Base weight is required and must be greater than 0');
      return;
    }
    setLoading(true);
    try {
      // Build JSON payload
      const payload: any = {
        name: name.trim(),
      };

      if (description) payload.description = description;
      if (shortDescription) payload.short_description = shortDescription;
      if (categoryId) payload.category_id = categoryId;
      if (baseWeight) payload.base_weight = parseFloat(baseWeight);
      if (lengthMetric) payload.length_metric = lengthMetric;
      if (seoTitle) payload.seo_title = seoTitle;
      if (seoDescription) payload.seo_description = seoDescription;
      if (cachedPrice) payload.cached_price = parseFloat(cachedPrice);
      
      // Price calculator fields
      if (metalType) payload.metal_type = metalType;
      if (makingCharges) payload.making_charges = parseFloat(makingCharges) || 0;
      if (gemstoneValue) payload.gemstone_value = parseFloat(gemstoneValue) || 0;
      if (wastage) payload.wastage = parseFloat(wastage) || 0;
      if (gst) payload.gst = parseFloat(gst) || 0;
      
      // Calculate and send dynamic_price and price_breakup
      if (metalType && totalPrice > 0) {
        payload.dynamic_price = parseFloat(totalPrice.toFixed(2));
        payload.price_breakup = {
          gold_value: metalType === 'gold' ? parseFloat(metalValue.toFixed(2)) : 0,
          silver_value: metalType === 'silver' ? parseFloat(metalValue.toFixed(2)) : 0,
          making_charges: parseFloat(makingCharges) || 0,
          gemstone_value: parseFloat(gemstoneValue) || 0,
          wastage: parseFloat(wastage) || 0,
          gst: parseFloat(gst) || 0,
          total: parseFloat(totalPrice.toFixed(2))
        };
      }
      
      if (mode === 'create') {
        payload.is_featured = isFeatured;
        payload.is_customizable = isCustomizable;
        console.log('Toggle states:', { isFeatured, isCustomizable });
      } else {
        // Also send in edit mode
        payload.is_featured = isFeatured;
        payload.is_customizable = isCustomizable;
        console.log('Toggle states (edit):', { isFeatured, isCustomizable });
      }
      
      // Images and videos - send the uploaded URLs
      payload.images = imageUrls;
      payload.videos = videoUrls;
      
      // Length - convert to array of numbers
      if (lengths) {
        const lengthArray = lengths.split(',').map((l) => parseFloat(l.trim())).filter((n) => !isNaN(n));
        payload.length = lengthArray;
      }
      
      // Features - convert to array of strings
      const validFeatures = features.filter((f) => f.value.trim());
      if (validFeatures.length) {
        payload.features = validFeatures.map((f) => f.value.trim());
      }
      
      // Information - keep as key-value array
      const validInfo = information.filter((i) => i.key.trim() && i.value.trim());
      if (validInfo.length) {
        payload.information = validInfo;
      }
      
      // Dimensions - keep as key-value array
      const validDims = dimensions.filter((d) => d.key.trim() && d.value.trim());
      if (validDims.length) {
        payload.dimensions = validDims;
      }
      
      // Debug: Log JSON payload
      console.log('JSON Payload:', JSON.stringify(payload, null, 2));
      
      await onSubmit(payload);
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <h3 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'Add New Product' : 'Edit Product'}
          </h3>
          <button onClick={handleClose} disabled={loading} className="text-gray-400 hover:text-gray-600 transition disabled:opacity-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name <span className="text-red-500">*</span></label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" disabled={loading} placeholder="Enter product name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      disabled={loading || loadingCategories}
                    >
                      <option value="">Select Category</option>
                      {categories
                        .filter((cat: any) => !cat.parent_id)
                        .map((cat: any) => (
                          <optgroup key={cat.id} label={cat.name}>
                            {cat.children && cat.children.length > 0 ? (
                              cat.children.map((sub: any) => (
                                <option key={sub.id} value={sub.id}>
                                  {sub.name}
                                </option>
                              ))
                            ) : (
                              <option value={cat.id}>{cat.name}</option>
                            )}
                          </optgroup>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Base Weight (g) <span className="text-red-500">*</span></label>
                    <input type="number" step="0.01" value={baseWeight} onChange={(e) => setBaseWeight(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" disabled={loading} placeholder="e.g., 15.5" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length Metric</label>
                    <input type="text" value={lengthMetric} onChange={(e) => setLengthMetric(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" disabled={loading} placeholder="Enter length metric" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" disabled={loading} placeholder="Enter product description" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                  <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" disabled={loading} placeholder="Enter short description" />
                </div>
                <div className="flex gap-6 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">Featured</span>
                    <button type="button" onClick={() => setIsFeatured(!isFeatured)} disabled={loading} className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${isFeatured ? 'bg-amber-500' : 'bg-gray-200'} disabled:opacity-50`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${isFeatured ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">Customizable</span>
                    <button type="button" onClick={() => setIsCustomizable(!isCustomizable)} disabled={loading} className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${isCustomizable ? 'bg-amber-500' : 'bg-gray-200'} disabled:opacity-50`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${isCustomizable ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Media</h4>
                
                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm" 
                        disabled={loading || uploadingImages} 
                      />
                      {images.length > 0 && (
                        <button
                          type="button"
                          onClick={handleUploadImages}
                          disabled={uploadingImages}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
                        >
                          {uploadingImages ? 'Uploading...' : `Upload ${images.length} file(s)`}
                        </button>
                      )}
                    </div>
                    
                    {/* Uploaded Images List */}
                    {imageUrls.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">{imageUrls.length} image(s) uploaded:</p>
                        {imageUrls.map((img, idx) => (
                          <div key={idx} className="flex gap-2 items-center bg-gray-50 p-2 rounded">
                            <img src={img.url} alt={img.alt} className="w-12 h-12 object-cover rounded" />
                            <input
                              type="text"
                              value={img.alt}
                              onChange={(e) => updateImageAlt(idx, e.target.value)}
                              placeholder="Alt text"
                              className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => removeImageUrl(idx)}
                              className="text-red-600 hover:text-red-800 px-2"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Videos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Videos</label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input 
                        type="file" 
                        multiple 
                        accept="video/*" 
                        onChange={handleVideoChange} 
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm" 
                        disabled={loading || uploadingVideos} 
                      />
                      {videos.length > 0 && (
                        <button
                          type="button"
                          onClick={handleUploadVideos}
                          disabled={uploadingVideos}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
                        >
                          {uploadingVideos ? 'Uploading...' : `Upload ${videos.length} file(s)`}
                        </button>
                      )}
                    </div>
                    
                    {/* Uploaded Videos List */}
                    {videoUrls.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">{videoUrls.length} video(s) uploaded:</p>
                        {videoUrls.map((url, idx) => (
                          <div key={idx} className="flex gap-2 items-center bg-gray-50 p-2 rounded">
                            <video src={url} className="w-12 h-12 object-cover rounded" />
                            <span className="flex-1 text-sm text-gray-600 truncate">{url}</span>
                            <button
                              type="button"
                              onClick={() => removeVideoUrl(idx)}
                              className="text-red-600 hover:text-red-800 px-2"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Attributes</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lengths (comma-separated: 1,2,3)</label>
                  <input type="text" value={lengths} onChange={(e) => setLengths(e.target.value)} placeholder="e.g., 1,2,3,4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" disabled={loading} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Features (e.g., "22K Gold", "Handcrafted Design")</label>
                    <button type="button" onClick={() => addKeyValue('features')} className="text-sm text-amber-600 hover:text-amber-700 font-medium">+ Add Feature</button>
                  </div>
                  {features.map((item, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input type="text" placeholder="Feature description" value={item.value} onChange={(e) => updateKeyValue('features', idx, 'value', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                      {features.length > 1 && <button type="button" onClick={() => removeKeyValue('features', idx)} className="text-red-600 hover:text-red-700 px-2 text-xl">×</button>}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Information</label>
                    <button type="button" onClick={() => addKeyValue('information')} className="text-sm text-amber-600 hover:text-amber-700 font-medium">+ Add Info</button>
                  </div>
                  {information.map((item, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input type="text" placeholder="Key" value={item.key} onChange={(e) => updateKeyValue('information', idx, 'key', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                      <input type="text" placeholder="Value" value={item.value} onChange={(e) => updateKeyValue('information', idx, 'value', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                      {information.length > 1 && <button type="button" onClick={() => removeKeyValue('information', idx)} className="text-red-600 hover:text-red-700 px-2">×</button>}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Dimensions</label>
                    <button type="button" onClick={() => addKeyValue('dimensions')} className="text-sm text-amber-600 hover:text-amber-700 font-medium">+ Add Dimension</button>
                  </div>
                  {dimensions.map((item, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input type="text" placeholder="Key" value={item.key} onChange={(e) => updateKeyValue('dimensions', idx, 'key', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                      <input type="text" placeholder="Value" value={item.value} onChange={(e) => updateKeyValue('dimensions', idx, 'value', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                      {dimensions.length > 1 && <button type="button" onClick={() => removeKeyValue('dimensions', idx)} className="text-red-600 hover:text-red-700 px-2">×</button>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">SEO</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
                  <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" disabled={loading} placeholder="Enter SEO title" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SEO Description</label>
                  <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" disabled={loading} placeholder="Enter SEO description" />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Pricing</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cached Price</label>
                  <input type="number" step="0.01" value={cachedPrice} onChange={(e) => setCachedPrice(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" disabled={loading} placeholder="Enter cached price" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="text-lg font-semibold text-gray-900">Live Gold & Silver Rates</h4>
                  <button type="button" onClick={fetchLivePrice} disabled={loadingPrice} className="text-sm text-amber-600 hover:text-amber-700 font-medium disabled:opacity-50">{loadingPrice ? 'Loading...' : 'Refresh'}</button>
                </div>
                {livePrice ? (
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Fetch Date:</span>
                        <span className="text-sm font-semibold">{livePrice.fetch_date}</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Gold Price (per gram):</span>
                            <span className="font-semibold">Rs {parseFloat(livePrice.gold_price || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Silver Price (per gram):</span>
                            <span className="font-semibold">Rs {parseFloat(livePrice.silver_price || 0).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
                      <h5 className="text-sm font-semibold text-gray-900">Price Calculator</h5>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Metal Type</label>
                        <select value={metalType} onChange={(e) => handleMetalTypeChange(e.target.value as 'gold' | 'silver' | '')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                          <option value="">Select Type</option>
                          <option value="gold">Gold</option>
                          <option value="silver">Silver</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Metal Value</label>
                          <div className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium">
                            Rs {metalValue.toFixed(2)}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Making Charges</label>
                          <input type="number" step="0.01" value={makingCharges} onChange={(e) => setMakingCharges(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="0" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Gemstone Value</label>
                          <input type="number" step="0.01" value={gemstoneValue} onChange={(e) => setGemstoneValue(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="0" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Wastage</label>
                          <input type="number" step="0.01" value={wastage} onChange={(e) => setWastage(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="0" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">GST</label>
                        <input type="number" step="0.01" value={gst} onChange={(e) => setGst(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="0" />
                      </div>

                      <div className="border-t pt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Price</label>
                        <div className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-amber-50 text-amber-900 font-semibold text-lg">
                          Rs {totalPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No pricing data available. Click Refresh to load.</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50 flex-shrink-0">
            <button type="button" onClick={handleClose} disabled={loading} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={loading || !name.trim() || !baseWeight} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition disabled:opacity-50 flex items-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>{mode === 'create' ? 'Creating...' : 'Updating...'}</span>
                </>
              ) : (
                <span>{mode === 'create' ? 'Create Product' : 'Update Product'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
