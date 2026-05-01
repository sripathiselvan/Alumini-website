import { isAuthenticated, logout } from './auth.js';
import {
    getMyProfile, updateMyProfile, getDirectory,
    getPosts, createPost,
    getJobs, createJob,
    getEvents, createEvent,
    getAllMyConnections, sendConnectionRequest, acceptConnection, rejectConnection, getMyConnections, getPendingRequests,
    getAdminStats, getAdminUsers, getAdminPosts, adminDeletePost, adminDeleteJob, adminDeleteEvent
} from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is authenticated
    if (!isAuthenticated() && !localStorage.getItem('alumniUser')) {
        window.location.href = 'login.html';
        return;
    }

    // Load User Data
    const userData = JSON.parse(localStorage.getItem('alumniUser') || '{}');
    
    if (userData && userData.username) {
        document.getElementById('navName').textContent = userData.username;
        document.getElementById('welcomeName').textContent = userData.username;
        document.getElementById('navAvatar').textContent = userData.username.charAt(0).toUpperCase();
        
        let displayRole = 'User';
        if (userData.role === 'ROLE_STUDENT') displayRole = 'Student';
        else if (userData.role === 'ROLE_ALUMNI') displayRole = 'Alumni';
        else if (userData.role === 'ROLE_ADMIN') displayRole = 'Administrator';
        
        document.getElementById('navRole').textContent = displayRole;

        // Show Admin nav for admins
        if (userData.role === 'ROLE_ADMIN') {
            const adminNav = document.getElementById('adminNavItem');
            if (adminNav) adminNav.style.display = 'flex';
        }
    }

    // Load real dashboard stats (uses public endpoints, works for all roles)
    (async () => {
        try {
            const [jobs, events, myConns] = await Promise.all([
                getJobs().catch(() => []),
                getEvents().catch(() => []),
                getMyConnections().catch(() => [])
            ]);
            const el = (id) => document.getElementById(id);
            // Total users: try admin stats first, else hide
            try {
                if (userData.role === 'ROLE_ADMIN') {
                    const stats = await getAdminStats();
                    if (el('dashStatUsers')) el('dashStatUsers').textContent = stats.totalUsers;
                } else {
                    if (el('dashStatUsers')) el('dashStatUsers').textContent = '—';
                }
            } catch(e) {
                if (el('dashStatUsers')) el('dashStatUsers').textContent = '—';
            }
            if (el('dashStatJobs')) el('dashStatJobs').textContent = jobs.length;
            if (el('dashStatEvents')) el('dashStatEvents').textContent = events.length;
            if (el('dashStatConnections')) el('dashStatConnections').textContent = myConns.length;
        } catch (e) { /* stats are non-critical */ }
    })();

    // Attach global functions for HTML inline handlers
    window.doLogout = () => {
        logout();
    };

    window.navigate = (pageId) => {
        // Update Nav Menu
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        const activeNav = document.querySelector(`.nav-item[data-target="${pageId}"]`);
        if (activeNav) activeNav.classList.add('active');

        // Update Page Content
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none';
            page.style.opacity = 0;
        });
        
        const activePage = document.getElementById(`page-${pageId}`);
        if (activePage) {
            activePage.classList.add('active');
            activePage.style.display = 'block';
            setTimeout(() => {
                activePage.style.opacity = 1;
            }, 50);
        }

        // Update Title
        const titles = {
            'dashboard': 'Dashboard',
            'directory': 'Alumni Directory',
            'feed': 'News Feed',
            'jobs': 'Job Board',
            'events': 'Events Calendar',
            'connections': 'My Connections',
            'admin': 'Admin Panel'
        };
        document.getElementById('pageTitle').textContent = titles[pageId] || 'Dashboard';
        
        if (pageId === 'feed') {
            window.loadFeed();
        } else if (pageId === 'jobs') {
            window.loadJobs();
        } else if (pageId === 'events') {
            window.loadEvents();
        } else if (pageId === 'connections') {
            window.loadConnections();
        } else if (pageId === 'admin') {
            window.loadAdminPanel();
        }
    };

    // Profile & Directory Logic

    window.openProfileModal = async () => {
        document.getElementById('profileModal').style.display = 'flex';
        try {
            const profile = await getMyProfile();
            document.getElementById('profName').value = profile.fullName || '';
            document.getElementById('profDept').value = profile.department || '';
            document.getElementById('profBatch').value = profile.batchYear || '';
            document.getElementById('profLoc').value = profile.location || '';
            document.getElementById('profComp').value = profile.company || '';
            document.getElementById('profDesig').value = profile.designation || '';
            document.getElementById('profSkills').value = profile.skills || '';
            document.getElementById('profBio').value = profile.bio || '';
        } catch (e) {
            console.error("Failed to load profile", e);
        }
    };

    window.closeProfileModal = () => {
        document.getElementById('profileModal').style.display = 'none';
    };

    window.saveProfile = async () => {
        const payload = {
            fullName: document.getElementById('profName').value,
            department: document.getElementById('profDept').value,
            batchYear: document.getElementById('profBatch').value,
            location: document.getElementById('profLoc').value,
            company: document.getElementById('profComp').value,
            designation: document.getElementById('profDesig').value,
            skills: document.getElementById('profSkills').value,
            bio: document.getElementById('profBio').value
        };
        try {
            await updateMyProfile(payload);
            window.closeProfileModal();
            alert('Profile saved successfully!');
            // Re-load directory if we are on the directory page
            if (document.getElementById('page-directory').classList.contains('active')) {
                window.loadDirectory();
            }
        } catch (e) {
            alert('Failed to save profile');
        }
    };

    window.loadDirectory = async () => {
        const query = document.getElementById('dirSearch')?.value || '';
        const grid = document.getElementById('directoryGrid');
        grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted);">Loading...</div>';
        
        try {
            const [profiles, allConns] = await Promise.all([
                getDirectory(query),
                getAllMyConnections().catch(() => [])
            ]);

            // Build connection status map: userId -> { connectionId, status, isSender }
            const currentUserId = JSON.parse(localStorage.getItem('alumniUser') || '{}').id;
            const connMap = {};
            allConns.forEach(c => {
                const otherId = c.senderId === currentUserId ? c.receiverId : c.senderId;
                connMap[otherId] = { connectionId: c.id, status: c.status, isSender: c.senderId === currentUserId };
            });

            if (profiles.length === 0) {
                grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted);">No alumni found.</div>';
                return;
            }
            
            grid.innerHTML = profiles.map(p => {
                const isSelf = p.userId === currentUserId || p.username === (JSON.parse(localStorage.getItem('alumniUser') || '{}').username);
                let connBtn = '';
                if (!isSelf) {
                    const conn = connMap[p.userId];
                    if (!conn) {
                        connBtn = `<button onclick="window.sendConn(${p.userId}, this)" style="margin-top:0.75rem; width:100%; padding:0.5rem; background:var(--primary); color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:600;">+ Connect</button>`;
                    } else if (conn.status === 'PENDING' && conn.isSender) {
                        connBtn = `<div style="margin-top:0.75rem; text-align:center; padding:0.4rem; border-radius:8px; background:rgba(251,191,36,0.15); color:#fbbf24; font-size:0.85rem; font-weight:600;">⏳ Pending</div>`;
                    } else if (conn.status === 'PENDING' && !conn.isSender) {
                        connBtn = `<div style="margin-top:0.75rem; display:flex; gap:0.5rem;">
                            <button onclick="window.acceptConn(${conn.connectionId}, this)" style="flex:1; padding:0.4rem; background:#10b981; color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:600;">✓ Accept</button>
                            <button onclick="window.rejectConn(${conn.connectionId}, this)" style="flex:1; padding:0.4rem; background:#ef444422; color:#ef4444; border:1px solid #ef444444; border-radius:8px; cursor:pointer; font-weight:600;">✕</button>
                        </div>`;
                    } else if (conn.status === 'ACCEPTED') {
                        connBtn = `<div style="margin-top:0.75rem; text-align:center; padding:0.4rem; border-radius:8px; background:rgba(16,185,129,0.15); color:#10b981; font-size:0.85rem; font-weight:600;">✓ Connected</div>`;
                    }
                }
                return `
                <div class="card stat-card">
                    <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1rem;">
                        <div class="user-avatar" style="width:40px; height:40px; font-size:1rem; margin:0;">
                            ${(p.fullName || p.username).charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div style="font-weight:600; font-size:1.1rem; color:#fff;">${p.fullName || p.username}</div>
                            <div style="font-size:0.8rem; color:var(--primary);">${p.role === 'ROLE_ALUMNI' ? 'Alumni' : p.role === 'ROLE_ADMIN' ? 'Admin' : 'Student'}</div>
                        </div>
                    </div>
                    <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.5rem;">
                        <strong>💼 Company:</strong> ${p.company || 'N/A'} - ${p.designation || ''}
                    </div>
                    <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.5rem;">
                        <strong>🎓 Batch:</strong> ${p.batchYear || 'N/A'} - ${p.department || ''}
                    </div>
                    <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.5rem;">
                        <strong>📍 Location:</strong> ${p.location || 'N/A'}
                    </div>
                    <div style="font-size:0.9rem; color:var(--text-muted);">
                        <strong>💡 Skills:</strong> ${p.skills || 'N/A'}
                    </div>
                    ${connBtn}
                </div>`;
            }).join('');
        } catch (e) {
            grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: #ef4444;">Failed to load directory.</div>';
        }
    };

    // Connection actions from directory cards
    window.sendConn = async (userId, btn) => {
        btn.disabled = true;
        btn.textContent = 'Sending...';
        try {
            await sendConnectionRequest(userId);
            btn.parentElement.innerHTML = '<div style="margin-top:0.75rem; text-align:center; padding:0.4rem; border-radius:8px; background:rgba(251,191,36,0.15); color:#fbbf24; font-size:0.85rem; font-weight:600;">⏳ Pending</div>';
        } catch (e) {
            btn.disabled = false;
            btn.textContent = '+ Connect';
            alert('Could not send request.');
        }
    };

    window.acceptConn = async (connectionId, btn) => {
        btn.disabled = true;
        try {
            await acceptConnection(connectionId);
            btn.closest('div').innerHTML = '<div style="text-align:center; padding:0.4rem; border-radius:8px; background:rgba(16,185,129,0.15); color:#10b981; font-size:0.85rem; font-weight:600;">✓ Connected</div>';
        } catch (e) { alert('Failed to accept.'); }
    };

    window.rejectConn = async (connectionId, btn) => {
        btn.disabled = true;
        try {
            await rejectConnection(connectionId);
            btn.closest('.card').querySelector('[onclick*="rejectConn"]')?.parentElement?.remove();
            window.loadDirectory();
        } catch (e) { alert('Failed to reject.'); }
    };

    // Feed Logic
    window.loadFeed = async () => {
        const grid = document.getElementById('feedGrid');
        grid.innerHTML = '<div class="empty-state">Loading posts...</div>';
        try {
            const posts = await getPosts();
            if (posts.length === 0) {
                grid.innerHTML = '<div class="empty-state">No posts yet. Be the first to share!</div>';
                return;
            }
            grid.innerHTML = posts.map(p => {
                const date = new Date(p.createdAt).toLocaleString();
                return `
                <div class="card panel">
                    <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1rem;">
                        <div class="user-avatar" style="width:40px; height:40px; font-size:1rem; margin:0;">
                            ${(p.authorFullName || p.authorUsername).charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div style="font-weight:600; font-size:1.1rem; color:#fff;">${p.authorFullName || p.authorUsername}</div>
                            <div style="font-size:0.8rem; color:var(--text-muted);">${date} • ${p.authorRole === 'ROLE_ALUMNI' ? 'Alumni' : 'Student'}</div>
                        </div>
                    </div>
                    <div style="color:var(--text-muted); line-height:1.6; white-space:pre-wrap;">${p.content}</div>
                </div>
                `;
            }).join('');
        } catch (e) {
            grid.innerHTML = '<div class="empty-state" style="color:#ef4444;">Failed to load feed.</div>';
        }
    };

    window.submitPost = async () => {
        const contentBox = document.getElementById('postContent');
        const content = contentBox.value.trim();
        if (!content) return alert('Post cannot be empty!');
        
        try {
            await createPost(content);
            contentBox.value = '';
            window.loadFeed();
        } catch (e) {
            alert('Failed to submit post');
        }
    };

    // Job Board Logic
    window.openJobModal = () => {
        document.getElementById('jobModal').style.display = 'flex';
    };

    window.closeJobModal = () => {
        document.getElementById('jobModal').style.display = 'none';
    };

    window.loadJobs = async () => {
        const query = document.getElementById('jobSearch')?.value || '';
        const grid = document.getElementById('jobGrid');
        grid.innerHTML = '<div class="empty-state">Loading jobs...</div>';
        try {
            const jobs = await getJobs(query);
            if (jobs.length === 0) {
                grid.innerHTML = '<div class="empty-state">No job listings found. Be the first to post one!</div>';
                return;
            }
            const typeColors = {
                'FULL_TIME': '#10b981',
                'PART_TIME': '#3b82f6',
                'INTERNSHIP': '#f59e0b',
                'REMOTE': '#8b5cf6',
                'CONTRACT': '#ef4444'
            };
            const typeLabels = {
                'FULL_TIME': 'Full Time',
                'PART_TIME': 'Part Time',
                'INTERNSHIP': 'Internship',
                'REMOTE': 'Remote',
                'CONTRACT': 'Contract'
            };
            grid.innerHTML = jobs.map(j => {
                const date = new Date(j.postedAt).toLocaleDateString();
                const color = typeColors[j.type] || '#6366f1';
                const label = typeLabels[j.type] || j.type;
                const applyBtn = j.applyLink
                    ? `<a href="${j.applyLink}" target="_blank" rel="noopener" style="display:inline-block; margin-top:1rem; padding:0.5rem 1.25rem; background:var(--primary); color:#fff; border-radius:8px; text-decoration:none; font-weight:600; font-size:0.9rem;">Apply Now →</a>`
                    : '';
                return `
                <div class="card panel" style="display:flex; gap:1.5rem; align-items:flex-start;">
                    <div style="flex:1;">
                        <div style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap; margin-bottom:0.5rem;">
                            <div style="font-weight:700; font-size:1.15rem; color:#fff;">${j.title}</div>
                            <span style="padding:0.25rem 0.75rem; border-radius:20px; font-size:0.75rem; font-weight:600; background:${color}22; color:${color}; border:1px solid ${color}44;">${label}</span>
                        </div>
                        <div style="font-size:0.95rem; color:var(--primary); font-weight:600; margin-bottom:0.5rem;">🏢 ${j.company}${j.location ? ' · 📍 ' + j.location : ''}</div>
                        <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">Posted by ${j.postedByFullName || j.postedByUsername} · ${date}</div>
                        ${j.description ? `<div style="color:var(--text-muted); font-size:0.9rem; line-height:1.6;">${j.description}</div>` : ''}
                        ${applyBtn}
                    </div>
                </div>`;
            }).join('');
        } catch (e) {
            grid.innerHTML = '<div class="empty-state" style="color:#ef4444;">Failed to load jobs.</div>';
        }
    };

    window.submitJob = async () => {
        const title = document.getElementById('jobTitle').value.trim();
        const company = document.getElementById('jobCompany').value.trim();
        if (!title || !company) return alert('Title and Company are required!');

        const jobData = {
            title,
            company,
            location: document.getElementById('jobLocation').value.trim(),
            type: document.getElementById('jobType').value,
            description: document.getElementById('jobDescription').value.trim(),
            applyLink: document.getElementById('jobApplyLink').value.trim()
        };

        try {
            await createJob(jobData);
            window.closeJobModal();
            // Clear form
            ['jobTitle','jobCompany','jobLocation','jobDescription','jobApplyLink'].forEach(id => {
                document.getElementById(id).value = '';
            });
            window.loadJobs();
        } catch (e) {
            alert('Failed to post job. Please try again.');
        }
    };

    // Events Logic
    window.openEventModal = () => {
        document.getElementById('eventModal').style.display = 'flex';
    };

    window.closeEventModal = () => {
        document.getElementById('eventModal').style.display = 'none';
    };

    window.loadEvents = async () => {
        const grid = document.getElementById('eventGrid');
        grid.innerHTML = '<div class="empty-state">Loading events...</div>';
        try {
            const events = await getEvents();
            if (events.length === 0) {
                grid.innerHTML = '<div class="empty-state">No upcoming events. Create one to get started!</div>';
                return;
            }
            grid.innerHTML = events.map(ev => {
                const d = new Date(ev.eventDate);
                const day = d.getDate();
                const month = d.toLocaleString('default', { month: 'short' }).toUpperCase();
                const fullDate = d.toLocaleString();
                return `
                <div class="card panel" style="display:flex; gap:1.5rem; align-items:flex-start;">
                    <div style="min-width:60px; text-align:center; background:linear-gradient(135deg,#4f46e5,#c084fc); border-radius:12px; padding:0.75rem 0.5rem; flex-shrink:0;">
                        <div style="font-family:'Outfit',sans-serif; font-size:1.75rem; font-weight:700; line-height:1; color:#fff;">${day}</div>
                        <div style="font-size:0.75rem; font-weight:600; letter-spacing:2px; color:rgba(255,255,255,0.8);">${month}</div>
                    </div>
                    <div style="flex:1;">
                        <div style="font-weight:700; font-size:1.1rem; color:#fff; margin-bottom:0.4rem;">${ev.title}</div>
                        <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.5rem;">🕐 ${fullDate}${ev.location ? ' · 📍 ' + ev.location : ''}${ev.organizer ? ' · 👤 ' + ev.organizer : ''}</div>
                        ${ev.description ? `<div style="color:var(--text-muted); font-size:0.9rem; line-height:1.6;">${ev.description}</div>` : ''}
                    </div>
                </div>`;
            }).join('');
        } catch (e) {
            grid.innerHTML = '<div class="empty-state" style="color:#ef4444;">Failed to load events.</div>';
        }
    };

    window.submitEvent = async () => {
        const title = document.getElementById('eventTitle').value.trim();
        const dateVal = document.getElementById('eventDate').value;
        if (!title) return alert('Event title is required!');
        if (!dateVal) return alert('Event date is required!');

        const eventData = {
            title,
            eventDate: new Date(dateVal).toISOString().slice(0, 19),
            location: document.getElementById('eventLocation').value.trim(),
            organizer: document.getElementById('eventOrganizer').value.trim(),
            description: document.getElementById('eventDescription').value.trim()
        };

        try {
            await createEvent(eventData);
            window.closeEventModal();
            ['eventTitle','eventDate','eventLocation','eventOrganizer','eventDescription'].forEach(id => {
                document.getElementById(id).value = '';
            });
            window.loadEvents();
        } catch (e) {
            alert('Failed to create event. Please try again.');
        }
    };

    // =========================================
    // CONNECTIONS PAGE
    // =========================================
    window.loadConnections = async () => {
        const pendingGrid = document.getElementById('pendingGrid');
        const connGrid = document.getElementById('connectionsGrid');
        const countBadge = document.getElementById('pendingCount');

        try {
            const [pending, accepted] = await Promise.all([
                getPendingRequests(),
                getMyConnections()
            ]);

            // Update badge
            countBadge.textContent = pending.length;

            // Render pending requests
            if (pending.length === 0) {
                pendingGrid.innerHTML = '<div class="empty-state">No pending requests.</div>';
            } else {
                pendingGrid.innerHTML = pending.map(c => `
                <div style="display:flex; align-items:center; gap:1rem; padding:0.75rem; background:rgba(0,0,0,0.2); border-radius:12px;">
                    <div class="user-avatar" style="width:40px; height:40px; font-size:1rem; margin:0; flex-shrink:0;">${(c.senderFullName || c.senderUsername).charAt(0).toUpperCase()}</div>
                    <div style="flex:1;">
                        <div style="font-weight:600; color:#fff;">${c.senderFullName || c.senderUsername}</div>
                        <div style="font-size:0.8rem; color:var(--text-muted);">Sent ${new Date(c.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div style="display:flex; gap:0.5rem;">
                        <button onclick="window.acceptConnReq(${c.id}, this)" style="padding:0.4rem 1rem; background:#10b981; color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:600;">Accept</button>
                        <button onclick="window.rejectConnReq(${c.id}, this)" style="padding:0.4rem 0.75rem; background:rgba(239,68,68,0.1); color:#ef4444; border:1px solid rgba(239,68,68,0.3); border-radius:8px; cursor:pointer; font-weight:600;">Decline</button>
                    </div>
                </div>`).join('');
            }

            // Render accepted connections
            if (accepted.length === 0) {
                connGrid.innerHTML = '<div style="grid-column: 1 / -1;" class="empty-state">No connections yet. Visit the Alumni Directory to connect!</div>';
            } else {
                const currentUsername = JSON.parse(localStorage.getItem('alumniUser') || '{}').username;
                connGrid.innerHTML = accepted.map(c => {
                    const other = c.senderUsername === currentUsername
                        ? { name: c.receiverFullName || c.receiverUsername }
                        : { name: c.senderFullName || c.senderUsername };
                    return `
                    <div class="card stat-card" style="text-align:center;">
                        <div class="user-avatar" style="margin:0 auto 1rem;">${other.name.charAt(0).toUpperCase()}</div>
                        <div style="font-weight:600; color:#fff; margin-bottom:0.25rem;">${other.name}</div>
                        <div style="font-size:0.8rem; color:#10b981; font-weight:600;">✓ Connected</div>
                    </div>`;
                }).join('');
            }
        } catch (e) {
            pendingGrid.innerHTML = '<div class="empty-state" style="color:#ef4444;">Failed to load connections.</div>';
        }
    };

    window.acceptConnReq = async (connectionId, btn) => {
        btn.disabled = true;
        try {
            await acceptConnection(connectionId);
            window.loadConnections();
        } catch (e) { alert('Failed to accept.'); btn.disabled = false; }
    };

    window.rejectConnReq = async (connectionId, btn) => {
        btn.disabled = true;
        try {
            await rejectConnection(connectionId);
            window.loadConnections();
        } catch (e) { alert('Failed to decline.'); btn.disabled = false; }
    };

    // =========================================
    // ADMIN PANEL
    // =========================================
    window.loadAdminPanel = async () => {
        try {
            const stats = await getAdminStats();
            document.getElementById('adminStatUsers').textContent = stats.totalUsers;
            document.getElementById('adminStatPosts').textContent = stats.totalPosts;
            document.getElementById('adminStatJobs').textContent = stats.totalJobs;
            document.getElementById('adminStatEvents').textContent = stats.totalEvents;
        } catch (e) { /* non-critical */ }

        window.adminShowTab('users');
    };

    window.adminShowTab = async (tab) => {
        document.getElementById('adminUsersTab').style.display = tab === 'users' ? 'block' : 'none';
        document.getElementById('adminPostsTab').style.display = tab === 'posts' ? 'block' : 'none';

        if (tab === 'users') {
            const grid = document.getElementById('adminUsersGrid');
            grid.innerHTML = '<div class="empty-state">Loading...</div>';
            try {
                const users = await getAdminUsers();
                if (!users.length) { grid.innerHTML = '<div class="empty-state">No users found.</div>'; return; }
                const roleColors = { 'ROLE_ADMIN': '#f59e0b', 'ROLE_ALUMNI': '#4f46e5', 'ROLE_STUDENT': '#10b981' };
                const roleLabels = { 'ROLE_ADMIN': 'Admin', 'ROLE_ALUMNI': 'Alumni', 'ROLE_STUDENT': 'Student' };
                grid.innerHTML = users.map(u => {
                    const color = roleColors[u.role] || '#6366f1';
                    return `
                    <div style="display:flex; align-items:center; gap:1rem; padding:1rem; background:rgba(0,0,0,0.2); border-radius:12px;">
                        <div class="user-avatar" style="width:40px; height:40px; font-size:1rem; margin:0; flex-shrink:0;">${(u.fullName || u.username).charAt(0).toUpperCase()}</div>
                        <div style="flex:1;">
                            <div style="font-weight:600; color:#fff;">${u.fullName || u.username} <span style="font-weight:400; color:var(--text-muted); font-size:0.85rem;">@${u.username}</span></div>
                            <div style="font-size:0.8rem; color:var(--text-muted);">${u.email}</div>
                        </div>
                        <span style="padding:0.25rem 0.75rem; border-radius:20px; font-size:0.75rem; font-weight:600; background:${color}22; color:${color}; border:1px solid ${color}44;">${roleLabels[u.role] || u.role}</span>
                    </div>`;
                }).join('');
            } catch (e) { grid.innerHTML = '<div class="empty-state" style="color:#ef4444;">Failed to load users.</div>'; }
        } else if (tab === 'posts') {
            const grid = document.getElementById('adminPostsGrid');
            grid.innerHTML = '<div class="empty-state">Loading...</div>';
            try {
                const posts = await getAdminPosts();
                if (!posts.length) { grid.innerHTML = '<div class="empty-state">No posts to moderate.</div>'; return; }
                grid.innerHTML = posts.map(p => `
                    <div style="display:flex; align-items:flex-start; gap:1rem; padding:1rem; background:rgba(0,0,0,0.2); border-radius:12px;">
                        <div style="flex:1;">
                            <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.3rem;">By <strong style="color:#fff;">${p.authorName}</strong> · ${new Date(p.createdAt).toLocaleString()}</div>
                            <div style="color:var(--text-main); font-size:0.95rem; line-height:1.5; white-space:pre-wrap;">${p.content}</div>
                        </div>
                        <button onclick="window.adminDelPost(${p.id}, this)" style="padding:0.4rem 0.75rem; background:rgba(239,68,68,0.1); color:#ef4444; border:1px solid rgba(239,68,68,0.3); border-radius:8px; cursor:pointer; font-weight:600; flex-shrink:0;">🗑 Delete</button>
                    </div>`).join('');
            } catch (e) { grid.innerHTML = '<div class="empty-state" style="color:#ef4444;">Failed to load posts.</div>'; }
        }
    };

    window.adminDelPost = async (id, btn) => {
        if (!confirm('Delete this post permanently?')) return;
        btn.disabled = true;
        try {
            await adminDeletePost(id);
            btn.closest('div[style]').remove();
        } catch (e) { alert('Failed to delete.'); btn.disabled = false; }
    };

    window.navigate('dashboard');
});
