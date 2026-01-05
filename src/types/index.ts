export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  fullName: string;
  role: string;
}

export interface Loan {
  id: string;
  userId: string;
  amount: number;
  termMonths: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedAt: string;
  decisionAt: string | null;
  decisionBy: string | null;
  rejectionReason: string | null;
}

export interface CreateLoanRequest {
  amount: number;
  termMonths: number;
}

export interface RejectLoanRequest {
  reason?: string;
}

export interface ApiError {
  title: string;
  status: number;
  detail: string;
  instance: string;
}
