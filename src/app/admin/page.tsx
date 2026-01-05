'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import LoanCard from '@/components/LoanCard';
import { loansApi } from '@/lib/api';
import type { Loan, ApiError } from '@/types';

export default function AdminPage() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminContent />
    </ProtectedRoute>
  );
}

function AdminContent() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      const data = await loansApi.getAllLoans();
      setLoans(data);
    } catch (error) {
      console.error('Error loading loans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await loansApi.approveLoan(id);
      await loadLoans();
    } catch (error: any) {
      const apiError = error.response?.data as ApiError;
      alert(apiError?.detail || 'Error al aprobar préstamo');
    }
  };

  const handleRejectClick = (id: string) => {
    setSelectedLoanId(id);
    setShowRejectModal(true);
  };

  const handleRejectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLoanId) return;

    try {
      await loansApi.rejectLoan(selectedLoanId, { reason: rejectionReason });
      setShowRejectModal(false);
      setRejectionReason('');
      setSelectedLoanId(null);
      await loadLoans();
    } catch (error: any) {
      const apiError = error.response?.data as ApiError;
      alert(apiError?.detail || 'Error al rechazar préstamo');
    }
  };

  const filteredLoans = filter === 'ALL' ? loans : loans.filter((loan) => loan.status === filter);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Gestión de Préstamos</h1>

          <div className="flex gap-2">
            {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {status === 'ALL' ? 'Todos' : status}
              </button>
            ))}
          </div>
        </div>

        {filteredLoans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay préstamos para mostrar</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLoans.map((loan) => (
              <LoanCard
                key={loan.id}
                loan={loan}
                showActions
                onApprove={handleApprove}
                onReject={handleRejectClick}
              />
            ))}
          </div>
        )}
      </div>

      {showRejectModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Rechazar Préstamo</h2>

            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Razón de rechazo (opcional)
                </label>
                <textarea
                  id="reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ingresa la razón del rechazo..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectionReason('');
                    setSelectedLoanId(null);
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium"
                >
                  Rechazar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
