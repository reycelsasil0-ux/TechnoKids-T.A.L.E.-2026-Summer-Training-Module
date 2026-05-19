document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. DASHBOARD TAB SWITCHER ---
    const researchTabs = document.querySelectorAll('.mentor-tab-btn');
    const displayPanes = document.querySelectorAll('.mentor-content-pane');

    if (researchTabs.length > 0) {
        researchTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Ignore if already active
                if (this.classList.contains('active')) return;

                // Strip 'active' from all tabs and panes
                researchTabs.forEach(t => t.classList.remove('active'));
                displayPanes.forEach(p => p.classList.remove('active'));

                // Add 'active' to the clicked tab
                this.classList.add('active');

                // Find and show the matching pane
                const targetedID = this.getAttribute('data-target');
                const targetPane = document.getElementById(targetedID);
                
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }

    // --- 2. SMOOTH SCROLL TO TOP FOR LOGO ---
    const homeLink = document.getElementById('homeLink');

    if (homeLink) {
        // Ensure the cursor looks like a clickable link
        homeLink.style.cursor = 'pointer'; 
        
        homeLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            // Glide smoothly back to the top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});