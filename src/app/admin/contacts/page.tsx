'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, User, Calendar } from 'lucide-react';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/admin/contacts');
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách liên hệ:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Đang tải...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tin nhắn liên hệ</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {contacts.map((contact) => (
            <div key={contact.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2 text-gray-900 font-semibold text-lg">
                    <User className="w-5 h-5 text-gray-400" />
                    {contact.name}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a href={`mailto:${contact.email}`} className="hover:text-blue-600">
                        {contact.email}
                      </a>
                    </div>
                    {contact.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
                          {contact.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(contact.created_at).toLocaleString('vi-VN')}
                    </div>
                  </div>

                  <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-100">
                    <p className="text-gray-800 whitespace-pre-wrap">{contact.message}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {contacts.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              Chưa có tin nhắn liên hệ nào.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
