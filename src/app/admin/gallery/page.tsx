'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Trash2, Upload, X } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';

interface GalleryItem {
  id: number;
  image_url: string;
  caption: string | null;
  created_at: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/admin/gallery');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy thư viện ảnh:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa ảnh này?')) return;

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setItems(items.filter((item) => item.id !== id));
      } else {
        alert('Có lỗi xảy ra khi xóa');
      }
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
      alert('Có lỗi xảy ra khi xóa');
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      alert('Vui lòng tải ảnh lên trước');
      return;
    }

    setIsUploading(true);

    try {
      const dbRes = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: imageUrl,
          caption: caption || null,
        }),
      });

      if (dbRes.ok) {
        const newItem = await dbRes.json();
        setItems([newItem, ...items]);
        closeModal();
      } else {
        throw new Error('DB save failed');
      }
    } catch (error) {
      console.error('Lỗi upload:', error);
      alert('Có lỗi xảy ra khi lưu ảnh');
    } finally {
      setIsUploading(false);
    }
  };

  const closeModal = () => {
    setShowUploadModal(false);
    setImageUrl('');
    setCaption('');
  };

  if (isLoading) return <div>Đang tải...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Thư viện ảnh</h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Upload className="w-5 h-5" />
          Tải ảnh mới
        </button>
      </div>

      {/* Grid ảnh */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 group">
            <div className="relative h-48 w-full">
              <Image
                src={item.image_url}
                alt={item.caption || 'Gallery image'}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  title="Xóa ảnh"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            {item.caption && (
              <div className="p-3 border-t border-gray-100">
                <p className="text-sm text-gray-600 truncate">{item.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
          Chưa có hình ảnh nào trong thư viện.
        </div>
      )}

      {/* Modal Upload */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Tải ảnh mới</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chọn ảnh <span className="text-red-500">*</span>
                </label>
                <ImageUpload 
                  value={imageUrl}
                  onChange={setImageUrl}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chú thích (không bắt buộc)
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập chú thích ảnh..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={!imageUrl || isUploading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {isUploading ? 'Đang lưu...' : 'Lưu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
