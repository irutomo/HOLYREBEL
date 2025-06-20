# BASE テンプレート開発ルール

## 1. プロジェクト構造

### 必須ディレクトリ構成
```
project-name/
├── template.html              # メインテンプレートファイル
├── assets/
│   ├── images/               # 画像ファイル
│   │   ├── logo.png
│   │   ├── sample-products/
│   │   └── icons/
│   ├── fonts/               # フォントファイル
│   └── css/                 # 外部CSSファイル（必要時）
├── components/              # 再利用可能コンポーネント
│   ├── header.html
│   ├── navigation.html
│   ├── item-card.html
│   ├── footer.html
│   └── modals.html
├── documentation/           # ドキュメント
│   ├── README.md
│   ├── CHECKLIST.md
│   ├── CUSTOMIZATION.md
│   └── TAG_REFERENCE.md
└── tests/                  # テスト用ファイル
    ├── sample-data.json
    └── browser-test.html
```

## 2. BASEテンプレート必須要件

### 2.1 必須タグ
以下のタグは必ず実装すること：

```html
<!-- ページ基本情報 -->
{PageTitle}
{FaviconTag}
{CanonicalTag}
{BackgroundTag}
{GoogleAnalyticsTag}

<!-- ショップ情報 -->
{LogoTag}
{ShopName}
{ShopURL}

<!-- BASE機能 -->
{BASEMenuTag}
{IllegalReportTag}
{IllegalReportMessageTag}

<!-- ページ条件分岐 -->
{block:IndexPage}...{/block:IndexPage}
{block:ItemPage}...{/block:ItemPage}
{block:AboutPage}...{/block:AboutPage}
{block:NotLoadItemsPage}...{/block:NotLoadItemsPage}
{block:LoadItemsPage}...{/block:LoadItemsPage}

<!-- 商品情報 -->
{block:Items}...{/block:Items}
{ItemTitle}
{ItemPrice}
{ItemPageURL}
{ItemImage1URL-300}
{ItemStock}
{ItemAttentionTag}
```

### 2.2 ページ構成
- **トップページ**: 商品一覧、ブランド紹介
- **商品詳細ページ**: 商品画像、詳細情報、購入ボタン
- **Aboutページ**: ショップ紹介
- **お問い合わせページ**: ContactページURL対応

### 2.3 レスポンシブ対応
- **モバイル**: 320px〜767px
- **タブレット**: 768px〜1024px
- **デスクトップ**: 1025px以上

## 3. コーディング規約

### 3.1 HTML構造
```html
{block:NotLoadItemsPage}
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{PageTitle}</title>
    {FaviconTag}
    {CanonicalTag}
    
    <!-- CSS -->
    <style>
        /* 基本スタイル */
        /* コンポーネントスタイル */
        /* レスポンシブスタイル */
    </style>
    
    {BackgroundTag}
    {GoogleAnalyticsTag}
</head>
<body id="{block:IndexPage}shopTopPage{/block:IndexPage}{block:ItemPage}shopDetailPage{/block:ItemPage}" class="shop">
    {BASEMenuTag}
    
    <!-- ヘッダー -->
    <header class="site-header">
        <h1 class="logo">{LogoTag}</h1>
        <nav class="main-nav">
            <!-- ナビゲーション -->
        </nav>
    </header>
    
    <!-- メインコンテンツ -->
    <main class="main-content">
        {block:IndexPage}
            <!-- トップページコンテンツ -->
        {/block:IndexPage}
        
        {block:ItemPage}
            <!-- 商品詳細ページコンテンツ -->
        {/block:ItemPage}
        
        {block:AboutPage}
            <!-- Aboutページコンテンツ -->
        {/block:AboutPage}
    </main>
    
    <!-- フッター -->
    <footer class="site-footer">
        <!-- フッターコンテンツ -->
    </footer>
    
    <!-- JavaScript -->
    <script>
        /* カスタムJavaScript */
    </script>
</body>
</html>
{/block:NotLoadItemsPage}

{block:LoadItemsPage}
    <!-- 無限スクロール用コンテンツ -->
{/block:LoadItemsPage}
```

### 3.2 CSS設計原則
- **BEM記法**を使用
- **CSS変数**でテーマカラー管理
- **モバイルファースト**設計
- **アクセシビリティ**対応

```css
:root {
    --primary-color: #000000;
    --secondary-color: #ffffff;
    --accent-color: #ff6b6b;
    --text-color: #333333;
    --bg-color: #ffffff;
    --border-color: #e0e0e0;
    --shadow: 0 2px 10px rgba(0,0,0,0.1);
    --transition: all 0.3s ease;
}

/* BEM記法例 */
.item-card {
    /* ブロック */
}

.item-card__image {
    /* エレメント */
}

.item-card--featured {
    /* モディファイア */
}
```

### 3.3 JavaScript規約
- **ES6+**構文使用
- **非同期処理**は`async/await`
- **イベント委譲**パターン使用
- **パフォーマンス**最適化

```javascript
// モジュールパターン
const ShopTemplate = {
    init() {
        this.bindEvents();
        this.initComponents();
    },
    
    bindEvents() {
        document.addEventListener('click', this.handleClick.bind(this));
    },
    
    async loadMoreItems() {
        // 無限スクロール実装
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ShopTemplate.init();
});
```

## 4. デザインガイドライン

### 4.1 カラーパレット
- **プライマリカラー**: ブランドメインカラー
- **セカンダリカラー**: サブカラー
- **アクセントカラー**: CTA、リンク用
- **ニュートラルカラー**: テキスト、背景用

### 4.2 タイポグラフィ
```css
/* フォント階層 */
.heading-1 { font-size: 2.5rem; font-weight: 700; }
.heading-2 { font-size: 2rem; font-weight: 600; }
.heading-3 { font-size: 1.5rem; font-weight: 600; }
.body-text { font-size: 1rem; line-height: 1.6; }
.small-text { font-size: 0.875rem; }
```

### 4.3 スペーシング
```css
/* 8px基準のスペーシングシステム */
.spacing-xs { margin: 0.5rem; }  /* 8px */
.spacing-sm { margin: 1rem; }    /* 16px */
.spacing-md { margin: 1.5rem; }  /* 24px */
.spacing-lg { margin: 2rem; }    /* 32px */
.spacing-xl { margin: 3rem; }    /* 48px */
```

## 5. パフォーマンス要件

### 5.1 画像最適化
- **WebP形式**推奨
- **遅延読み込み**実装
- **適切なサイズ**指定

```html
<img src="image.webp" 
     alt="商品画像" 
     loading="lazy"
     width="300" 
     height="300">
```

### 5.2 CSS最適化
- **Critical CSS**インライン化
- **未使用CSS**削除
- **ベンダープレフィックス**最小化

### 5.3 JavaScript最適化
- **コード分割**実装
- **デバウンス/スロットル**使用
- **メモリーリーク**防止

## 6. アクセシビリティ要件

### 6.1 セマンティックHTML
```html
<main role="main">
    <section aria-label="商品一覧">
        <h2>おすすめ商品</h2>
        <article class="item-card">
            <h3>商品名</h3>
            <img src="..." alt="商品の詳細説明">
            <p>商品説明</p>
        </article>
    </section>
</main>
```

### 6.2 キーボード操作
- **Tab順序**適切に設定
- **フォーカス表示**明確に
- **スキップリンク**提供

### 6.3 スクリーンリーダー対応
- **alt属性**適切に設定
- **aria-label**使用
- **見出し構造**論理的に

## 7. SEO要件

### 7.1 メタタグ
```html
<title>{PageTitle}</title>
<meta name="description" content="ショップ説明">
<meta property="og:title" content="{PageTitle}">
<meta property="og:description" content="ショップ説明">
<meta property="og:image" content="og-image.jpg">
```

### 7.2 構造化データ
```html
<script type="application/ld+json">
{
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "{ItemTitle}",
    "image": "{ItemImage1URL-origin}",
    "offers": {
        "@type": "Offer",
        "price": "{ItemPrice}",
        "priceCurrency": "JPY"
    }
}
</script>
```

## 8. テスト要件

### 8.1 ブラウザテスト
- **Chrome** (最新版)
- **Firefox** (最新版)
- **Safari** (最新版)
- **Edge** (最新版)

### 8.2 デバイステスト
- **iPhone** (Safari)
- **Android** (Chrome)
- **iPad** (Safari)
- **デスクトップ** (各ブラウザ)

### 8.3 機能テスト
- [ ] 商品一覧表示
- [ ] 商品詳細表示
- [ ] 検索機能
- [ ] カート機能
- [ ] レスポンシブ表示
- [ ] フォーム送信

## 9. 納品要件

### 9.1 必須ファイル
- `template.html` (メインテンプレート)
- `README.md` (実装説明)
- `CHECKLIST.md` (品質チェック結果)
- `assets/` (画像・フォント等)

### 9.2 ドキュメント
- **実装仕様書**
- **カスタマイズガイド**
- **BASEタグリファレンス**
- **トラブルシューティング**

### 9.3 品質保証
- **W3C準拠**
- **アクセシビリティチェック**
- **パフォーマンステスト**
- **セキュリティチェック**

## 10. 運用・保守

### 10.1 更新頻度
- **セキュリティ更新**: 即座
- **機能追加**: 月1回
- **デザイン調整**: 四半期1回

### 10.2 サポート範囲
- **BASE仕様変更**対応
- **ブラウザ更新**対応
- **パフォーマンス改善**
- **カスタマイズサポート**

## 11. モジュラー設計アプローチ

[モジュラーマネジメント](https://www.modularmanagement.com/ja/blog/%E3%82%B3%E3%83%94%E3%83%BC/%E3%82%AD%E3%83%A3%E3%83%AA%E3%83%BC%E3%82%AA%E3%83%BC%E3%83%90%E3%83%BC%E8%A8%AD%E8%A8%88%E3%81%8B%E3%82%89%E8%84%B1%E5%8D%B4%E3%81%99%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AE%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%A9%E3%83%BC%E8%A8%AD%E8%A8%88%E3%82%A2%E3%83%97%E3%83%AD%E3%83%BC%E3%83%81)の考え方を取り入れ、キャリーオーバー設計から脱却します。

### 11.1 コンポーネント設計
- **再利用可能**なモジュール作成
- **設定可能**なパラメータ
- **拡張可能**な構造

### 11.2 設計効率化
- **標準化**されたコンポーネント
- **自動化**されたビルドプロセス
- **文書化**された仕様

---

## 改訂履歴
- v1.0: 初版作成
- v1.1: モジュラー設計アプローチ追加 