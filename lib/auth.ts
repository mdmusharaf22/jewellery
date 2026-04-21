// Auth utility functions

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const token = sessionStorage.getItem('admin_access_token');
  return !!token;
};

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('admin_access_token');
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('admin_refresh_token');
};

export const getAdminUser = () => {
  if (typeof window === 'undefined') return null;
  const user = sessionStorage.getItem('admin_user');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('admin_access_token');
  sessionStorage.removeItem('admin_refresh_token');
  sessionStorage.removeItem('admin_user');
};

export const setAuthTokens = (accessToken: string, refreshToken: string, user: any) => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('admin_access_token', accessToken);
  sessionStorage.setItem('admin_refresh_token', refreshToken);
  sessionStorage.setItem('admin_user', JSON.stringify(user));
};
