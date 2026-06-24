'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/ui/ImageUpload';

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/admin/news/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            title: data.title,
            content: data.content,
            image_url: data.image_url || '',
          });
        } else {
          alert('Không tìm thấy bài viết');
          router.push('/admin/news');
        }
      } catch (error) {
        console.error('Lỗi khi tải bài viết:', error);
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchNews();
    }
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/news');
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <div>Đang tải...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/news"
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Sửa bài viết</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tiêu đề bài viết <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập tiêu đề..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hình ảnh đại diện
          </label>
          <ImageUpload 
            value={formData.image_url}
            onChange={(url) => setFormData({ ...formData, image_url: url })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nội dung bài viết <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={15}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="Nhập nội dung bài viết (hỗ trợ HTML cơ bản)..."
          />
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <Link
            href="/admin/news"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Hủy
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  );
}
