import { API_BASE_URL } from './api.js';

/**
 * Login user and store token
 */
export async function login(username, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Save token and user info
            localStorage.setItem('jwt_token', data.accessToken);
            localStorage.setItem('alumniUser', JSON.stringify({
                id: data.id,
                username: data.username,
                email: data.email,
                role: data.role
            }));
            return data;
        } else {
            throw new Error(data.message || 'Login failed');
        }
    } catch (error) {
        console.error("Login error: ", error);
        throw error;
    }
}

/**
 * Register a new user
 */
export async function register(username, email, password, role = 'ROLE_ALUMNI') {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, role })
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error("Registration error: ", error);
        throw error;
    }
}

/**
 * Logout user
 */
export function logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('alumniUser');
    window.location.href = 'login.html';
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
    return !!localStorage.getItem('jwt_token');
}
