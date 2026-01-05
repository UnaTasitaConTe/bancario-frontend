import { api } from './axios';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  Loan,
  CreateLoanRequest,
  RejectLoanRequest,
  User,
} from '@/types';

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/register', data);
    return response.data;
  },
};

export const loansApi = {
  createLoan: async (data: CreateLoanRequest): Promise<Loan> => {
    const response = await api.post<Loan>('/loans', data);
    return response.data;
  },

  getMyLoans: async (): Promise<Loan[]> => {
    const response = await api.get<Loan[]>('/loans/me');
    return response.data;
  },

  getAllLoans: async (): Promise<Loan[]> => {
    const response = await api.get<Loan[]>('/loans');
    return response.data;
  },

  approveLoan: async (id: string): Promise<Loan> => {
    const response = await api.patch<Loan>(`/loans/${id}/approve`);
    return response.data;
  },

  rejectLoan: async (id: string, data: RejectLoanRequest): Promise<Loan> => {
    const response = await api.patch<Loan>(`/loans/${id}/reject`, data);
    return response.data;
  },
};

export const usersApi = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },
};
