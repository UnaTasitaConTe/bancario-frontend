export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email es requerido';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Email inválido';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Contraseña es requerida';
  if (password.length < 6) return 'Contraseña debe tener al menos 6 caracteres';
  return null;
};

export const validateFullName = (fullName: string): string | null => {
  if (!fullName) return 'Nombre completo es requerido';
  if (fullName.trim().length < 3) return 'Nombre completo debe tener al menos 3 caracteres';
  return null;
};

export const validateAmount = (amount: number | string): string | null => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (!amount || isNaN(numAmount)) return 'Monto es requerido';
  if (numAmount <= 0) return 'Monto debe ser mayor a 0';
  if (numAmount > 1000000) return 'Monto no puede exceder $1,000,000';
  return null;
};

export const validateTermMonths = (termMonths: number | string): string | null => {
  const numTerm = typeof termMonths === 'string' ? parseInt(termMonths) : termMonths;
  if (!termMonths || isNaN(numTerm)) return 'Plazo es requerido';
  if (numTerm <= 0) return 'Plazo debe ser mayor a 0';
  if (numTerm > 360) return 'Plazo no puede exceder 360 meses';
  if (!Number.isInteger(numTerm)) return 'Plazo debe ser un número entero';
  return null;
};
