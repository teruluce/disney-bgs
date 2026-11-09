# Phase 4-2 — 記事・補助ページの品質改善

2026-11-09（日本時間）。Phase 4-1監査に基づき、運営者が実装・PR作成・条件付きmainマージと公開確認を承認した。基準mainは `31e47d059e8e0f6b964980eca7d473c2b5bee8d0`。トップR3と旧URL転送・Google確認用・画像生成用HTMLは変更対象外。

## 実装範囲

- **共通層：** 通常24ページだけが `reading.css` を最後に読み込む。更新日・資料・関連記事のopacityと文字サイズ、写真caption・比較表の補助色を補正。小さな金色の図版・注記・バナーにも濃い金色を使う。装飾の罫線や図形の色は維持した。inline指定が共通層を妨げる箇所だけ整理している。
- **Small World：** 長文の本文16px（641px以上17px）、見出し20／24px、下位見出し17／18pxへ局所調整。金色の文字とfooter注記を読みやすくし、淡い背景・幾何学模様・色替え・写真・人物紹介とダイアログは維持。
- **Tomorrowland：** 紙地／パネルの青い番号・移動リンク・更新日の色を濃くした。濃紺HUD、Orbitron、青い装飾、写真、JavaScriptは維持。
- **Sindbad：** 横スクロールする比較表へ `tabindex="0"`、名前付きregion、フォーカス枠を追加。ブラウザ独自のスクロール領域自動フォーカスに依存しない。表の内容・列・最小幅は維持。
- **意味構造・読書導線：** 24ページに最初のTabで使える「本文へ移動」を追加し、本文見出しへネイティブにフォーカスする。既存IDは維持し、新しい `reading-start` を追加。既存wrapperのclass・子要素を維持したまま全24ページにmainを1つずつ確保。12ページのコラム等54見出しをh4からh3へ整理し、`aside-heading` classで従来のスタイルを保持。
- **ナビゲーション：** 既存の `index.html#toc` を保護し、22記事のページ送りラベルだけを「記事目次へ」にした。カード一覧へ着地するR3の「記事一覧へ」と区別する。

新しいデザイン比較案、全面刷新、クライアントJavaScriptや実行時パッケージ依存は追加していない。トップの `index.html` と `home.css` は基準とバイト単位で一致する。

## 本文・写真・SEOの保護

`python scripts/check_reading_preservation.py --base <改修前SHA>` で、全HTMLの既存テキスト（上記ナビ文言と新設skip linkを除く）、写真属性、リンク先、既存ID、meta・canonical・JSON-LD・既存JavaScriptを照合する。画像・SVG・WOFF2・共有JS・sitemap等もバイト比較する。記事の最終編集日を技術変更日へ書き換えていない。

写真クレジットは新しい根拠を推測せず、現行表記をそのまま保護した。

| 監査の確認事項 | 今回の扱い |
| --- | --- |
| Small Worldのimg-wrapper内の写真 | 写真・alt・周辺本文・既存footer表記を保持。新規の撮影者表記は作らない |
| Sindbadの市場通りの写真 | src・alt・表示比率を保持。比較表のUIのみ改善 |
| Tomorrowlandの写真 | 写真・alt・表示位置を保持。HUDや写真を紙面共通デザインへ置き換えない |

個別の撮影者・利用根拠との対応付けや未記載クレジットの補完は、運営者が根拠を確認する必要がある。今回の画像変更や削除は0件。

## 検証手順

```sh
python scripts/check_site.py
node scripts/browser_smoke.cjs
node scripts/homepage_smoke.cjs
node scripts/reading_smoke.cjs
python scripts/check_reading_preservation.py --base 31e47d059e8e0f6b964980eca7d473c2b5bee8d0
git diff --check
```

ブラウザ用開発依存はPlaywright1.62.1、axe-core4.10.3。ローカルサーバーは既存の `BGS_TEST_URL`、Chromiumは `BGS_CHROMIUM` で指定する。追加回帰は `BGS_BROWSER=chromium|firefox|webkit` を受け取り、24ページ×7幅（320／390／640／641／767／768／1366）を検証する。外部Webフォントは既定で遮断し、実フォント取得時は `BGS_TEST_FONTS=normal` で別に確認する。

ローカルの正常フォントではChromium154.0.8037.57／Firefox153.0／Playwright WebKit26.5がそれぞれ168条件、合計504条件で成功。JavaScript無効時も全24ページで確認した。Chromiumの展開資料を含む24ページの対象axeルール違反は0件。既存225条件、R3専用16条件、静的チェック、内容保全照合も成功した。

追加検証は、各ページのmain・最初のTab・44pxのskip link・本文着地・補助文字下限・横はみ出し・画像decode・JSエラー・JS無効時を確認する。比較表は実際のTab・矢印キーと描画ピクセルの差で到達・移動・枠を検証する。Chromiumでは参考資料・S.E.A.の折りたたみをEnterで開き、対象のaxeルール（contrast、heading-order、main、scrollable-region-focusable）も確認する。

CIは既存の静的チェックに加えて3エンジンの追加回帰を実行する。ChromiumのCIでは既存225条件とトップR3専用16条件も実行する。依存とブラウザはrunnerの一時ディレクトリへ導入し、公開サイトにビルド工程やnpm依存は持ち込まない。

## 判定の限界・残る確認事項

- Playwright WebKitの成功はiPhone実機Safariの保証ではない。実機Safari、高DPR画質、IME、スクリーンリーダー、実ブラウザ200／400%ズームと文字だけの拡大は未検証。
- axeの背景模様によるincompleteをPASSへ置き換えず、単色背景のコントラスト計算と区別する。全サイトのWCAG適合は宣言しない。
- main外の更新日には、全内容がランドマーク内にないというaxeのregion（best practice）指摘が残る。本文main・skip導線は対応済みで、記事情報や操作は失われていない。
- マージは、既存・追加テスト、3エンジン、内容保全、世界観、差分・競合、CIの全条件が揃った場合に限る。公開後も主要ページとPagesのデプロイ結果を確認する。
