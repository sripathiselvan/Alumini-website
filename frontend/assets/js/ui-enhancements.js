document.addEventListener('DOMContentLoaded', () => {
    // Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    const mainContent = document.getElementById('main-content');

    if (scrollProgress && mainContent) {
        mainContent.addEventListener('scroll', () => {
            const winScroll = mainContent.scrollTop;
            const height = mainContent.scrollHeight - mainContent.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + "%";
        });
    }

    // Add subtle hover glow effect to glass panels
    const glassPanels = document.querySelectorAll('.glass-panel, .stat-card, .panel');
    glassPanels.forEach(panel => {
        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            panel.style.setProperty('--mouse-x', `${x}px`);
            panel.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
