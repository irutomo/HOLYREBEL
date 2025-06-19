// HOLY REBEL BASEテンプレート JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューの制御
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuClose = document.getElementById('menuClose');
    
    // メニューを開く
    function openMenu() {
        hamburgerMenu.classList.add('active');
        hamburgerBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // メニューを閉じる
    function closeMenu() {
        hamburgerMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // イベントリスナー
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            if (hamburgerMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }
    
    // ESCキーでメニューを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hamburgerMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                closeMenu(); // メニューが開いていれば閉じる
            }
        });
    });
    
    // 商品カードのホバーアニメーション
    const itemCards = document.querySelectorAll('.item-card');
    itemCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // スクロール時のヘッダー背景変更
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(11, 16, 29, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(11, 16, 29, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 画像の遅延読み込み
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // パフォーマンス最適化: デバウンス関数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // リサイズ時の処理（デバウンス適用）
    const handleResize = debounce(function() {
        // ウィンドウリサイズ時の処理
        if (window.innerWidth > 768 && hamburgerMenu.classList.contains('active')) {
            closeMenu();
        }
    }, 250);
    
    window.addEventListener('resize', handleResize);
    
    // タッチデバイス対応
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // タッチ時のホバー効果を調整
        itemCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            });
        });
    }
    
    // アクセシビリティ: フォーカス管理
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    function trapFocus(element) {
        const focusableContent = element.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    // メニューが開いているときのフォーカストラップ
    if (hamburgerMenu) {
        hamburgerBtn.addEventListener('click', function() {
            if (hamburgerMenu.classList.contains('active')) {
                trapFocus(hamburgerMenu);
                // 最初のメニュー項目にフォーカス
                const firstMenuItem = hamburgerMenu.querySelector('.menu-list a');
                if (firstMenuItem) {
                    setTimeout(() => firstMenuItem.focus(), 100);
                }
            }
        });
    }
    
    // エラーハンドリング
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        // 本番環境では適切なエラー報告システムに送信
    });
    
    // 初期化完了のログ
    console.log('HOLY REBEL Template initialized successfully');
});


    // カテゴリフィルター機能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const itemCards = document.querySelectorAll('.item-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // アクティブボタンの切り替え
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 商品のフィルタリング
            itemCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('filtering-out');
                    card.classList.add('filtering-in');
                    card.style.display = 'block';
                } else {
                    card.classList.add('filtering-out');
                    card.classList.remove('filtering-in');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // 商品カードの高度なアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    itemCards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // パララックス効果
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.item-card');
        
        parallaxElements.forEach((element, index) => {
            const rate = scrolled * -0.5;
            const yPos = -(rate / (index + 1));
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // パララックス効果のオン/オフ（パフォーマンス考慮）
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestParallaxUpdate);
    }
    
    // 商品読み込み機能（AJAX風）
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentPage = 1;
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.textContent = 'LOADING...';
            this.disabled = true;
            
            // 実際のBASE環境では、ここでAJAXリクエストを送信
            setTimeout(() => {
                // デモ用の処理
                this.textContent = 'LOAD MORE';
                this.disabled = false;
                currentPage++;
                
                // 一定回数後にボタンを非表示
                if (currentPage > 3) {
                    this.style.display = 'none';
                }
            }, 1500);
        });
    }
    
    // 商品カードの3D効果
    itemCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // カテゴリボタンのキーボードナビゲーション
    filterButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' && index > 0) {
                filterButtons[index - 1].focus();
            } else if (e.key === 'ArrowRight' && index < filterButtons.length - 1) {
                filterButtons[index + 1].focus();
            }
        });
    });
    
    // スムーズスクロール強化
    const shopBtn = document.querySelector('.shop-btn');
    if (shopBtn) {
        shopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#items');
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // 商品画像の遅延読み込み強化
    const lazyImages = document.querySelectorAll('.item-image[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // プレースホルダー効果
                    img.style.filter = 'blur(5px)';
                    img.style.transition = 'filter 0.3s';
                    
                    img.onload = () => {
                        img.style.filter = 'blur(0)';
                    };
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // パフォーマンス監視
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        });
    }

