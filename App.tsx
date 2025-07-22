
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { UserRole } from './types';

const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const Lessons = lazy(() => import('./pages/Lessons').then(module => ({ default: module.Lessons })));
const Community = lazy(() => import('./pages/Community').then(module => ({ default: module.Community })));
const Practice = lazy(() => import('./pages/Practice').then(module => ({ default: module.Practice })));
const Booking = lazy(() => import('./pages/Booking').then(module => ({ default: module.Booking })));
const ManagementPage = lazy(() => import('./pages/Management').then(module => ({ default: module.ManagementPage })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));


const LoadingFallback = () => (
    <div className="flex h-screen w-full items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

const ProtectedRoute: React.FC<{ allowedRoles?: UserRole[] }> = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />; // Or a dedicated "unauthorized" page
    }

    return (
        <Layout>
            <Suspense fallback={<LoadingFallback />}>
                <Outlet />
            </Suspense>
        </Layout>
    );
};

function App() {
  return (
    <AuthProvider>
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="lessons" element={<Lessons />} />
                    <Route path="community" element={<Community />} />
                    <Route path="booking" element={<Booking />} />
                    <Route path="practice" element={<Practice />} />
                    <Route path="students" element={<ManagementPage role={UserRole.STUDENT} />} />
                    <Route path="instructors" element={<ManagementPage role={UserRole.INSTRUCTOR} />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </HashRouter>
    </AuthProvider>
  );
}

export default App;
