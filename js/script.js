/* =========================================
   ECOMMERCE FRONTEND - JAVASCRIPT
   DevelopersHub Corporation Internship Task
   ========================================= */

// ========== SEARCH BAR (Styled only, non-functional as per task) ==========
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                // Redirect to product list page
                window.location.href = 'product-list.html?search=' + encodeURIComponent(query);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
}

// ========== CATEGORY SIDEBAR ACTIVE STATE ==========
function initCategories() {
    const catItems = document.querySelectorAll('.cat-item');
    catItems.forEach(item => {
        item.addEventListener('click', function() {
            catItems.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ========== NEWSLETTER FORM ==========
function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        const input = form.querySelector('input');
        const btn = form.querySelector('button');
        
        btn.addEventListener('click', function() {
            const email = input.value.trim();
            if (email && email.includes('@')) {
                alert('Thanks for subscribing! We will send you daily updates.');
                input.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// ========== FILTER TAGS (REMOVE) ==========
function initFilterTags() {
    const removeButtons = document.querySelectorAll('.filter-tag-remove');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.parentElement.style.transition = 'opacity 0.2s';
            this.parentElement.style.opacity = '0';
            setTimeout(() => this.parentElement.remove(), 200);
        });
    });

    const clearAll = document.querySelector('.clear-all');
    if (clearAll) {
        clearAll.addEventListener('click', function() {
            document.querySelectorAll('.filter-tag').forEach(tag => {
                tag.style.opacity = '0';
                setTimeout(() => tag.remove(), 200);
            });
        });
    }
}

// ========== VIEW TOGGLE (GRID/LIST) ==========
function initViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ========== PAGINATION ==========
function initPagination() {
    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (text === '‹' || text === '›' || text === '<' || text === '>') return;
            pageBtns.forEach(b => {
                const t = b.textContent.trim();
                if (t !== '‹' && t !== '›' && t !== '<' && t !== '>') {
                    b.classList.remove('active');
                }
            });
            this.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// ========== PRODUCT DETAIL TABS ==========
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            const content = document.getElementById('tab-' + tabName);
            if (content) content.classList.add('active');
        });
    });
}

// ========== IMAGE GALLERY THUMBNAILS ==========
function initImageGallery() {
    const thumbs = document.querySelectorAll('.thumb');
    const mainImage = document.querySelector('.main-image img');
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            thumbs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const thumbImg = this.querySelector('img');
            if (thumbImg && mainImage) {
                mainImage.src = thumbImg.src;
                mainImage.style.animation = 'fadeIn 0.3s ease';
                setTimeout(() => mainImage.style.animation = '', 300);
            }
        });
    });
}

// ========== SIZE DROPDOWN (PRODUCT DETAIL) ==========
function initSizeDropdown() {
    const sizeSelect = document.getElementById('sizeSelect');
    const colorSelect = document.getElementById('colorSelect');
    const materialSelect = document.getElementById('materialSelect');
    
    [sizeSelect, colorSelect, materialSelect].forEach(select => {
        if (select) {
            select.addEventListener('change', function() {
                console.log(this.name + ':', this.value);
            });
        }
    });
}

// ========== ADD TO CART ==========
function initAddToCart() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn, .send-inquiry-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const originalText = this.textContent;
            this.textContent = '✓ Added!';
            this.style.background = '#00B517';
            
            // Update cart badge
            const badge = document.querySelector('.cart-badge');
            if (badge) {
                let count = parseInt(badge.textContent) || 0;
                badge.textContent = count + 1;
                badge.style.animation = 'bounce 0.4s ease';
                setTimeout(() => badge.style.animation = '', 400);
            }
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 1500);
        });
    });
}

// ========== WISHLIST HEART BUTTON ==========
function initWishlist() {
    const heartBtns = document.querySelectorAll('.heart-btn');
    heartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.style.color = '#FA3434';
                this.style.background = '#FFE3E3';
                this.innerHTML = '♥';
            } else {
                this.style.color = '';
                this.style.background = '';
                this.innerHTML = '♡';
            }
        });
    });
}

// ========== COUNTDOWN TIMER FOR DEALS ==========
function initCountdownTimer() {
    const daysEl = document.getElementById('t-days');
    const hoursEl = document.getElementById('t-hours');
    const minEl = document.getElementById('t-min');
    const secEl = document.getElementById('t-sec');
    
    if (!daysEl) return;
    
    let totalSeconds = 4 * 86400 + 13 * 3600 + 34 * 60 + 56;
    
    function updateTimer() {
        if (totalSeconds <= 0) return;
        totalSeconds--;
        
        const d = Math.floor(totalSeconds / 86400);
        const h = Math.floor((totalSeconds % 86400) / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        
        daysEl.textContent = String(d).padStart(2, '0');
        hoursEl.textContent = String(h).padStart(2, '0');
        minEl.textContent = String(m).padStart(2, '0');
        secEl.textContent = String(s).padStart(2, '0');
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// ========== PRICE TIER SELECTION ==========
function initPriceTiers() {
    const tiers = document.querySelectorAll('.price-tier');
    tiers.forEach(tier => {
        tier.addEventListener('click', function() {
            tiers.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ========== INQUIRY FORM ==========
function initInquiryForm() {
    const inquiryBtn = document.querySelector('.inquiry-form .btn-primary');
    if (inquiryBtn) {
        inquiryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const form = this.closest('.inquiry-form');
            const itemInput = form.querySelector('input[type="text"]');
            const detailsInput = form.querySelector('textarea');
            
            if (!itemInput.value.trim()) {
                alert('Please enter what item you need');
                itemInput.focus();
                return;
            }
            
            alert('Your inquiry has been sent! Suppliers will contact you soon.');
            itemInput.value = '';
            detailsInput.value = '';
        });
    }
}

// ========== SMOOTH ANIMATIONS ==========
function initAnimations() {
    // Add bounce animation style
    if (!document.getElementById('dynamic-animations')) {
        const style = document.createElement('style');
        style.id = 'dynamic-animations';
        style.textContent = `
            @keyframes bounce {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.3); }
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========== INITIALIZE EVERYTHING ==========
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initCategories();
    initNewsletter();
    initFilterTags();
    initViewToggle();
    initPagination();
    initTabs();
    initImageGallery();
    initSizeDropdown();
    initAddToCart();
    initWishlist();
    initCountdownTimer();
    initPriceTiers();
    initInquiryForm();
    initAnimations();
    
    console.log('✓ Ecommerce app initialized');
});
