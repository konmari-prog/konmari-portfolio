# HANDOVER - セッション引き継ぎドキュメント

> 生成日時: 2026-02-22
> プロジェクト: konmari-portfolio
> 作業ディレクトリ: `/Users/imanarimari/Documents/dev/web/konmari-portfolio/`

---

## 1. 今回のセッションでやったこと

このセッションでは実作業は行っておらず、`/handover` コマンドの実行のみ。
前セッション（2026-02-22）の HANDOVER.md を `HANDOVER_2026-02-22_prev.md` としてバックアップし、本ドキュメントを新規生成した。

---

## 2. 前セッションまでの完了済み作業（引き継ぎ）

| # | タスク | 状態 | 内容 |
|---|--------|------|------|
| 1 | 共通CSS作成 | 完了 | `assets/css/style.css` を新規作成（約600行）。両ページで共有 |
| 2 | index.html 全面改修 | 完了 | 単一LP → トップ/プロフィールページへ。「採用されたい」トーンを排除 |
| 3 | works.html 新規作成 | 完了 | ギャラリー（タブ切り替え）+ スキル + Works + 参考価格ページ |
| 4 | アンバサダーラベル修正 | 完了 | Midjourneyの記載を削除。MiriCanvas=公式アンバサダー、Manus/Skywork=インフルエンサーパートナーに修正 |
| 5 | プレビュー検証 | 完了 | 両ページの構造・タブ動作・スキルタグ・ナビリンク・免責文をevalで確認 |

---

## 3. うまくいったこと

- **shared CSS 設計**: `:root` で変数化することで、両ページのデザインが完全に統一された
- **ギャラリータブ**: `data-tab` + `classList.toggle('active')` のシンプルな実装でタブ切り替えが完動
- **eval による検証**: `preview_screenshot` がスクロール非対応のため、`preview_eval` で DOM を直接クエリして確認する手法が確実
- **トーン切り替え**: CTA を「まず相談する」から「X でフォロー」「制作実績を見る」に変更し、ポートフォリオ/ショーケースの世界観に統一

---

## 4. うまくいかなかったこと・ハマったポイント

### preview_screenshot はスクロール位置を反映しない
- `window.scrollTo()` や `scrollIntoView()` を実行しても、スクリーンショットは常にページ最上部から撮れる
- **対処法**: `preview_eval` で querySelector + textContent/length を使い、DOM 状態を数値・文字列で確認する

### キャッシュによる旧バージョン表示
- index.html を全面改修後、スクリーンショットに旧 LP が映り込んだ
- **対処法**: `preview_eval` で `window.location.href = 'http://localhost:8888/index.html'` を明示的に実行してから確認

---

## 5. 主要な意思決定とその理由

### 単一LP → マルチページ構成に変更
- **理由**: ギャラリーに「画像山ほどある」との要望。単一LPでは情報過多になるため分離
- **構成**: `index.html`（プロフィール・世界観） / `works.html`（ギャラリー・実績・価格）

### 「採用されたい」トーンを排除
- **理由**: 積極的な新規受注はお休み中。ポートフォリオ/ショーケースとして機能させる
- **変更点**: 問い合わせフォームなし / CTA は「フォローする」「noteを読む」/ 価格に免責文追記

### 価格ページは works.html に残す
- **理由**: 「参考として残す」という要望。完全削除はせず、免責文（「積極的な新規受注はお休み中」）付きで掲載

### ギャラリーはプレースホルダー方式で設計
- **理由**: 実画像をユーザーが後から追加できるよう、先に枠（16枚）を作っておく設計
- **構成**: 実写タブ（3枚実画像 + 5枚プレースホルダー）/ イラストタブ（1枚実画像 + 7枚プレースホルダー）

---

## 6. 学んだ教訓・注意点（Gotchas）

- **絵文字は絶対NG**: コンマリのデザインルール。アイコンは Google Material Icons のみ使用
- **preview_eval が最強の検証手段**: DOM 構造の確認は必ず eval で。スクリーンショットは「大枠の見た目」確認にのみ使う
- **タブのデフォルト表示**: `#tab-photo` に `active` クラス、`#tab-illust` は非表示がデフォルト。HTML でクラスの付け方を間違えると初期表示が壊れる
- **プレビューサーバーのパス**: `launch.json` は `konmari-portfolio` ディレクトリではなく `/Users/imanarimari/Documents/work/freelance/.claude/launch.json` に置いてある
- **ナビの active 状態**: `index.html` の nav は「ホーム」に `active`、`works.html` の nav は「制作実績」に `active` をつけてある

---

## 7. ネクストステップ

- [ ] **ギャラリーに実画像を追加する**（最優先）
  - `assets/images/` に MJ 生成画像を配置
  - `works.html` の `<img src="...">` を書き換えるだけ
  - 画像が16枚以上になったら `<div class="gallery-item">` ブロックをコピーして追加
- [ ] **登壇履歴を追加する**（index.html の speaking セクション）
  - 現在は1件のみ（2024.09 SHIFT AI）
  - 他の登壇実績があれば `.speaking-card` ブロックを追加
- [ ] **Works セクションの実績カードを充実させる**（works.html）
  - 現在2枚のプレースホルダーカード
  - 公開できる実績があれば `.work-card` を追加
- [ ] **モバイル表示の確認**
  - `preview_resize` で `preset: "mobile"` にして確認
  - ギャラリーグリッドが4列→2列に切り替わるか確認（CSS `@media (max-width: 600px)` 設定済み）
- [ ] **テスティモニアル（お声）の実データ入れ替え**（index.html）
  - 現在サンプルテキスト入り。実際の声に差し替え
- [ ] **OGP / meta タグの設定**
  - X(Twitter) や LINE でシェアした際のサムネイル設定
  - 両ページの `<head>` に `og:image`, `og:title`, `og:description` を追記
- [ ] **本番デプロイ先の検討**
  - GitHub Pages / Netlify / Vercel などの静的ホスティング

---

## 8. 重要ファイルマップ

| ファイル | 役割 | 備考 |
|---------|------|------|
| `index.html` | トップ/プロフィールページ | 前セッションで全面改修 |
| `works.html` | ギャラリー・実績・価格ページ | 前セッションで新規作成 |
| `assets/css/style.css` | 共通スタイルシート | 前セッションで新規作成。約600行 |
| `assets/images/mj-desk-woman.png` | ヒーロー画像（メイン） | 実写タブにも使用 |
| `assets/images/mj-cafe-woman.png` | ヒーロー浮遊画像 | 実写タブにも使用 |
| `assets/images/mj-flatlay.png` | ヒーロー浮遊画像 | 実写タブにも使用 |
| `assets/images/mj-bg-pastel.png` | 背景装飾 / イラストタブ | |
| `HANDOVER_2026-02-22_prev.md` | 前セッションのバックアップ | 詳細な経緯はこちらを参照 |
| `/Users/imanarimari/Documents/work/freelance/.claude/launch.json` | プレビューサーバー設定 | npx serve, port 8888 |

---

## 9. 次のセッションへの申し送り

### 最初にやること

1. プレビューサーバーを起動する
   - `preview_start` → name: `"konmari-portfolio"`
   - URL: `http://localhost:8888`

2. 現状確認のためスクリーンショットを撮る
   - `preview_screenshot` で `index.html` → `works.html` の順に確認

### 環境情報

- **プレビューサーバー**: `npx serve` / port `8888` / serverId は起動のたびに変わる
- **フォント**: Google Fonts (Zen Maru Gothic, Noto Sans JP) + Material Icons — CDN リンクのため**オフライン環境では表示が崩れる**
- **画像**: すべて `assets/images/` 以下のローカルファイル。本番デプロイ時は一緒にアップロードが必要

### デザインルール（変更時に必ず守ること）

- 絵文字使用禁止（HTML・CSS・JS すべて）
- アイコンは `<span class="material-icons">icon_name</span>` のみ
- カラー変数は `assets/css/style.css` の `:root` で管理（直接カラーコードを書かない）
- 四大原則（近接・整列・反復・対比）を適用する

### カラー変数（`:root` の主要変数）

```css
--lv1: #ffaac8;   /* ピンクライト */
--lv3: #e8508a;   /* ピンクダーク */
--cream: #fff2f7; /* 背景クリーム */
--tx1: #2d2020;   /* メインテキスト */
--tx2: #6b5b5b;   /* サブテキスト */
```

### このプロジェクトの方針

- **受注目的ではない**: フォロワー獲得・ブランディング目的のポートフォリオ
- **価格は参考掲載**: 免責文付きで works.html に掲載。削除・非表示にしない
- **SNS 誘導が最優先**: すべての CTA は X フォロー / note 購読に向かう
- **ギャラリーが主役**: 実画像が追加されるほどページが育つ設計

---

*このドキュメントは `/handover` コマンドで生成されました*
