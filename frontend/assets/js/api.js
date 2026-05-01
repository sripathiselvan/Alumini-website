const API_BASE_URL = 'https://alumini-website.onrender.com/api';

/**
 * Generic fetch wrapper to include JWT token in requests
 */
async function fetchApi(endpoint, options = {}) {
    const token = localStorage.getItem('jwt_token');
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        
        // Handle 401 Unauthorized (token expired or invalid)
        if (response.status === 401) {
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('alumniUser');
            window.location.href = 'login.html';
            throw new Error('Unauthorized');
        }

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Fetch Error:', error);
        throw error;
    }
}

async function getMyProfile() {
    return await fetchApi('/profiles/me', { method: 'GET' });
}

async function updateMyProfile(profileData) {
    return await fetchApi('/profiles/me', {
        method: 'PUT',
        body: JSON.stringify(profileData)
    });
}

async function getDirectory(query = '') {
    const qs = query ? `?query=${encodeURIComponent(query)}` : '';
    return await fetchApi(`/profiles${qs}`, { method: 'GET' });
}

async function getPosts() {
    return await fetchApi('/posts', { method: 'GET' });
}

async function createPost(content) {
    return await fetchApi('/posts', {
        method: 'POST',
        body: JSON.stringify({ content })
    });
}

async function getJobs(query = '') {
    const qs = query ? `?query=${encodeURIComponent(query)}` : '';
    return await fetchApi(`/jobs${qs}`, { method: 'GET' });
}

async function createJob(jobData) {
    return await fetchApi('/jobs', {
        method: 'POST',
        body: JSON.stringify(jobData)
    });
}

async function getEvents() {
    return await fetchApi('/events', { method: 'GET' });
}

async function createEvent(eventData) {
    return await fetchApi('/events', {
        method: 'POST',
        body: JSON.stringify(eventData)
    });
}

async function getAllMyConnections() {
    return await fetchApi('/connections/all', { method: 'GET' });
}

async function sendConnectionRequest(userId) {
    return await fetchApi(`/connections/send/${userId}`, { method: 'POST' });
}

async function acceptConnection(connectionId) {
    return await fetchApi(`/connections/accept/${connectionId}`, { method: 'PUT' });
}

async function rejectConnection(connectionId) {
    return await fetchApi(`/connections/reject/${connectionId}`, { method: 'PUT' });
}

async function getMyConnections() {
    return await fetchApi('/connections/my', { method: 'GET' });
}

async function getPendingRequests() {
    return await fetchApi('/connections/pending', { method: 'GET' });
}

async function getAdminStats() {
    return await fetchApi('/admin/stats', { method: 'GET' });
}

async function getAdminUsers() {
    return await fetchApi('/admin/users', { method: 'GET' });
}

async function getAdminPosts() {
    return await fetchApi('/admin/posts', { method: 'GET' });
}

async function adminDeletePost(id) {
    return await fetchApi(`/admin/posts/${id}`, { method: 'DELETE' });
}

async function adminDeleteJob(id) {
    return await fetchApi(`/admin/jobs/${id}`, { method: 'DELETE' });
}

async function adminDeleteEvent(id) {
    return await fetchApi(`/admin/events/${id}`, { method: 'DELETE' });
}

export {
    API_BASE_URL, fetchApi,
    getMyProfile, updateMyProfile, getDirectory,
    getPosts, createPost,
    getJobs, createJob,
    getEvents, createEvent,
    getAllMyConnections, sendConnectionRequest, acceptConnection, rejectConnection, getMyConnections, getPendingRequests,
    getAdminStats, getAdminUsers, getAdminPosts, adminDeletePost, adminDeleteJob, adminDeleteEvent
};
