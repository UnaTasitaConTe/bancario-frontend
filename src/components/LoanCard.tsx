'use client';

import type { Loan } from '@/types';
import { formatCurrency, formatDate, getStatusColor, getStatusText } from '@/lib/utils';

interface LoanCardProps {
  loan: Loan;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  showActions?: boolean;
}

export default function LoanCard({ loan, onApprove, onReject, showActions = false }: LoanCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(loan.amount)}</h3>
          <p className="text-sm text-gray-500">{loan.termMonths} meses</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(loan.status)}`}>
          {getStatusText(loan.status)}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="font-medium">Solicitado:</span>
          <span>{formatDate(loan.requestedAt)}</span>
        </div>

        {loan.decisionAt && (
          <div className="flex justify-between">
            <span className="font-medium">Decisión:</span>
            <span>{formatDate(loan.decisionAt)}</span>
          </div>
        )}

        {loan.rejectionReason && (
          <div className="mt-3 p-3 bg-red-50 rounded-md">
            <p className="text-xs font-medium text-red-800 mb-1">Razón de rechazo:</p>
            <p className="text-xs text-red-600">{loan.rejectionReason}</p>
          </div>
        )}
      </div>

      {showActions && loan.status === 'PENDING' && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onApprove?.(loan.id)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
          >
            Aprobar
          </button>
          <button
            onClick={() => onReject?.(loan.id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
          >
            Rechazar
          </button>
        </div>
      )}
    </div>
  );
}
