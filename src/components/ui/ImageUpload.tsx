'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export default function ImageUpload({ value, onChange, className = '' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleGlobalPaste = async (e: ClipboardEvent) => {
      // Only process paste if we are actively focused inside the container
      // or if the user isn't typing in some other input (like caption/title)
      if (document.activeElement && document.activeElement.tagName === 'INPUT' && document.activeElement !== urlInputRef.current) {
         return;
      }
      if (document.activeElement && document.activeElement.tagName === 'TEXTAREA') {
         return;
      }

      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            e.preventDefault();
            await uploadFile(file);
            break;
          }
        }
      }
    };

    document.addEventListener('paste', handleGlobalPaste);
    return () => document.removeEventListener('paste', handleGlobalPaste);
  }, []);

  const urlInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        const result = await res.json();
        if (result.url) {
          onChange(result.url);
        }
      } else {
        alert('Lỗi khi tải ảnh lên.');
      }
    } catch (error) {
      console.error('Lỗi upload:', error);
      alert('Có lỗi xảy ra khi tải ảnh.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file);
    }
    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUrlFetch = async () => {
    if (!urlInput.trim()) return;
    
    setIsUploading(true);
    try {
      const res = await fetch('/api/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput }),
      });

      if (res.ok) {
        const result = await res.json();
        if (result.url) {
          onChange(result.url);
          setUrlInput('');
          setShowUrlInput(false);
        }
      } else {
        const err = await res.json();
        alert(err.message || 'Lỗi khi tải ảnh từ URL.');
      }
    } catch (error) {
      console.error('Lỗi fetch URL:', error);
      alert('Có lỗi xảy ra khi tải ảnh từ link.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <div className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gray-50 relative overflow-hidden transition-colors hover:bg-gray-100">
        
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
            <span className="text-sm text-gray-600 font-medium">Đang tải ảnh...</span>
          </div>
        )}

        <div className="space-y-4 text-center w-full">
          {value ? (
            <div className="relative h-48 w-full mb-4 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Preview"
                className="mx-auto h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button
                   type="button"
                   onClick={() => fileInputRef.current?.click()}
                   className="px-3 py-1.5 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                >
                  Đổi ảnh
                </button>
                <button
                   type="button"
                   onClick={() => onChange('')}
                   className="px-3 py-1.5 bg-red-600 text-sm font-medium text-white rounded-md hover:bg-red-700"
                >
                  Xóa ảnh
                </button>
              </div>
            </div>
          ) : (
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          )}

          {!value && (
            <div className="flex flex-col items-center gap-3">
              <div className="flex text-sm text-gray-600 justify-center items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="relative cursor-pointer bg-white px-3 py-1.5 border border-gray-300 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 shadow-sm"
                >
                  <span className="flex items-center gap-1">
                    <Upload className="w-4 h-4" /> Tải ảnh lên
                  </span>
                </button>
                <span className="text-gray-400">hoặc</span>
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="relative cursor-pointer bg-white px-3 py-1.5 border border-gray-300 rounded-md font-medium text-blue-600 hover:text-blue-500 shadow-sm"
                >
                  <span className="flex items-center gap-1">
                    <LinkIcon className="w-4 h-4" /> Dùng link (URL)
                  </span>
                </button>
              </div>
              <p className="text-xs text-gray-500">Kéo thả, dán ảnh (Ctrl+V) hoặc chọn file</p>
            </div>
          )}

          {showUrlInput && !value && (
            <div className="flex items-center gap-2 max-w-sm mx-auto w-full mt-4">
              <input
                ref={urlInputRef}
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleUrlFetch}
                disabled={!urlInput.trim() || isUploading}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap"
              >
                Tải về
              </button>
            </div>
          )}
          
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            accept="image/*"
            className="sr-only"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
