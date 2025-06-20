# BASE テンプレート開発用 AI プロンプトテンプレート集

## 基本プロンプト構造

### テンプレート作成用基本プロンプト
```
【要件】
BASEテンプレートの[ページ種別]を作成してください。

【仕様】
- ブランド: [ブランド名]
- デザインコンセプト: [コンセプト説明]
- カラースキーム: プライマリ[色], アクセント[色]
- 対象デバイス: レスポンシブ対応（320px〜デスクトップ）

【必須実装項目】
- BASEテンプレート必須タグの完全実装
- [具体的な機能要件]
- アクセシビリティ対応
- パフォーマンス最適化

【参考デザイン】
[参考サイトURL または デザイン説明]

【技術要件】
- HTML5セマンティック構造
- CSS Grid/Flexbox使用
- モダンJavaScript（ES6+）
- BEM記法でのCSS設計

【納品形式】
- 単一HTMLファイル（CSS/JS内包）
- 実装説明コメント付き
- 本番環境対応済み
```

## ページ別プロンプトテンプレート

### 1. トップページ（IndexPage）作成
```
BASEテンプレートのトップページを作成してください。

【実装要件】
- {block:IndexPage}内に商品一覧グリッド実装
- {block:Items}を使用した商品ループ表示
- ブランドロゴとナビゲーション
- レスポンシブ商品グリッド（デスクトップ4列、タブレット3列、モバイル2列）

【商品カード仕様】
- 商品画像: {ItemImage1URL-300}
- 商品名: {ItemTitle}
- 価格: {ItemPrice}
- リンク: {ItemPageURL}
- 在庫切れ表示: {block:NoItemStock}SOLD OUT{/block:NoItemStock}

【デザイン要件】
- ミニマルでモダンなデザイン
- ホバーエフェクト付き商品カード
- スムーズなアニメーション
- 無限スクロール対応

【BASEタグ使用例】
```html
{block:IndexPage}
    {block:HasItems}
        <section class="product-grid">
            {block:Items}
                <article class="item-card">
                    <!-- 商品カード内容 -->
                </article>
            {/block:Items}
        </section>
    {/block:HasItems}
    {block:NoItems}
        <p>商品がありません</p>
    {/block:NoItems}
{/block:IndexPage}
```
```

### 2. 商品詳細ページ（ItemPage）作成
```
BASEテンプレートの商品詳細ページを作成してください。

【実装要件】
- {block:ItemPage}内に商品詳細レイアウト
- 商品画像ギャラリー（最大20枚対応）
- 商品情報表示エリア
- 購入フォーム統合

【画像ギャラリー仕様】
- メイン画像: {ItemImage1URL-500}
- サムネイル: {ItemImage1URL-76}
- 画像切り替え機能
- ズーム機能（オプション）

【商品情報表示】
- タイトル: {ItemTitle}
- 価格: {ItemPrice}
- 説明: {ItemDetail}
- 在庫状況: {ItemStock}
- 注意事項: {ItemAttentionTag}

【購入機能】
- {PurchaseButton}の統合
- バリエーション選択（サイズ・色等）
- 数量選択
- カート追加ボタン

【レイアウト】
- デスクトップ: 左画像、右商品情報の2カラム
- モバイル: 縦積みレイアウト
```

### 3. Aboutページ作成
```
BASEテンプレートのAboutページを作成してください。

【実装要件】
- {block:AboutPage}内にブランドストーリー
- ショップ紹介: {ShopIntroduction}
- SNSリンク統合
- お問い合わせ情報

【コンテンツ構成】
1. ブランドストーリー
2. 代表者メッセージ
3. 商品へのこだわり
4. SNSフォローセクション
5. ショップ情報

【SNS対応】
- Instagram: {ShopInstagramId}
- Twitter: {ShopTwitterId}
- Facebook: {ShopFacebookId}
- LINE: {ShopLineId}

【デザイン要件】
- 読みやすいタイポグラフィ
- 適切な余白設計
- ブランドイメージに合致
```

## コンポーネント別プロンプト

### ヘッダー・ナビゲーション作成
```
BASEテンプレート用のヘッダーとナビゲーションを作成してください。

【要件】
- ブランドロゴ: {LogoTag}
- メインナビゲーション
- ハンバーガーメニュー（モバイル）
- 検索機能（オプション）

【ナビゲーション項目】
- HOME: {IndexPageURL}
- ABOUT: {AboutPageURL}
- CONTACT: {ContactPageURL}
- カテゴリ: {AppsItemCategoryCategoriesTag}

【レスポンシブ対応】
- デスクトップ: 横並びナビゲーション
- モバイル: ハンバーガーメニュー
- スムーズなアニメーション
```

### フッター作成
```
BASEテンプレート用のフッターを作成してください。

【要件】
- ショップ情報
- SNSリンク
- 法的ページリンク
- コピーライト表示

【必須リンク】
- プライバシーポリシー: {PrivacyPageURL}
- 特定商取引法: {LawPageURL}
- お問い合わせ: {ContactPageURL}

【SNSアイコン】
- 各SNSの公式アイコン使用
- ホバーエフェクト付き
```

## 高度な機能実装プロンプト

### 検索機能実装
```
BASEテンプレート用の商品検索機能を実装してください。

【要件】
- 検索フォーム: {SearchPageURL}への送信
- 検索結果表示: {IndexPageSearch}
- リアルタイム検索（オプション）
- 検索履歴保存（localStorage）

【実装仕様】
```html
<form action="{SearchPageURL}" method="get">
    <input type="text" name="q" placeholder="商品を検索" value="{IndexPageSearch}">
    <button type="submit">検索</button>
</form>
```

【検索結果ページ】
- {block:IndexPageSearch}での条件分岐
- 検索キーワード表示
- 結果件数表示
```

### カテゴリフィルター実装
```
BASEテンプレート用のカテゴリフィルター機能を実装してください。

【要件】
- {AppsItemCategoryCategoriesTag}を使用
- ドロップダウンメニュー形式
- カテゴリ別ページ遷移
- 現在のカテゴリ表示

【実装例】
```html
{block:AppsItemCategory}
    <div class="category-filter">
        <span>カテゴリ</span>
        <div class="category-list">
            {AppsItemCategoryCategoriesTag}
        </div>
    </div>
{/block:AppsItemCategory}
```
```

## パフォーマンス最適化プロンプト

### 画像最適化実装
```
BASEテンプレートの画像最適化を実装してください。

【要件】
- 遅延読み込み（Lazy Loading）
- レスポンシブ画像
- WebP対応
- プレースホルダー表示

【実装例】
```html
<img src="{ItemImage1URL-300}" 
     alt="{ItemTitle}" 
     loading="lazy"
     class="responsive-image">
```

【CSS実装】
- aspect-ratio使用
- object-fit: cover
- プレースホルダーアニメーション
```

### JavaScript最適化
```
BASEテンプレート用の最適化されたJavaScriptを実装してください。

【要件】
- ES6+モジュール構造
- イベント委譲パターン
- デバウンス/スロットル実装
- メモリリーク防止

【実装パターン】
```javascript
const ShopTemplate = {
    init() {
        this.bindEvents();
        this.initLazyLoading();
    },
    
    bindEvents() {
        document.addEventListener('click', this.handleClick.bind(this));
    },
    
    debounce(func, wait) {
        // デバウンス実装
    }
};
```
```

## デバッグ・テスト用プロンプト

### ブラウザ互換性チェック
```
作成したBASEテンプレートのブラウザ互換性をチェックし、
必要な修正を提案してください。

【対象ブラウザ】
- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- iOS Safari
- Android Chrome

【チェック項目】
- CSS Grid/Flexbox対応
- ES6+構文対応
- 画像フォーマット対応
- フォント表示
```

### アクセシビリティチェック
```
BASEテンプレートのアクセシビリティを改善してください。

【チェック項目】
- セマンティックHTML使用
- alt属性設定
- キーボード操作対応
- スクリーンリーダー対応
- コントラスト比確認

【WCAG 2.1 AA準拠】
- 適切な見出し構造
- フォーカス表示
- エラーメッセージ
```

## カスタマイズ用プロンプト

### テーマカラー変更
```
作成したBASEテンプレートのカラーテーマを
以下の色に変更してください：

【新しいカラーパレット】
- プライマリ: [色コード]
- セカンダリ: [色コード]
- アクセント: [色コード]
- テキスト: [色コード]

【変更範囲】
- CSS変数の更新
- ホバーエフェクトの調整
- コントラスト比の確認
```

### レイアウト調整
```
BASEテンプレートのレイアウトを以下の仕様に調整してください：

【変更要件】
- 商品グリッド: [列数]列表示
- ヘッダー高さ: [px]
- フォントサイズ: [rem]
- 余白調整: [具体的な要求]

【レスポンシブ対応】
- モバイル: [仕様]
- タブレット: [仕様]
- デスクトップ: [仕様]
```

---

## 使用上の注意

1. **プロンプトの組み合わせ**: 複数のテンプレートを組み合わせて使用可能
2. **具体的な要件**: [角括弧]内は具体的な値に置き換えて使用
3. **段階的開発**: 基本機能から高度な機能へ段階的に実装
4. **品質確認**: 各段階で品質チェックプロンプトを使用 