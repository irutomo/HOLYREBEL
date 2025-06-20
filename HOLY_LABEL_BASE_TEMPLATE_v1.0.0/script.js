// HOLY REBEL BASEテンプレート JavaScript
// Inspired by Rosen Kreuz interaction with HOLY REBEL enhancements

jQuery(document).ready(function ($) {
    
    // Smooth scroll
    $('a[href^="#"]').click(function () {
        if (!$(this).hasClass("filter_lbox-link")) {
            var speed = 800;
            var href = $(this).attr("href");
            var target = $(href == "#" || href == "" ? "html" : href);
            if (target.length) {
                var position = target.offset().top - 70; // ヘッダー分のオフセット
                $("body,html").animate(
                    {
                        scrollTop: position,
                    },
                    speed,
                    "swing"
                );
            }
            return false;
        }
    });

    // ハンバーガーメニューのクリックイベント（Rosen Kreuz風）
    $("#js-humberger").click(function () {
        $(this).toggleClass("-active");
        $("#sp-gmenu-area").toggleClass("-active");

        if ($(this).hasClass("-active")) {
            $("body").addClass("body-fixed");
            $("html").css("overflow", "hidden");
        } else {
            $("body").removeClass("body-fixed");
            $("html").css("overflow", "auto");
        }
        var expanded = $(this).attr("aria-expanded") === "true" || false;
        $(this).attr("aria-expanded", !expanded);
    });

    // メニュー外をクリックした際の閉じる処理
    $(document).click(function (e) {
        if (!$(e.target).closest("#js-humberger, #sp-gmenu-area").length) {
            if ($("#js-humberger").hasClass("-active")) {
                $("#js-humberger").removeClass("-active");
                $("#sp-gmenu-area").removeClass("-active");
                $("body").removeClass("body-fixed");
                $("html").css("overflow", "auto");
                $("#js-humberger").attr("aria-expanded", false);
            }
        }
    });

    // 展開メニューの処理
    $(".expand").on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("open");
        $(this).next(".ex-list").slideToggle();
    });

    // 商品フィルター機能
    $('.filter-btn').on('click', function() {
        const category = $(this).data('category');
        
        // アクティブボタンの切り替え
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // 商品のフィルタリング
        filterItems(category);
    });

    // ナビゲーションからのフィルター
    $('a[data-category]').on('click', function(e) {
        e.preventDefault();
        const category = $(this).data('category');
        
        // メニューを閉じる
        closeMenu();
        
        // 商品セクションまでスクロール
        $('html, body').animate({
            scrollTop: $('#items').offset().top - 70
        }, 800);
        
        // フィルターボタンを更新
        $('.filter-btn').removeClass('active');
        $(`.filter-btn[data-category="${category}"]`).addClass('active');
        
        // 商品をフィルタリング
        setTimeout(() => {
            filterItems(category);
        }, 500);
    });

    // 商品フィルタリング関数
    function filterItems(category) {
        const items = $('.item-card');
        
        items.each(function() {
            const $item = $(this);
            const itemCategory = $item.data('category');
            
            $item.addClass('filtering-out');
            
            setTimeout(() => {
                if (category === 'all' || itemCategory === category) {
                    $item.show().removeClass('filtering-out').addClass('filtering-in');
                } else {
                    $item.hide().removeClass('filtering-out filtering-in');
                }
            }, 300);
        });
        
        // アニメーションクリーンアップ
        setTimeout(() => {
            items.removeClass('filtering-in');
        }, 800);
    }

    // メニューを閉じる関数
    function closeMenu() {
        $("#js-humberger").removeClass("-active");
        $("#sp-gmenu-area").removeClass("-active");
        $("body").removeClass("body-fixed");
        $("html").css("overflow", "auto");
        $("#js-humberger").attr("aria-expanded", false);
    }

    // Load Moreボタンの処理
    $('#loadMoreBtn').on('click', function() {
        const $button = $(this);
        const originalText = $button.text();
        
        $button.text('LOADING...').prop('disabled', true);
        
        // ここでBASEのAPI呼び出しまたはページング処理を実装
        setTimeout(() => {
            $button.text(originalText).prop('disabled', false);
            // 実際の実装では、ここで新しい商品を追加
        }, 1000);
    });

    // Intersection Observer for animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // 要素を監視対象に追加
        $('.item-card, .section-title, .brand-title').each(function() {
            observer.observe(this);
        });
    }

    // スクロール時のヘッダー背景変更
    $(window).scroll(function() {
        const scroll = $(window).scrollTop();
        const header = $('.site-header');
        
        if (scroll > 100) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }
    });

    // 画像の遅延読み込み
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        $('img[data-src]').each(function() {
            imageObserver.observe(this);
        });
    }

    // フォームの処理
    $('.search-form').on('submit', function(e) {
        const searchQuery = $('.search-field').val().trim();
        if (!searchQuery) {
            e.preventDefault();
            alert('検索キーワードを入力してください。');
        }
    });

    // ソーシャルリンクの処理
    $('.instagram-link').on('click', function(e) {
        e.preventDefault();
        // 実際のInstagramアカウントURLに変更
        window.open('https://www.instagram.com/holyrebel_official/', '_blank');
    });

    // キーボードナビゲーション
    $(document).keydown(function(e) {
        // Escapeキーでメニューを閉じる
        if (e.key === 'Escape' && $("#js-humberger").hasClass("-active")) {
            closeMenu();
        }
    });

    // タッチデバイス対応
    if ('ontouchstart' in window) {
        $('body').addClass('touch-device');
        
        // タッチデバイスでのホバー効果を調整
        $('.item-card').on('touchstart', function() {
            $(this).addClass('touch-hover');
        });
        
        $('.item-card').on('touchend', function() {
            const $this = $(this);
            setTimeout(() => {
                $this.removeClass('touch-hover');
            }, 300);
        });
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

    // リサイズ時の処理
    const handleResize = debounce(() => {
        // メニューが開いている場合、画面サイズが変わったら閉じる
        if (window.innerWidth > 768 && $("#js-humberger").hasClass("-active")) {
            closeMenu();
        }
    }, 250);

    $(window).resize(handleResize);

    // アクセシビリティ: フォーカス管理
    function trapFocus(element) {
        const focusableElements = element.find('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements.first();
        const lastElement = focusableElements.last();

        element.on('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement[0]) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement[0]) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }

    // メニューが開いた時のフォーカス管理
    $('#js-humberger').on('click', function() {
        if ($(this).hasClass('-active')) {
            trapFocus($('#sp-gmenu-area'));
            $('#sp-gmenu-area a').first().focus();
        }
    });

    // エラーハンドリング
    window.addEventListener('error', function(e) {
        console.warn('HOLY REBEL Template Error:', e.error);
    });

    // 初期化完了
    console.log('HOLY REBEL Template initialized successfully');
});

// Vanilla JavaScript for critical functions
document.addEventListener('DOMContentLoaded', function() {
    
    // 緊急時のフォールバック：jQueryが読み込まれていない場合
    if (typeof jQuery === 'undefined') {
        console.warn('jQuery not loaded, using vanilla JavaScript fallback');
        
        // 基本的なハンバーガーメニュー
        const hamburger = document.getElementById('js-humberger');
        const menu = document.getElementById('sp-gmenu-area');
        
        if (hamburger && menu) {
            hamburger.addEventListener('click', function() {
                this.classList.toggle('-active');
                menu.classList.toggle('-active');
                document.body.classList.toggle('body-fixed');
            });
        }
    }

    // Critical CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .scrolled {
            background: rgba(11, 16, 29, 0.98) !important;
            backdrop-filter: blur(15px);
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out;
        }
        
        .touch-hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        @media (prefers-reduced-motion: reduce) {
            .animate-in {
                animation: none;
            }
        }
    `;
    document.head.appendChild(style);
});

// パララックス効果（パフォーマンス考慮）
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// パララックス効果をスクロールイベントに追加（パフォーマンス最適化）
if (window.innerWidth > 768) {
    window.addEventListener('scroll', requestParallaxUpdate);
}

