# ワールドバザール原稿差し替え・挿絵判断

作業：Codex-BGS-20261120-4。基準：main `ea6b8918d30dab29c0b5af35e0040d0ec4397f72`。

## 編集と構造

運営者が2026年11月20日に提供した「World Bazaar」原稿を、見出し5件・本文19段落のまま実装。本文と見出しはブラウザのtextContentを入力原稿と照合し、完全一致を確認した。「架空の」などの表現も、今回の明示的な原稿指定を優先して保持した。

共通記事と同じmasthead、file-strip（File No. 005／Story · TDL／Reading · 5 min）、5項目の目次、article-block、折りたたみ参考資料、共有・更新日・記事間ナビゲーションを使用。共通CSS、本文の書体・サイズ、記事のURL・資料番号・前後リンクを維持。旧prologue・shops・perspective・triviaを対応章に維持し、旧seasons・comparisonは関連する章内の別名アンカーとして保持。

トップの対象カードの紹介文と5 min、記事のdescription系4か所、共有文、最終編集日とArticle dateModified、サイトマップのlastmodを整合。title・canonical・OGP画像と既存写真ファイル、著作権・ライセンス表記は保持。本文に調査説明を追加せず、資料12件を末尾に記載。

## 挿絵

旧SVG4点は全撤去。歯科医院、季節装飾、比較表など旧稿の内容は持ち越さない。追加でimage_genを1回使用し、既存world-bazaar-seasonal.jpegを参照した屋根の細部のセピア線画を試作したが、実写真にない接合板・部材配置などの再解釈が残り不採用。実在建築と確認できないものを掲載しないという依頼に従い、今回は挿絵なし。生成物や新規画像依存はリポジトリに追加していない。試作は環境内 `/workspace/generated_images/exec-e87dabea-69e5-493e-b3f2-75986f401cb5.png`。画像生成を使えなかったための省略ではなく、照合品質による判断。

## 資料の確認（2026年11月20日）

原稿の文言を改変する目的ではなく、末尾参考資料とレビュー用の確認記録を作成した。以下のURLは運営用。記事の参考資料は既存方針どおり外部リンクなし。

|資料|確認範囲|
|---|---|
|[OLC沿革](https://www.olc.co.jp/ja/company/history/history03.html)|1983年4月15日の雨天開園、髙橋社長とカードン・ウォーカー会長、ワールドバザールの式典。検索結果で確認。|
|[新刊JP・鎌田洋インタビュー](https://www.sinkan.jp/special/thankyou/interview.html)|当事者の回想として、悪天候の予報により別の予定場所からワールドバザール中央へ変更したことを確認。|
|[MezzoMiki・35周年ツアー](https://mezzomiki.jp/post-151318/)|雨による中央でのテープカットについての紹介。公式一次資料とは区別。|
|[PHPオンライン](https://shuchi.php.co.jp/article/1944)|初期の国際的モール構想、名前の由来、日本側の屋根提案と反対、ミラノのガレリア訪問。全文の該当箇所を確認。|
|[公式アンバサダー活動報告](https://www.tokyodisneyresort.jp/tdrblog/detail/amb201306/)|道幅が城側ほど狭いことと、往復での遠近感の説明。寸法・縮尺を新たに追加していない。|
|[公式ディズニー＆カンパニー](https://www.tokyodisneyresort.jp/tdl/shop/detail/502/)|3棟と中央1901の建物、繁盛による拡張の説明を検索結果で確認。|
|[公式グランドエンポーリアム](https://www.tokyodisneyresort.co.jp/tdl/shop/detail/513/)|ミッキーの雑貨店と仲間の協力による百貨店への発展を検索結果で確認。|
|[公式タウンセンターファッション](https://www.tokyodisneyresort.jp/tdl/shop/detail/525/)|ミニーの仕事量とデイジーとの店の物語を本文で確認。|
|[公式センターストリート・コーヒーハウス](https://www.tokyodisneyresort.co.jp/tdl/restaurant/detail/306/)|アールデコ、旧ヴィクトリア様式の意匠、2027年6月30日のクローズ告知を検索結果で確認。|
|[マイウェイ・窓の紹介](https://maiway.jp/blog/tdr-guide/tdl-world-bazaar/)|ティンカー・ベル、ウォルト、レース職人、2枚にまたがる会社名、髙橋の窓を紹介する写真と説明。非公式資料。写真の転載・生成入力はしていない。|
|[D23・髙橋政知](https://d23.com/a-to-z/takahashi-masatomo/)|誘致への貢献と1998年のレジェンド選出を検索結果で確認。|
|[D23・窓の献名](https://d23.com/about-legends/rolly-crump-and-don-edgren-enshrined-on-main-street-u-s-a/)|1955年からの伝統を検索結果で確認。|
|[Progress City・ライマンのコンセプト画](https://progresscityusa.com/2010/08/05/the-ryman-centennial-other-ports-of-call/)|東京とワールドバザール向けの制作を本文で確認。非公式の紹介資料。|

### 確認の限界

- テープカットが当初「パークの入口前」で予定されていたという厳密な場所は、確認した回想の「別のところ」以上には直接照合できていない。運営者の提供原稿どおり保持。
- ライマンの東京向けコンセプト制作は確認したが、原画の十字路そのものの目視照合は未完了。オークションのPDFは容量上限で閲覧できず、原画を確認済みとは記していない。
- 公式店舗ページの一部は検索結果の確認にとどまる。現行建築の測量や現地での確認は行っていない。

## 技術検証

- `python scripts/check_site.py`成功（25ページのSEO、24共有、22カード、Python16テスト、共有JS構文）。既存のsites.htmlのJSON-LD警告1件は継続。
- 既存`browser_smoke.cjs`成功（225ページ／画面幅条件、検索・履歴・5ダイアログ・reduced motion・JS無効フォールバック）。
- 320／390／767／768／1024／1280／1536pxで本文19段落・5見出しの原稿完全一致、35目次遷移、旧6アンカーの存在、横はみ出しなし、参考資料12件のEnter／Space開閉を確認。JS無効・WOFF2失敗時も本文と資料が読める。トップの5 minと記事への遷移も確認。
- 補助書体はfonts/README.mdどおり指定原本を取得しSHA-256検証、fonttools 4.61.1／brotli 1.2.0の一時仮想環境で再生成。新しい日本語のグリフが部分書体に含まれることを確認。press-mincho.woff2のみ141,464→152,324 B（約10.6 KiB増）。英語版に差分なし。
- HTMLは49,215→30,442 B（約38%減）。新規画像なし。実回線やCore Web Vitalsの測定値ではない。
- 390／768／1280pxの題字・本文・資料をスクリーンショットで確認。外部Google Fontsは遮断した代替書体。実Google Fonts、実機Safari、スクリーンリーダー、本番は未確認。

マージ・本番公開はこの依頼では行わない。確認の限界をPRにも記載する。
