'use client';

import { useEffect, useState } from 'react';
import { KeyRound, Save, UserRound } from 'lucide-react';

interface AccountProfile {
  id: number;
  username: string;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  role: string;
}

export default function AdminAccountPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    role: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/account');
        if (!res.ok) {
          throw new Error('Không tải được thông tin tài khoản');
        }
        const data: AccountProfile = await res.json();
        setProfile({
          username: data.username || '',
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone || '',
          role: data.role || '',
        });
      } catch (error) {
        console.error(error);
        setProfileError('Không tải được thông tin tài khoản');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMessage(null);
    setProfileError(null);
    setIsSavingProfile(true);

    try {
      const res = await fetch('/api/admin/account', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: profile.username,
          fullName: profile.fullName,
          email: profile.email,
          phone: profile.phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Cập nhật thất bại');
      }
      setProfile({
        username: data.username || '',
        fullName: data.fullName || '',
        email: data.email || '',
        phone: data.phone || '',
        role: data.role || profile.role,
      });
      setProfileMessage('Đã lưu thông tin tài khoản');
    } catch (error) {
      setProfileError(error instanceof Error ? error.message : 'Cập nhật thất bại');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);
    setPasswordError(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Mật khẩu xác nhận không khớp');
      return;
    }

    setIsSavingPassword(true);
    try {
      const res = await fetch('/api/admin/account/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Đổi mật khẩu thất bại');
      }
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setPasswordMessage(data.message || 'Đổi mật khẩu thành công');
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : 'Đổi mật khẩu thất bại');
    } finally {
      setIsSavingPassword(false);
    }
  };

  if (isLoading) return <div>Đang tải...</div>;

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Tài khoản</h1>
        <p className="text-gray-600">
          Cập nhật thông tin cá nhân và đổi mật khẩu đăng nhập admin.
        </p>
      </div>

      <form
        onSubmit={handleProfileSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-5"
      >
        <div className="flex items-center gap-2 mb-2">
          <UserRound className="w-5 h-5 text-primary-dark" />
          <h2 className="text-lg font-semibold text-gray-800">Thông tin tài khoản</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên đăng nhập <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={profile.username}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vai trò
            </label>
            <input
              type="text"
              value={profile.role}
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên
            </label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="0901234567"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="admin@example.com"
            />
          </div>
        </div>

        {profileError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {profileError}
          </p>
        )}
        {profileMessage && (
          <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-md px-3 py-2">
            {profileMessage}
          </p>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSavingProfile}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSavingProfile ? 'Đang lưu...' : 'Lưu thông tin'}
          </button>
        </div>
      </form>

      <form
        onSubmit={handlePasswordSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-5"
      >
        <div className="flex items-center gap-2 mb-2">
          <KeyRound className="w-5 h-5 text-primary-dark" />
          <h2 className="text-lg font-semibold text-gray-800">Đổi mật khẩu</h2>
        </div>

        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu hiện tại <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu mới <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, newPassword: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ít nhất 8 ký tự"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Xác nhận mật khẩu mới <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {passwordError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {passwordError}
          </p>
        )}
        {passwordMessage && (
          <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-md px-3 py-2">
            {passwordMessage}
          </p>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSavingPassword}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            {isSavingPassword ? 'Đang đổi...' : 'Đổi mật khẩu'}
          </button>
        </div>
      </form>
    </div>
  );
}
