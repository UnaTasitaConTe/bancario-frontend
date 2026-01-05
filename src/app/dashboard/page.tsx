'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import LoanCard from '@/components/LoanCard';
import { loansApi } from '@/lib/api';
import { validateAmount, validateTermMonths } from '@/lib/validations';
import type { Loan, ApiError } from '@/types';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [termMonths, setTermMonths] = useState('');
  const [errors, setErrors] = useState<{ amount?: string; termMonths?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      const data = await loansApi.getMyLoans();
      setLoans(data);
    } catch (error) {
      console.error('Error loading loans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const amountError = validateAmount(parseFloat(amount));
    const termError = validateTermMonths(parseInt(termMonths));

    if (amountError || termError) {
      setErrors({
        amount: amountError || undefined,
        termMonths: termError || undefined,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await loansApi.createLoan({
        amount: parseFloat(amount),
        termMonths: parseInt(termMonths),
      });
      setShowModal(false);
      setAmount('');
      setTermMonths('');
      await loadLoans();
    } catch (error: any) {
      const apiError = error.response?.data as ApiError;
      setErrors({
        general: apiError?.detail || 'Error al solicitar préstamo',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mis Préstamos</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
          >
            Solicitar Préstamo
          </button>
        </div>

        {loans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tienes préstamos solicitados</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Solicita tu primer préstamo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loans.map((loan) => (
              <LoanCard key={loan.id} loan={loan} />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Solicitar Préstamo</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm text-red-800">{errors.general}</p>
                </div>
              )}

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Monto ($)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`w-full px-3 py-2 border ${
                    errors.amount ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="10000"
                />
                {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
              </div>

              <div>
                <label htmlFor="termMonths" className="block text-sm font-medium text-gray-700 mb-1">
                  Plazo (meses)
                </label>
                <input
                  type="number"
                  id="termMonths"
                  value={termMonths}
                  onChange={(e) => setTermMonths(e.target.value)}
                  className={`w-full px-3 py-2 border ${
                    errors.termMonths ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="12"
                />
                {errors.termMonths && <p className="mt-1 text-sm text-red-600">{errors.termMonths}</p>}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setErrors({});
                    setAmount('');
                    setTermMonths('');
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium disabled:bg-blue-300"
                >
                  {isSubmitting ? 'Solicitando...' : 'Solicitar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
