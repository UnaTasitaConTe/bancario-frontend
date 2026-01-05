# Frontend - Sistema de Préstamos Bancarios

Frontend desarrollado con Next.js 16, React 19, TypeScript y Tailwind CSS.

## Características Implementadas

### Autenticación y Autorización
- Login y registro de usuarios
- JWT token storage en localStorage
- Context API para gestión de estado de autenticación
- Rutas protegidas por rol (USER/ADMIN)
- Redirección automática según rol

### Dashboard de Usuario (USER)
- Visualización de préstamos solicitados
- Solicitar nuevo préstamo con validación frontend
- Ver estado de préstamos (PENDING/APPROVED/REJECTED)
- Ver razón de rechazo si aplica

### Dashboard de Administrador (ADMIN)
- Ver todos los préstamos del sistema
- Filtrar por estado (ALL/PENDING/APPROVED/REJECTED)
- Aprobar préstamos pendientes
- Rechazar préstamos con razón opcional
- Ver listado de usuarios registrados

### Validaciones Frontend
- Email: formato válido
- Password: mínimo 6 caracteres
- FullName: mínimo 3 caracteres
- Amount: mayor a 0, máximo $1,000,000
- TermMonths: mayor a 0, máximo 360 meses, debe ser entero

### Seguridad
- Interceptor Axios para JWT en headers
- Manejo automático de 401 (logout y redirect)
- Validación de entrada en todos los formularios
- Gestión segura del estado con React Hooks

## Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout con AuthProvider
│   ├── page.tsx           # Redirect según autenticación
│   ├── login/             # Página de login
│   ├── register/          # Página de registro
│   ├── dashboard/         # Dashboard usuario
│   └── admin/             # Dashboard administrador
│       ├── page.tsx       # Gestión de préstamos
│       └── users/         # Listado de usuarios
├── components/            # Componentes reutilizables
│   ├── ProtectedRoute.tsx # HOC para rutas protegidas
│   ├── Navbar.tsx         # Barra de navegación
│   └── LoanCard.tsx       # Tarjeta de préstamo
├── contexts/              # React Context
│   └── AuthContext.tsx    # Context de autenticación
├── lib/                   # Utilidades
│   ├── axios.ts          # Configuración Axios
│   ├── api.ts            # Funciones API
│   ├── validations.ts    # Validaciones frontend
│   └── utils.ts          # Funciones auxiliares
└── types/                # TypeScript types
    └── index.ts          # Interfaces y tipos
```

## Instalación

```bash
# Instalar dependencias
npm install
# o
pnpm install
```

## Configuración

Crear archivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5242
```

## Ejecución

```bash
# Modo desarrollo
npm run dev

# Build producción
npm run build

# Ejecutar producción
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## Flujo de Usuario

### Usuario Normal (USER)
1. Registro en `/register`
2. Login en `/login`
3. Redirigido a `/dashboard`
4. Puede solicitar préstamos
5. Ver estado de sus préstamos

### Administrador (ADMIN)
1. Login en `/login`
2. Redirigido a `/admin`
3. Ver todos los préstamos
4. Aprobar/rechazar préstamos PENDING
5. Ver usuarios en `/admin/users`

## Notas Técnicas

- **State Management**: React Context API + useState/useEffect hooks
- **Routing**: Next.js App Router con rutas protegidas
- **HTTP Client**: Axios con interceptores
- **Styling**: Tailwind CSS v4
- **TypeScript**: Tipado estricto en toda la aplicación
- **Validaciones**: Frontend (UX) + Backend (seguridad)
