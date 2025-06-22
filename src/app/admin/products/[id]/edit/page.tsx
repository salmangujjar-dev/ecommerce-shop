'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

import { useState, useEffect } from 'react';

import { ArrowLeft, Save, Upload, X, Plus, Trash2 } from 'lucide-react';

import { trpc } from '~trpc/client';

interface ImageData {
  src: string;
  alt: string;
  primary: boolean;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    categoryId: '',
    genderId: '',
    details: [''],
    images: [] as ImageData[],
  });

  const { data: product, isLoading } = trpc.products.getById.useQuery({
    id: productId,
  });
  const { data: categories } = trpc.categories.getAll.useQuery();
  const { data: genders } = trpc.admin.getAllGenders.useQuery();

  const updateProductMutation = trpc.admin.updateProduct.useMutation({
    onSuccess: () => {
      router.push('/admin/products');
    },
  });

  // Load product data when available
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price.toString(),
        categoryId: product.categoryId,
        genderId: product.genderId,
        details: product.details || [''],
        images: product.images.map(
          (img: { src: string; alt: string; primary: boolean }) => ({
            src: img.src,
            alt: img.alt,
            primary: img.primary,
          })
        ),
      });
    }
  }, [product]);

  const handleInputChange = (
    field: string,
    value: string | number | string[] | ImageData[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData((prev) => ({ ...prev, name, slug }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target?.result as string;
          const newImage: ImageData = {
            src,
            alt: file.name,
            primary: formData.images.length === 0,
          };
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, newImage],
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const setPrimaryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        primary: i === index,
      })),
    }));
  };

  const addDetail = () => {
    setFormData((prev) => ({
      ...prev,
      details: [...prev.details, ''],
    }));
  };

  const updateDetail = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      details: prev.details.map((detail, i) => (i === index ? value : detail)),
    }));
  };

  const removeDetail = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateProductMutation.mutateAsync({
        id: productId,
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        price: parseFloat(formData.price),
        categoryId: formData.categoryId,
        genderId: formData.genderId,
        details: formData.details.filter((d) => d.trim()),
      });
    } catch (error) {
      console.error('Error updating product:', error);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-gray-600'>Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-gray-600'>Product not found</div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Link
            href='/admin/products'
            className='inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Products
          </Link>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Edit Product</h1>
            <p className='text-gray-600'>Update product information</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-8'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {/* Main Form */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Basic Information */}
            <div className='rounded-lg bg-white p-6 shadow'>
              <h2 className='text-lg font-medium text-gray-900 mb-4'>
                Basic Information
              </h2>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Product Name *
                  </label>
                  <input
                    type='text'
                    required
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Slug *
                  </label>
                  <input
                    type='text'
                    required
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                  />
                </div>
                <div className='sm:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange('description', e.target.value)
                    }
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Price *
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <span className='text-gray-500 sm:text-sm'>$</span>
                    </div>
                    <input
                      type='number'
                      step='0.01'
                      required
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange('price', e.target.value)
                      }
                      className='block w-full pl-7 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Category and Gender */}
            <div className='rounded-lg bg-white p-6 shadow'>
              <h2 className='text-lg font-medium text-gray-900 mb-4'>
                Category & Gender
              </h2>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Category *
                  </label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) =>
                      handleInputChange('categoryId', e.target.value)
                    }
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                  >
                    <option value=''>Select a category</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Gender *
                  </label>
                  <select
                    required
                    value={formData.genderId}
                    onChange={(e) =>
                      handleInputChange('genderId', e.target.value)
                    }
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                  >
                    <option value=''>Select gender</option>
                    {genders?.map((gender) => (
                      <option key={gender.id} value={gender.id}>
                        {gender.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className='rounded-lg bg-white p-6 shadow'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-medium text-gray-900'>
                  Product Details
                </h2>
                <button
                  type='button'
                  onClick={addDetail}
                  className='inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500'
                >
                  <Plus className='mr-1 h-4 w-4' />
                  Add Detail
                </button>
              </div>
              <div className='space-y-3'>
                {formData.details.map((detail, index) => (
                  <div key={index} className='flex gap-2'>
                    <input
                      type='text'
                      value={detail}
                      onChange={(e) => updateDetail(index, e.target.value)}
                      placeholder='Enter product detail'
                      className='flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                    />
                    <button
                      type='button'
                      onClick={() => removeDetail(index)}
                      className='inline-flex items-center p-2 text-red-600 hover:text-red-500'
                    >
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Images */}
            <div className='rounded-lg bg-white p-6 shadow'>
              <h2 className='text-lg font-medium text-gray-900 mb-4'>
                Product Images
              </h2>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Upload Images
                  </label>
                  <div className='flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                    <div className='space-y-1 text-center'>
                      <Upload className='mx-auto h-12 w-12 text-gray-400' />
                      <div className='flex text-sm text-gray-600'>
                        <label className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500'>
                          <span>Upload files</span>
                          <input
                            type='file'
                            multiple
                            accept='image/*'
                            onChange={handleImageUpload}
                            className='sr-only'
                          />
                        </label>
                        <p className='pl-1'>or drag and drop</p>
                      </div>
                      <p className='text-xs text-gray-500'>
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                {formData.images.length > 0 && (
                  <div className='grid grid-cols-2 gap-2'>
                    {formData.images.map((image, index) => (
                      <div key={index} className='relative group'>
                        <Image
                          width={0}
                          height={0}
                          sizes='100vw'
                          src={image.src}
                          alt={image.alt}
                          className={`w-full h-24 object-cover rounded-md border-2 ${
                            image.primary
                              ? 'border-indigo-500'
                              : 'border-gray-200'
                          }`}
                        />
                        <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-md flex items-center justify-center'>
                          <div className='opacity-0 group-hover:opacity-100 flex space-x-1'>
                            <button
                              type='button'
                              onClick={() => setPrimaryImage(index)}
                              className='p-1 bg-white rounded text-xs'
                            >
                              Primary
                            </button>
                            <button
                              type='button'
                              onClick={() => removeImage(index)}
                              className='p-1 bg-red-500 text-white rounded text-xs'
                            >
                              <X className='h-3 w-3' />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Variants Management Note */}
            <div className='rounded-lg bg-blue-50 p-6 shadow'>
              <h2 className='text-lg font-medium text-blue-900 mb-2'>
                Product Variants
              </h2>
              <p className='text-sm text-blue-700 mb-4'>
                Manage product variants (color/size combinations) separately
                through the variants management page.
              </p>
              <Link
                href={`/admin/variants?productId=${productId}`}
                className='inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500'
              >
                Manage Variants →
              </Link>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end space-x-3'>
          <Link
            href='/admin/products'
            className='rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Cancel
          </Link>
          <button
            type='submit'
            disabled={isSubmitting}
            className='inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <Save className='mr-2 h-4 w-4' />
            {isSubmitting ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
