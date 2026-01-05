'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();

  if (!user) return null;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Bancario</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {isAdmin() ? (
                <>
                  <Link
                    href="/admin"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Préstamos
                  </Link>
                  <Link
                    href="/admin/users"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Usuarios
                  </Link>
                </>
              ) : (
                <Link
                  href="/dashboard"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Mis Préstamos
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 mr-4">
              {user.fullName} <span className="text-xs text-gray-500">({user.role})</span>
            </span>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
