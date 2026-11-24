# BGS Chronicles — Shared AI Work Log

このファイルは ChatGPT と Claude が共通で参照する作業履歴です。最新の記録と GitHub の実際の差分・コミット・PR を照合してから作業してください。過去の記録は削除せず、追記してください。

## 現行の文体ルール

文体の正本は [WRITING_STYLE.md](WRITING_STYLE.md)。事実・出典・世界観等は [EDITORIAL_STANDARDS.md](../EDITORIAL_STANDARDS.md) に従う。本ログの過去の文体・編集指示と相違する場合は現行の両文書を優先し、承認済み本文を無断変更しない。

## 公開URLの正（最重要・ChatGPT／Claude共通）

- **BGS Chronicles の正しい公開URLは `https://teruluce.github.io/disney-bgs/` です。** リポジトリは `teruluce/disney-bgs`、本番ブランチは `main`。
- 旧ホスト `https://teruluce07-cmd.github.io/disney-bgs/` は**現在は使われておらず、アクセスできません**。canonical・OGP・X共有URL・構造化データ・サイトマップ・robots.txt・`scripts/seo_audit.py` の `BASE_URL` に、旧ホストを**絶対に書かないこと**。
- 「外部取得で確認できた」というだけで公開URLを変更しないこと。取得ツールの結果が古い・誤っている可能性があるため、URLの変更が必要に見える場合は、運営者（teru_luce）に確認してから作業する。
- 2026-10-24 に PR #55 で旧ホストへ戻してしまったが、同日に新ホストへ修正した（下の履歴参照）。

## 記事本文の書き方：メタ的な言い回しを避ける（最重要・ChatGPT／Claude共通）

運営者（teru_luce）の方針：BGS Chronicles は「物語を紐解く」サイトであり、ブランドの世界観を優先する。情報の透明性は大切にしつつ、**記事本文では調査の舞台裏や出典の話を前に出さない。**

- 本文・コラム見出しに、「公式ブログによると」「公式サイトでは〜と紹介されています」「今回確認した範囲では見つかりませんでした」「公式には確認できません」といった**調べ方や出典に触れるメタ的な言い回しを書かない。** 作中の語り口（「〜でした」「〜といわれています」「〜という見方もあります」）で書く。
- 作中の事実とファンの考察の区別は**削除せず**、「ファンの間で語られる」「あくまで考察のひとつ」「真偽のほどは定かではありません」のように、物語の流れを止めない言い方で保つ。確証のない話を事実として断定しない方針は変えない。
- 出典の明示は、記事末尾の折りたたみ「参考資料」欄で行う。本文中に出典の説明を増やさない。
- 作中設定としての「公式の木箱」「非公式の会議室」のような語や、実際の出来事（例：コンセプトアートの公式発表）の記述は対象外。
- 新規記事・加筆・修正のいずれでも、この方針に沿って書く。既存記事で見つけた場合は、気づいた時点で直してよい。
- この方針は、作業ログ・PR説明などの**運営者向けの記録**には当てはまらない。そちらでは、何をどう確認したかを従来どおり正確に記録する（「未確認」を「確認済み」と書かない）。

### 調査資料・ディープリサーチをもとに書くときの追加ルール（2026-10-28 運営者指示）

調査資料の言い回し（報告書調・ニュース調・出典を匂わせる文末）が、そのまま記事に残らないようにする。2026-10-28 の「A World of Stories」で「〜に沿えば」「〜が発表されています」「設定では〜とされています」が残り、運営者の指摘で直した。

- 資料の文体を写さず、記事の語り口（「〜でした」「〜ました」「〜といわれています」）で書き直す。出典に触れる言い回し（「〜によると」「〜に沿えば」「〜によれば」「〜の報告では」）は本文に残さない。
- **二重のぼかしをしない。** 「設定では」と「〜とされています」を同じ文に重ねない。作中の組織・人物・出来事（S.E.A.、ハイタワー三世など）は、物語の事実として言い切る。
- ニュース調の文末（「〜が発表されています」「〜と報じられています」）は、「〜が明かされました」のように物語の流れに合う言い方へ。
- 出どころのはっきりしない逸話は「〜と語り継がれています」「〜といわれています」でよい。ぼかすのは本当に不確かな点だけにし、段落全体を伝聞で覆わない。
- 公開前に本文を次の語で検索し、残っていれば書き換える：`公式|によると|によれば|に沿えば|と伝えられ|発表されています|報じられ|とされています|設定では`。作中設定としての語や、実際の出来事の記述（対象外の項目）は残してよい。

## AI名の付け方（ChatGPT／Claude／Codex共通）

複数のAIや複数のチャットが並行して作業しても記録が混ざらないよう、**新しいチャットで作業を始めるときに識別名を付ける。**

- 形式：`AI名-BGS-YYYYMMDD`（例：`ChatGPT-BGS-20261028`、`Claude-BGS-20261028`）。Codexは `Codex-BGS-YYYYMMDD`。同じ日に同じAIが複数のチャットで作業する場合は末尾に連番を付ける（例：`ChatGPT-BGS-20261028-2`）。
- 識別名は運営者（teru_luce）が指定する。指定がなければ、このルールの形式で自分で決めて、作業ログとPR説明の冒頭に書く。
- 過去の記録（「ChatGPT」「Claude」「Codex-BGS-20261027」など）は書き換えない。以後の作業から適用する。
- GitHubのコミット作者名はAIの区別に使えない（ChatGPTやCodexの変更は運営者のアカウント名義で記録されることがある）。誰が作業したかは、このログの識別名で判断する。

## 運用ルール

- 作業開始時：このログ、対象ブランチ、関連 PR の差分・コミットを確認し、未完了タスクと競合を確認する。
- 作業終了時：AI名、日付、対象ファイル、変更内容・理由、検証結果、コミット URL、PR URL、状態、公開確認状況、残作業と次の担当への引き継ぎを記録する。
- 状態は「着手前」「作業中」「検証待ち」「レビュー待ち」「マージ済み」「公開確認済み」「保留・要相談」を区別する。「マージ済み」はデプロイ・公開確認を意味しない。
- 記録と実コードが違う場合は GitHub の実際の状態を優先し、このログを訂正する。
- 他方の AI が変更したファイルはログと差分を確認してから編集し、作業中の変更を無断で上書きしない。
- ソース検証、ブラウザ表示確認、GitHub Pages のデプロイ、公開サイトでの確認は別々に記録する。未実施の確認を実施済みと書かない。

## 作業履歴

### 2026-11-24（JST）— Codex-BGS-20261124-10 / 資料室の手動デプロイ準備

- PR #148 の `bc64043` から再開。最新 `main` は `2a7ae3e`。運営憲章、`AGENTS.md`、編集・AI連携ガイド、関連する運用文書と引き継ぎを確認。差分は資料室の実装・テスト、Actions、運用文書に限定。
- `bgs-ai-deploy.yml` に運営者が `main` から手動で実行する `preflight` と閉鎖状態の `deploy` を追加。`preflight` は GitHub Actions の既存 Secrets を用いて対象 Worker、`GEMINI_API_KEY` と試験用 Secret の登録、URL の状態を読み取る。デプロイは Workers Free・追加ルートがないことの確認と既存 URL の閉鎖を条件とし、反映後に URL と Secret 名を再確認する。PR 検証は別ワークフローで模擬テストとドライランを実行する。
- Google の公式料金表で Gemini 3.8 Flash と 3.1 Flash-Lite の標準生成を両方 Free 対象と確認。3.8 Flash を品質比較候補とし、設定で選択可能にした。選択モデルと無料枠の確認済みモデル ID が一致するまでは推論停止。日英の実モデル比較と実効上限の確認は承認後の試験に残る。 [運用手順](BGS_AI_PILOT.md)
- ローカルで `npm test` 15件、`npm run test:runtime` 2件、`actionlint`、`python3 scripts/check_site.py` が成功。Cloudflare 認証失敗、Secret 欠損、公開 URL が有効な場合の停止と閉鎖デプロイの条件を模擬検証した。両モデルで試験認証・引用と Gemini の429後の停止を確認した。
- 運営者から Workers Free と既存 Worker・Secrets の準備完了の報告あり。開発環境からの GitHub Secrets 一覧の取得は権限不足で403。手動ワークフローは `main` に存在せず、GitHub の初回登録仕様により Cloudflare 実機の `preflight` はマージ承認待ち。Secrets の変更、実環境デプロイ、Gemini への実送信、公開作業は未実施。 [実装コミット](https://github.com/teruluce/disney-bgs/commit/5a07b2b227ae83dd59a41cc989e70c55cce8a64b) ／ [PR #148](https://github.com/teruluce/disney-bgs/pull/148) ／ [CI](https://github.com/teruluce/disney-bgs/pull/148/checks)

### 2026-11-24（JST）— Codex-BGS-20261124-9 / 資料室（仮称）の非公開AI試験

- 起点は最新の `main` `2a7ae3e`（PR #147マージ済み）。`AGENTS.md`、`AI_GOVERNANCE.md`、`EDITORIAL_STANDARDS.md`、文体の正本・運営者の添削例・本ログ・サイト品質検査文書を確認。記事台帳の24記事から2,888件の候補を再生成する構成と、日英の検索・出典付き回答画面を `tools/bgs-chronicles-ai/` に追加した。公式資料と照合した3箇所を「公式設定」と表示する。
- 試験は成人の運営者1名・日本からの接続に限定。HTTPS の試験認証、質問500文字、出力640トークン、同時推論1件、日次・60秒の利用枠を実装した。無料枠の確認前は推論停止。Google 側の429受信後は米国太平洋時間の翌日午前0時まで受付を停止する。Cloudflare One Free の初期登録に支払い情報が必要なため、Worker 自体で認証する構成を選んだ。
- 検証は試験の単体9件とローカル Workers ランタイム1件、Wrangler のドライランに成功。Chromium 320・390・768・1024・1440px で日英の模擬回答、出典、生成待ち、上限・エラー、履歴なしを確認。`python3 scripts/check_site.py` はSEO 27ページ・警告0、共有26件、台帳24記事、単体31件。既存 Chromium は全体243件、トップ16件、読者ページ182件が通過。価格と規約の確認、運用手順、Workers AI 比較は [試験運用文書](BGS_AI_PILOT.md) を参照。
- Cloudflare と AI Studio の管理画面はサインインが必要。実効無料枠と課金状態、`GEMINI_API_KEY` の登録状態、Gemini への実接続と日英品質は未確認。運営者の確認・承認後に既存 Worker で非公開試験を検証する。状態はレビュー待ち、デプロイ・公開確認は未実施。 [実装コミット](https://github.com/teruluce/disney-bgs/commit/383b21ededcbe69e49b032a5c047e04133b67469) ／ [ドラフト PR #148](https://github.com/teruluce/disney-bgs/pull/148) ／ [CI](https://github.com/teruluce/disney-bgs/pull/148/checks)

### 2026-11-24（JST）— Codex-BGS-20261124-8 / 文体品質改善・第2期

- 起点は最新の `main` `23312f8`。着手時のオープンPRは0件。AGENTS.md、AI_GOVERNANCE.md、EDITORIAL_STANDARDS.md、WRITING_STYLE.md、WRITING_EXAMPLES.md、本ログの運営方針・対象記事・直近の引き継ぎ、SITE_QUALITY_CHECKS.mdを確認した。手本はファンタジースプリングス、タワー・オブ・テラー、アメリカンウォーターフロント。第1期の変更と文体基準を先行PRの差分で確認した。 [PR #143](https://github.com/teruluce/disney-bgs/pull/143) ／ [PR #144](https://github.com/teruluce/disney-bgs/pull/144) ／ [PR #145](https://github.com/teruluce/disney-bgs/pull/145) ／ [PR #146](https://github.com/teruluce/disney-bgs/pull/146)
- 提供原稿を4記事の43項目に反映した。L03 8項目・14箇所、L08 6項目・14箇所、S11 13項目・33箇所、S13 16項目・73箇所。箇所数は `git diff --unified=0` の連続差分単位で、編集日・同期した目次や表のセルを含む。B07は現行文を保持する指定。本文の段落は指定に沿って分割・整理し、用語に連動する目次と、表示編集日・既存の該当メタデータ／サイトマップを同期した。
- **L03 A01–A08**　幻想・情景型と歴史紀行・文化型。城の色、遠近法、回廊、カルガモの描写を置換。第VI章と城の高さ6件を保持。香港は公式発表の「プリンセスや女王が登場する13の物語」に合わせ、パリは庭木・金箔・ドラゴンを保持した。フロリダは2026年6月に塗り替えを終え、白やグレーを含む往年の配色に近づいた。フェアリーテイル・ホールはキャスト本人の記録にある数年後の再訪とダンスを保持し、子連れの再訪と「また来たよ！」は掲載を保留した。金色の塔は東京の現物描写を採用し、ウォルトの好み・制作意図・ファンの逸話は採用を保留した。高さはフロリダ・パリの公式値、カリフォルニアの77フィート（約23.5 m）、東京・香港・上海の比較資料を照合し、丸めや一次資料の範囲に差があるため既存のメートル値を維持した。 [キャストの記録](https://www.tokyodisneyresort.jp/tdrblog/detail/210215/) ／ [香港公式](https://disneyparksblog.com/hkdl/hong-kong-disneyland-unveils-first-of-its-kind-castle-of-magical-dreams/) ／ [パリ公式](https://news.disneylandparis.com/en/chateau-renovation/) ／ [フロリダの塗り替え](https://disneyparksblog.com/wdw/meet-the-team-behind-cinderella-castles-sparkling-refresh/) ／ [各城の比較資料](https://disneyparknerds.com/disney-castles-height-comparison/)
- **L08 B01–B07**　物語・昔話型と制作史・理念型。21歳の期限と晩餐の歌にある十年を残し、呪いを受けた年齢は考察の表現にした。教育の未熟、野生化、記憶の喪失の3仮説はいずれもイマジニアによる採用の裏付けがなく掲載保留。朝食コラム直後の一文と、村から城への道のり、変身、結びを保持した。六つの部屋、暖炉周辺のルミエールとコグスワース、乗り場への動線、蹄鉄表6行を維持した。Bモードは代替映像があるという描写を残し、追加が2シーンという数は制作資料や映像で確認できず保留。チュロスの紹介は別枠を維持し、2026年11月時点の販売休止案内に合わせて筆者の既存の体験を振り返る表現にした。 [AFIの映画資料](https://catalog.afi.com/Catalog/MovieDetails/55212) ／ [台詞と歌の対照資料](https://www.springfieldspringfield.co.uk/movie_script.php?movie=beauty-and-the-beast-1991) ／ [城内の現地記録](https://www.cinematoday.jp/news/N0118822) ／ [ル・フウズ公式メニュー](https://www.tokyodisneyresort.jp/tdl/restaurant/food/291/)
- **S11 C01–C08**　物語・昔話型と制作史・理念型。説話集の編纂と航海譚の来歴を区別し、8〜9世紀という成立年の断定を保留。七航海のコラム、比較表の全7行、シーンカード全6件を維持。第1航海の巨大な魚、第2航海のロックと宝石の谷を訂正し、第3航海の一つ目の巨人と第7航海の象牙は版による違いを踏まえて記載した。サイクロプスとの同一視と、ギリシャ神話のサイレンを七航海のエピソードとする記述を取り除いた。旧版は当時の映像に沿って具体的な演出と2006年終了・2007年更新を保持し、子供が泣いたこと・空席や利用動向・原典を徹底研究したという制作工程の断定は保留。現行の雛・母鳥の羽・巨人・バズラへの帰還は公式の場面記録を参照した。 [米国議会図書館](https://blogs.loc.gov/international-collections/2017/08/the-seven-voyages-of-sindbad-the-sailor/) ／ [諸版の比較研究](https://www.mappilaheritagelibrary.com/wp-content/uploads/2020/12/CHRISTIAN-ARABIC-AND-GARSHUNI-VERSIONS-OF-SINDBAD-THE-SAILOR.pdf) ／ [Lang版の航海本文](https://www.fairytalesforteachers.com/sinbad) ／ [2001年の乗車記録](https://www.youtube.com/watch?v=guMCYkoyNe0) ／ [現行の場面記録](https://www.tokyodisneyresort.jp/tdrblog/detail/191031_2/)
- **S11 C09–C13**　メンケンの担当、歌手、旋律が場面ごとに変わる構造、チャンドゥの描写を保持。8〜9世紀の音楽を再現したという制作意図と、嵐の場面の具体的な調性は採用保留。サルタンの願いは公式に記された「臣民にアラビアンナイトの魔法や楽しさを体験してほしい」という内容に合わせた。Spatial Epicの関連リンクは同じURLへの案内を水辺と八つの港に合わせた。 [ヤマハの楽譜資料](https://www.ymm.co.jp/p/detail.php?code=GTP01101817&dm=sl&dso=10) ／ [清塚信也の編曲取材](https://spice.eplus.jp/articles/286609) ／ [サルタンの願い](https://www.tokyodisneyresort.co.jp/tdrblog/detail/180124/) ／ [チャンドゥの公式記録](https://www.tokyodisneyresort.jp/tdrblog/detail/200810/)
- **S13 D01–D07**　歴史記録・事件型と歴史紀行・文化型。紋章の4図柄と年表6行を維持。1538年の創設以前に亡くなったダ・ヴィンチは要塞の肖像の説明に置き、1815年開館、1850年館長就任、1851年入会を区別した。1899年の肖像画の展示場所・年代・ハイタワー三世、ミスティック卿、オーシャニア船長の姿と大晦日の失踪を保持し、描かれた会合の開催地・出席者の全容・数時間後という間隔は資料間で一致せず保留。1908年は公開の重複を整理し、1908年は既存年表の値を保持し、公開の開始年としての確証は保留した。Disney Filesが紹介する1896年の開館写真を区別して記載した。1938年はコン博士とモス博士のナイル川の船旅に具体化した。荷札は観察できる特徴を残し、学会の輸送網を使った密輸は保留。フロリダの警告書は削岩機の売却を残して要旨で示し、東京側に転用しなかった。レオナルドチャレンジは地図・学会の印・参加者を迎えるプログラムを残し、ダ・ヴィンチ本人の考案と名誉会員の肩書きは保留とした。 [Disney Files](https://secure.cdn3.wdpromedia.com/media/dvc/languagespecific/eng/member/justformembers/disneyfilesmagazine/2017/Disney-Files-2017-fall.pdf) ／ [博物館の公式資料](https://www.tokyodisneyresort.jp/tdrblog/detail/220728/) ／ [集合肖像画の現地記録](https://dejiki.com/2013/12/hkdl-mystic-manor-queue-preshow/) ／ [オーシャニア船長の肖像の資料](https://jungleskipper.com/sea/members/captain-mary-oceaneer) ／ [1938年の公式資料](https://disneyparksblog.com/dlr/drinks-and-mugs-at-trader-sams-enchanted-tiki-bar-disneyland/) ／ [警告書の記録](https://jungleskipper.com/sea/members/jason-chandler) ／ [チャレンジ公式案内](https://www.tokyodisneyresort.jp/tds/attraction/detail/245/)
- **S13 D08–D09**　人物カード12件の説明を更新。ミスティックの1874年・1882年、ハイタワーの失踪日・木箱・娘、ファルコの研究と館長職、ブリオンの1870年、オーシャニアのM.S.ソルティ、チャンドラーのディスカバリーベイと手紙、フォールズの会社、コン博士の研究と第VI章の2021年、アヤの手紙と望遠鏡付きパドル、プレジャーの社交場、ブラウアーヒメルの1904年・郵便物・カメラバッグ、ロブステッリの会長職を保持した。チャンドラーが鉱山で富を得たこと、アレッタの翼の構造と設計の因果、プレジャーの1911年の発見、ロブステッリによる推薦・要塞やワインセラーの管理は保留。銘板写真12本の川名・年号を照合し、ムベイ川の英字を Mbei River に訂正した。パドル表はヘイゼル以前の12行を扱い、現在の総数は断定していない。英字3名を銘板・手紙・D23と照合した。 [パドルの記録と写真](https://jungleskipper.com/sea/attractions/tropical-hideaway) ／ [フォールズの銘板](https://jungleskipper.com/gallery/attractions/tropical-hideaway/paddle-dr-a-falls.jpg) ／ [タンダジの銘板](https://jungleskipper.com/gallery/members/chef-tandaji/paddle.jpg) ／ [アヤの展示記録](https://www.micechat.com/372513-disneyland-update-exciting-openings-maintenance-concerns-holiday-crush-pin-rules/) ／ [D23のプレジャー表記](https://d23.com/a-to-z/adventurers-club/)
- **S13 D10–D13**　ルネサンス号、天文展示、マゼランズの地球儀と隠し書棚、ソアリンの博物館と機体、ミスティック・マナーの肖像画、スキッパー・キャンティーンのフェズ帽・書名・隠し扉、M.S.ソルティの遺物を保持。ダ・ヴィンチ・マゼラン・ガリレオと要塞内の個々の装置の同定は確認できた範囲にとどめた。ミステリアスアイランドではS12と公式資料が支える地熱発電所・無線送電を同じ囲み欄に残し、未確認の地熱コア・テラベーターの駆動系統との接続・深度1マイルを保留。ネモ船長の学会会員資格は断定していない。 [ルネサンス号と天文展示](https://www.tokyodisneyresort.jp/tdrblog/detail/170821/) ／ [マゼランズ](https://www.tokyodisneyresort.jp/tds/restaurant/detail/412/) ／ [S12調査記録](research/mysterious-island.md) ／ [スキッパー・キャンティーンの執筆担当者の話](https://mainstreetlibrary.substack.com/p/exploring-the-skipper-canteen-library) ／ [フェズ帽の展示記録](https://seadict.dbstory.jp/skipper-canteen/) ／ [ミス・アドベンチャー・フォールズ公式](https://disneyworld.disney.go.com/attractions/typhoon-lagoon/miss-adventure-falls/)
- **S13 D14–D16**　ローデはディズニー公式がハイタワーのモデルと明記。ブリオンとバクスターは外見の関係として記述した。ヘイゼルはD23の事後記録に合わせ、手紙で推測と目撃が別々に語られること、翌日が父と町を訪ねた日の翌日であること、公式に会員として紹介されたことを反映。パドルの追加と入会手続きは結び付けていない。展示は開始時の記録とし、終了日・現在のチケット残数は確認できていない。父への思い・出生・装置・結びを維持。誤記と船名重複を直し、Disney Discoveryの関連記事は旧URLの統合先に直接リンクした。 [ローデの公式資料](https://disneyparksblog.com/disney-experiences/celebrate-joe-rohde-the-brilliant-mind-behind-disney-parks/) ／ [ブリオンの肖像資料](https://wdwnt.com/2026/05/barnabas-t-bullion-letter-commemorates-big-thunder-mountain-railroad-reopening/) ／ [ヘイゼルの手紙と紹介](https://disneyparksblog.com/disney-experiences/new-sea-character-disney-parks/) ／ [統合先の章](https://teruluce.github.io/disney-discovery/articles/tdr-history-timeline.html#sea-history)
- 静的検査は `scripts/check_site.py`（SEO 27ページ、警告0、Pythonテスト31件を含む）と `git diff --check` が成功。HTML5診断は元の4記事で5／10／10／10件で増加なし。インラインJS4件の構文、人物表示データ以外のスクリプト、全CSS・画像・表の構造・章アンカー・既存の参考資料12件を照合した。対象・サイトマップ・本記録以外の差分はなく、第1期の4記事と対象のタイトル・副題・記事番号を保持した。
- Chromiumの全体243件・トップ16件・読者ページ182件に成功。対象4記事は320／390／768／1366pxで、目次27件、表7件、画像13件、折りたたみ、関連リンクを確認した。S.E.A.は12カードすべてを4画面幅で本文表示・クリック・Enter／Space・Tab／Shift+Tab・Escape・閉じるボタン・フォーカス復帰まで確認した。デスクトップとスマートフォン幅の画像を目視確認。390pxではハイタワーの英名と閉じるボタンが一部重なる既存の表示をベースと同じ位置で再確認した。モバイル実機、公開環境は未確認。
- 状態は運営者レビュー待ち。 [記事のコミット](https://github.com/teruluce/disney-bgs/commit/ae5789f80043b8252194d1be15f8021aeda4864a) ／ [PR #147](https://github.com/teruluce/disney-bgs/pull/147)

### 2026-11-24（JST）— Codex-BGS-20261124-7 / 文体品質改善・第1期

- レビュー待ち。main `63d4f3c` の `AGENTS.md`、`AI_GOVERNANCE.md`、`EDITORIAL_STANDARDS.md`、`docs/WRITING_STYLE.md`、`docs/WRITING_EXAMPLES.md` と本ログの運営方針・対象記事の履歴・直近の引き継ぎを確認。PR #143・#144の文体基準と運営者の添削例に従い、題材ごとの主・副文体を維持した。着手時のオープンPRは0件。L07はマージ済みのPR #145で対応済みのため、第2期の記事とともに今回の差分から除外した。
- 指定文と関連表示をL10で28箇所、S02で22箇所、L01で16箇所反映。隣接段落を一括置換した場合は1箇所として集計。L10は工程表の4セル、人物紹介5件を含む。S02の水を軸にした考察、S.E.A.の考察注記と結びを維持。S.E.A.は現行の関連資料と公式案内に合わせて学会とし、本文・見出し・目次・記事内の説明メタデータを整合。アメリカンウォーターフロントとタワー・オブ・テラーの関連リンクは各リンク先と一致。L01は第I章の小見出しと目次、人物紹介4件、役職表示2件を更新。高橋政知の既存の長い引用、L02へのリンク、浦安の海とパレードを結ぶ最終段落を保持した。
- 照合・保留。A03は蓄電池の採用とスタジオでの用途を確認したが、その用途向けに開発されたという根拠は未確認。A07のボブ・ジャニの選曲案、A12の停止時の変身、A18のロン・ミジカーのカードの建物への衝突と衣装の火花は、具体的な情報を残すため原文を保持。A06の区画別音響同期は確認できたが地中機器の設置は未確認。A15の英語の逐語出典とA13の取材記録は未確認のため、指定の代替文を採用。A16のウォルトの既存訳と話者はD23と照合して保持。LED・光ファイバーの採用は確認し、全面移行の時期は断定していない。 [Don Dorseyの制作記録](https://www.dondorseyconsulting.com/dscoop-ep.htm) ／ [Mizikerの取材記事](https://www.latimes.com/travel/themeparks/la-tr-disneyland-main-street-electrical-parade-20161212-story.html) ／ [光源の変遷](https://magazine.atnavi.net/articles/35793) ／ [D23](https://d23.com/65-years-later-disneyland-59-shows-company-at-the-forefront-of-innovation/)
- B05は一攫千金を狙う来訪者を、B07の第3段落はセンター・オブ・ジ・アースの固有名と硫黄臭の描写を保持。B08の冒頭は公式の物語が記憶を刻んだ先を「泉」と記すため保留。B12は公式の一般的な音響工夫と境界の滝の現地記録を照合して指定文を採用。C02は1980年12月の着工式と1981年1月の本格工事開始を区別する公式沿革を確認して保留。高橋政知の長い引用の逐語一致は未確認。C07はL02の資料と照合し、屋根を名称の理由とする断定を指定の描写に置換。各項目の出典・保留の詳細はPRに記録。 [ファンタジースプリングス公式案内](https://www.tokyodisneyresort.jp/special/fantasysprings/index.html) ／ [音響の公式解説](https://www.tokyodisneyresort.jp/tdrblog/detail/190607/) ／ [オリエンタルランド沿革](https://www.olc.co.jp/ja/company/history/history03.html) ／ [ワールドバザールの掲載資料](https://shuchi.php.co.jp/amp/article/1944)
- 全文差分を目視し、66箇所の置換を元HTMLから再現してバイト単位で一致。指定段落の段落分けと明示したラベル・メタデータ以外の要素と属性を比較。HTML5のパース診断は各3ページとも基準版から増加なし（既存の文字参照診断が各10件）。タイトル・副題、章番号・アンカー、記事番号・URL、画像・出典、表の行列、カードの操作コードを保持。インラインJavaScript3件の構文検査が成功。変更した本文に調査手順や出典注記は含めていない。
- `python scripts/check_site.py` 成功（SEO 27ページ・警告0、共有26件、台帳24記事、単体31件）、`git diff --check` 成功。ローカルChromiumで全体243件、トップ16件、読者ページ182件が通過。3記事を320・390・768・1440pxで確認し、目次、表、画像、人物カード10件の文章とキーボード操作・フォーカス復帰、横はみ出しとJavaScriptエラーがないことを検証。
- [記事の実装コミット](https://github.com/teruluce/disney-bgs/commit/af0a6a2b9006b28148d6aefb51169dd247d60696) ／ [PR #146](https://github.com/teruluce/disney-bgs/pull/146) ／ [CI](https://github.com/teruluce/disney-bgs/pull/146/checks)。運営者のレビュー・マージ承認待ち。公開前の確認事項は上記の保留項目を参照。

### 2026-11-24（JST）— Codex-BGS-20261124-6 / スモールワールド本文の部分校正

- main `b068de5` から作業ブランチを作成。着手前に `AGENTS.md`、`AI_GOVERNANCE.md`、`EDITORIAL_STANDARDS.md`、`docs/WRITING_STYLE.md`、`docs/WRITING_EXAMPLES.md`、本ログの運営方針・対象記事の履歴・直近の引き継ぎ、PR #140・#144を確認。着手時のオープンPRは0件。主文体は制作史・理念型、副文体は幻想・情景型とした。
- `bgs-smallworld.html` に指定の21項目をそのまま反映。04の2段落を含め本文22箇所を置換し、うち4箇所は人物カード紹介文。制作史・理念は既存の巻末資料と過去の検証記録を照合。キューバ危機後の作曲はThe Walt Disney Family Museum、移設・開業日はDisneyland Resort、ファサードでのブレアとクランプの役割はThe Walt Disney CompanyとImagination Skyway、最後の一節はDisney Parks Blogの記載を確認。反映保留は0件。本文に調査手順や出典注記の追加はない。
- 全文差分を目視し、22箇所の逆置換で元HTMLとバイト単位で一致。HTML5の厳密パースと全要素・属性の比較でも一致し、7章、強調表示、人物カード4件の構造を確認。万博と合唱の後続文、画像・アニメーション、出典、URL、L07／008を維持。前回の8,679字から48字増で、600字／分を切り上げた読了目安は15分。最終編集日、構造化データ、サイトマップの更新日は作業日と同じ2026年11月24日。
- `python scripts/check_site.py` 成功（SEO 27ページ・警告0、共有26件、台帳24記事、単体テスト31件）。`node --check smallworld.js` と `git diff --check` も成功。
- [記事の実装コミット](https://github.com/teruluce/disney-bgs/commit/1490627d1dd988b280c5aabe185d82db2b8e5dcb) ／ [PR #145](https://github.com/teruluce/disney-bgs/pull/145) ／ [PRのチェック](https://github.com/teruluce/disney-bgs/pull/145/checks)。この記録の作成時点ではCI確認中。マージ承認済み。最終のCI・マージ後の公開確認結果はPRに記録する。

### 2026-11-24（JST）— ChatGPT-BGS-20261124-3 / 題材別文体と運営者添削例

- 運営者の指示により文体の正本 `docs/WRITING_STYLE.md` の第6節を5分類（歴史記録・事件、歴史紀行・文化、物語・昔話、幻想・情景、制作史・理念）へ改定。主文体・副文体を新規執筆・大幅改稿前に選ぶ方式とし、共通の品質基準と題材ごとの語り口を区別した。
- 運営者の10例の文体練習（8例の添削、2例の変更なし）を `docs/WRITING_EXAMPLES.md` に収録。明らかな入力誤り・固有名詞表記のみ整理。事実の裏付けとは区別し、四つの風の塔の移設理由等は別途検証が必要と明記した。自然な観察表現・情景に沿う比喩を許容し、不要な受動表現や修飾語を抑える。
- `EDITORIAL_STANDARDS.md` の文体参照を同期。PR #143はマージ済み、旧PR #141はクローズ済み。今回の変更は文書のみ。確定原稿・既存記事・デザイン・運営憲章は変更しない。マージは別途承認待ち。

### 2026-11-24（JST）— ChatGPT-BGS-20261124-2 / 文体ルールの統合

- 運営者提供のClaude作成 `BGS_WRITING_STYLE.md` と既存編集基準および未マージPR #141の内容を照合し、文体の正本を `docs/WRITING_STYLE.md` に集約した。アメリカンウォーターフロントを第一基準、タワー・オブ・テラーとファンタジースプリングスを題材別、ミラコスタを補助基準とする。
- 案内口調を抑え、自然な日本語を優先する。文末回数・接続詞は機械的な禁止にせず目安とする。承認済み原稿の無断変更禁止、情報量維持、部分校正の軽量引き継ぎを明文化。事実・出典・世界観・デザイン・公開の既存規定を維持。
- `AGENTS.md` と `EDITORIAL_STANDARDS.md` から正本へ参照を追加。過去の履歴は保持。変更は運用文書のみ。PR #141を統合版で置き換える提案。マージ・公開確認未実施。

### 2026-11-24（JST）— Codex-BGS-20261124 / 全24記事の基本タイトルの統一

- 最新main `6509177` の必読5文書、目次を確定したPR #129、番号と前後リンクのPR #130、最新記事PR #132を確認。既存PR #133は別件の公開記録を末尾へ追加するため、本件は作業履歴の先頭に記録した。
- 24記事の目次・カード・H1・副題・検索タイトルと説明・OGP・X Card・JSON-LD・番号・前後リンク・関連記事を照合。10記事のH1と7枚のカードを、承認済みの目次名に合わせた。番号・掲載順・永久資料番号は従来どおり。
- `archive-order.json` の既存の `tocTitle` から目次・カード主見出し・同じグループ内の前後リンク名を生成する。新しい記事では、この値と同じ英語名をその記事のH1に記し、生成後に `python scripts/check_site.py` で確認する。基本タイトルが変わっても、小説的な副題や日本語の検索名を個別に編集できる。旧カード名でも引き続き検索できる。

| 番号 | 変更前のカード | 変更前のH1 | 目次・カード・H1の統一表記 |
|---|---|---|---|
| L01 | Tokyo Disneyland | Tokyo Disneyland | TDL History |
| L07 | It's a Small World | It's a Small World | it’s a small world |
| L10 | Electrical Parade | Tokyo Disneyland Electrical Parade | Electrical Parade |
| S01 | Birth of DisneySea | Birth of DisneySea | TDS History |
| S02 | TDS Spatial Epic | Sea of Adventure & Imagination | Spatial Epic |
| S04 | Soarin' | Soarin' | Soaring: Fantastic Flight |
| S06 | Tower of Terror | Hotel Hightower | Tower of Terror |
| S08 | Indiana Jones | Indiana Jones | Indiana Jones Adventure |
| S10 | Fantasy Springs | The Spring of Remembrance | Fantasy Springs |
| S11 | Sindbad's Voyage | Storybook Voyage | Sindbad’s Storybook Voyage |

- 表記が一致していた14記事は L02 World Bazaar、L03 Cinderella Castle、L04 Big Thunder Mountain、L05 Splash Mountain、L06 Haunted Mansion、L08 Beauty and the Beast、L09 Tomorrowland、S03 Hotel MiraCosta、S05 American Waterfront、S07 Port Discovery、S09 Raging Spirits、S12 Mysterious Island、S13 S.E.A. Archives、W01 A World of Stories。
- S01・S02・S10は旧英語H1を副題へ移した。S06はホテル名を日本語の副題に残し、「傲慢なる略奪の果てと、影の忠臣」を維持。L07の独自の見出しとL09のHUD、W01の装飾表紙を保存。歴史記事の名称はPR #129指定のTDL/TDS表記を踏襲。
- L07・S03・S05の関連欄で、英語の記事名をリンク先と統一。S10からS.E.A. Archivesへの案内がテーマポート総覧を指していたため、同じリンク先に学会の名称と既存の副題を添えた。文脈を伝える日本語リンク、写真内・表紙の題字、検索用の見出しは個別の役割を保つ。
- 再生成と生成一致検査、サイト検査（27ページ、SEO警告0件）、単体テスト31件、サイト内リンク431件が成功。トップと24記事のheadを変更前とバイト単位で照合。本文、写真、出典、URL・アンカー、前後リンク、各番号も照合。Chromiumのトップ16条件で検索とキーボード操作を確認。実機と検索順位は未測定。
- 2026-11-24 00:28 JST、運営者の条件付き承認に従い、最終ヘッド `ac1ac5c` の静的SEO・Chromium・Firefox・WebKitのCI全4件成功、21ファイルの差分の自己レビュー、既存PR #133との試験マージ成功を確認してPR #134をマージ。マージ後のツリーは検証済みのヘッドと同一。[実装コミット](https://github.com/teruluce/disney-bgs/commit/ac1ac5c78d126ca551d9962d6cb990504845a464) / [PR #134](https://github.com/teruluce/disney-bgs/pull/134) / [マージコミット](https://github.com/teruluce/disney-bgs/commit/b6295275addc36d492364e917f685f832ea61f0b) / [PRのCI](https://github.com/teruluce/disney-bgs/actions/runs/45203186351)
- ローカルChromiumの既存ブラウザー検査は243ページ・画面幅、トップ16条件、読者ページ182条件で成功。390・1280pxおよびJavaScript無効の320pxで毎回目次→カード→記事を開き、各条件の全24経路でH1・番号・永久資料番号、横方向の収まりを検査。390・1280pxでは5記事の題字を画像でも確認した。
- 公開確認済み。00:29 JST、Pages APIの対象コミットが `built` となり、Actionsのビルド・デプロイ・結果報告が成功。HTTPSでトップと全24記事、掲載順JSON、共通JS、サイトマップ、旧URLの転送HTML、robots.txtの計30点がHTTP 200でマージコミットとバイト単位で一致した。公開Chromiumでも同じ3条件で計72経路が成功。ブラウザーでは実行環境の証明書エラーを許容し、独立のHTTPS取得で証明書検証を有効にした。[Pages](https://github.com/teruluce/disney-bgs/actions/runs/45205697295) / [公開目次](https://teruluce.github.io/disney-bgs/#toc)
- マージコミットにも静的SEO・Chromium・Firefox・WebKitの4件が成功。公開記録のみの追記は既存のCIのパス指定の対象外。追記後も生成一致・サイト検査・単体テスト31件・差分検査に成功した。[mainのCI](https://github.com/teruluce/disney-bgs/actions/runs/45205697654) / [公開確認記録のPR #135](https://github.com/teruluce/disney-bgs/pull/135)

### 2026-11-24（JST）— Codex-BGS-20261124-2 / Haunted Mansion の特集紙面

- 最新main `7912c48` のAGENTS.md、AI_GOVERNANCE.md、EDITORIAL_STANDARDS.md、本ログの方針・対象記事・直近の引き継ぎを確認。既存PR #133はAmerican Waterfrontの公開記録を追記するため、本件は作業履歴の先頭付近へ記録した。
- 提供された確定候補原稿v2の英語題・副題、I〜Xの見出し、リード3段落と本文42段落（計4,871字）を保持。広い画面では外観写真とリードを並べ、本文の左に追従する索引を配置。狭い画面では従来の一列を用い、VII章の記録簿を細い二重罫で示した。既存5章のアンカーは対応する新章に引き継いだ。
- X章にS.E.A. Archivesへの本文リンクを追加し、既存の関連記事、戻りリンク、前後リンク、巻末の折りたたみを保持。巻末に2023・2024年の企画や東京・フロリダ・カリフォルニアの花嫁の資料を加えた。掲載番号 `L06` と永久資料番号 `003` は生成結果と照合。記事とカードの読了目安は600字／分で切り上げて9分。カード・X共有文、検索メタデータ、OGP・X Card・Article JSON-LD、編集日とサイトマップを更新した。
- 運営者がアップロードした既存公開写真と同じ3ファイルを継続使用し、EXIF・GPSを含まないことを確認。記事写真の看板に合わせてホリデーナイトメアー期間の外観と記載。カードの画像幅指定は実寸878pxに訂正した。 巻末資料の文字に合わせて `fonts/press-mincho.woff2` を既存手順で再生成し、原本のチェックサムとライセンスを照合。追加12字と、現行の補助表記で使われなくなった2字を確認。
- 原稿テキストの全段落・10見出し、公開URL・既存ID、サイト内参照先934件、アーカイブ生成、27ページの静的SEO（警告0件）、31件の単体テストを確認。Chromiumの320・390・640・768・1024・1440pxで写真・書体・横はみ出し、10章のキーボード移動、本文スキップと参考資料の開閉を検証した。 320・1440pxのaxe検査で対象のWCAGルール違反・判定保留0件。旧アンカーへの直アクセス、X共有の遷移パラメータ、JavaScript無効時も確認した。
- 今回の運営者指示で、検査とレビューを通過した場合のPRマージまで承認済み。実機と現地の展示状況は未確認。最終CI、マージ、Pagesの公開検証はPRに記録する。[実装コミット](https://github.com/teruluce/disney-bgs/commit/6e9234b1c348321168c654b1a4f6e4a5a7b150c8) ／ [PR #136](https://github.com/teruluce/disney-bgs/pull/136)。

### 2026-10-10 — PR #10「4記事の公式設定とファン考察を整理」

- **作業AI：** GitHub PR の記録からは特定できず（ChatGPT/Claude のどちらが作業したか未確認）
- **対象ファイル：** `bgs-raging.html`、`bgs-indy.html`、`bgs-soarin.html`、`bgs-haunted.html`
- **変更内容：** 公式に確認できる設定・パーク内で観察できる要素・ファン考察の区別を整理。レイジングスピリッツの神名表記、インディ・ジョーンズの記事表現、ソアリンの未確認説、ホーンテッドマンションの配置・音響・人物設定に関する断定表現を調整。
- **変更理由：** 確認できていない考察を公式設定として断定せず、考察自体は一律削除せずに読者へ区別して伝えるため。
- **検証結果：** PR 本文の記録では、4ファイルの section/p タグ数の整合、目次と h2 見出しの一致、変更対象が4記事であることを確認済み。独立したブラウザ表示確認はこのログでは未確認。
- **コミット：** [マージコミット efa2c3bea3d3e48df161e0bcb6dcc7f5a1275999](https://github.com/teruluce07-cmd/disney-bgs/commit/efa2c3bea3d3e48df161e0bcb6dcc7f5a1275999)
- **PR：** [#10](https://github.com/teruluce07-cmd/disney-bgs/pull/10)
- **状態：** マージ済み
- **公開状況：** GitHub Pages のデプロイ・公開ページでの反映は未確認。
- **残作業／引き継ぎ：** 必要に応じて公式資料との表記差（特にソアリンの人物名等）を再確認。公開状態を報告する場合はデプロイ履歴と実ページを別途確認する。

### 2026-10-10 — PR #16「Patrol articles: align evidence wording, share UI, and SEO」

- **作業AI：** GitHub PR の記録からは特定できず（ChatGPT/Claude のどちらが作業したか未確認）
- **対象ファイル：** 主に Raging Spirits、Indiana Jones、Beauty and the Beast、Haunted Mansion、Cinderella Castle、Fantasy Springs、Small World、トップページ、および記事ページのメタデータ。
- **変更内容：** 神名やハイタワー三世関連の根拠表現を調整、記事内の外部リンク・Instagram ボタンを整理、3ページの X 共有 UI を統一、Small World とトップページの検索・共有用説明を修正。PR 記載では全18記事の title/description/canonical/OGP/X metadata とローカル参照を点検。
- **変更理由：** 根拠表現・共有 UI・検索結果や SNS プレビューをサイト全体で整合させるため。
- **検証結果：** PR 本文では、18記事のメタデータとローカル参照に関するソース確認を報告。実ブラウザの見た目や公開サイトでの反映確認は別途必要。
- **コミット：** [マージコミット d3aedade905b16645e95b05ddf86f2e9455b18ed](https://github.com/teruluce07-cmd/disney-bgs/commit/d3aedade905b16645e95b05ddf86f2e9455b18ed)
- **PR：** [#16](https://github.com/teruluce07-cmd/disney-bgs/pull/16)
- **状態：** マージ済み
- **公開状況：** GitHub Pages のデプロイ・公開ページでの反映は未確認。
- **残作業／引き継ぎ：** 実際の公開サイトで共有ボタン・OGP・モバイル表示を確認し、確認日時と結果を追記する。

### 2026-10-10 — PR #15「Preserve newspaper editorial voice and unify metadata typography」

- **作業AI：** PR 記録では特定できず（ChatGPT/Claude のどちらが作業したか未確認）
- **対象ファイル：** `EDITORIAL_STANDARDS.md`、`index.html`、`profile.html`、各記事 HTML（PR 差分参照）。
- **変更内容：** 編集方針・共同作業ルールを文書化し、日付・更新情報などのタイポグラフィを新聞・アーカイブ調のデザインへ寄せる変更。
- **変更理由：** 記事の編集方針とサイトの紙面デザインを統一するため。
- **検証結果：** PR 本文に「ソース変更のみ。デスクトップ／モバイルのブラウザ表示とデプロイ後の見た目は未確認」と記録。
- **コミット：** [PR ブランチのコミット履歴](https://github.com/teruluce07-cmd/disney-bgs/commits/editorial-worldview-and-team-workflow)
- **PR：** [#15](https://github.com/teruluce07-cmd/disney-bgs/pull/15)
- **状態：** レビュー待ち（2026-10-10 時点で open。GitHub API は mergeable=false を返しているため、競合の有無とマージ可否の確認が必要）
- **追記（Claude／2026-10-10）：** 最新の main（d3aedad）との試験統合では競合なし。`index.html` と `profile.html` で追加CSSが `<noscript>` 内に入り通常表示で効かない問題を発見し、この PR で修正。詳細は下記「Claude：PR #15 の統合前レビューと修正」を参照。
- **公開状況：** 未マージのため、この PR の変更は main に未反映。公開サイトでの確認も未実施。
- **残作業／引き継ぎ：** デスクトップ／モバイルの表示を確認し、記事本文・画像配置に意図しない変化がないかレビューする。作業ログ追加後の PR 差分も確認する。

### 2026-10-10 — ChatGPT：共通作業ログの導入

- **作業AI：** ChatGPT
- **対象ファイル：** `docs/AI_WORK_LOG.md`
- **変更内容：** 既存の main ツリーに同等の作業ログがないことを確認し、共通作業ログを新設。GitHub 上で確認できた PR #10、#15、#16 の履歴を、PR 記録に基づいて追記。AI の担当が履歴から判別できない箇所は推測せず「未確認」と記載。
- **変更理由：** ChatGPT と Claude の変更箇所・検証・マージ・公開状態・引き継ぎを共有し、作業の重複や未確認事項の誤報を防ぐため。
- **検証結果：** 作成前に main と作業ブランチを確認し、`docs/AI_WORK_LOG.md` と同等のログが存在しないことを確認。作成後は GitHub 上でファイル内容を再取得し、コミット SHA と PR #15 の変更ファイル一覧に含まれることを確認した。
- **コミット：** [ログ作成コミット 0479d50ae09bf8d3899344f47f12e7badb13a289](https://github.com/teruluce07-cmd/disney-bgs/commit/0479d50ae09bf8d3899344f47f12e7badb13a289)
- **PR：** [#15](https://github.com/teruluce07-cmd/disney-bgs/pull/15)（既存の共同作業ルール文書を含む PR に同梱）
- **状態：** レビュー待ち
- **公開状況：** ログファイルの追加はサイトコードの公開・デプロイを意味しない。PR #15 は未マージで、公開サイトへの変更なし。
- **残作業／次のAIへの引き継ぎ：** Claude はこのログを読み、PR #15 の最新差分を確認してからレビューを続ける。作業中の別ブランチがあれば、同じファイルを編集する前にログへ追記する。マージ後は GitHub Pages のデプロイと公開サイトの表示を個別に確認する。

### 2026-10-10 — Claude：PR #15 の統合前レビューと修正

- **作業AI：** Claude
- **対象ファイル：** `index.html`、`profile.html`、`docs/AI_WORK_LOG.md`（確認のみ：全記事 HTML）
- **確認した事実：** 引き継ぎ資料にある「記事4本（`content/expand-short-articles`）」は、すでに PR #10 として main にマージ済み（ブランチ先頭 81818e1）。再マージは不要。main は PR #16（d3aedad）まで反映済み。
- **変更内容：** PR #15 が追加した「日付・更新情報などの新聞調タイポグラフィ」CSS が、`index.html` と `profile.html` では `<noscript><style>` の内側に入っており、JavaScript 有効の通常閲覧では適用されない状態だった。CSS を通常の `<style>` に移した（記事ページ18本は元から通常の `<style>` 内で問題なし）。
- **変更理由：** PR #15 の目的（サイト全体の紙面デザイン統一）を、トップページとプロフィールでも実際に有効にするため。
- **検証結果（ソース）：** 最新 main との試験統合で競合なし。全 HTML で `<style>`／`<script>`／`<noscript>` の開閉が一致。title・description・canonical・OGP・twitter:card の欠落なし（`World bazaar.html` は旧URL用のリダイレクトページのため対象外）。ローカルリンク・画像参照の切れなし、重複 ID なし、ハングル混入なし。共有ボタン ID は Haunted Mansion／Cinderella Castle が `x-share-btn`、Fantasy Springs が `share-btn` のまま。
- **検証結果（表示）：** 自動ブラウザ（Chromium、ローカルファイル）で index・profile・Raging Spirits・Indiana Jones・Soarin・Haunted Mansion を 1280px と 390px で確認。横方向のはみ出しなし、画像の読み込み失敗なし、JavaScript エラーなし、更新日表示に新しい書体が適用されることを確認。ただし外部の Web フォント（Google Fonts）は取得できない環境のため、本番での実際のフォント見え方は未確認。X 共有ボタンのクリック動作・共有プレビューも未確認。
- **コミット／PR：** [PR #15](https://github.com/teruluce07-cmd/disney-bgs/pull/15)（通常のマージコミット方式）／[マージコミット 583da91f67db1a6c3eda67097565f1ba3269c16d](https://github.com/teruluce07-cmd/disney-bgs/commit/583da91f67db1a6c3eda67097565f1ba3269c16d)
- **状態：** マージ済み（2026-10-10）。公開確認済みではない。
- **公開状況：** マージコミット 583da91 で GitHub Actions の「pages build and deployment」が success になったことは確認。公開サイト（profile.html）がタイトル・本文とも正常に読み込めることも確認。一方、追加CSS（新聞調の日付書体）が公開ページで実際に効いているか、Web フォント、X 共有ボタン、共有プレビューは、この環境から公開サイトのHTML・見た目を直接確認できなかったため未確認。
- **残作業／引き継ぎ：** (1) PR #15 のマージ後、GitHub Pages のデプロイ完了と公開サイトでの反映を確認し、このログに結果を追記する（「マージ済み」と「公開確認済み」は別状態）。(2) 実機に近い環境で Web フォント表示、X 共有ボタン、共有時の OGP プレビューを確認する。(3) 記事4本の根拠表現は PR #10／#16 で整理済みだが、Soarin の父親名（`チェザーレ`／`チェッリーノ`）は公式資料での再確認が残っている。

### 2026-10-10 — Claude：役割分担の記述を統一

- **作業AI：** Claude
- **対象ファイル：** `EDITORIAL_STANDARDS.md`（「Division of work」節）、`docs/AI_WORK_LOG.md`
- **変更内容：** 「ChatGPT は日常の修正、Claude はレビュー」という固定の役割分担を、引き継ぎ資料の方針（固定の役割はなく、作業できるほうが重複なく確実に完了させる。作業前にログと GitHub の実状態を照合する）に書き換えた。
- **変更理由：** 編集方針の文書と、利用者からの引き継ぎ資料で役割分担の説明が食い違っていたため。
- **検証結果：** 文書のみの変更で、サイトの HTML・CSS には変更なし。
- **状態：** マージ済み（main へ直接反映）。公開サイトへの影響なし。
- **残作業／引き継ぎ：** 前項の「PR #15 の統合前レビューと修正」に記載の公開確認（日付書体・共有ボタン・共有プレビュー）が引き続き未確認。

### 2026-10-10 — Claude：スマホ表示のトップページ目次を見やすく改善（PR #17）

- **作業AI：** Claude
- **対象ファイル：** `index.html`（スマホ幅 600px 以下の目次 CSS のみ）、`docs/AI_WORK_LOG.md`
- **変更内容：** 18項目が1列に並んでいた目次を、番号付きの2列グリッドに変更。縦の長さは約976px→約652px。文字を大きく濃く（.78rem→.86rem）、公園名ラベルを太字＋バーガンディの帯に、タップ領域は最小52px。同ページ内移動なのに外部リンクに見える「↗」を廃止し、番号（01〜）に置き換えた。601px 以上（PC・タブレット）の表示は変更なし。
- **変更理由：** 利用者の依頼「トップメニューの目次をモバイルで見たときに視認性を良くしたい」。
- **検証結果（ブラウザ）：** 自動ブラウザ（Chromium）で幅 320／360／390／600／601／1280px を確認。横はみ出しなし、文字切れなし、JavaScript エラーなし。目次から各記事カードへの移動は変更前と同じく動作。変更前後のスクリーンショットを目視比較。
- **コミット／PR：** [PR #17](https://github.com/teruluce07-cmd/disney-bgs/pull/17)／[マージコミット 2c1e7914041cb0ecb407d4dafc4087752728c805](https://github.com/teruluce07-cmd/disney-bgs/commit/2c1e7914041cb0ecb407d4dafc4087752728c805)
- **状態：** マージ済み。公開確認済みではない。
- **公開状況：** GitHub Pages のデプロイ結果は上記マージコミットで確認（下記の追記または会話報告を参照）。公開サイト上の実際の見え方、実機（iPhone／Android）での表示、本番の Web フォントでの見え方は未確認。
- **残作業／引き継ぎ：** 実機で目次の見え方とタップのしやすさを確認。必要なら、目次ラベル（例：`TDL History` は記事カードのタイトル `Tokyo Disneyland` と表記が異なる）の統一を検討。


### 2026-10-10 — ChatGPT：全20ページのソース監査と公開トップページ確認

- **作業AI：** ChatGPT
- **対象：** `main` のHTML 20ページ、`sitemap.xml`、`EDITORIAL_STANDARDS.md`、未完了PR #9、および公開トップページ。
- **確認した内容（ソース）：**
  - 20ページすべてで `<style>` と `</style>` の数が一致。
  - 20ページすべてで、共有UIのCSSが `</style>` の外や `<noscript>` 内に漏れている既知パターンは検出されなかった。
  - 20ページすべてで共有セクションと共有リンクが各1つ。重複共有ボタンの既知問題は現在の `main` では再現しなかった。
  - 20ページすべてで canonical、OGP画像、Xカード指定を確認。
  - HTML本文に ChatGPT／Claude の作業文、生成ツールの署名、Lorem ipsum、TODO／FIXME、未置換の undefined など、既知の混入パターンは検出されなかった。
  - `sitemap.xml` のトップURLは `https://teruluce07-cmd.github.io/disney-bgs/`。
- **公開ページ確認：** 公開トップページ（`https://teruluce07-cmd.github.io/disney-bgs/`）の取得に成功し、サイトタイトル、概要文、目次、記事カード、最終編集日、連絡モーダルのテキストを確認。公開トップページのテキスト上で明らかなCSS文字列やAI作業文の混入は見つからなかった。Web取得では実際の見た目、操作、モバイル表示、Xの投稿画面でのOGPプレビューまでは確認できていない。個別記事URLは今回のWeb取得環境では取得できず、公開状態を確認済みとは扱わない。
- **未完了PRの照合：** PR #9「共有ボタンの表示崩れ修正・写真の切り抜き調整・モーダル/sitemap修正」は依然 open、head `3feb1959`、GitHubの `mergeable=false`。20ファイルにまたがる変更で、現在の `main` はPRのbaseより進んでいるため、未確認のままマージしない。既知の生CSS・重複共有ボタンは現在の `main` では再現しなかったが、PR #9 の写真比率、モーダルのフォーカス復帰、sitemapの詳細変更が現行mainで完全に不要かは未確認。差分を現行mainに対して再評価してから扱う。
- **検証の限界：** これはGitHubソースと公開トップページの取得結果に基づく監査であり、全ページの実ブラウザ表示・iPhone実機・共有ボタンのクリック・X OGPキャッシュの検証ではない。
- **状態：** ソース監査・公開トップページのテキスト確認は実施済み。全サイトの公開確認は未完了。
- **Claudeへの引き継ぎ：** PR #9 を最新mainとの差分で再レビューし、写真の表示比率、モーダルのキーボード操作／フォーカス復帰、sitemapの変更が必要か確認する。公開環境でPC／スマホ表示とX共有をテストし、未確認の項目を実施済みと記録しない。

### 2026-10-11 — プロフィール表示名を「てる」に統一
- **作業AI:** ChatGPT
- **依頼:** 自己紹介ページでは表示名を「てる／Teru」とし、`teru_luce_` はSNSアカウント名として扱う。
- **変更ファイル:** `profile.html`
- **変更内容:** ページタイトルと構造化データ上の人物名を「Teru」に変更し、アカウント名 `teru_luce_` は識別用として保持。
- **確認:** GitHubへの更新成功を確認。実ブラウザ表示は未確認。
- **未完了:** 受領したプロフィール写真への差し替えは未実施。


### 2026-10-11 — アップロード済みプロフィール写真のパスを修正
- **作業AI:** ChatGPT
- **確認:** ユーザーが `teru-profile.jpg` をリポジトリ直下にアップロードしたことをGitHub APIで確認。
- **変更ファイル:** `profile.html`
- **変更内容:** プロフィール写真およびSNS共有画像の参照先を、実際の配置に合わせてリポジトリ直下の `teru-profile.jpg` に統一。
- **確認:** GitHubのリポジトリ直下に画像ファイルが存在することを確認。公開ページでの画像表示は未実施。


### 2026-10-11 — 運営者プロフィール写真とSNSカード画像を更新
- **作業AI:** ChatGPT
- **対象ファイル:** `profile.html`
- **変更:** プロフィール写真の参照先をリポジトリ直下の `teru-profile.jpg` に変更。OGP画像とXカード画像も同じ写真を指すよう更新し、代替テキストを「てるのプロフィール写真」に修正。
- **理由:** ユーザー指定の写真をプロフィール表示と共有プレビューで統一するため。
- **検証:** 更新後にGitHubソースを再取得して参照先を確認。実ブラウザ表示、GitHub Pagesの反映、X上のカード表示は未確認。
- **コミット:** mainへの直接更新。コミットSHAはGitHub更新結果を参照。
- **PR:** なし（mainへの直接更新）。
- **状態:** ソース更新済み・公開表示確認待ち。
- **残作業:** 必要なら公開ページで画像とSNSカードの実表示を確認。

### 2026-10-11 — Claude：旧URLの置換（PR #19）、PR #9／#18 の照合、プロフィール共有カード（PR #20）

- **作業AI：** Claude
- **ログとGitHubの照合：** ログの記載と GitHub の実状態は、PR #10・#15・#16・#17（マージ済み）と PR #9（open）で一致。ログに未記載だった open の PR として **PR #18**（SEO検査の追加、head `0be3cf6`）と **PR #1**（`main-1`／world-bazaar-seasonal、古い）を確認。このログへの記載はこの項が初出。remote には `main` 以外に過去のマージ済み作業ブランチが多数残っている（削除はしていない）。
- **PR #19「古いURLを新URLへ置換」**
  - **対象ファイル：** 全記事ページ18本、`index.html`、`profile.html`、`World bazaar.html`、`sitemap.xml`、`robots.txt`（23ファイル・171行）。
  - **変更内容：** `teruluce07-cmd.github.io` を `teruluce.github.io` に置換（canonical、og:url、og:image／twitter:image、JSON-LD、URLエンコード形式の X 共有リンク、sitemap の `<loc>`、robots の `Sitemap:`）。本ログ内の過去記録のリンクは履歴のため変更していない。
  - **検証結果（ソース）：** 置換後のファイルを逆変換すると元の main と23ファイルすべて完全一致（ホスト名以外は無変更）。旧ホストは本ログ以外にゼロ件。静的検査スクリプトで、置換前の main・置換後とも問題0件（ローカルリンク／画像参照の切れ、ページ内アンカー、重複ID、title／description／canonical／og:*／twitter:* の欠落、canonical が各ページ自身の URL と一致、og:url と canonical の一致、og:image／twitter:image のファイル実在、X 共有 URL と canonical の一致、sitemap 20件の実在、robots）。検査が不具合を検出できることも、意図的に壊した複製で確認。index・profile・bgs-bb の X 共有リンクは JavaScript が canonical から URL を組み立てる方式のため、canonical の更新で自動的に新URLになる。
  - **状態：** レビュー待ち（未マージ）。
- **PR #20「プロフィールの共有カード画像を追加」**（PR #19 のブランチを土台にした積み重ねPR）
  - **対象ファイル：** `teru-profile-card.jpg`（新規・1200×630）、`profile.html`（og:image と twitter:image の2行のみ）。
  - **変更理由：** `teru-profile.jpg` は正方形（3278×3278）。X の大きい画像カードは正方形を中央の横長の帯（約1.91:1）に切り取るため、実際の写真で再現したところ頭のてっぺんから目の上までが切れた。ページ内の四角い枠（1:1）では切れない。
  - **検証結果：** 切れ方の再現画像と新カード画像を実際に表示して確認（頭・くちばし・手・指揮棒がすべて収まる）。静的検査は問題0件。公開サイト・X 上での実表示は未確認。
  - **状態：** レビュー待ち。PR #19 を先にマージする。
- **PR #9 の再評価（現在の main に対して）：** 結論は「そのままマージしない。クローズ（または必要な部分だけ作り直し）が妥当」。判断はユーザー待ち（クローズはしていない）。
  - 現行 main に対し20本の HTML すべてで競合（`sitemap.xml` のみ単独で適用可）。
  - 共有ボタン：重複・生CSS 等の既知問題は現行 main で再現しない（前項の ChatGPT 監査）。一方 PR #9 の共有ボタン CSS は旧スタイルに戻し、`.last-edited` の新聞調スタイル（PR #15）や写真トーン統一（PR #13）、トップの写真位置調整（PR #11／#12）も戻してしまう。
  - 「The Maihama Chronicle」長文セクションを再追加する内容を含む。これは PR #8 で「根拠未確認」として削除済みの内容と同種。
  - モーダル：現行 main はフォーカス移動の再試行・閉じた後のフォーカス復帰・Esc・Tab 循環を実装済みで、PR #9 の修正は不要。
  - sitemap：全ページ同一の `lastmod`（2026-10-09）と `changefreq`／`priority` の追加のみ。効果は小さく日付も古いため必須ではない。
  - 写真の切り抜き（トップのカード写真位置）は、現行 main に切れの問題があるかを画像で確認していないため未判断。
- **PR #18 の照合（未マージ・変更していない）：** 古い土台の上にあり、そのままマージすると `profile.html` の表示名（「てるについて」）と、共有画像の `teru-profile.jpg`（2026-10-11 の更新）を元に戻す内容になっている。また、検査スクリプト `scripts/seo_audit.py` が旧ホスト `teruluce07-cmd.github.io` を固定値（`BASE_URL`）としており、新URLへ変更後は CI が失敗する見込み。JSON-LD にも旧URLが入っている。別AIの未マージ作業のため触っていない。最新 main への作り直しと、ホストの修正が必要。
- **プロフィール写真（`teru-profile.jpg`）：** ファイルはリポジトリ直下に存在（3278×3278、約726KB）。ページ内表示は1:1の枠＋`object-fit: cover` で切れない。表示サイズ（約164px）に対して原寸のまま読み込んでいるため重い（改善案：表示用に縮小した複製を用意する。今回は未対応）。
- **Soarin の父親名：** 公式ブログ「人類の永遠の憧れを夢見て」（https://www.tokyodisneyresort.jp/tdrblog/detail/220728/）に「チェッリーノ・ファルコ」とあることを確認（取得ツール経由の確認）。記事の表記（`bgs-soarin.html`）は「チェッリーノ」で一致。リポジトリ内に「チェザーレ」表記はなし。記事の修正は不要。ほかの公式ブログ2本（tdrblog/220408、200421）には父親の名前の記載なし。
- **公開確認（実施した範囲）：** 新URL（`https://teruluce.github.io/disney-bgs/`、`profile.html`）のページ本文は取得でき、タイトルを確認。canonical・og:image は旧ホストのまま（PR #19 未マージのため想定どおり）。ただし取得は要約を介した結果で、生のHTMLとしての確認ではない。`teru-profile.jpg` の画像取得はエラー、旧URLの取得もエラーで、いずれも結果は不明。ブラウザでの表示、モバイル表示、X の共有プレビュー、デプロイ履歴は未確認。
- **残作業／引き継ぎ：**
  1. PR #19 → PR #20 の順にユーザーが内容を確認してマージ。マージ後、GitHub Pages のデプロイ完了と公開ページの canonical／og:image を確認し、結果を追記する。
  2. PR #9 のクローズ可否をユーザーに確認。必要な部分があれば現行 main から小さく作り直す。
  3. PR #18 は最新 main への更新と、`scripts/seo_audit.py` の `BASE_URL` 修正が必要（PR #19 のマージ後）。
  4. Google Search Console・X の共有カード検証など、公開環境での確認（ユーザー側の操作が必要な部分を含む）。
  5. Search Console で旧URLのプロパティを使っている場合は、新URLのプロパティ追加が必要になる可能性がある（Claude からは操作できない）。

### 2026-10-11 — Claude：旧URL置換の再確認（PR #19／#20 は未マージのまま、ユーザー確認待ち）

- **作業AI：** Claude（前項の続きのセッション）
- **ログとGitHubの照合：** GitHub の REST API で確認。main は `76c3ed5` のまま。PR #19（`fix/replace-old-account-url`、mergeable）・PR #20（#19 の上に積み重ね、mergeable）・PR #9・PR #18・PR #1 はいずれも open。前項の記載と一致しており、訂正なし。
- **再確認（ソース）：** ブランチ上で旧ホスト `teruluce07-cmd` は本ログ以外にゼロ件。全記事・index・profile に canonical／og:url／og:image／twitter:card／twitter:image が揃い、ローカルリンク・画像参照の切れなし、og:image のファイル実在を確認。`World bazaar.html` は旧URL用のリダイレクトページのため OGP 系なし（意図どおり）。
- **公開確認：** この環境からは公開サイトに直接接続できず（接続不可）、今回は公開サイトの確認は未実施。PR 未マージのため、公開側は旧ホストのままのはず。
- **状態：** レビュー待ち。残作業は前項の「残作業／引き継ぎ」のとおり。

### 2026-10-11 — Claude：PR #19／#20 マージ、PR #9 クローズ、公開確認

- **作業AI：** Claude（ユーザーの明示的な指示により実行）
- **実施：** PR #19（旧URL置換）をマージ（マージコミット `9a5b518`）。PR #20（プロフィール共有カード画像）のマージ先を `main` に付け替えてマージ（`e7dbe9f`）。PR #9 は現行 main との競合と、最近の改善を戻す内容のためクローズ（コメント付き）。
- **デプロイ：** `e7dbe9f` の「pages build and deployment」は success。`9a5b518` の実行は、直後の `e7dbe9f` に置き換えられて cancelled（異常ではない）。
- **公開確認（実施した範囲）：** 公開サイトの `profile.html` を取得ツールで2回取得したが、canonical・og:image・twitter:image は旧ホスト `teruluce07-cmd.github.io`、画像も `teru-profile.jpg`（新しい共有カード `teru-profile-card.jpg` ではない）と表示された。マージ・デプロイ成功後の内容と食い違うため、取得ツール側のキャッシュ（または CDN の反映遅れ）の可能性が高いが、原因は未特定。**公開サイトでの新URL反映は未確認。**ブラウザ表示・モバイル・X の共有プレビューも未確認。
- **状態：** マージ済み（公開確認済みではない）。
- **残作業：** (1) 時間をおいて公開ページの canonical／og:image を再確認。(2) PR #18 は最新 main への作り直しと `scripts/seo_audit.py` の `BASE_URL` 修正が必要。(3) 旧URLのSearch Consoleプロパティ使用時は新URLのプロパティ追加（ユーザー操作）。(4) X Card Validator 等での共有プレビュー確認（ユーザー操作を含む）。


### 2026-10-11 — ChatGPT：Disney Discovery との相互ナビゲーション
- **対象ファイル:** `index.html`、`profile.html)、全18 HTMLページ中のトップ・プロフィール・全BGS記事・関連ページ（計20 HTML）、本ログ。
- **変更内容:** 各ページのヘッダー直下に Disney Discovery への関連サイトリンクを追加。新聞・アーカイブ調の紙色、ボルドー、セリフ体に合わせた小さな導線とし、既存のページ構成・画像保護CSSには手を加えていない。
- **リンク先:** `https://teruluce.github.io/disney-discovery/`
- **理由:** BGS Chronicles で背景設定や物語を読んだ人が、Disney Discovery のパーク基本情報・キャラクター・作品雑学へ移動できるようにするため。
- **対象外:** `World bazaar.html` は既存のリダイレクト用ページでヘッダーがないため変更せず。通常ページではない Google 検証ファイルも変更せず。
- **検証:** 20 HTMLページに導線を追加。リンクに `target="_blank" rel="noopener noreferrer"` を設定。画像保護の既存ルールは変更していない。ソースレベルの更新のみ確認し、実ブラウザ・スマホ表示・公開反映は未確認。
- **ブランチ:** `feature/cross-site-navigation`
- **PR:** https://github.com/teruluce/disney-bgs/pull/22
- **状態:** PR #22 作成済み、open・未マージ。作成直後のAPI応答では mergeable=false のため、競合判定を再確認する。公開サイト未確認。
- **次の作業:** Claudeレビュー後、差分・競合・モバイル表示を確認してからマージ可否を判断。Disney Discovery側PR #9とのリンク先も確認する。


### 2026-10-11 — ChatGPT：ワールドバザール記事後半のレイアウト修正
- **対象ファイル:** `bgs-worldbazaar.html`、本ログ。
- **不具合:** 第III章の夜景イラスト直後に余分な `</div>` があり、本文コンテナが第IV章より前に閉じていた。その結果、第IV〜VI章と記事末尾が本文幅のレイアウト外に出る構造だった。
- **変更内容:** 余分な閉じタグを1つ削除し、四季の装飾・パーク比較・トリビアを含む後半部分が既存の `.content-box` 内に収まるよう修正。記事本文、画像保護CSS／スクリプト、共有ボタン、関連サイト導線は変更していない。
- **検証:** ソース上で修正箇所を確認。HTMLのタグ構造とブロックの対応はPR作成前に再確認する。実ブラウザ・スマートフォン・公開反映は未確認。
- **ブランチ:** `fix/world-bazaar-layout`
- **状態:** 修正をブランチにコミット。PR作成後にレビュー・マージ待ち。


### 2026-10-12 — ChatGPT：Instagram向け二サイト案内ページを追加（PR準備）

- **作業AI：** ChatGPT
- **目的：** Instagramのプロフィールリンクから、BGS ChroniclesとDisney Discoveryのどちらにも移動できる共通入口を用意する。
- **変更ファイル：** `sites.html`（新規）、`sitemap.xml`、本ログ。
- **デザイン：** BGSの新聞・アーカイブ調（紙色、ボルドー、セリフ体）と、DDの明るく開放的な配色を左右のパネルで共存。モバイルでは縦積みに切り替え、選択ボタンを大きく表示。
- **リンク先：** `https://teruluce.github.io/disney-bgs/`、`https://teruluce.github.io/disney-discovery/`。
- **SEO／共有：** title、description、canonical、OGP、Xカードを設定し、sitemapにURLを追加。共有画像は既存の `tot-exterior.jpg` を指定。
- **検証：** GitHub APIで新規ページとsitemapのブランチ更新成功を確認。実ブラウザ、スマートフォン、GitHub Pages公開反映、SNS共有プレビューは未確認。画像保護の既存ルールは他ページでは変更していない。
- **ブランチ：** `feature/site-selection-portal`
- **状態：** PR作成前／未マージ。
- **次の作業：** HTML構造とリンク先を再確認し、PRを作成。マージ後に公開URL `https://teruluce.github.io/disney-bgs/sites.html` の表示と共有プレビューを確認する。


### 2026-10-12 — ChatGPT：二サイト案内ページの紹介文を調整

- **対象ファイル：** `sites.html`、本ログ。
- **変更理由：** 紹介文がブランドを大きく見せるような、気取りすぎた印象にならないようにする。
- **変更内容：** ディズニーが好きで、作品やパークについて調べて記事にしていること、サイト制作や情報発信も勉強しながら運営していることを、個人運営らしい自然な文体で追加。過度に詩的なコピーを避けた。
- **検証：** 文言の置換とHTML内の該当セクションを確認。公開反映・実機表示は未確認。
- **ブランチ：** `polish/site-portal-personal-tone`
- **状態：** PR作成前／未マージ。


### 2026-10-14 — ChatGPT：SEO基盤の初期修正（レビュー待ち）

- **作業AI：** ChatGPT
- **対象ファイル：** `bgs-fs.html`、`cinderella-castle.html`、`sitemap.xml`
- **変更内容：** `bgs-fs.html` の title・OGP title・Twitter title を日本語の検索意図に合わせて調整。Article JSON-LD を `bgs-fs.html` と `cinderella-castle.html` に追加し、著者プロフィール、canonical に対応する mainEntityOfPage、画像、説明文、更新日を記載。サイトマップでは変更した2記事に限り `lastmod=2026-10-14` を追加。
- **変更理由：** 構造化データが未設定だった記事を補い、更新していないページに誤った更新日を設定しないため。
- **検証結果：** GitHub API で対象ファイルを取得し、変更を専用ブランチ `seo/technical-seo-foundation` にコミット。サイトマップは21 URLを維持し、更新した2ページだけに lastmod を追加。公開ブラウザでの表示、Google Rich Results Test、GitHub Pages のデプロイは未確認。
- **コミット：** `e083aa5`（ファンタジースプリングス JSON-LD・title）、`6bf1f64`（シンデレラ城 JSON-LD）、`37d7d39`（サイトマップ更新日）
- **PR：** [#27](https://github.com/teruluce/disney-bgs/pull/27)
- **状態：** PR #27 作成済み・ドラフト・レビュー待ち（未マージ）
- **公開状況：** 未公開確認。main へのマージおよび Pages 反映は未実施。
- **残作業／次の担当への引き継ぎ：** 全21 HTMLの canonical・title・description・h1・OGP・構造化データ・画像alt・内部リンクを最終監査。サイト全体の非公式ファンサイト表記、記事公開日・最終更新日の実データ、孤立ページ・リンク切れを確認。lastmod は実際に内容を更新した場合のみ追加する。Search Console 登録と sitemap 送信はサイト所有者による操作が必要。


### 2026-10-14 — SEOページタイトル・説明文の改善（PR準備中）

- **作業AI：** ChatGPT
- **対象ファイル：** `index.html`、`bgs-sea.html`、`bgs-smallworld.html`、`bgs-tdlhistory.html`、`bgs-electricalparade.html`、`docs/AI_WORK_LOG.md`
- **変更内容：** トップページのタイトルを「ディズニーBGS資料集｜東京ディズニーリゾートのバックグラウンドストーリー」に変更。英語主体で検索意図が伝わりにくかった4ページのタイトルを日本語化し、BGS資料集としての内容が伝わるよう description をページ内容に合わせて調整。変更したページでは OGP / Xカードのタイトルも同期。
- **変更理由：** Google検索結果にサイト内容と無関係なタイトルが表示される問題に対処し、ページごとの検索意図とタイトル・説明文の一貫性を高めるため。
- **検証結果：** GitHub APIで既存HTMLを取得して title / description を確認し、変更後のソースをコミット。sitemap.xmlの先頭は `<?xml version="1.0"...` で始まり、ソース上でBOMや先頭空行は確認されない。公開側のHTTP応答・Content-Type・Google側の再取得状況は、この作業環境から確証を得られていない。
- **コミット：** 個別コミットは各対象ファイルのGit履歴を参照。
- **PR：** 作成予定
- **状態：** レビュー待ち（PR作成後）
- **公開状況：** 未マージ・未デプロイ確認
- **残作業／引き継ぎ：** 全ページのタイトル・説明文を再点検。PRマージ後に公開サイトのトップページタイトル、Pagesデプロイ、Search Consoleサイトマップ取得を確認する。公開HTMLが期待どおりなら、Googleが古いタイトルを保持している可能性も含めて再クロールを待つ。

### 2026-10-13 — Claude：PR #18（SEO検証）を最新のmainに合わせて取り込み直し
- **担当:** Claude
- **内容:** PR #18の静的SEO検査（`scripts/seo_audit.py`、GitHub Actions、`docs/SEO_BASELINE.md`）を最新のmainに取り込んだ。公開URLが `teruluce.github.io` に変わっていたため、スクリプトと資料のURLを新URLに更新した。
- **取り込まなかったもの:** PR #18の `profile.html` 構造化データの変更。旧URLのままで、現在のmainと競合していた。名前の表記・SNSリンクを載せるかは運営者の判断が必要なため見送った。
- **検証:** ローカルで `python scripts/seo_audit.py` を実行し、21ページでエラー0（JSON-LD未設定の警告3件：bgs-fs、cinderella-castle、sites）。GitHub Actions上の実行と公開サイトへの反映は未確認。
- **状態:** 新しいPRとして作成。PR #18は置き換え対象だが、閉じる操作は行っていない。

### 2026-10-14 — Claude：PR #26（SEO検証）を最新mainに合わせて再取り込みしマージ
- **担当:** Claude（ユーザーから「任せる」との指示）
- **内容:** PR #26 が main（PR #28 まで反映）と競合していたため、作業ログの競合のみ解消して再リベース。スクリプト・ワークフロー・資料の内容は変更なし。
- **検証:** ローカルで `python scripts/seo_audit.py` を実行し、21ページでエラー0、警告1件（`sites.html` のJSON-LD未設定）。GitHub Actions上の実行結果とブラウザ表示は未確認。
- **整理:** PR #18 は #26 で置き換え済みのためクローズ。PR #1（2026-07 から更新なし、古い内容）は競合・陳腐化が見込まれるため、今回は変更せず残す。
- **状態:** マージ後の公開反映は未確認。

### 2026-10-14 — Claude：BGS Chroniclesのスマホ最適化（共通 mobile.css 追加）
- **担当:** Claude
- **内容:** 新聞・アーカイブ調の見た目は変えず、スマホ幅（〜640px）で読みやすさとタップしやすさを改善。共通の `mobile.css` を新規作成し、公開対象の21ページ（`google*.html` と転送用 `World bazaar.html` を除く）の `</head>` 直前で読み込む。HTMLの本文・構造・SEO要素は変更していない。
- **主な変更:** 記事本文を約12.8px→15.5px・行間約1.95・左揃えに／英字ラベルの下限を11px（一部装飾は10px）に／日本語補助文を13px以上に／目次・ボタン・フッターリンクのタップ領域を44px目安に／2列の年表は画面幅に収め、3列の比較表は横スクロール（端に影のヒント）／前後記事ナビを大きく／セーフエリア対応。
- **検証:** Playwright（Chromium）で360/390/430px幅の全21ページを計測し、ページ全体の横スクロールなし（表の内部スクロールのみ）を確認。トップ・記事・プロフィールを390pxで撮影して目視確認。Google Fontsは検証環境で読み込めず代替フォントでの確認のため、実機・実フォントでの見え方は未確認。
- **ブランチ:** `feature/mobile-optimization`
- **状態:** PR作成後・未マージ。マージ後に公開URLをスマホで確認する。

### 2026-10-14 — Claude：トップ冒頭文の改行調整とタワー・オブ・テラーの所在地表記を修正
- **担当:** Claude（ユーザー依頼）
- **内容:** `index.html` の冒頭文を句（文節）単位でまとめ、スマホでも日本語として自然な位置で改行されるように調整（文の区切りで改行、`text-wrap: balance`）。PC表示の改行位置は従来どおり。トップ写真キャプションの「Mysterious Island」を「American Waterfront」に、`bgs-fs.html` の関連記事カード（タワー・オブ・テラー）のタグも同様に修正。
- **検証:** 390px/1200px幅で表示確認、`seo_audit.py` エラー0。実機未確認。
- **ブランチ:** `fix/top-intro-linebreak-tot-location`


### 2026-10-14 — ChatGPT：トゥモローランド記事の標準紙面デザインへのリデザイン（PR準備）
- **作業AI：** ChatGPT
- **対象ファイル：** `bgs-tl.html`、本ログ
- **変更内容：** トゥモローランド記事にページ限定のCSSレイヤーを追加。本文・見出し文言・章順・画像参照・SEOメタデータ・画像保護処理は変更せず、色、書体、余白、目次、写真枠、カード、共有UI、最終編集日、前後記事ナビの見た目をBGS Chronicles標準の紙色・セリフ体・ボルドー・金色へ寄せる。星空・走査線・ネオン発光・ライトモード切替など、独立したSF UIに見える演出を抑え、幾何学的な細部だけを残す。
- **変更理由：** Small Worldの記事は独自デザインを維持しつつ、Tomorrowlandだけ過度に独立した見た目になっている問題を解消するため。
- **検証結果：** ソース変更のみ。本文の既存テキスト・画像参照・metaタグ・共有リンク・画像保護スクリプトを意図的に変更していないことを差分で確認予定。ブラウザでのPC／スマホ表示、JavaScript、デプロイ後の公開表示は未確認。
- **ブランチ：** `redesign/tomorrowland-standard-editorial`
- **PR：** [#31](https://github.com/teruluce/disney-bgs/pull/31)
- **状態：** PR作成済み・レビュー待ち（未マージ）
- **公開状況：** 未マージ・未デプロイ確認
- **残作業／引き継ぎ：** CSSの重なりと本文表示をPC／スマホで検証。ユーザーの承認なしに記事本文の文言を変更しない。別途、宇宙エネルギー／オブジェの解釈、バズ・ライトイヤーの固有名詞・設定、同時代依存の説明について内容確認案を提示し、承認後に対象箇所だけ修正する。


### 2026-10-14 — ChatGPT：トゥモローランド記事のアトラクション解説を補足

- **作業AI：** ChatGPT
- **対象ファイル：** `bgs-tl.html`、`docs/AI_WORK_LOG.md`
- **変更内容：** 既存本文は削除・書き換えず、トゥモローランド全体の「同時代依存」の読み解き、スペース・マウンテンのステーション演出、スター・ツアーズの乗客視点と変化する銀河旅行、モンスターズ・インクのエネルギー転換と参加型ゲーム、バズ・ライトイヤーの任務・ターゲット、スティッチ・エンカウンターのリアルタイム交流と監視施設設定について補足段落を追加。さらに、共通紙面のレイアウトを維持しつつ、タイトル部分を深い青系、目次や区切り線を青・シルバー系にして未来感を戻す限定CSSを追加。
- **変更理由：** ユーザーから、各アトラクションの説明が短いため追記できる内容を補充する依頼があった。単に文字数を増やすのではなく、物語・体験の仕組み・世界観の読みどころを説明することを目的とした。
- **根拠・注意：** 追加文は既存記事に記載済みの設定と体験説明を土台に補足した。ディープリサーチの元レポート自体は今回の作業環境で特定・参照できていないため、元レポートとの逐語照合や独立した出典監査は未実施。新しい固有名詞・日付・公式発表を追加する方針は取っていない。
- **検証結果：** GitHub APIで対象段落の存在を確認してから6箇所に追記。元の段落は保持。HTMLの実ブラウザ表示、PC／スマホのレイアウト、事実関係の独立照合は未確認。
- **コミット：** [本文追記コミット 41615f5a71af3521b24dac61277e899907041fcb](https://github.com/teruluce/disney-bgs/commit/41615f5a71af3521b24dac61277e899907041fcb)
- **PR：** [#32](https://github.com/teruluce/disney-bgs/pull/32)
- **状態：** PR #32 作成済み・レビュー待ち（未マージ）。
- **公開状況：** 未マージ・未デプロイ。公開サイトへの反映なし。
- **残作業／次の担当への引き継ぎ：** 追加文を元のディープリサーチレポートと照合できる場合は、内容の根拠と用語を確認する。デスクトップ／スマホのブラウザ表示と公開反映は未確認。ユーザー承認なしに追加の本文変更は行わない。


### 2026-10-14 — ChatGPT：トゥモローランド写真のトリミング修正（フォローアップ）

- **対象ファイル：** `bgs-tl.html`、`docs/AI_WORK_LOG.md`
- **内容：** 実画像を目視し、夜のスペース・マウンテン、ステーション内部、バズ・ライトイヤー入口の3枚に個別クラスを付与。CSSで4:3の横長フレームと画像別の焦点位置を設定。元画像は変更なし。
- **理由：** 縦長写真の表示が不自然というユーザー依頼への対応。
- **検証：** GitHub上の実画像5点を確認。ブラウザでのPC／スマホ表示確認は未実施。
- **コミット：** [9b38accc71964ce0e3893d3d3e7cc12fe11dd683](https://github.com/teruluce/disney-bgs/commit/9b38accc71964ce0e3893d3d3e7cc12fe11dd683)
- **PR：** 作成予定
- **状態：** 未マージ・未公開。既存のPR #32はマージ済みだが、この写真修正はそのマージ後に加えたため、別PRで提出する。
- **残作業：** PRプレビューでトリミング位置を最終確認。

### 2026-10-14 — Claude：S.E.A.記事に調査資料をもとに追記

- **作業AI：** Claude（ユーザー依頼：調査資料 S.E.A._BGS_Research.docx をもとに内容を増やす）
- **対象ファイル：** `bgs-sea.html`、`docs/AI_WORK_LOG.md`
- **変更内容：** 既存本文は削除・書き換えせず追記のみ。①年表に1850年の行、②スキッパー・キャンティーンに本棚の仕掛けの段落、③DISNEY CRUISE LINE／AULANI の折りたたみ項目、④新章「VI. Behind the Archive」（現実のパーク展開年表、実在イマジニアとの対応、2026年のD23・なぞなぞ企画）、目次追加、参考リンク、最終編集日を更新。
- **根拠：** 資料の記述をそのまま使わず、公式ブログ・Attractions Magazine・Laughing Place 等で確認できた内容のみ採用。
- **採用しなかった資料の記述（未確認または既存記事と矛盾）：** 紋章を「天球儀・方位磁針・歯車・羽根ペン」とする説明（既存は帆船・天球儀・羅針盤・絵筆と彫刻道具）、ラテン語モットー「Exploratio Continua」、メアリー・オーシャニアのモデルがリアナ・ゾーンとする点、1851年の認定証の署名者、アウラニ「Pillagers Brigade」、ギャレット・リード教授、各人物の細かな年表（1801/1875/1907/1911/1928年など）。人名表記も既存（ブリオン／コアメ）を維持し、資料の「バリオン／クアメ」には合わせていない。
- **検証：** `seo_audit.py` エラー0。Playwrightで390px/1200px幅の表示確認（横スクロールなし、新章の表はスマホで読める幅）。公開サイト・実機は未確認。
- **ブランチ：** `content/sea-research-additions`
- **PR：** [#34](https://github.com/teruluce/disney-bgs/pull/34)
- **状態：** マージ済み（2026-10-14）
- **公開状況：** GitHub Pagesでの公開反映・公開サイト上の表示は未確認。

### 2026-10-14 — Claude：レイジングスピリッツ記事に調査資料をもとに追記

- **作業AI：** Claude（ユーザー依頼：新しい調査資料をもとに追記。既存と矛盾する場合は資料を優先、基本は追記）
- **対象ファイル：** `bgs-raging.html`、`docs/AI_WORK_LOG.md`
- **変更内容：** 既存本文は削除せず追記のみ。①I章に「1880年代のハリケーンで遺跡が露出」「スペイン語の立入禁止表示」、②II章に神名の表記揺れ（イクチュラコアトル／イクチュアコアトル）と二柱の性格、③IV章に荷札「TO: HIGHTOWER TRUST」（1 Park Avenue）と壁画・1880年代半ばの訪問、④新章V「遺跡に隠された遊び心と、コースターの系譜」（時計7:17、『ラマになった王様』との類似、パリ「タンプル・デュ・ペリル」の系譜、開業日・メーカー・身長制限、『ブラヴィッシーモ！』との火と水の対応）、目次・参考リンク・最終編集日。
- **矛盾の扱い：** 神名は公式ブログ（TDR）が「イクチュラコアトル」のため既存表記を維持し、資料の「イクチュアコアトル」は併記。木箱は既存の「HOTEL HIGHTOWER」表示を残し、「HIGHTOWER TRUST」宛の荷札を追加（資料優先で併存）。
- **採用しなかった資料の記述：** 「トシュカトルの祭祀」の儀式と神名の語源解釈、「パリと全く同一のトラックレイアウト」（Wikipediaは「基にした」とのみ記載）、デュアル・チェーンリフトの静音化、ボイラーからミストへの蒸気方式変更、香港ディズニーランドでの導入計画と中止、1930年代という時代設定（資料内で1880年代の発掘と整合せず）、「1883年頃」の訪問年、スメルディング、リアナ・ゾーン等。出典で確認できなかったため。
- **検証：** `seo_audit.py` エラー0。390px/1200px幅で横スクロールなし、JSエラーなし、新章の表示を目視確認。公開サイト・実機は未確認。
- **ブランチ：** `content/raging-research-additions`
- **PR：** [#36](https://github.com/teruluce/disney-bgs/pull/36)
- **状態：** マージ済み（2026-10-14）。マージ権限はユーザーから委任済み（大きな変更でない場合）。
- **公開状況：** GitHub Pagesでの公開反映・公開サイト上の表示は未確認。
- **メモ：** マージ後、停止フックが「未pushコミットあり・リモートブランチなし」と繰り返し警告したが、コミットはすでに main に入っており誤検知（マージでリモートブランチが削除されるため）。

### 2026-10-15 — Claude：ポートディスカバリー記事（bgs-portdiscovery.html）を新規追加

- **作業AI：** Claude（ユーザー依頼：アクアトピアの写真5枚をもとに、アクアトピア比重高めで長めのポートディスカバリー記事を作成。ストームライダーとニモへの変更、技術的な話を少し含め、2026/9/14のクローズはBGS上「研究施設の役割を終えた」と位置づける）
- **対象ファイル：** `bgs-portdiscovery.html`（新規）、`aquatopia-entrance.jpeg`／`aquatopia-boarding.jpeg`／`aquatopia-pool.jpeg`／`aquatopia-vehicles.jpeg`／`aquatopia-night.jpeg`（新規・長辺1600pxに縮小）、`index.html`（目次・記事カード・ItemList に追加）、`bgs-indy.html`（次の記事リンクを追加）、`sitemap.xml`、本ログ
- **構成：** I 未来港の系譜／II CWCとストームライダー／III アクアトピアの設定／IV 乗り場・プール・ヴィークルの意匠の読み解き（写真の観察に基づく）／V 技術メモ（トラックレス制御、浅い水深のイリュージョン、安全設計、3ライド比較表）／VI MLIとニモ＆フレンズ・シーライダー／VII 2026年9月14日のクローズと年表。
- **根拠の扱い：** 元資料（ディープリサーチ）の技術的な記述は「〜と言われています」「解説で紹介されています」と帰属を付けて採用。RFIDの周波数、車両台数、乗車定員、「巨大な全天候型ショウ・ビルディング」の構想詳細、クローズ発表日、企業スポンサー関連、25周年からの日数などは、裏取りができないため記事に入れていない。クローズ理由は「ファンの間で語られる見方」にとどめ、BGS上の「役割を終えた」は本サイトの読みとして記述。
- **検証：** `seo_audit.py` エラー0（警告1件は既存の sites.html）。index.html の JSON-LD は構文OK。Playwright（Chromium）で390px／1200pxの全体表示を確認（横スクロールなし、JSエラーなし、画像5枚とも表示・切れなし）。公開サイト・実機・Webフォントは未確認。
- **追記（同日・ユーザー指示で微修正）：** 豆知識章「VII. Trivia — 駅に貼られた、港のポスター」を追加（ニューヨーク側のエレクトリックレールウェイ駅にポートディスカバリーを象徴するポスターがある、という内容。ポスターの絵柄などの詳細は未確認のため書いていない）。全体の語り口を「イッツ・ア・スモールワールド」記事に寄せ、章見出しを「I. Retro Future — …」形式、章内に①②の小見出し、読者への問いかけを追加。章番号が8章構成になった。
- **状態：** PR #38 でマージ。公開確認は未実施。
- **残作業／引き継ぎ：** 元資料の特許番号（US6377888B1）・水深・緊急時の対応は一次資料での再確認が望ましい。ニモの縮小金属の名称（資料では「チヂミウム」）は記事では固有名を出していない。


### 2026-10-15 — ChatGPT：ポートディスカバリー記事の参考資料を控えめな折りたたみ表示に変更

- **作業AI：** ChatGPT
- **対象ファイル：** `bgs-portdiscovery.html`、`docs/AI_WORK_LOG.md`
- **変更内容：** 記事末尾の参考資料欄を、初期状態では閉じた `details/summary` 形式に変更。開くと資料名・記事名を確認できる。外部リンクは参考資料欄から取り除き、紙面の雰囲気に合わせて文字を小さく、色と区切りを控えめに調整。
- **変更理由：** 出典情報は残しながら、記事内の外部リンクをなくし、参考資料欄が本文の読書体験を邪魔しないようにするため。
- **検証結果：** 変更前のHTMLとCSSの該当箇所を取得してから置換。参考資料欄のみリンクを除去し、記事本文・写真・目次・SEOメタデータ・画像保護処理には意図的に変更を加えていない。ブラウザ実機表示と公開サイト反映は未確認。
- **コミット：** [7461a100c5fd1340fc02e488f0f9d1e53540d45d](https://github.com/teruluce/disney-bgs/commit/7461a100c5fd1340fc02e488f0f9d1e53540d45d)
- **PR：** [#39](https://github.com/teruluce/disney-bgs/pull/39)
- **状態：** PR #39 マージ済み（2026-10-15）。
- **マージコミット：** [1b0cf2801cc9a3ca8d696d0548c45e5a93e89c12](https://github.com/teruluce/disney-bgs/commit/1b0cf2801cc9a3ca8d696d0548c45e5a93e89c12)
- **公開状況：** mainへの反映を確認。GitHub Pagesのデプロイ完了・公開サイトでの表示は未確認。
- **残作業／次の担当への引き継ぎ：** GitHub Pagesのデプロイ完了後、公開ページで折りたたみ表示と外部リンク除去を確認する。


### 2026-10-15 — Claude：記事写真のトリミング（横長化・不要部分の除去）

- **作業AI：** Claude（ユーザー依頼：写真が変な位置で切り抜かれていたり不要な部分が写っていたりするので、写真を見ながらトリミングする。できれば記事に合わせて横長）
- **背景：** 多くの写真が縦長（3:4）の原本のまま、記事内では `--ar` 指定の縦長の小さな枠（最大幅360〜512px）に入っており、トップページのカード（4:3）では中央付近が機械的に切り抜かれていた。
- **対象ファイル：** 写真48枚（`bb-*`／`btm-exterior`／`haunted-exterior`／`indy-*`／`raging-*`／`sm-*`／`arabian-coast-market-street`／`smallworld-*`／`soarin-*`／`tot-exterior`／`world-bazaar-seasonal`／`aquatopia-*`／`cinderella-*`（城内含む）／`tl-*`（`new-space-mountain` を除く）／`tdl-*`／`tdl-ep-bluefairy`・`tdl-ep-chipdale.jpg`・`tdl-ep-donald`・`tdl-ep-train`）、記事HTML（12記事＋`bgs-tot`／`bgs-smallworld`／`bgs-tl`／`bgs-worldbazaar`）、`index.html`、本ログ
- **変更内容：** 各写真を1枚ずつ目視し、被写体が切れない範囲で不要部分（前景の人混み・手前の枝葉・ぼやけた通行人など）を外して、記事の枠に合わせてトリミング。画像ファイルは同名で上書き（リサイズなし）。原本は git 履歴に残っている。
  - 16:9（多くの記事の標準枠）：ビーストの城、ビッグサンダー、ホーンテッド、インディ、レイジング、スプラッシュ、アラビアンコースト、スモワ、ソアリン、タワテラ、ワールドバザール、アクアトピア5枚、TDL入口、ドリームライツ・トレイン ほか
  - 4:3：シンデレラ城記事の7枚、スペースマウンテン／バズ記事（トゥモローランド）の4枚
  - 3:4（縦のまま不要部分だけ除去）：エレクトリカルパレードのフロート3枚、TDL歴史の城リボン・ダンサー
  - 記事HTMLの枠比率（`--ar`）・`--maxw`・img の width/height、OGP画像サイズ（`og:image:width/height`）、JSON-LD 画像サイズをトリミング後の寸法に更新。横長になった `tdl-entrance-sunset` と `tdl-ep-train` は縦枠クラスを外した。
  - `index.html`：ホーンテッド（`25% 50%`）とタワテラ（`12% 50%`）のカード表示位置を調整。
- **意図的に変更しなかったもの：** `bgs-fs.html` のファンタジースプリングス写真と `tdl-ep-chipdale.jpeg`（縦枠のまま構図に問題なし）、地図・ロゴ・コンセプトアート（`tds-map`／`tot-logo`／`new-space-mountain`）、記事で未使用の `blue-bayou-restaurant-sign`／`donald-duck-stage-performance`。
- **構図の判断メモ：** `bb-dance` はふたりを全身で入れると16:9に収まらないため、頭〜スカート中程を優先。`btm-exterior` は山頂より機関車を優先（山の上部は入らない）。`haunted-exterior` は原本が傾いているが補正はしていない。
- **検証結果：** `seo_audit.py` エラー0（警告1件は既存の sites.html）。Playwright（Chromium）で390px／1200pxのトップカード、15記事の全写真枠を確認（切れ・横スクロール・JSエラーなし）。公開サイト・実機は未確認。
- **PR：** [#40](https://github.com/teruluce/disney-bgs/pull/40)
- **状態：** マージ済み（2026-10-15、ユーザー指示）。マージコミット 8798e17。公開サイトでの表示は未確認。
- **残作業／引き継ぎ：** 公開後にスマホ実機で見え方を確認し、気になる写真があれば構図を再調整する（原本は履歴から復元可能）。


### 2026-10-15 — Claude：画像保護の抜けを修正（トゥモローランド記事ほか）

- **作業AI：** Claude（ユーザー依頼：画像を保存できないようにしたいが、一部のページで保護がかかっていない。確認できたのはトゥモローランド）
- **原因：** `bgs-tl.html` だけ、他の記事にある画像保護CSS（`img { pointer-events: none; user-select: none; -webkit-touch-callout: none; -webkit-user-drag: none; }`）が丸ごと無かった。JS（右クリック・ドラッグ禁止）は入っていたが、スマホの長押し保存（`-webkit-touch-callout`）を防ぐのはCSS側のため、特にスマホで保存できる状態だった。
- **対象ファイル：** `bgs-tl.html`、`bgs-smallworld.html`、本ログ
- **変更内容：** `bgs-tl.html` に画像保護CSSを追加。`bgs-smallworld.html` は `.img-wrapper img` に `-webkit-user-drag: none` が抜けていたため追加。
- **検証結果：** 全HTMLページをPlaywright（Chromium、390px／1200px）で確認し、全記事・profile・cinderella-castle の全画像で `pointer-events: none` と `user-select: none` が効いていることを確認。`seo_audit.py` エラー0（警告1件は既存の sites.html）。トゥモローランド記事は表示崩れ・横スクロール・JSエラーなし。実機（iPhone／Android）での長押し確認と公開サイトでの確認は未実施。
- **意図的に変更しなかったもの：** `index.html`（トップのカード画像）は、既存CSSで `pointer-events: auto` になっている。`-webkit-touch-callout: none`・`user-select: none`・`-webkit-user-drag: none` とJSの右クリック禁止は効いているため、そのままにした。`sites.html` は画像なし。
- **コミット：** [ab464dd](https://github.com/teruluce/disney-bgs/commit/ab464dd7d77221d4a48803e154afefc595628ca1)
- **PR：** [#42](https://github.com/teruluce/disney-bgs/pull/42)
- **状態：** マージ済み（2026-10-15、ユーザーがマージ）。マージコミット 44eb7e4。
- **公開状況：** GitHub Pagesのデプロイ完了・公開サイトでの反映、スマホ実機での長押し確認は未確認。
- **残作業／引き継ぎ：** 公開後にスマホ実機でトゥモローランド記事の画像を長押しして保存メニューが出ないことを確認する。なお、スクリーンショットや開発者ツールからの取得までは防げない（ブラウザの仕組み上、完全な保存防止はできない）。


### 2026-10-16 — Claude：Disney Discoveryへの導線をトップページのみに整理

- **作業AI：** Claude（ユーザー依頼：各ページのDisney Discoveryへの飛びリンクは不要かもしれず、トップページだけにしたい。どちらにせよ目立ちすぎないように）
- **対象ファイル：** 全記事・`profile.html`・`cinderella-castle.html`（ヘッダー直下の「COMPANION SITE」バナーを削除）、`index.html`、`mobile.css`、`bgs-tdlhistory.html`、`bgs-sea.html`、`bgs-fs.html`、本ログ
- **変更内容：** ① ヘッダー直下の `sister-site-switch` バナーをトップ以外の全19ページから削除。② `index.html` のバナーも削除し、フッターに小さな文字リンク「関連サイト：Disney Discovery」（薄い色・小さめ・下線のみ）を設置。③ Disney Discovery側と対応する3記事（TDL歴史／S.E.A.／ファンタジースプリングス）だけ、記事末尾の共有ボタン手前に「関連記事（Disney Discovery）：○○」の小さな一行リンクを追加（リンク先は `articles/tokyo-disneyland-history.html`、`tokyo-disneysea-history.html`、`fantasy-springs-guide.html`）。④ 不要になった `mobile.css` のバナー用ルールを削除。
- **意図的に変更しなかったもの：** `sites.html`（二つのサイトの入口ページ）。`bgs-tl.html` に残る未使用の `.sister-site-switch` CSS（動作に影響なし）。
- **検証結果：** `seo_audit.py` エラー0（警告1件は既存の sites.html）。Playwright（Chromium、390px）でトップのフッター・ファンタジースプリングス記事の末尾・タワテラ記事のヘッダー周りを確認（横スクロールなし・JSエラーなし）。Disney Discovery側のリンク先URLは公開サイトの記事一覧から確認。公開サイト・実機は未確認。
- **コミット：** [e82f584](https://github.com/teruluce/disney-bgs/commit/e82f584)
- **PR：** [#44](https://github.com/teruluce/disney-bgs/pull/44)
- **状態：** レビュー待ち（未マージ。マージはユーザーが実施）。
- **残作業／引き継ぎ：** 公開後にスマホ実機でトップのフッターと3記事末尾の見え方を確認する。


### 2026-10-17 — Claude：トップの創設年表記を修正

- **作業AI：** Claude（ユーザー依頼：サイトが「2024から」の表記になっているが、実際に始めたのは今年（2026年）のゴールデンウィーク頃。2026にするか別の意味の年号にしたい）
- **対象ファイル：** `index.html`、本ログ
- **変更内容：** トップのマストヘッド日付欄「Est. 2024」を「Est. MMXXVI」（2026年のローマ数字表記。資料アーカイブ風のデザインに合わせた、おすすめ案をユーザーが採用）に変更。
- **意図的に変更しなかったもの：** 記事内の「2024年」（ファンタジースプリングス開業、スペースマウンテン・アストロブラスターのクローズ、リュウゼツラン開花など、実際の出来事）。フッターの「© 2026」はすでに正しい。`profile.html` の「Since 2007」（運営者個人の表記）。
- **コミット：** a82e1e4
- **PR：** [#45](https://github.com/teruluce/disney-bgs/pull/45)
- **状態：** マージ済み（2026-10-17、ユーザーがマージ）。マージコミット c97a315。公開サイトでの表示はユーザーが確認済み。


### 2026-10-17 — Claude：資料番号・スタンプ・要点欄・出典番号の試作（トップ＋ポートディスカバリー記事）

- **作業AI：** Claude（ユーザー依頼：現在のデザインは気に入っているので、世界観を深めるこだわりを足したい。提案のうち、資料番号とスタンプ／記事冒頭の要点欄／出典の整理の3つを採用。まず試作）
- **対象ファイル：** `archive.css`（新規・共通スタイル）、`index.html`、`bgs-portdiscovery.html`、`EDITORIAL_STANDARDS.md`、本ログ
- **変更内容：** ① トップの全19カードに「No. 001〜019」を追加（トップの並び順で採番。対応表は EDITORIAL_STANDARDS.md）。ポートディスカバリーのカード写真に「AQUATOPIA / CLOSED 2026.09.14」のスタンプを重ねた。② ポートディスカバリー記事に、見出し直下の資料票（File No. 019・Area・読了目安）、同じスタンプ、冒頭の要点欄（3項目）を追加。③ 同記事の参考資料欄を番号付き [1]〜[6] にし、折りたたみの見出しを「参考資料（6件）」にした。④ 両ページの最終編集日を2026年10月17日に更新。
- **意図的に変更しなかったもの：** 参考資料欄の「外部リンクなし・折りたたみ」の方針（2026-10-15のPR #39の決定）。本文中の脚注番号は付けていない（どの記述がどの資料に基づくかを、記事の元資料に当たって確認できていないため）。記事内の既存の「この記事で辿ること」ボックス（第I章末）はそのまま残している（要点欄と一部役割が近い）。他の記事への展開は未着手。
- **検証結果：** `seo_audit.py` エラー0（警告1件は既存の sites.html）。Playwright（Chromium、390px／1200px）でトップのカードと記事の上部・出典欄を表示確認（横スクロールなし、JSエラーなし、追加した小さな文字は11px以上）。公開サイト・実機・Webフォントは未確認（ローカルのファイル表示のみ）。
- **コミット：** 1a77594
- **PR：** [#46](https://github.com/teruluce/disney-bgs/pull/46)
- **状態：** マージ済み（2026-10-17、ユーザーがマージ）。マージコミット 5c7a130。見た目はユーザーが確認し、修正の希望なし。
- **残作業／引き継ぎ：** 他18記事への展開は下の「展開」の項目で実施。


### 2026-10-17 — Claude：資料票・要点欄を残り18記事に展開

- **作業AI：** Claude（ユーザー依頼：試作の見た目が良く、修正の希望はなかったため、残りの記事にも展開）
- **対象ファイル：** 記事18本（`bgs-sm`／`bgs-btm`／`bgs-haunted`／`bgs-bb`／`bgs-worldbazaar`／`cinderella-castle`／`bgs-tl`／`bgs-smallworld`／`bgs-tdlhistory`／`bgs-electricalparade`／`bgs-spatial-epic`／`bgs-tot`／`bgs-sindbad`／`bgs-fs`／`bgs-soarin`／`bgs-sea`／`bgs-raging`／`bgs-indy` の各 `.html`）、`bgs-portdiscovery.html`（資料票の表記を他と統一）、`archive.css`、本ログ
- **変更内容：** ① 各記事の見出し直下に資料票（File No.・トップのカードと同じ分類・読了目安）を追加。番号は EDITORIAL_STANDARDS.md の対応表どおり。② 見出しの後に要点欄（3項目）を追加。要点は各記事の見出しと本文の記述だけから書き、ファン考察は考察として表現した。③ 各記事で archive.css を読み込み。④ 最終編集日を表示している記事は2026年10月17日に更新（表示のない6記事は変更なし）。⑤ `bgs-tl.html` は暗い見出し枠の中で資料票が読めなかったため、HUDの配色に合わせた上書きCSSを追加。⑥ `archive.css` の小さな文字を `max(11px, 0.7rem)` にし、ルートの文字サイズが小さい `bgs-smallworld.html` でも11px以上にした。
- **意図的に変更しなかったもの：** スタンプ（試作のポートディスカバリーのみ。トゥモローランドなど閉鎖した施設がある記事への追加は未実施）。S.E.A.・レイジングスピリッツの「参考：」（リンク付きの一行）と、エレクトリカルパレードの Archive Sources は、既存の形式のまま。本文中の脚注番号は付けていない。`bgs-tl.html` の既存の `FILE_TML-001`（HUDの識別子）はそのまま残しており、File No. 007 と併存している。
- **検証結果：** `seo_audit.py` エラー0（警告1件は既存の sites.html）。Playwright（Chromium、390px／1200px）で19記事すべてを確認（横スクロールなし、JSエラーなし、資料票1つ・要点欄1つ、追加した小さな文字は11px以上、要点欄のはみ出しなし）。トゥモローランド・スモールワールド・ホテルハイタワー・S.E.A.・ホーンテッドマンションは画面でも目視確認。公開サイト・実機・Webフォントは未確認（ローカルのファイル表示のみ）。
- **状態：** PR作成後、ユーザーの確認待ち（未マージ）。
- **残作業／引き継ぎ：** 要点欄の文章はAIが本文から書いたもの。気になる表現があれば直す。スタンプを付ける記事（本文で確認できる閉鎖・終了の事実があるもの）は別途相談。



### 2026-10-20 — Claude：トップページのPC版レイアウト（試作）

- **作業AI：** Claude（ユーザー依頼：PC版も作りたい。同じ世界観のまま広げるより、PCだけ凝った紙面風の段組みにするのもあり。最初はトップページだけ）
- **対象ファイル：** `desktop.css`（新規）、`index.html`（`desktop.css` の読み込みと、第一面を囲む `<div class="front-page">` の追加）、本ログ
- **変更内容：** 画面幅1100px以上のときだけ `desktop.css` を読み込む。① 第一面を2カラムにし、左に写真、右にご案内と目次を配置。② 目次を「索引」風の番号付き2列リストにし、二重罫の枠で囲んだ。③ 題字を大きくし、余白と最大幅（1280px）を調整。④ 記事一覧は1280px以上で4列、それ未満のPC幅では既存の列数。カードの外枠の罫線が二重にならないよう調整。
- **意図的に変更しなかったもの：** 1100px未満（スマホ・タブレット）の見た目。HTMLの構造は、ラッパーの追加以外は変えていない。記事ページのPC版は未着手。
- **検証結果：** `seo_audit.py` エラー0（警告1件は既存の sites.html）。Playwright（Chromium）で幅1440／1280／1100／1099／390pxを確認：横スクロールなし、JSエラーなし。390pxは変更前と比べて、色差が大きいピクセルがなく実質同じ見た目（スクロール連動の描画ノイズのみ）。1440／1100pxは目視確認。公開サイト・実機・Webフォントは未確認（ローカルのファイル表示のみ）。
- **状態：** PR [#48](https://github.com/teruluce/disney-bgs/pull/48) としてマージ済み（2026-10-21）。
- **残作業／引き継ぎ：** 19記事で4列にすると最終行に空きができる（斜線の地模様で埋めている）。気になる場合は列数や空きの扱いを相談。記事ページのPC版は、トップの見た目を確認してから。


### 2026-10-21 — Claude：トップのタワー・オブ・テラー写真のPC版の切り抜き調整

- **作業AI：** Claude（ユーザー依頼：PC版のトップで、タワテラの切り抜き方が変なので、モバイルとは別にトリミングしてほしい）
- **対象ファイル：** `desktop.css`、本ログ
- **変更内容：** PC版（1100px以上）では写真の枠がほぼ正方形になり、中央基準の切り抜きで塔の左側と右のランプが途中で切れていた。PC版だけ `object-position` を左基準（0% 50%）にし、塔の全体が収まるようにした。写真ファイル（`tot-exterior.jpg`）は変更していない。
- **意図的に変更しなかったもの：** スマホ・タブレット幅（1100px未満）の切り抜き。
- **検証結果：** Playwright（Chromium）で幅1440／1100／390pxのヒーロー部分を目視確認（1440・1100pxは塔の全体が収まる、390pxは従来どおり）。公開サイト・実機は未確認。
- **状態：** PR作成後、マージ予定（小さな変更のため、ユーザーの方針に沿ってAIがマージ）。


### 2026-10-21 — Claude：S.E.A.・タワー・オブ・テラー記事にヘイゼル・ハイタワーの発表を反映／要点欄を全記事から削除

- **作業AI：** Claude（ユーザー依頼：ヘイゼル発表の調査資料をもとにBCの記事を更新または追加できそうなら反映。あわせて、各ページの要約（要点欄）は世界観を壊すので無くす）
- **対象ファイル：** `bgs-sea.html`、`bgs-tot.html`、記事18本（要点欄の削除のみ）、`archive.css`、`EDITORIAL_STANDARDS.md`、本ログ
- **変更内容：**
  1. `bgs-sea.html` VI章の「現在進行形のS.E.A.」を更新。「謎はまだ解けていません」を「10月14日時点では未解明」に直し、新小見出し「10月20日、泥棒の正体は『ハイタワー』の名を持つ人物でした」「パークに置かれた、ヘイゼルの足跡」を追加（人物設定、入会拒否、タイムスキッパー、リッジ・ジュエル、ディズニーランドの展示・記念チケット・オール）。ハイタワー三世のカード、キーワード、参考リンク（Blog Mickey／WDWNT）、最終編集日を更新。
  2. `bgs-tot.html` のIII章に、娘ヘイゼルの登場を短く追記（詳細はS.E.A.記事へ）。最終編集日を更新。
  3. 全19記事の「File Brief — この記事の要点」欄（`file-brief`）を削除。`archive.css` の要点欄CSSも削除。File No.・資料票（`file-strip`）・スタンプ・参考資料の番号は残している。`EDITORIAL_STANDARDS.md` に「記事ごとの要約ボックスは置かない」を明記。
- **新規記事にしなかった理由：** ヘイゼルの話は S.E.A.記事の「現在進行形」の節とタワー・オブ・テラー記事の延長として読める分量のため、既存記事への追記にした。展示が期間限定で内容が変わる可能性もある。必要ならヘイゼル単独の記事を後で追加できる。
- **資料の扱い（採用しなかった・修正した点）：** 受領した調査資料は、公開記事3本（Blog Mickey、Fantasy Land News、WDWNT）と照合して、確認できたものだけ採用した。
  - 資料は「ヘイゼルが2026年に木箱を開けてジュエルを取り出した」と書いていたが、記事では「過去に戻り、木箱が封印される前に取り出して自分の手紙を入れた」。後者に合わせた。
  - 資料の「1886年に5歳で父とレインボー・リッジを訪れた」「ジュエルを1886年の町へ返還した」は、確認できた記事では裏が取れず、ジュエルの最終的な行方も記事では明かされていないため記述していない。展示のスケッチ（ヘイゼルがジュエルを返す場面）の存在のみ書いた。
  - 資料の「Disney Parks Blog で全貌が明かされた」は確認できず、Fantasy Land News の「ImagineeringのInstagramで公表」に合わせた。
  - 資料の「ホテル・ハイタワーの絵画の解釈が変わる」「ARGの優れた事例」などの評価・考察、表1〜3の人物表、父の「19世紀前半アメリカ生まれ」は一次的な根拠が確認できないため採用していない。資料に混入していた `[span_52]` 等の機械的な断片も除いた。
  - ジュエル展示は「10月20日から期間限定」と報じられているため、そのように書いた。
- **検証結果：** `seo_audit.py` エラー0（警告1件は既存の sites.html）。Playwright（Chromium）で21ページを390px／1200pxで確認：横スクロールなし、JSエラーなし、`file-brief` 残りなし。S.E.A.記事の新しい節と、要点欄を削除した記事（美女と野獣）の冒頭を390pxで目視確認。公開サイト・実機・Webフォントは未確認。
- **ブランチ：** `content/sea-hazel-hightower`
- **状態：** PR作成後、ユーザーの確認待ち（未マージ）。
- **残作業／引き継ぎ：** ヘイゼルの公式情報（Disney Parks Blogなど）を直接確認できていない（今回は二次の報道記事）。公式記事が確認できたら、表記（「ヘイゼル・ルイーズ・ハイタワー」等）と人物設定を照合する。トップページの記事カードの説明文に要約的な文があるかは今回未確認。

- **追記（同日・ユーザー指示）：** 「3世とヘイゼルの違いも入れたい」「基本このレポートは事実だという前提で」との指示。`bgs-sea.html` に比較表「父と娘、ふたりのハイタワー」を追加。上の「採用しなかった」とした資料の記述のうち、1886年に5歳で訪問した点・ジュエルを翌日の1886年の町へ返還した点・活動拠点・動機・承認の経緯は、指示に従って資料どおり採用した（WDWNTの展示スケッチ＝返す場面とは整合）。生年・出身（父の「19世紀前半・アメリカ」）は曖昧なため表に入れていない。**資料と報道記事で食い違う点：** 資料は「2026年に木箱を開けてジュエルを取り出した」とするが、Blog Mickeyは「過去に戻り、木箱が封印される前に取り出した」。こちらは報道記事の記述を維持した。


### 2026-10-21 — Claude：S.E.A.記事V章のコラム（6項目）の行間・余白を調整

- **作業AI：** Claude（ユーザー依頼：スマホで「キツキツで読みにくい」。文章は変えず、行間などを設ける）
- **原因：** `bgs-sea.html` の `.column-box`（V章の6コラム）だけスタイル未定義で、ブラウザ既定の詰まった行間・見出し余白になっていた（他記事は各自で定義済み）。
- **対象ファイル：** `bgs-sea.html`、本ログ
- **変更内容：** ① `.column-box`・見出し・本文のCSSを追加（行間約2.05、段落間余白、コラム間に細い区切り線、見出しと本文の間隔、左揃え）。② 各コラムの本文は、元から1つの `<p>` 内で改行されていた文のまとまりを別々の `<p>` に分けた。**本文の文字は変更なし**（タグと空白を除いた文字列が変更前と完全一致することを確認）。
- **検証結果：** `seo_audit.py` エラー0。Chromiumで390px／1200px幅、横スクロールなし。390pxでV章の見え方を目視確認。実機・公開サイトは未確認。
- **ブランチ：** `design/sea-installations-spacing`


### 2026-10-21 — Claude：記事ページのPC版レイアウト（試作：ポートディスカバリー）

- **作業AI：** Claude（ユーザー依頼：普通の記事にも徐々にPC版を作る。モバイル版に影響を出さない。制限にかからないよう少しずつ進める）
- **対象ファイル：** `desktop-article.css`（新規・全記事共通）、`bgs-portdiscovery.html`（`desktop-article.css` を1行読み込むだけ）、本ログ
- **変更内容：** 画面幅1100px以上のときだけ `desktop-article.css` を読み込む（`media="(min-width: 1100px)"`）。① 左に「Index」（目次）、右に本文の2カラム。目次はスクロールに追従（sticky）し、「Read →」は省略。② 本文幅は720pxのまま（読みやすい行長）。全体の最大幅は1180px。③ 題字・戻るリンクは全幅。④ 本文下の「HOMEへ戻る」を本文カラムに収め、「最終編集日」をページ送りの幅（1040px）にそろえた。⑤ `html, body` の `overflow-x: hidden` が目次の sticky を妨げるため、PC幅だけ `overflow-x: clip` にした。
- **意図的に変更しなかったもの：** 1100px未満の見た目、HTMLの構造・本文・写真。ポートディスカバリー以外の18記事（未展開）。トップページの `desktop.css`。
- **検証結果：** Playwright（Chromium）で、画像の読み込み完了を待って全画面を撮影し、390／768／1099pxで変更前と**ピクセル完全一致**（差分なし）。1100／1280／1440／1920pxで横スクロールなし、JSエラーなし。1440pxでスクロール中も目次が上端に追従すること、ページ末尾で本文の終わりとともに外れることを確認。公開サイト・実機・Webフォントは未確認（ローカルのファイル表示のみ）。
- **状態：** PR作成後、ユーザーの確認待ち。
- **残作業／引き継ぎ：** 他の18記事へは、`<link rel="stylesheet" href="desktop-article.css" media="(min-width: 1100px)">` を `mobile.css` の次の行に足すだけで展開できる構成。記事ごとにインラインCSSが少しずつ違う（表の幅、独自の見出し枠など）ため、数記事ずつ確認しながら進める。`bgs-tl.html`（HUD調）、`bgs-smallworld.html` などは個別調整が必要になる可能性が高い。

- **追記（同日・展開その1）：** ユーザー指示（制限が来るまで一気に進める）で、標準構造の16記事（`bgs-bb`, `bgs-btm`, `bgs-electricalparade`, `bgs-fs`, `bgs-haunted`, `bgs-indy`, `bgs-raging`, `bgs-sea`, `bgs-sindbad`, `bgs-sm`, `bgs-soarin`, `bgs-spatial-epic`, `bgs-tdlhistory`, `bgs-tot`, `bgs-worldbazaar`, `cinderella-castle`）に `desktop-article.css` の読み込み1行を追加した（HTML・本文は変更なし）。検証：各記事で390／768／1099pxが変更前とピクセル完全一致、1440pxで横スクロールなし・本文カラムからのはみ出しなし・JSエラーなし・スクロール中も目次が追従（上端24px）。電気パレード・フォレスト（fs）を目視確認。公開サイト・実機は未確認。
- **残り：** `bgs-smallworld.html`・`bgs-tl.html`（`content-box` を使わない別構造）。

- **追記（同日・展開その2）：** `bgs-tl.html`（トゥモローランド）用に `desktop-tl.css` を新規作成し、1100px以上でだけ読み込む1行を追加。題字は全幅のまま、目次（Mission Manifest）を左の追従カラム、本文を右の720pxカラムにした。「ENTER →」は狭い索引では隠し、行全体をリンクにした。1440pxで目次の追従（上端24px）、横スクロールなし、JSエラーなし、目次クリックで該当章へ移動することを確認。**未確認：** 390／768／1099pxが変更前と一致するかの画像比較（検証の途中でユーザーが中断し、プッシュを指示したため）。CSSは media 指定で1100px以上にしか効かない作りだが、比較は未実施。
- **残り：** `bgs-smallworld.html`（`.wrap`・`.toc` 構造、パステル配色の別デザイン）。


### 2026-10-23 — Claude：スモールワールド記事のPC版レイアウト／PC最適化の仕上げ

- **作業AI：** Claude（ユーザー依頼：BGS ChroniclesのPC最適化を完了させて。スマホはそのままに）
- **対象ファイル：** `desktop-smallworld.css`（新規）、`bgs-smallworld.html`（`desktop-smallworld.css` の読み込み1行のみ追加）、本ログ
- **変更内容：** 画面幅1100px以上のときだけ `desktop-smallworld.css` を読み込む（`media="(min-width: 1100px)"`）。パステル調の配色・セクションごとのテーマ色の切り替えはそのまま、① 題字は全幅、② 目次（Archives Index）を左の追従カラム（250px）、本文を右の720pxカラムにした。「Explore →」は狭い索引では隠し、行全体をリンクにした（文字はDOMに残る）。③ 目次の下の区切り飾りはPCでは非表示にし、本文の先頭を目次の上端にそろえた。題字下の余白を詰めた。④ `html, body` の `overflow-x: hidden` が目次の sticky を妨げるため、PC幅だけ `overflow-x: clip` にした。⑤ 本文外の「最終編集日」は、この記事では要素に style 属性があるため、PC幅だけ `!important` でページ送り（1040px）の位置にそろえた。
- **PC最適化の状況（これで記事19本＋トップが対応済み）：** トップ（`desktop.css`）、標準構造の記事17本（`desktop-article.css`）、トゥモローランド（`desktop-tl.css`）、スモールワールド（`desktop-smallworld.css`）。`profile.html`・`sites.html` は元から中央寄せ／2カラムでPCでも問題なく読めるため変更していない。`World bazaar.html` は転送ページのため対象外。
- **意図的に変更しなかったもの：** 1100px未満（スマホ・タブレット）の見た目、HTMLの構造・本文・写真。
- **検証結果：** `seo_audit.py` エラー0（警告1件は既存の sites.html）。Playwright（Chromium）で、PC用CSSをすべて外した状態を基準に、トップと記事19本の計20ページを390／768／1099pxで画像比較：59/60が完全一致。差分が出た1件（`bgs-tl.html` 768px）は、同じ新版を2回撮っても自分自身とずれる描画ノイズで、もう1組の撮影では完全一致を確認（HUD風の演出による揺らぎ）。1100／1280／1440／1920pxで全ページ横スクロールなし、JSエラーなし。スモールワールドは1440pxで目視確認、目次の追従（上端24px）・目次クリックで該当章へ移動を確認。**未確認：** 公開サイト・実機・Webフォント（ローカルのファイル表示のみ）。
- **ブランチ：** `design/desktop-smallworld`
- **状態：** PR作成後、小さな変更のため、ユーザーの方針に沿ってAIがマージ予定。
- **残作業／引き継ぎ：** 記事ページのPC版は、全記事の展開が完了。公開後に実機の大きな画面で見て、気になる記事があれば個別に調整する。


### 2026-10-24 — ChatGPT：BGS Chronicles 検索結果のサイト名改善

- **作業AI：** ChatGPT
- **対象ファイル：** `index.html`
- **変更内容：** トップページのHTMLタイトルと、存在する場合はOGP/X共有タイトルの先頭を「BGS Chronicles」に統一。既存のファビコンSVG、canonical、WebSite構造化データは確認し、今回は変更していない。
- **変更理由：** 検索結果でサイト名が「GitHub」と表示される問題に対し、ページタイトルのブランド表記をサイト名・構造化データと揃えるため。Googleの表示は自動判断のため、反映は保証されない。
- **検証結果：** ソース文字列を対象に変更前のタイトル一致を確認してから更新。ブラウザ表示・Google検索結果・公開デプロイは未確認。
- **コミット：** PR ブランチ内のコミットを参照。
- **PR：** 作成後に追記予定。
- **状態：** レビュー待ち
- **公開状況：** 未マージ。公開サイトへの反映なし。
- **残作業／引き継ぎ：** favicon.svg の公開取得とGoogle向けクロール可能性、Google Search ConsoleでのURL検査を確認。検索結果のサイト名はGoogle側の再クロール後に確認する。


### 2026-10-24 — ChatGPT：公開URLとSEO参照先の統一

- **作業AI：** ChatGPT
- **対象ファイル：** トップページ・記事ページ・プロフィール等のHTML、`favicon.png`、`sitemap.xml`、`robots.txt`、`scripts/seo_audit.py`
- **変更内容：** 公開サイトとして実際に確認できた `https://teruluce07-cmd.github.io/disney-bgs/` に合わせ、HTML内のcanonical、OGP/X画像・URL、構造化データなどに含まれる旧ホスト `https://teruluce.github.io/disney-bgs/` を新ホストへ統一。サイトマップ、robots.txt のサイトマップURL、SEO監査スクリプトの基準URLも同じホストへ更新。Google検索でサポートされるPNG形式の64×64pxファビコンを追加し、トップページのアイコン指定をSVGからPNGへ変更。
- **変更理由：** 実際の公開URLと検索エンジンに伝えていた正規URL・サイトマップが食い違っていたため。Googleが正規URLを正しく選び、クロール対象を一貫して把握できるようにする。
- **検証結果：** 公開サイト `https://teruluce07-cmd.github.io/disney-bgs/` は外部取得で確認。GitHub上のHTML・サイトマップ・robots.txt・監査スクリプトに含まれる旧ホストを検索し、対象のURL参照を更新。PNGファビコンを追加し、トップページのアイコン指定がそのファイルを指すことを確認。GitHub Actions の監査実行とマージ後の公開反映は未確認。
- **コミット：** PR ブランチの各ファイル更新コミットを参照。
- **PR：** 作成後に追記予定。
- **状態：** レビュー待ち
- **公開状況：** 未マージ。公開サイトの実ファイルには未反映。
- **残作業／引き継ぎ：** PR内で旧ホストの残存箇所とSEO監査結果を確認。Google Search Consoleでサイトマップを再送信し、トップページのURL検査・インデックス登録リクエストを行う。検索結果のサイト名・ファビコンは再クロール後に別途確認する。


### 2026-10-24 — ChatGPT：PR #55 のSEO検証失敗を修正

- **作業AI：** ChatGPT
- **対象ファイル：** `scripts/seo_audit.py`、本ログ
- **変更内容：** PR #55 のGitHub Actions「Static SEO validation」が失敗したため、実行結果と監査コードを確認。サイトマップのホスト検査だけが旧ホスト `teruluce.github.io` に固定されていたことを特定し、`BASE_URL` から期待ホストを取得する方式に修正。
- **変更理由：** 今回の正規URL統一後も、監査スクリプトが古いホストを要求していたため。
- **検証結果：** 失敗ジョブは `seo-smoke-check` の「Validate static SEO essentials」。スクリプト上の不整合を修正した。修正コミット後にGitHub Actionsを再確認する。
- **PR：** [#55](https://github.com/teruluce/disney-bgs/pull/55)
- **状態：** 検証待ち
- **公開状況：** 未マージのため公開サイトへの反映なし。
- **残作業／引き継ぎ：** PR #55 のActions再実行結果を確認。成功後も、マージ・Pages公開・Search Consoleの再送信は別工程として記録する。


### 2026-10-24 — Claude：公開URLを `teruluce.github.io` に戻す（PR #55 の訂正）

- **作業AI：** Claude（ユーザー依頼：正しい公開URLに修正し、ChatGPTにも正しい情報が伝わるようログに記録する）
- **原因：** PR #55 が公開URLを `teruluce07-cmd.github.io` と判断し、canonical・OGP・サイトマップ等をすべてそちらへ書き換えていた。実際の公開サイトは `https://teruluce.github.io/disney-bgs/`（運営者が変更済み）で、旧ホストは取得に失敗した。そのため存在しないURLを検索エンジンに正規URLとして伝えている状態だった。
- **対象ファイル：** 全HTML（`World bazaar.html` を含む22ページ）、`sitemap.xml`、`robots.txt`、`scripts/seo_audit.py`、本ログ
- **変更内容：** `teruluce07-cmd.github.io` を `teruluce.github.io` に一括置換（X共有URLのエンコード版を含む）。本ログ冒頭に「公開URLの正」を追記。本文・デザインは変更なし。履歴内の過去記述はそのまま残した。
- **検証結果：** 旧ホストは本ログ以外にゼロ件。`seo_audit.py` エラー0（警告1件は既存の sites.html）。canonical（index／bgs-tl）とrobots.txtのSitemap行が新ホストであることを確認。公開サイト・Search Consoleは未確認。
- **残作業／引き継ぎ：** マージ・Pages反映後に、運営者がSearch Consoleでサイトマップ再送信とトップページのURL検査を行う。


### 2026-10-24 — Claude：ソアリン記事（`bgs-soarin.html`）の加筆

- **作業AI：** Claude（ユーザー依頼：Geminiで作った調査資料「ソアリン構造解剖とBGS深層分析」をもとに、記事を厚くする）
- **対象ファイル：** `bgs-soarin.html`、本ログ
- **変更内容：** 既存5セクションの口調・構成・デザインを保ったまま、新規セクションを追加（II 開発史と技術メモ／III 世界4パークの開業年表とTDS版映像の違い／IV ファルコ家と博物館の年代記／IX 港に重なる3つの時代）。既存セクションは番号を振り直し（II〜V → V〜VIII）、日本の絵画・ロビーの展示・プレショーの段落を補強。折りたたみの参考資料欄（5件、外部リンクなし）を追加。目次・読了時間（7 min）・最終編集日を更新。
- **資料の扱い：** Gemini資料は、公式ブログ・ねとらぼ（ITmedia）・英語版Wikipedia・S.E.A. Wiki・Jungle Skipper で個別に裏取りし、**確認できた内容だけを採用**。次の項目は出典で確認できなかった、または出典間で食い違ったため**掲載しなかった**：カメリアの生没年（1801年生・1875年没・享年74）、物語上の「現在」を1901年とする設定、ライドの可動域（上下約76cm・前後傾5度）、初期の70mmフィルム投影、「フレスコ画」「ロティンダ」という呼称、上海版の設定の詳細、カメリアの肖像画を「回顧展」の展示とする表現。また、ねとらぼ記事は開館を1872年とするが、公式ブログの1815年と食い違うため、公式の1815年を採用した。
- **未解決の点：** 冒頭の副題「カメリアとハイタワー三世の確執、そして日本との因縁」は、本文（V章）で「確執は公式では確認できない」と書いているのと不整合。今回は未変更。運営者の判断待ち。
- **検証結果：** タグの開閉の一致、目次とセクションIDの一致、`scripts/seo_audit.py` エラー0（警告1件は既存の sites.html）を確認。ブラウザでの表示確認（モバイル・PC）と公開サイトでの確認は未実施。
- **状態：** PR作成後に更新
- **公開状況：** マージ・Pages反映後に別途確認が必要。

### 2026-10-25 — Claude：記事本文のメタ的な言い回しを物語調へ微修正

- **作業AI：** Claude（ユーザー依頼：「公式によると」「公式ブログには」などのメタ的発言をできるだけ控える）
- **対象ファイル：** `bgs-indy.html`、`bgs-raging.html`、`bgs-soarin.html`、`bgs-haunted.html`、`bgs-portdiscovery.html`、`bgs-worldbazaar.html`、`bgs-spatial-epic.html`、`bgs-tot.html`、`cinderella-castle.html`、本ログ
- **変更内容：** 本文・コラム見出しにあった「公式ブログで確認できる設定」「公式ブログによると」「今回確認した公式サイトでは〜確認できませんでした」等を、作中の語り口（「〜でした」「〜といわれています」「真偽は定かではありません」等）に置換。事実・ファンの考察の区別は、削除せず「ファンの間で語られる」「あくまで考察のひとつ」といった自然な表現で維持した（EDITORIAL_STANDARDS.md の方針どおり）。コラム見出しは内容に即した見出しへ変更（例：「📜 公式ブログで確認できる設定」→「📜 祭祀場から発掘現場へ」）。
- **変更しなかったもの：** 末尾の折りたたみ「参考資料」欄（出典の明示）、SEO用メタ情報（description／OGP／JSON-LD）、作中設定としての「公式」「非公式」の語（S.E.A.の「公式の木箱」「非公式の会議室」など）、トゥモローランド記事の「公式発表されたコンセプトアート」（実際の出来事の記述）。
- **未解決の点：** ソアリン記事の副題「カメリアとハイタワー三世の確執、そして日本との因縁」は、本文V章（確執は語られていない）と食い違ったまま。運営者の判断待ち。
- **検証結果：** 対象9ファイルのタグ開閉（div/p/section/h4/strong）の一致、残存フレーズの再検索、`scripts/seo_audit.py` エラー0（警告1件は既存の sites.html）を確認。ブラウザ表示は未確認。
- **PR：** [#58](https://github.com/teruluce/disney-bgs/pull/58)（CI `seo-smoke-check` 成功、競合なし）
- **状態：** マージ済み（運営者がマージ。マージコミット a07d6f5）
- **公開状況：** Pagesでの反映・公開ページでの表示は未確認。

### 2026-10-25 — Claude：「メタ的な言い回しを避ける」方針を共通ルール化

- **作業AI：** Claude（ユーザー依頼：ChatGPT宛てにも、本文でメタ的な発言を避けるよう作業ログへ明記する。ブランディング上の理由）
- **対象ファイル：** `docs/AI_WORK_LOG.md`（冒頭に方針セクションを追加、PR #58 の状態を「マージ済み」に訂正）、`EDITORIAL_STANDARDS.md`（同趣旨を1項目追加）
- **変更内容：** 記事本文で調べ方・出典に触れる言い回しを書かない、事実と考察の区別は自然な表現で保つ、出典は末尾の「参考資料」欄で示す、という方針を明文化。運営者向けの記録（ログ・PR説明）では従来どおり正確に書く旨も明記。
- **検証結果：** 文書のみの変更。`scripts/seo_audit.py` は実行対象外（HTML変更なし）。
- **PR：** [#59](https://github.com/teruluce/disney-bgs/pull/59)
- **状態：** レビュー待ち
- **公開状況：** 文書のみで、公開サイトの表示には影響なし。

### 2026-10-25 — Claude：ソアリン記事の副題を本文に合わせて修正

- **作業AI：** Claude（ユーザー依頼：副題と本文の食い違いを直す）
- **対象ファイル：** `bgs-soarin.html`、本ログ
- **変更内容：** 冒頭の副題を「カメリアとハイタワー三世の確執、そして日本との因縁」から「カメリアの夢と、ハイタワー三世、そして日本との縁」へ変更。本文V章は二人の確執が語られているわけではないという内容で、「確執」「因縁」と断定する副題と食い違っていたため。上の2件の「未解決の点」はこれで解消。
- **検証結果：** 副題以外の変更なし。`scripts/seo_audit.py` の結果は下記PRのCIで確認。ブラウザ表示は未確認。
- **PR：** [#60](https://github.com/teruluce/disney-bgs/pull/60)
- **状態：** レビュー待ち
- **公開状況：** マージ・Pages反映後に別途確認が必要。

### 2026-10-25 — Claude：新規記事「Birth of DisneySea」（`bgs-origins.html`、File No. 020）

- **作業AI：** Claude（ユーザー依頼：運営者提供のリサーチ資料「東京ディズニーシー開発史」をもとに、東京ディズニーシー誕生史の記事を新規作成。画像は後日追加）
- **対象ファイル：** `bgs-origins.html`（新規）、`bgs-portdiscovery.html`（次の記事リンク）、`index.html`（カード・ItemList・目次リンク・最終編集日）、`sitemap.xml`、`EDITORIAL_STANDARDS.md`（File No. 一覧）、本ログ
- **変更内容：** ポート・ディズニー（ロングビーチ）計画、「七つの海」への方向転換、シンボルが灯台からアクアスフィアへ変わった経緯、S.S.コロンビア号の実物大建造、比較表と年表を8章で構成。他記事と同じ口調・資料票（File No. 020）。要点欄・スタンプなし、出典は折りたたみ欄のみ（外部リンクなし）。画像は未掲載で、OGP・カード画像は暫定的に `tds-map.jpg` を使用。
- **レポートとの差異（要確認）：** 資料PDFは「1995年11月にオリエンタルランドが東京ディズニーシー建設を正式発表」としているが、オリエンタルランド公式の沿革では、第2パーク計画の発表は1988年4月15日、契約締結は1996年4月、名称と概要の公表は1997年11月26日、着工式は1998年10月22日。記事は公式沿革に合わせた。資料のうち、ジョー・ローデの肖像モデル説、加賀見氏の著書の引用、ソアリン以外の細部は記事に入れていない。
- **確認できたこと／できていないこと：** 公式沿革（発表・契約・公表・着工・開園日・総工費・灯台案とアクアスフィア・S.S.コロンビア号140m）と英語版Wikipedia「Port Disney」で上記の主要事実を確認。レターヘッドの逸話、スペースシップ・アースを望んだという話は、資料PDFの記述のみで独立した裏取りはしていない（記事内では「伝えられています」「語られています」の表現にとどめた）。`scripts/seo_audit.py` はローカルで通過。ブラウザでの見た目（PC・スマホ）は未確認。
- **PR：** [#61](https://github.com/teruluce/disney-bgs/pull/61)（CI `seo-smoke-check` 成功）
- **状態：** マージ済み（マージコミット 0ec5f20）
- **公開状況：** 公開URLをウェブ取得で確認し、タイトル・H1・目次8項目が表示されることを確認。PC・スマホの見た目は未確認。
- **残作業：** 画像の追加（追加時にOGP画像・カード画像を差し替え）、公開後の表示確認。

### 2026-10-25 — ChatGPT：記事文体と物語への没入感の一括微修正（PR #64）

- **作業AI：** ChatGPT
- **対象ファイル：** `bgs-portdiscovery.html`、`bgs-origins.html`、`bgs-spatial-epic.html`、`bgs-soarin.html`、`bgs-raging.html`、`bgs-worldbazaar.html`、`bgs-haunted.html`、`cinderella-castle.html`、`EDITORIAL_STANDARDS.md`
- **変更内容：** 会話調の接続表現、読者への直接的な問いかけ、本文中のメタ発言（「この記事では」「この記事で辿ること」「解説によると」「写真でも」など）、口語的な擬音や体験を煽る表現を、落ち着いた書き言葉へ調整。物語の手がかりとなる建築・装飾・演出の説明は残し、事実と考察の区別を崩さない範囲で文章の流れを整理。シンデレラ城の記事では、裏付けが明確でない一般的な評価表現を、東京版の具体的な特徴を述べる表現へ変更した。あわせて `EDITORIAL_STANDARDS.md` に、物語への没入感、書き言葉、考察を過度に断定しないこと、機械的な言い換えを避けることを追記。
- **変更しなかったもの：** 記事の基本構成、画像、CSS、SEOメタデータ、参考資料欄。大規模な内容追加や設定の新規創作は行っていない。
- **検証結果（ソース）：** `main` とブランチの差分を確認。対象HTMLの `div`／`p`／`section`／`h2`／`h3`／`h4`／`strong` の開始・終了タグ数が一致することを確認。編集対象の本文を再検索し、今回対象とした主要なメタ表現・会話調の残存を確認。GitHub Actions「Static SEO validation」（run #81）は成功。ブラウザ表示確認は未実施。
- **PR：** [#64](https://github.com/teruluce/disney-bgs/pull/64)
- **状態：** レビュー待ち（2026-10-25時点で open）
- **公開状況：** 未マージ。公開サイトへの反映はなし。
- **残作業／引き継ぎ：** PRのCI結果と差分を確認し、必要なら修正する。マージ後にGitHub Pagesの反映と実際の表示を別途確認する。


### 2026-10-26 — Claude：ファンタジースプリングス／タワー・オブ・テラー記事の文体微修正

- **作業AI：** Claude（ユーザー依頼：世界観を壊す文章がないか全記事を確認。見つかった箇所のうち、まずこの2記事を修正。タワー・オブ・テラーの木箱の一文は「こうした細部から、二つの場所が結びついていることが読み取れます」という調子にしたいとの指定）
- **対象ファイル：** `bgs-tot.html`、`bgs-fs.html`、本ログ
- **変更内容：** TOT：木箱の記述の結びを「決定的な証拠なのです」から「こうした細部から、〜つながっていることが読み取れます」へ変更。FS：読者への問いかけ2箇所を平叙の書き出しへ、「公式BGSによれば、」を削除、「伏線として仕込まれていた〜隠されているのです」を「〜のなかにある、という見方もあります」へ変更（設計意図の断定を避けるため）。
- **変更しなかったもの：** TOT 684行目の記者の質問（作中の台詞）。他記事に残る「〜なのです」「見上げてみてください」「よく観察してみると」等は未対応（残作業）。
- **検証結果：** 対象2ファイルのタグ開閉の一致、`scripts/seo_audit.py` エラー0（警告1件は既存の sites.html）を確認。ブラウザ表示は未確認。
- **状態：** PR作成後に追記

### 2026-10-26 — Claude：トップページ冒頭の案内文と説明文の調整

- **作業AI：** Claude（ユーザー依頼：Google検索結果の表示をどうにかしたい。検索結果に出ていたのは、トップ本文の冒頭の案内文「客観的にまとめた、個人の資料集です。待ち時間の読み物や〜一助としてお使いください」で、世界観とずれていた。提案どおりに書き換える方針を選択）
- **対象ファイル：** `index.html`（冒頭の案内文、`<meta name="description">`）、本ログ
- **変更内容：** 冒頭の案内文を「東京ディズニーリゾートの背景設定（BGS）を、パークに残された手がかりから読み解く個人の資料集です。待ち時間のひとときにも、足もとの小さな意匠に目を向けるきっかけに。」へ変更。メタ情報の説明文も同じ調子にそろえた。「ディズニー」「BGS」「バックグラウンドストーリー」は本文・説明文に残している（Search Console の上位クエリに合わせるため）。
- **変更しなかったもの：** OGP／X の説明文、JSON-LD（WebSite の description に「決定版」「都市伝説」の語が残っている。要相談）、サイト名の表示（Google側の再読み込み待ち。Search Console でルートURL `https://teruluce.github.io/` の再インデックス登録リクエストが有効）。
- **検証結果：** `index.html` のタグ開閉の一致、`scripts/seo_audit.py` エラー0（警告1件は既存の sites.html）。ブラウザ表示は未確認。Googleの表示が変わるのはクロール後。
- **状態：** PR作成後に追記

### 2026-10-27 — Claude：「Birth of DisneySea」記事に写真を追加

- **作業AI：** Claude（ユーザー依頼：「Birth of DisneySea」記事用に提供された写真6枚を記事へ反映する）
- **対象ファイル：** `bgs-origins.html`、`sitemap.xml`（lastmod）、新規画像4枚（`origins-harbor-dusk.jpeg`／`origins-aquasphere.jpeg`／`origins-columbia-day.jpeg`／`origins-columbia-night.jpeg`）、本ログ
- **変更内容：** ① 見出し直下に、夕暮れのメディテレーニアンハーバーの写真（16:9、先頭の写真として eager 読み込み）。② 第IV章③「水の惑星」という答えに、夜のアクアスフィアの写真（16:9）。③ 第V章②「S.S.コロンビア号」に、昼（約2:1）と夜（3:2）の写真。いずれも既存記事と同じ `photo-frame`／`photo-cap` で、代替テキストと一行キャプションを付けた。最終編集日と sitemap の lastmod を 2026-10-27 に更新。
- **写真の扱い：** 提供された6枚を1枚ずつ目視し、記事の枠に合わせてトリミング（リサイズのみ、色補正なし）。昼のコロンビア号は、手前を歩く来園者を外すため上部を切り出した。夜のコロンビア号は手前のぼやけた人影を外した。アクアスフィアの写真には遠景の人影が小さく残るが、顔は判別できない。
- **追記（ユーザー依頼）：** 第V章②に、煙突が3本であること（タイタニック号は4本で、うち1本は飾りの煙突）、ファンの間で語られる姉妹船2隻（S.S.フーサトニック号、S.S.モノンガヒラ号）と、タイタニック号の姉妹船（オリンピック号、ブリタニック号）との重なり、公式にはタイタニック号の再現とは語られていないことを一段落で追加。姉妹船の名称は個人運営のファンサイト2件（Vernian LEMO、ハッピーエール）の記述に拠り、公式資料では確認できていないため「ファンの間では語られている」と明記した。Wikipediaは「特定の再現ではない」「タイタニック号などの象徴」とする。昼の写真の代替テキストとキャプションを「3本の煙突」に修正し、参考資料を4件→7件に更新。
- **使わなかった写真：** ① 昼のハーバーと火山の写真：手前の高架レールと観客が大きく入り、火山の頂上が右端で欠けるため。② 水たまりに映るコロンビア号の写真：来園者（子ども連れ）が中央に大きく写っており、トリミングで外せないため。必要なら、人物を外せる構図のものを撮り直してもらうか、反射部分のみを使う案がある。
- **変更しなかったもの：** トップページのカード画像（`origins-card.png`、灯台と地球儀のイラスト）とOGP／Xカード画像。もともとこの記事の主題（灯台からアクアスフィアへ）を描いた専用イラストなので、写真への差し替えはユーザーに確認してから行う。本文・見出し・参考資料欄は未変更。
- **検証結果：** `scripts/seo_audit.py` エラー0（警告1件は既存の sites.html）。Playwright（Chromium）で390px／1280pxの表示を確認し、4枚とも枠内に収まり、横スクロールとJSエラーなし。公開サイトでの表示と実機は未確認。
- **PR：** [#67](https://github.com/teruluce/disney-bgs/pull/67)
- **状態：** レビュー待ち
- **公開状況：** マージ・Pages反映後に別途確認が必要。
- **残作業：** カード画像・OGP画像を写真に差し替えるか（現行はイラスト）ユーザーに確認。使わなかった2枚は、人物を外せる構図で撮り直せれば追加可能。


### 2026-10-27 — Codex-BGS-20261027：サイト品質改善（作業中）

- **作業AI：** Codex-BGS-20261027（このチャット専用の識別名。既存の ChatGPT 記録とは区別）
- **承認範囲：** 運営者がレビューで挙げた8項目すべての修正を承認。
- **開始点：** main `f8eeeea8f1b9e7274a1f923b21fd8575e0f248a9`。着手時の open PR は0件。古いログの「レビュー待ち」は現在の open 状態を表さない。
- **ブランチ：** `codex-bgs-20261027/site-quality`
- **担当範囲：** index の目次と分類・選択状態、記事4本の人物モーダル、Small World のメタ情報・更新日・目次・reduced motion、プロフィール／TOT ロゴの配信画像、共有・ページ送りの共通化、SEO検証の拡張。
- **方針：** 記事本文・資料番号・既存の世界観・画像の構図を維持する。共通化は必要な部品に限定。原画像は残す。
- **状態：** 作業中。検証結果・PR・最終コミットは完了時に追記。
- **公開状況：** 未マージ。公開サイトの変更なし。

### 2026-10-27 — Codex-BGS-20261027：8項目の修正と検証完了（PR #68）

- **作業AI：** **Codex-BGS-20261027**。このチャットの担当。他の ChatGPT／Claude の作業とは区別する。
- **承認：** 運営者から、優先順位表に挙げた8項目すべての修正を承認された。
- **GitHub照合：** 着手時 open PR は0件、main は `f8eeeea8f1b9e7274a1f923b21fd8575e0f248a9`。上の過去記録で「レビュー待ち」の #64／#65／#66／#67 は現在の状態ではなく、main のコミット履歴ではいずれもマージ済み（順に `099e261`／`6c11952`／`035f581`／`f8eeeea`）。過去の作業記録は削除していない。
- **変更内容：**
  1. `index.html` の分類で非表示になったカードも、目次選択時に該当カテゴリへ切り替えてから通常のアンカー移動ができる。履歴の戻る・進むでのハッシュ復元にも対応。
  2. 人物モーダル4記事とトップの連絡モーダルを `site.js` で共通制御。初期フォーカス、Tab循環、Escape、閉じた起点への復帰、背景の inert／スクロール固定と復元、アニメーション中に閉じた際のフォーカス処理キャンセルを実装。人物カードに button ロールと dialog の関連付けを追加。
  3. Small World の OGP／X タイトルに残っていた文字列連結を修正。更新日は履歴を調べて、最後の編集内容の変更（要点欄削除、`463a20f`）の2026-10-21へ、表示・Article・サイトマップを統一した。公開日は変更していない。
  4. `profile.html` と `bgs-tot.html` に表示用画像と srcset／sizes を追加。原画像とOGP画像は保持。構図・色調変更なし。DPR 2で選択される画像はプロフィール 726,480→26,556 bytes（96.3%削減）、ロゴ 515,909→42,680 bytes（91.7%削減）。再生成用 `scripts/optimize_display_images.py` を追加（Pillowは開発時のみ）。
  5. 分類ボタンの aria-pressed を状態と同期。
  6. Small World 目次のリンク名を既存節名に関連付け、prefers-reduced-motion では回転・reveal・配色遷移を停止。通常時の配色変化は維持。
  7. 22ページに重複していた共有CSSと20記事のページ送りCSSを `site-components.css` へ抽出。ページ固有CSSとmobile／desktopの上書き順を保持。共通JSは必要な7ページだけで defer 読み込み。記事固有の人物説明データと写真保護・演出は保持。
  8. SEO監査にローカル参照・srcset・OGP画像、アンカー、重複ID、既存Article日付と表示の整合、サイトマップの重複・掲載漏れ・非記事掲載を追加。壊したフィクスチャを使う回帰テスト12件、ブラウザ検証スクリプト、検証手順書を追加。CI対象をCSS／JS／画像／scriptsへ広げた。
- **検証で追加修正：** 日付検査で見つかった Cinderella Castle と Fantasy Springs の不一致も、実際の本文編集履歴 `c39567c`（2026-10-25）／`cdbf6bd`（2026-10-26）に合わせて、表示・既存Article・サイトマップを統一。技術改修日を全記事へ一括付与していない。
- **ソース検証：** `python scripts/seo_audit.py` は23ページでエラー0、既存の `sites.html` のJSON-LD未実装警告1件。Python回帰テスト12件成功。`node --check site.js`、`git diff --check` 成功。本文の表示テキストを変更前と比較し、上記3記事の日付以外に差がないことを確認。
- **ブラウザ検証：** ローカルHTTPサーバー＋Playwright／Chromium。全23ページ×390／768／1280pxの69条件で画像デコード・ローカルアセット応答・横はみ出し・共有数・記事間リンクを確認。分類／目次／履歴、5モーダルのEnter・Space・Tab・Shift+Tab・Escape・閉じる・復帰、通常アニメーション中の開閉と即時閉じる、reduced motion、4ページのJavaScript無効時の本文表示を確認。通常アニメーションを止めた変更前後69条件の主要要素の位置・寸法・色・文字サイズは差なし。
- **Webフォント確認：** ChromiumからGoogle Fontsへ直接接続すると、この実行環境の証明書信頼設定でエラーになった。そのため検証時だけ、Python urllibによるTLS検証付き取得をPlaywrightのrouteへ供給（証明書検証は無効化していない）。実Google Fontsの22リソースを取得し、トップ／Small World／プロフィール／TOTの390／1280pxで読込済み書体と横はみ出しなしを確認、スクリーンショットを目視。サイトのネットワーク処理をこの方式に変更したわけではない。
- **手順書：** `docs/SITE_QUALITY_CHECKS.md`。ブラウザ試験は開発用Playwrightが必要で、SEO CIの実行対象は標準ライブラリの監査・回帰テストとJS構文検査のみ。
- **PR：** [#68](https://github.com/teruluce/disney-bgs/pull/68)
- **コミット：** 修正コミットは [PRのコミット一覧](https://github.com/teruluce/disney-bgs/pull/68/commits) を参照。
- **状態：** ローカルの修正・検証完了。レビュー待ち。着手時の「作業中」はこの完了記録で更新する。
- **公開状況：** 未マージ。Pagesの本番反映・公開サイト確認は未実施。
- **残作業／次の担当：** 最新PR差分とCIを確認してレビュー。マージ後はPagesデプロイと公開ページの実表示を別途確認する。実機iPhone／Android・本番Core Web Vitals・SNS上のOGPキャッシュは未検証。

#### 完了追記 — Codex-BGS-20261027

- **修正コミット：** [40aee95a3bd7508e6576800cea9b809f90810016](https://github.com/teruluce/disney-bgs/commit/40aee95a3bd7508e6576800cea9b809f90810016)。ローカル検証済みtreeとGitHubのtreeが完全一致することを確認。
- **GitHub CI：** [Static SEO validation #40553272938](https://github.com/teruluce/disney-bgs/actions/runs/40553272938) が上記修正コミットで success。監査・12件の回帰テスト・JS構文検査が成功。
- **PR状態：** [#68](https://github.com/teruluce/disney-bgs/pull/68) はdraft解除済み・レビュー待ち・競合なし。コード修正は完了。未マージ・本番反映なし。
- **引き継ぎ：** レビュー後に統合する。本番Pagesのデプロイ／公開表示／実機／CWV確認は未実施。この追記は検証結果の記録のみでサイトコードは変更しない。

### 2026-10-28 — Claude-BGS-20261028：PR #68の状態訂正とAI名の付け方の追記

- **作業AI：** Claude-BGS-20261028（このチャットの識別名）
- **対象ファイル：** `docs/AI_WORK_LOG.md` のみ。サイトのコードは変更していない。
- **GitHub照合：** main `dc2f785` は2026-10-28 02:45（JST）の「Merge pull request #68 from teruluce/codex-bgs-20261027/site-quality」。直前の `bd9ce64` が「PR 68のCIと引き継ぎを記録」。
- **訂正：** 上の「Codex-BGS-20261027：8項目の修正と検証完了（PR #68）」と「完了追記」にある「レビュー待ち」「未マージ」は、記録時点の状態。**PR #68は現在マージ済み**（mainに反映済み）。過去の記録は削除していない。
- **追記：** 冒頭に「AI名の付け方」を追加。
- **検証：** mainを取得し、`python scripts/seo_audit.py`（23ページでエラー0、既存の `sites.html` のJSON-LD未実装警告1件）、回帰テスト12件、`node --check site.js` が成功。旧ホスト（teruluce07-cmd.github.io）は `docs/` 以外のどのファイルにも書かれていないことを確認。
- **公開状況：** GitHub Pagesのデプロイと公開サイトでの実表示は未確認。実機iPhone／Android、Core Web Vitals、SNSのOGPキャッシュも未検証（Codexの記録を引き継ぐ）。
- **残作業／次の担当：** 公開サイトで、目次・分類の切り替え、人物モーダルの開閉、プロフィールとTOTロゴの画像表示を確認し、結果を追記する。

### 2026-10-27 — Codex-BGS-20261027：X共有文と記事別ハッシュタグの改善

- **作業AI：** **Codex-BGS-20261027**（本チャット）。
- **依頼：** X共有時に自動入力される文章を記事を読みたくなる紹介にし、発見・交流向けの関連ハッシュタグを増やす。
- **着手確認：** main `dc2f785`（PR #68 マージ済み）、open PR 0件。最新マニュアルとログを確認。過去の #68 の「レビュー待ち／未マージ」は現在の状態ではない。
- **ブランチ：** `codex-bgs-20261027/x-share-copy`
- **変更：** 全20記事＋トップ／プロフィールの22ページへ、見どころを伝える固有の短文と6タグを用意。広い話題のディズニー、パーク名、施設／記事テーマ、BGS、ディズニー好きと繋がりたい、サイト名を組み合わせた。未掲載の新設定や過剰な煽り、投稿者の読了・感動を仮定する文章は追加していない。
- **管理：** 日本語は `share-captions.json` で一元管理し、`scripts/update_share_links.py` で完成したURLをHTMLへ生成。旧3記事のJS上書きとsite.jsのタイトル共有処理を撤去し、JavaScript無効時も同じ文面で共有できる。共有以外に使わなくなった2ページのsite.js読込は削除。他の演出・画像保護・モーダル・分類は維持。
- **文字数：** 日本語等の非ASCIIを一律2、ASCIIを1として保守的に計算し、記事URL用に24文字分を確保。22件すべて221〜247/280に収まる。タグの重複・不正文字・4〜6個の範囲、設定と共有ページの対応、HTML反映漏れを `--check` で検出し、CIへ組み込んだ。
- **デザイン／本文：** HTMLの表示テキストは全ページで変更前と一致。ページのCSS・記事本文・画像・日付・OGPは変更していない。
- **手順：** `docs/X_SHARE_COPY.md` に編集・生成・検証手順と3記事の投稿例を記載。`docs/SITE_QUALITY_CHECKS.md` とブラウザ検証にも共有文の照合を追加。
- **ソース検証：** SEO監査23ページエラー0（既存の sites.html JSON-LD警告1件）、共有文22件チェック成功、既存Python回帰テスト12件成功、JS構文・diffチェック成功。
- **ブラウザ／PR／CI：** 完了後の追記を参照。
- **公開状況：** 未マージ。公開ページでの反映、Xの実際の投稿画面・SNSプレビューは未検証。Xへの投稿操作は行っていない。
- **引き継ぎ：** `share-captions.json` の日本語をレビューし、必要なら文面を調整して生成し直す。マージ後にPagesと公開共有リンクの反映を確認する。

#### X共有文改善の検証・引き継ぎ追記 — Codex-BGS-20261027

- **ブラウザ：** 全23ページ×390/768/1280pxの69条件（既存の分類・履歴・モーダル・JS無効時表示を含む）成功。共有文の照合も既存ブラウザ検証へ追加した。別途、22ページ×JS有効/無効の44条件で、文面・6タグ・canonical URL・新規タブ・JSエラーなしを確認。旧ローカルHTTPサーバーの応答不良があったため、新しいサーバーで再実行して確認した。
- **修正コミット：** [f99e0bbd0d986c43d4d5b43cf131e7664c5409a1](https://github.com/teruluce/disney-bgs/commit/f99e0bbd0d986c43d4d5b43cf131e7664c5409a1)。検証済みローカルtreeとGitHub treeが一致。
- **PR：** [#70](https://github.com/teruluce/disney-bgs/pull/70)。文面は share-captions.json、投稿例は docs/X_SHARE_COPY.md で確認できる。
- **GitHub CI：** [Static SEO validation #40555301815](https://github.com/teruluce/disney-bgs/actions/runs/40555301815) — success。
- **状態：** 修正・検証完了、レビュー待ち。未マージ・本番未反映。Xへの実投稿は行っていない。公開サイト・X投稿画面の確認はマージ後に別途行う。

### 2026-10-27 — Codex-BGS-20261027：PR #70の作業ログ競合を解消

- **作業AI：** Codex-BGS-20261027。
- **原因：** PR #69（Claude-BGS-20261028のログ訂正とAI識別ルール）がmainへ先にマージされ、PR #70の同じログ末尾への追記と競合した。コードや共有文の競合ではない。
- **解消：** 最新main `e4070dc` をPR #70のブランチへ統合。ClaudeのAI名ルール・作業記録とCodexのX共有文改善記録を、どちらも削除せず残した。サイトのコード・共有文は変更していない。
- **検証：** 両方のログ内容の保持、競合記号なし、SEO監査、共有文22件チェック、回帰テスト12件、JS構文と差分を再確認。GitHub上のマージ可否とCIは更新後に確認する。
- **PR：** [#70](https://github.com/teruluce/disney-bgs/pull/70)。未マージ。

### 2026-10-27 — Codex-BGS-20261027：PR #70のマージ・公開反映確認

- **作業AI：** Codex-BGS-20261027。
- **マージ：** 運営者がPR #70をマージ。マージコミット `889a759deea3d3bd5cad4f293cec1362901bdeff`。
- **CI／デプロイ：** 同コミットのStatic SEO validation #40555827901と[Pages #40555826433](https://github.com/teruluce/disney-bgs/actions/runs/40555826433)がsuccess。
- **公開確認：** 正しい公開ホスト `https://teruluce.github.io/disney-bgs/` の全22共有ページをHTTPS取得。公開HTMLの共有リンクをデコードし、share-captions.jsonの紹介文・6タグ・canonical URLと22/22一致。反映前は旧文面だったため、デプロイ完了後に再確認した。
- **状態：** マージ済み・共有リンクの公開HTML反映確認済み。これはX実サービスでの投稿画面・実投稿・OGPプレビュー・実機確認を意味しない。投稿操作は行っていない。
- **記録方法：** 完了状態のみの文書追記。サイトコードの変更なし。

### 2026-10-27 — Codex-BGS-20261027：資料集の検索・関連記録・画像軽量化（PR #71）

- **作業AI：** Codex-BGS-20261027（このチャット）。
- **依頼：** 新聞・資料集の世界観を保ちながら、記事検索、トップ写真の軽量化、関連記事導線、記事追加時の更新確認を実装。
- **着手時の状態：** main `c6b6335`（PR #70 の公開確認記録まで反映）、open PR 0件。編集方針と共同作業ログを確認。
- **変更：** トップの20記事に施設名・見出し・説明を対象とする検索欄を追加。ランド／シーの分類と併用、件数・該当なし表示、目次から隠れた記事を開く復帰、JavaScript無効時の一覧表示を実装。誕生史・ランド史・ポートディスカバリーの3記事へ文脈に合う関連記録リンクを追加。本文の叙述・共有文・OGP画像は変更していない。
- **写真：** トップ表紙と16枚の写真カードに800/1200pxの表示用JPEGを追加。原画像は記事・OGP用に保持。対象原画像合計5,177,152 bytesに対し800px版合計1,429,560 bytes、表紙509,369→167,631 bytes。ファンタジースプリングスのカードは従来と同じ縦位置のトリミング。地図とイラストは従来のまま。
- **運用：** `scripts/check_archive.py` でFile No.・カード掲載・前後リンクを照合。`scripts/check_site.py` でSEO、共有文、記事番号、回帰テスト、JS構文を一括実行し、CIも同じコマンドを使う。新記事の追加手順と写真再生成手順を `docs/SITE_QUALITY_CHECKS.md` に追記。
- **ローカル検証：** `python scripts/check_site.py` 成功（SEO23ページでエラー0、sites.html の既存JSON-LD警告1件、共有文22件、記事20件のFile No.と前後リンク、Python回帰テスト12件）。Chromiumで全23ページ×390/768/1280pxの69条件成功。検索・分類・目次・該当なし・3件の関連リンク・画像デコード・横はみ出し・JavaScript無効時を確認。スマホ幅DPR2で800px版、DPR3で1200px版の選択を確認。390pxトップと関連記事の見た目を確認（Google Fontsはテスト時に遮断した代替書体）。
- **PR：** [#71](https://github.com/teruluce/disney-bgs/pull/71)。修正コミット [96a4b951](https://github.com/teruluce/disney-bgs/commit/96a4b951ffd91a018801a245967338d4296fa734)。ローカルで検証したtreeとGitHubのtreeが一致。PR作成後のGitHub表示は競合なし。
- **状態：** レビュー待ち・未マージ。GitHub ActionsのPRチェックはこの記録時点でまだ報告されていない。公開サイトへの反映、本番Core Web Vitals、実機での通信速度は未確認。
- **残作業：** CIの実行状況を確認し、レビュー後にマージする。マージ後にPagesデプロイと公開サイトの検索・画像・リンクを確認する。

#### PR #71 のCI完了追記 — Codex-BGS-20261027

- **GitHub CI：** [Static SEO validation #40565041553](https://github.com/teruluce/disney-bgs/actions/runs/40565041553) が `ed64b727` で success。SEO・共有文・記事番号・回帰テスト・JS構文の一括検査が成功。
- **PR状態：** GitHub上で競合なし。変更はレビュー待ち・未マージ。公開サイト・実機・本番Core Web Vitalsは引き続き未確認。

#### PR #71 のマージ・公開確認 — Codex-BGS-20261027

- **マージ：** PR #71 をレビュー・CI成功後にマージ。mainのマージコミット `82f2284eecd3d4563296f72a4748e601f28a9bf0`。
- **CI／公開：** 同コミットのStatic SEO validation #40565551653と[Pages #40565485916](https://github.com/teruluce/disney-bgs/actions/runs/40565485916)がsuccess。
- **公開確認：** 正しい公開URL `https://teruluce.github.io/disney-bgs/` から、トップの検索欄・新画像参照、3記事の関連記録リンク、共有JS、代表的な800/1200px画像をHTTPSで直接取得し、期待した内容・画像応答を確認。さらにPython urllibでTLS検証済みの公開ファイルをローカル経由でChromiumへ渡し、390px/DPR2で日本語検索・800px画像の選択・関連記事リンクを確認。Chromiumの直接HTTPS接続はこの実行環境の証明書信頼設定により失敗したため、この方法を用いた。Google Fontsはブラウザ検証時に遮断。
- **状態：** マージ済み・公開HTMLと主要操作の反映確認済み。実機iPhone/Androidでの速度、本番Core Web Vitalsは未測定。

### 2026-10-28 — Claude：新規記事「Genesis of BGS」（`bgs-genesis.html`、File No. 021）

- **作業AI：** Claude（ユーザー依頼：ディープリサーチ資料「世界のディズニーパークにおける主題化空間の創出と空間叙述（BGS）の進化史」をもとに、BGS Chroniclesの世界観のまま新しいページを作る。画像は後日）
- **対象ファイル：** 新規 `bgs-genesis.html`、`genesis-card.svg`／`genesis-card.png`（トップのカードとOGP用の自作イラスト。城と地下トンネルの断面）、`index.html`（目次リンク・カード・ItemList 21件目・最終編集日。「New」バッジは本記事へ移動）、`bgs-origins.html`（次の記事リンク）、`sitemap.xml`、`share-captions.json`（X共有文）、`scripts/browser_smoke.cjs`（トップの記事数 20→21）、`EDITORIAL_STANDARDS.md`（File No. 021 を追記）、本ログ
- **内容：** ウォルトの不満とWED Enterprises、映画技法の移植、アナハイムとフロリダ、ウィニー／強制遠近法／Go Away Green・Blending Blue、ミッキーの10の戒律（表）、ユーティリドール、世界のパーク比較表（東京・パリ・香港・上海）、ディスカバリーランドとサンダー・メサ／ファントム・マニア、S.E.A.のパーク横断（タワー・オブ・テラー、ミスティック・マナー、スキッパー・カンティーン、トロピカル・ハイダウェイ）、結び。計9章。
- **方針への対応：** 運営者の指示により、リサーチ資料の内容は信頼できるものとして扱った。本文は物語の語り口で書き、調査・出典の説明は入れていない。参考資料は記事末尾の折りたたみ欄（番号のみ・外部リンクなし、12件）。要点欄・スタンプは付けていない。ジョン・ヘンチの塗料や「乗物→体験」の言い換えは、資料に沿いつつ「〜とされる」「〜と伝えられています」で断定を避けた。
- **写真：** 後日追加の予定。本文中に `<!-- PHOTO-SLOT -->` コメントで位置の目安を5か所残した（枠そのものは未設置）。追加時は `bgs-origins.html` の `.photo-frame`／`.photo-cap` に合わせる。
- **検証結果：** Codex の PR #71（検索・関連記録・共有文の仕組み）が先にmainへ入っていたため、それに合わせて `site-components.css` の読み込み、関連記録欄（Birth of DisneySea／S.E.A.への2リンク）、`share-captions.json` を追加。`python scripts/check_site.py` 全項目通過（SEO監査エラー0、共有リンク、File No.・前後リンク、単体テスト、JS構文）。`scripts/browser_smoke.cjs` は 72 checks PASS（記事数の期待値のみ 21 に更新）。ウェブフォントが取得できない環境のため代替書体での確認。公開サイトでの表示と実機は未確認。
- **PR：** [#72](https://github.com/teruluce/disney-bgs/pull/72)（CI seo-smoke-check success）
- **状態：** マージ済み（マージコミット b4d1ebe、運営者がマージ）
- **公開状況：** Pages反映と公開ページでの表示は未確認（作業環境から公開サイトに接続できなかったため）。
- **残作業：** 写真の追加。トップのフィルター（All／Disneyland／DisneySea）には「Worldwide」の区分がなく、本記事は All でのみ表示される（data-cat="history"）。必要ならフィルターの追加を相談。

### 2026-10-28 — Codex-BGS-20261027：Genesis of BGSの導入を調整（PR #74）

- **依頼：** 記事の入りが急で読みにくいため、世界観を保って読み始めやすくする。
- **変更：** 見出しと目次の間に、パークの風景からBGSを紹介し、回転木馬の場面へつなげる2段落を追加。既存の本文・デザイン・目次は維持。
- **検証：** `python scripts/check_site.py` 成功（既存の sites.html JSON-LD警告1件）。Chromium 390px／1280pxで導入・目次の存在と横はみ出しなしを確認（代替書体）。
- **PR：** [#74](https://github.com/teruluce/disney-bgs/pull/74)、修正コミット `7b8ff723`。レビュー待ち・未マージ。公開サイトの反映は未確認。

#### PR #74 マージ・公開確認 — Codex-BGS-20261027

- PR #74 は `f40d9a1b3d46797affe4426ef2ba8458ee96d1ad` でマージ済み。PRのCI #40649770486 とPages #40649832812 が成功。
- 公開記事をHTTPSで取得し、新しい導入文の反映を確認。公開ページの実機表示は未確認。

### 2026-10-28 — Codex-BGS-20261027：Genesis記事の題名変更

- **依頼：** BGS Chroniclesの世界観に合う題名へ変更。
- **変更：** 見出しを「A World of Stories」、副題を「物語が紡ぐ、ディズニーパークの歴史」とし、トップ一覧・目次・記事間ナビゲーションと検索／共有用の題名を合わせた。記事URL、本文、共有文、画像は維持。
- **検証：** `python scripts/check_site.py` 成功（既存の sites.html のJSON-LD警告1件）、`git diff --check` 成功。公開反映はマージ後に確認。
- **状態：** レビュー待ち。作業ブランチ `codex-bgs-20261027/genesis-title`。

#### 改題の公開確認 — Codex-BGS-20261027

- [PR #75](https://github.com/teruluce/disney-bgs/pull/75) は `3fe875b533098f81293eb824200bcb74a1f3f773` でマージ済み。PRのCI #40650618952 とPages #40650684484 が成功。
- 公開のトップ、Genesis記事、前の記事の3ページをHTTPS取得し、新題名の反映を確認。ブラウザではローカルの390／768／1280pxで横はみ出しなしを確認（代替書体）。公開サイトの実機表示は未確認。

### 2026-10-28 — Codex-BGS-20261027：PCトップの一面を調整

- **依頼：** PCで開いたとき、トップの写真と目次が画面の途中で切れないよう新聞の一面を整える。
- **変更：** 高さ900px以下のPC（幅1100px以上）では題字・余白と写真／目次の比率を調整し、目次を3列に。高さ700px以下ではプロフィールリンクを上部へ移し、見出しと目次をさらにコンパクトにした。スマホ／タブレット向けCSS・本文・記事一覧は維持。画面が極端に低い場合や文字を大きくした場合は自然にスクロールする。
- **検証：** サイト一括チェック、ChromiumのPC幅1100／1280／1440pxと高さ640／720／900px、スマホ幅390pxで横はみ出し・21目次リンクを確認（代替書体）。公開サイト・実機は未確認。
- **状態：** レビュー待ち・未マージ。ブランチ `codex-bgs-20261027/desktop-front-page`。

#### PCトップの公開確認 — Codex-BGS-20261027

- [PR #76](https://github.com/teruluce/disney-bgs/pull/76) を `59b380725385873e3f1f4b84d0743ae5453e9d05` でマージ。PR CI #40651427824、Pages #40651498993 が成功。
- 公開 `desktop.css` をHTTPS取得し、ローカルで検証したCSSとバイト単位で一致。Chromium 1100×640、1280×640／720、1440×900で一面・目次移動を検証。Google FontsをTLS検証付きで取得し、1100×640、1280×640／720も確認。公開サイトの実機表示は未確認。

### 2026-10-28 — Codex-BGS-20261027：A World of Storiesを文字中心のカードに変更

- **依頼：** 元の城と地下のイラストが好みに合わず、写真を使わない文字中心のデザインを希望。20世紀初頭のアメリカンウォーターフロントの新聞が色味・字体の基準。
- **変更：** トップの記事カードを既存の紙色・セリフ体・インク色・ボルドー・細い罫線で文字組みに変更。共有用画像も文字中心の1200×630 PNGへ変更し、OGP・Xカード・構造化データの画像参照と画像説明を更新。既存画像は保持。共同編集ガイドへ運営者の視覚的基準を追記。
- **検証：** `python scripts/check_site.py` 成功（既存の sites.html JSON-LD警告1件）、Chromiumで390／768／1280pxのカード・横はみ出しを確認（代替書体）。共有用画像は `scripts/stories-share-card.html` の文字組みをChromiumで描画。公開・実機・SNSのプレビューは未確認。
- **状態：** レビュー待ち・未マージ。ブランチ `codex-bgs-20261027/stories-typography`。

#### A World of Storiesの分類を追加 — Codex-BGS-20261027

- **依頼：** ランド／シー両方に関わる記事が目次でシーに分類されて見えるため、明確に区別する。
- **変更：** トップ目次でシーとは別の「Worldwide / 世界のパーク」欄へ移動し、記事一覧に「世界のパーク」フィルターを追加。元から記事の分類は `history` で、今回対応するボタンを用意。PCの一面が画面内に収まるよう余白を調整。既存の文字組みカード変更（PR #77）と同じブランチにまとめた。
- **検証：** `python scripts/check_site.py` 成功（既存のsites.htmlのJSON-LD警告1件）、Chromiumで全24ページ×390／768／1280pxの72条件、分類・目次移動、1100×640／1280×640・720／1440×900の一面の収まりを確認（代替書体）。公開・実機は未確認。
- **状態：** [PR #77](https://github.com/teruluce/disney-bgs/pull/77) 更新、レビュー待ち・未マージ。

#### PR #77 マージ・公開確認 — Codex-BGS-20261027

- 運営者が[PR #77](https://github.com/teruluce/disney-bgs/pull/77)をマージ。マージコミット `9472bd62dc937f08c7b9976d839597f5f99b530f`。
- PR CI #40652947375、main CI #40653058030、Pages #40653058138 は成功。
- 公開の `index.html`、`desktop.css`、`bgs-genesis.html`、`stories-share-card.png` をHTTPS取得し、検証済みファイルとバイト単位で一致。公開サイトの実機表示とSNSの実プレビューは未確認。

### 2026-10-28 — Claude-BGS-20261028：A World of Storiesの語り口を修正・再発防止ルール追記

- **依頼：** 最新記事の口調がBGS Chroniclesの世界観を壊していないか確認し、「公式によると」系を避けたい。直したうえでルールにも書く。
- **確認結果：** 「公式によると」等は0件。ただし資料調の文末が4か所残っていた。
- **変更（`bgs-genesis.html` の本文4か所）：** 「と伝えられています」→「と語り継がれています」／「語ってきた設計哲学に沿えば」→「語ってきたとおり」／「発表されています」→「明かされました」／S.E.A.設立の「設定では〜とされています」→二重のぼかしをやめて言い切りに。事実・構成・デザイン・参考資料は変更なし。
- **ルール追記：** `docs/AI_WORK_LOG.md`（記事本文の書き方の節）と `EDITORIAL_STANDARDS.md` に、調査資料をもとに書くときの追加ルールと公開前の検索語を追記。
- **状態：** PR作成後、レビュー待ち。ブラウザでの見た目・公開サイトは未確認（文章のみの変更）。

### 2026-10-28 — Codex-BGS-20261027：写真提供のお願いをフッターへ追加

- **依頼：** 指定文を使い、写真の無償提供をフッター付近で募集する。専用ブランチ・PRで作業し、mainへ直接変更・マージしない。
- **変更：** トップのフッターに指定文をそのまま追加。既存の紙色・セリフ体・ボルドー・細い罫線を使用。トップの既存連絡先にあるInstagram `https://www.instagram.com/teru_luce_` とプロフィールにあるBGS公式X `https://x.com/BGSChronicles` へのリンクを記載。DMの受付設定そのものは未確認。既存モーダルの「掲載写真データの著作権は管理者に帰属」を、提供写真の条件と矛盾しない「掲載写真の著作権は撮影者に帰属」に変更。
- **検証：** `python scripts/check_site.py` 成功（既存sites.htmlのJSON-LD警告1件）、`git diff --check` 成功。Chromiumの390／768／1280pxで募集文・2リンク・横はみ出しなし・タップ領域と既存モーダルの開閉を確認。Google Fontsを遮断した代替書体。実機・公開サイト・SNSのDM受付は未確認。
- **状態：** レビュー待ち、未マージ。専用ブランチ `codex-bgs-20261028/photo-contributions`。


### 2026-10-29 — Codex-BGS-20261029：26ファイル監査後の限定校正

- **承認：** 運営者が今回の作業に限り、明白な誤字・固有名詞の誤記・意味を変えない表記統一・文法誤り・同一文中の明白な重複の修正と、差分確認・既存テスト成功を条件とするPR作成／mainマージを明示承認。恒常的な自動マージ許可ではない。
- **着手確認：** `AGENTS.md`、`AI_GOVERNANCE.md`、`EDITORIAL_STANDARDS.md`、本ログ、`docs/SITE_QUALITY_CHECKS.md`を確認。GitHubのmainは `aded602489f502ffc686b6b954d9e7c2e1358886`、open PRは0件。以前のログの「レビュー待ち」は現在の状態とは限らない。
- **ブランチ：** `codex-bgs-20261029/proofreading`。
- **変更：** HTML 12件・26か所の文字置換。トップ本文初出を「BGS（バックグラウンドストーリー）」にし、以降の重複説明をBGSへ。個別記事の冒頭説明・SEOメタデータを保持。変更一覧は下表。
- **範囲確認：** 変更前後のタグ／属性列、script全ブロック（JSON-LD・人物紹介データ含む）、style全ブロックの完全一致を確認。CSS・JavaScript・画像・HTML構造の変更なし。公式設定・歴史・独自考察・引用の内容は変更しない。今回の限定された文字修正とログ追記に範囲を絞り、既存の編集日表示・サイトマップも保持。
- **検証：** `python scripts/check_site.py` 成功（SEO 24ページ・共有リンク23件・資料番号21件・Python回帰テスト12件・共有JS構文）。既存の `sites.html` JSON-LD未設定警告1件。`git diff --check`成功。置換許可一覧と差分の完全一致を確認。
- **保留（JavaScript変更禁止）：** `bgs-sea.html` の人物紹介データに残る「マインプレイン」「無限 of ロマン」「飛行の驚異博物館」はscript内のため未修正。
- **保留（内容・根拠・文体の判断が必要）：** スカラー氏の肩書・十の戒律と地下設備の因果、S.E.A.の創設者／年表／船名、ファントム・マナーの旧版と現行版、監督名・善悪の結末・地理などの事実関係、人物カードの人数、三生／三精と当時の商号、炭鉱／金鉱、音楽用語、設計意図・引用・技術仕様・写真提供条件・出典整備。監査の指摘は今回修正した事実を意味しない。大げさな表現や段落間の反復も、世界観・記事内容に関わるため保持。
- **ブラウザ検証：** 既存の `node scripts/browser_smoke.cjs` 成功。Chromiumで24ページ×390／768／1280pxの72条件、検索・フィルター・履歴・ダイアログ5件・reduced motion・JavaScript無効時の表示を確認（Google Fontsを遮断した代替書体）。
- **状態：** ローカル文字修正・ソース検証完了。マージは今回の承認条件およびPRの最終CI確認後に実施する。この記録時点では未マージ。
- **公開確認：** 本番反映・実機・SNS共有プレビューは未確認。

| ファイル | 修正前 | 修正後 | 箇所数 |
|---|---|---|---|
| `index.html` | 背景設定（BGS）を、 | BGS（バックグラウンドストーリー）を、 | 1 |
| `index.html` | 世界のディズニーパークでバックストーリーが育った歴史。 | 世界のディズニーパークでBGSが育った歴史。 | 1 |
| `index.html` | このサイトで紹介しているバックグラウンドストーリー（BGS）は正確な情報を集めておりますが、 | このサイトで紹介しているBGSについては、正確な情報を集めておりますが、 | 1 |
| `bgs-sm.html` | 最後のはっぱり（嘘） | 最後のはったり（嘘） | 1 |
| `bgs-tl.html` | ウェスタンランド | ウエスタンランド | 1 |
| `bgs-worldbazaar.html` | ロイ・オ・ディズニー | ロイ・O・ディズニー | 1 |
| `bgs-spatial-epic.html` | 一獲千金 | 一攫千金 | 1 |
| `bgs-indy.html` | 一獲千金 | 一攫千金 | 1 |
| `bgs-raging.html` | 足場の上に引かれたレール | 足場の上に敷かれたレール | 1 |
| `bgs-sindbad.html` | 老人の海に遭遇 | 海の老人に遭遇 | 1 |
| `bgs-tdlhistory.html` | 冬の訪れとともに訪れるクリスマス期間 | 冬の訪れとともに迎えるクリスマス期間 | 1 |
| `bgs-sea.html` | 彼らの歩んでできた長い歴史 | 彼らが歩んできた長い歴史 | 1 |
| `bgs-sea.html` | 「飛行の驚異博物館」 | 「ファンタスティック・フライト・ミュージアム」 | 1 |
| `bgs-sea.html` | 走走破 | 走破 | 1 |
| `bgs-sea.html` | バルカニア・レストラン | ヴォルケイニア・レストラン | 1 |
| `bgs-sea.html` | 学会員たちと出会り | 学会員たちと出会い | 1 |
| `bgs-sea.html` | トロピカル・ハイドアウト | トロピカル・ハイドアウェイ | 2 |
| `bgs-genesis.html` | 設計思想、バックグラウンドストーリー（BGS）の原型 | 設計思想、BGSの原型 | 1 |
| `bgs-genesis.html` | 見えない設計図としてのバックストーリー | 見えない設計図としてのBGS | 2 |
| `bgs-genesis.html` | ディズニーパークでいうバックストーリーは、 | ディズニーパークでいうBGSは、 | 1 |
| `bgs-genesis.html` | というバックストーリーを持っていました。 | というBGSを持っていました。 | 1 |
| `bgs-genesis.html` | 「バックストーリー」という物語の骨格 | 「BGS」という物語の骨格 | 1 |
| `bgs-genesis.html` | ファントム・マニア | ファントム・マナー | 1 |
| `bgs-origins.html` | 編み上げられたバックグラウンドストーリーのネットワーク | 編み上げられたBGSのネットワーク | 1 |

#### PR・初回CI確認 — Codex-BGS-20261029

- **PR：** [#81](https://github.com/teruluce/disney-bgs/pull/81)。文字修正コミットは [`dcd81d42`](https://github.com/teruluce/disney-bgs/commit/dcd81d42fc77a08ecfdbaa87284416ecbe3b7abf)。
- **照合：** GitHub上のブランチをfetchし、ローカルで検証した13ファイルと完全一致を確認。
- **CI：** 初回PR CI [Static SEO validation #40836269030](https://github.com/teruluce/disney-bgs/actions/runs/40836269030) はsuccess。
- **状態：** 本追記はPR作成後・マージ前の記録。最終コミットのCI成功と差分を再確認後、運営者の今回限りの明示承認に基づきマージする。最終的なマージSHAと時刻はPRタイムラインを参照。本番公開確認は別途必要。

### 2026-10-30 — Codex-BGS-20261030：ネモ船長の無線送電の記事を追加

- **依頼：** 「ネモ船長の島には、なぜ電線のない照明があるのか？」を新規ページにし、コードで制作した挿絵を一枚使用する。本文は物語世界の内側から語り、イマジニア関連以外のメタ発言を入れない。
- **着手確認：** AGENTS、AI運営憲章、編集基準、品質チェック、本ログを確認。main `b94142c9cc5dac026d526a261f0d3a9f9ad1b2d1`、open PR 0件。既存の未マージ作業との重複なし。作業ブランチ `codex-bgs-20261030/nemo-wireless-power`。
- **変更：** `bgs-nemo-wireless.html`（File No. 022 / The Unseen Current）を追加。四章構成で、1870年代の招待、ヴォルケイニアの地熱発電所、変圧器からの無線送電、照明の受電コイルを記述。参考資料は末尾に折りたたみ、本文・見出し・挿絵の説明に調査や設定のメタ説明を入れない。捏造の手記・台詞・技術仕様は加えていない。
- **挿絵：** オリジナルのSVGコード `nemo-wireless-plate.svg` を一枚制作。火山の岩壁、発電設備、送電・受電コイルと照明を、紙色・セピア・抑えた青で構成。設備の形状と配置は挿絵として独自に描いたもので、現地機器の正確な図面ではない。第三者の画像は流用していない。同じ一枚をトップカードに再使用し、OGP向けに同一絵柄の1200×800 PNGを出力。
- **サイト統合：** トップ目次とカード、前の記事の次リンク、サイトマップ、X共有文を更新。既存番号とカード順は保持。既存ブラウザスモークの一覧件数を21→22へ更新。最新の世界観ルールを `EDITORIAL_STANDARDS.md` に記録。
- **出典確認（2026-10-30）：** 東京ディズニーリゾート・ブログ「ミステリアスアイランドに関するちょっと細かいストーリー：その1」（2021-06-24、https://www.tokyodisneyresort.jp/tdrblog/detail/210624/）、同「ヴォルケイニア・レストラン」（https://www.tokyodisneyresort.jp/tds/restaurant/detail/418/）。原文を転載せず、裏付けのある内容を語り直した。
- **ソース検証：** `python scripts/check_site.py` 成功（SEO 25ページ・共有24件・資料番号22件・既存Pythonテスト12件・共有JS構文）。既存の `sites.html` JSON-LD警告1件。`git diff --check` 成功。本文の禁止語、挿絵一枚、四章、SVGのXML構文を確認。
- **ブラウザ検証：** 管理プレビューとCUAのChromiumで、新記事・トップ・前の記事を390／768／1280px幅のiframeで確認（9条件、横はみ出しなし）。新記事のJavaScript無効時に本文が読めること、挿絵の読み込み、トップで「無線送電」検索→新記事を開く導線、実ページで参考資料欄の開閉を確認。既存 `browser_smoke.cjs` の全ページ一括実行は未実施。実機・本番・SNSの実プレビューは未確認。
- **状態：** 作成・ローカル検証完了。PRのコミット／URLは同ブランチとPRタイムラインを参照。mainへのマージと本番公開は未実施。既存の運営憲章に従いレビュー待ちとする。


### 2026-10-30 — Codex-BGS-20261030：新記事の口調を既存記事に統一

- **依頼：** 公開作業中、運営者から他のページと口調を合わせるよう追加指示。
- **変更：** スプラッシュ・マウンテン／ソアリンの記事を確認し、File No. 022の本文と挿絵キャプションを「です・ます」調へ統一。物語世界の内側から語る方針を維持。事実・構成・挿絵・HTML構造・CSS・共有文は保持。編集基準にも敬体を記録。
- **検証：** 置換前後のタグ・属性・style/scriptブロックの一致を確認し、サイト一括チェックを実施。文字の口調のみの修正のためブラウザ一括テストは再実施しない。
- **公開：** PR #82はユーザーの明示承認後、c5b963ebでマージ。Pages #41040829801とmain CI #41040830668は成功。本修正も、継続中のページ公開作業への追加指示としてPR・CI確認を経て反映する。


### 2026-10-30 — Codex-BGS-20261030：File No. 022をミステリアスアイランド全体の記事へ拡充

- **依頼：** 無線送電だけでは記事が薄いため、このページをテーマポート全体の解説へ変更。日本語・英語で広く調査し、アトラクション個別の解説は別とする。
- **着手確認：** mainは `2dd39b6d795ff2105180595825927483f982858c`（PR #83まで反映）、open PR 0件。AGENTS、憲章、編集基準、最新ログを確認。前回のページ作成・口調修正はマージおよびPages成功済み。
- **調査：** 日英のテーマポート紹介、TDRブログ、各飲食・物販施設の日英紹介、Disney Vacation Channel、D23／Walt Disney Archives、TEA、英語現地レポートなどを確認。記事末尾は対応する日英ページをまとめた13項目。詳細なURL・章別根拠・採用しなかった情報は `docs/research/mysterious-island.md` に保存。
- **変更：** 同じURL・資料番号022を保ち、題名を「Mysterious Island／ミステリアスアイランド――ネモ船長の秘密基地を歩く」に変更。約4,100字・9章とイマジニアの短い余録に拡充。地理と時代、船長、カルデラの構造、ノーチラス号、ネプチューン号／アルバトロス号、無線送電、三つの食事施設、修理工場の来歴、Nの印とモットーを扱う。既存の挿絵一枚は電力の章で継続使用。
- **範囲：** 個別アトラクションの筋書き・待ち列・乗車体験・ライドシステムは加えない。本文は敬体かつ作中の語り。メタ説明はイマジニアの余録に限定。既存の画像、CSS、JS、記事番号、URLを保持し、旧セクションのアンカーも残した。
- **導線：** トップ目次・カード、前の記事からのリンク表記、検索用説明、SEO／OGP／構造化データとX共有文を全体記事の題名・内容へ統一。記事数は22件のまま。同日内の改訂のため編集日とサイトマップの日付は2026-10-30を維持。
- **検証：** `python scripts/check_site.py`成功（25ページ・24共有リンク・22資料番号・既存Pythonテスト12件・共有JS構文）、`git diff --check`成功。本文の禁止語、9章、一枚の挿絵、旧アンカーを確認。管理プレビューのCUA／Chromiumで新記事・トップ・前の記事の390／768／1280px幅の9条件を確認し横はみ出しなし。JavaScript無効時の末尾本文表示、検索から新題名の記事へ移動、目次の最終章、実ページの参考資料欄の開閉を確認。実機と改訂後の本番は未確認。既存browser_smoke.cjs全体の一括実行は未実施。
- **状態：** 改訂版を作成・検証し、専用ブランチ `codex-bgs-20261030/mysterious-island-port` でPRレビュー待ち。PR番号とコミットは同ブランチ／PRタイムラインを参照。今回の大幅な本文拡充は未マージ・未公開。


### 2026-10-31 — Codex-BGS-20261031：スマホ優先の共通記事レイアウト

- **依頼：** ページ構成を統一し、改行・可読性を微調整。スモールワールドとトゥモローランドは独自デザインを維持し、スマホを最優先にPC・タブレットにも対応。
- **着手確認：** AGENTS、AI運営憲章、編集基準、品質チェック、最新作業ログを確認。ローカルに既存変更なし。Gitの読み取りでmain `c65f76e60dbbb2afef3166a09015798fb2a9068b` と一致を確認し、作業ブランチ `codex/mobile-article-layout` を作成。GitHub APIはForbiddenのため、open PR一覧は取得できず、重複PRの有無は未確認。
- **変更：** 共通記事20ページに限定した `article-layout.css` を追加。英語題字、日本語副題、任意の導入文、資料番号、目次、本文の順序と表示を統一。目次の章番号を独立した列にし、長い項目の折り返し位置を揃えた。本文はスマホ16px／641px以上17px、読みやすい行間と左右余白に統一。タブレットは最大800pxの1列、1100px以上は左目次・右本文。コラム・表・写真・末尾導線の余白も共通化。
- **改行：** 長い本文25箇所を文末で段落分け。既存の連続brは本文内で段落へ変更し、表・ラベルの意図的な改行は保持。タグ・空白を除く本文文字列が20ページすべてで変更前と一致することを検証。記事の事実・出典・画像・資料番号・URL・編集日は変更していない。
- **例外：** bgs-smallworld.html、bgs-tl.htmlと両専用CSS、およびmobile.cssは未変更。トップ・プロフィール・サイト選択ページはそれぞれの役割を維持。新しい共通レイヤーは記事20ページだけが読み込む。
- **検証：** check_site.py成功（SEO25ページ、共有24件、資料番号22件、Python12テスト、JS構文）。既存browser_smoke.cjs成功（75ページ／画面幅と検索・履歴・5ダイアログ・reduced motion・JS無効時）。追加のブラウザ検証は320／390／768／1024／1280／1536px×25ページの150条件で成功。横はみ出し、本文サイズ、目次リンク、PCでの列の重なり、目次番号が1行に収まることを確認。390／768／1280pxの画像で題字・本文・両例外デザインを目視確認。git diff --check成功。
- **未確認・状態：** Google Fontsは既存スモーク同様に遮断したフォールバック書体で検証。実機・実フォント・本番は未確認。既存のsites.htmlのJSON-LD未設定警告1件。ローカル修正済み、未コミット・未PR・未マージ・未公開。GitHub APIアクセス制限のためこの環境からのPR作成は未実施。


#### PR作成・マージ依頼 — Codex-BGS-20261031

- 運営者からPR作成とマージの明示承認を受領。check_site.pyとgit diff --checkを再確認し成功。
- GitHubのGit接続は成功するが、api.github.comへのCONNECTがHTTP 403で拒否され、REST・GraphQLとも利用不可。実行中ネットワークの許可先にapi.github.comがないことを確認。GH_TOKENは既存注入あり（値は非表示）。
- API接続用のapi.github.comを環境設定の下書きに追加。適用後にPR作成、CI確認、マージを再開する。通信制限を回避してmainへ直接pushしない。


#### 公開承認後の再開 — Codex-BGS-20261031

- 運営者から「公開まで行っていい」と明示承認を受領。更新後の環境ではGitHub API接続が成功し、open PRは0件、mainはc65f76eで作業開始時と一致することを確認。
- check_site.py（Python12テストを含む）とgit diff --checkを再確認し成功。前回のブラウザ検証結果は上記参照。実装の追加変更はない。
- PR：[#87](https://github.com/teruluce/disney-bgs/pull/87)。GitHub Pagesはmainルートから自動公開される構成。PRの最終コミットのCI成功後にマージし、Pages実行と公開サイトへの反映を確認する。マージSHAと最終結果はPR・Actionsタイムラインを参照。


### 2026-10-31 — Codex-BGS-20261031：写真募集とフッターをコンパクト化

- **依頼：** 写真提供のお願いを折りたたみ、著者ページと重複する連絡先を整理して下部の長さを抑える。
- **着手確認：** AGENTS、運営憲章、編集基準、品質チェック、最新作業ログを確認。既存変更なし、open PR 0件。mainはPR #87マージ済みの2712aff。そこからcodex/compact-photo-requestを作成。
- **変更：** index.htmlの写真募集を標準のdetails/summaryへ変更し、初期表示は閉じる。無償提供・許諾・クレジット・著作権の条件は保持し、連絡先はprofile.htmlへのリンクに集約。モーダルから重複するSNS連絡先を除き「サイトについて」へ変更。X共有をフッター内へ移し、重複する補足文と大きな下余白を整理。関連サイトとサイト案内を横並び（狭い画面では折り返し）にした。著者ページ・記事・公開済みの本文は未変更。
- **検証：** check_site.py（25ページ、24共有リンク、22記事、Python12テスト、JS構文）成功。既存ブラウザテスト75条件と検索・履歴・ダイアログ・JS無効時の確認が成功。320／390／768／1280pxで折りたたみの初期状態、Enter／Space操作、著者ページへのリンク、重複SNSリンクの除去、横はみ出しなしを確認。JS無効でも開閉・著者ページへの遷移が成功。390pxの開閉両状態を画像で確認。フッター開始位置から文末までの高さは390pxで800→337px、1280pxで719→312px。git diff --check成功。
- **状態：** 確認用PRとして提出。今回の変更は未マージ・未公開。実機・実Webフォント・本番は未確認。既存のsites.htmlのJSON-LD警告1件は継続。


### 2026-10-31 — Codex-BGS-20261031：補助案内に限った印刷調の書体

- **依頼：** 印刷機で刷ったような質感の書体に寄せる。追加指示により、本文全体ではなく写真募集などメインではない案内だけへ適用。
- **着手確認：** AGENTS、憲章、編集基準と品質手順を確認。既存変更なし、open PR 0件。PR #88反映済みのmain d4d45b9からcodex/letterpress-typographyを作成。
- **変更：** print-notes.cssを追加し、写真募集、フッター、日付、サイト案内、共有の補足、参考資料だけへ適用。記事本文、英語題字、日本語副題、カード、目次の書体・サイズは既存のまま。Google Fontsの既存読込も保持。スモールワールドとトゥモローランドは未変更。CSSは共通22ページで読み込むが、適用対象は補助案内のクラスだけ。
- **書体：** 英字はIM FELL English、日本語はしっぽり明朝B1の実際の輪郭によるかすれ・墨だまりを使用。ぼかし・影の加工は行わない。Google Fonts公式の固定コミットから取得し、原本のSHA-256を検証。SIL OFLを同梱し、部分配布版は別ファミリー名に変更。必要な補助文に絞ったWOFF2二つをサイト内配信（計165,800 bytes）。出典・ライセンス・再生成方法はfonts/README.md。生成スクリプトはscripts/build_print_fonts.py。
- **検証：** check_site.py（Python12テストを含む）とgit diff --check成功。既存ブラウザ75条件の表示・検索・履歴・ダイアログ・JS無効時が成功。320／390／768／1024／1280／1536px×25ページの150条件で横はみ出しなし。共通CSSの有効／無効を比較して本文・見出し・カード・目次のfont-family、サイズ、ウェイト、行間が不変であることを確認。Chromiumの実描画フォントで写真募集にBGS Press Mincho／Englishが使われ、題字には使われないことを確認。390／1280pxの画像、折りたたみのキーボード操作、JS無効時・フォント通信失敗時の可読性も確認。
- **状態：** 確認用PRへ提出し、未マージ・未公開。既存Google Fontsはブラウザ検証時に遮断してフォールバックで比較し、追加ローカル書体は実ファイルを読み込んで検証。実機と本番は未確認。既存sites.htmlのJSON-LD警告1件。


### 2026-10-31 — Codex-BGS-20261031：小さめの画面でもPC表示

- **依頼：** 現在の画面サイズでもPC表示にする。切替幅は運営者から一任されたため、横幅768px以上を採用し、767px以下は従来の縦並びを維持。
- **着手確認：** AGENTS、運営憲章、編集基準、品質手順、最新ログを確認。ローカル変更なし、open PR 0件。mainはPR #89反映済みの32c3364でローカルHEADと一致。作業ブランチcodex/desktop-from-768を作成。
- **変更：** トップと全22記事のdesktop CSS読込条件、および共通記事レイヤーの切替を1100pxから768pxへ変更。768〜1099pxでは左右24px、記事の目次180px、列間24pxにして本文幅を確保。トップは等幅2列、目次2列、小さめの題字とした。1100px以上の既存レイアウトと独自2記事の意匠を維持。HTMLの変更がstylesheetのmedia属性だけであることを比較確認し、本文・画像・URL・SEO・編集日は保持。
- **検証：** check_site.py成功（25ページ、共有24件、22記事、Python12テスト、共有JS構文）。既存ブラウザテストを390／767／768／1024／1280pxの125条件へ拡張し、PC列の非重複・本文幅・画面内への収まりと767px以下の縦並びを追加確認。検索・履歴・ダイアログ5件・reduced motion・JS無効時も成功。トップ768×900／768×1100／1024×640と共通記事・独自2記事768×900の画像を目視確認。git diff --checkとテストJS構文確認も成功。
- **未確認・状態：** Google Fontsは既存手順どおり遮断し、フォールバック書体と既存ローカル書体で検証。実機・実Google Fonts・本番は未確認。既存sites.htmlのJSON-LD警告1件は継続。確認用PRとして提出し、今回の変更は未マージ・未公開。公開・マージは運営憲章第2条・第6条に従い別途明示承認後に行う。


#### PR #90 公開承認 — Codex-BGS-20261031

- 運営者から「許可する」と明示承認を受領。PR #90のマージ・本番公開を進める。
- 公開前にPRがOPEN・MERGEABLE・CLEANで、実装コミットcce16fdのCI成功を確認。ローカル変更なし。GitHub Pagesはmainルートから自動公開される構成を再確認。
- 実装・ブラウザテスト結果は上記のとおりで追加変更なし。本追記は承認の記録のみ。最終マージSHAとPages公開結果はPR #90とActionsのタイムラインを参照。


### 2026-10-31 — Codex-BGS-20261031：PC表示CSSのキャッシュ更新

- **依頼・承認：** PR #90の公開承認後、運営者からPCブラウザで「変わらない」と報告。同じPC表示修正の継続対応として実装・検証・公開を行う。画面幅の実測値は未取得で、利用者環境の原因を断定しない。
- **確認：** mainは427cd89、open PR 0件、ローカル変更なし。公開トップ・CSSは更新済みだが、配信ヘッダーはCache-Control: max-age=600。旧CSSが残ると、HTMLのmedia属性が768pxでもCSS内の1100px条件でPC表示が始まらないことをブラウザで再現。
- **変更：** トップと全22記事のPC表示CSS、共通記事CSSのURLにファイル内容のSHA-256先頭10桁を付加。CSS本体・画面幅条件・本文・画像・SEO・編集日は変更しない。作業ブランチcodex/desktop-cache-refresh。
- **検証：** check_site.py（25ページ・共有24件・記事22件・Python12テスト・JS構文）とgit diff --check成功。ブラウザでトップ・共通記事・独自2記事を768／1024pxの8条件×修正前後で確認。旧CSSを保持した状態で未修正URLの失敗を再現し、更新番号付きURLではPC表示になることを確認。既存sites.html JSON-LD警告1件は継続。実機・利用者のキャッシュ状態は未確認。
- **公開：** PR・CIを経て同じ公開承認の範囲で反映する。最終PR番号・マージSHA・Pages実行結果はGitHubタイムラインを参照。HTML自体のキャッシュが残る場合に備え、完了時に更新番号付きページURLを案内する。

- **追加確認・方針：** 運営者の環境はiPadから外部モニターへの出力と判明。その後「自分の環境優先じゃなくて一般的な設定でいい」「見る人の表示が崩れたり見にくかったりする方が問題」と明示されたため、作業途中の専用表示切替・viewport強制案は未公開のまま取りやめ、関連ファイル・HTML読込を除去。一般的なレスポンシブ設定（768px以上はPC列、767px以下は縦並び）を維持し、今回のPRはCSSキャッシュ更新だけに限定する。


### 2026-10-31 — Claude-BGS-20261031：コード検査の結果対応（読了時間表記・pycache）

- **依頼・承認：** 運営者から「コードエラーとスマホ/PC切替の確認」を依頼され、結果報告後に「修正してマージまで進めてください」と明示承認を受領（憲章第2条）。
- **検査結果（変更なし・問題なし）：** main（PR #91時点、c73dc03）の全25ページをChromeで320〜1920pxの11幅に表示し、横はみ出し・画像切れ・HTTPエラー・目次と本文の重なりは0件（記事22本×9幅の198条件）。絞り込み・検索・目次リンク・各ダイアログはスマホ幅とPC幅で動作。check_site.py成功。641〜767pxは1列表示で崩れなし。
- **変更：** (1) 本文の文字数（日本語、本文のみ）に対し大きくずれていた10記事の「Reading · N min」を1分600字の基準で修正（btm 3→7、electricalparade 5→12、genesis 10→13、raging 3→7、sea 4→12、sindbad 3→8、spatial-epic 5→12、tl 3→7、tot 5→10、mysterious-island 9→5）。ずれが小さい12記事は変更せず。本文・画像・URL・SEO・編集日は変更なし。(2) 追跡されていた `scripts/__pycache__` の.pycを追跡から外し、`.gitignore` に `__pycache__/` と `*.pyc` を追加。
- **未確認：** 検査はChromiumのみ。Google Fonts遮断（代替フォント）。実機・実Webフォント・本番は未確認。読了時間は概算で、運営者が基準を決めた場合はそちらを優先。


### 2026-10-31 — Codex-BGS-20261031-2：ビッグサンダー・マウンテンを東京版に限定して全面改稿

- **依頼：** 調査・本文・HTML実装・検証・レビュー可能なPR作成まで。自動マージ・本番公開は行わない。
- **着手確認：** AGENTS、AI運営憲章、編集基準、品質手順、共同作業ログを確認。スプラッシュ、ソアリン、ミステリアスアイランドの複数章を読み、最新の敬体・作中の語り・末尾資料欄を採用。ローカル変更なし。GitHubのopen PRは0件、リモート全ブランチをfetchしてmainに未統合のブランチなし。最新main `9254bec3b4c5d5ac23bbd4cd840fdeb2efe484b1` から `codex-bgs-20261031-2/tokyo-big-thunder` を作成。
- **調査・執筆：** 提示された5資料すべての原文を再読。Disney Parks Blogの東京節、2019年TDRブログ、現行アトラクション紹介、D23、バーク本人の2009年インタビューを採用。6章＋折りたたみ参考資料で、金発見・約30年の産金、ベル・担架・広告・洗濯釜、深部採掘と異変、サムとディガーの来歴、東京向け制作を記述。制作章以外ではメタ発言を除き、台詞・心情・災害の経過を補作していない。
- **訂正・見送り：** 東京のタンブルウィード水没、雷神名・先住民の警告、全員逃亡、炭鉱表記、トラクター交渉の脚色、未検証の車名一覧、サムを見る手段の限定、植物の全実物・幸運説、制作者の思想の代弁を削除。トラクターの製造年・希少性・用途・取得経緯は個別に検討したが一次裏付けに至らず、すべて掲載を見送った。海外節とパリの設備逸話は転用しない。詳細なURL・章別根拠・採用境界は `docs/research/big-thunder-tokyo.md`。
- **実装範囲：** `bgs-btm.html` の本文・目次・title/description/OGP/Twitter/Articleを整合。旧6アンカー、File No.002、写真原本、画像保護、共通CSS/JS、前後リンクを保持。編集日・Article.dateModified・sitemap.lastmodは実作業日2026-10-31。トップの同記事紹介とX共有文も訂正。参考資料の日本語追加に伴い、fonts/README.mdどおり原本のSHA-256と指定ツールで補助書体を再生成し、差分のある `fonts/press-mincho.woff2` だけを含める。
- **ソース検証：** `python scripts/check_site.py` 成功（25ページ、24共有リンク、22資料番号、Python12テスト、共有JS構文）。内部リンク・重複ID・メタ情報・JSON-LD・日付・サイトマップを確認。本文の禁止語検索、目次と見出しの対応、旧アンカー保持、`git diff --check` も成功。既存の `sites.html` JSON-LD未設定警告1件は継続。
- **ブラウザ検証：** 既存 `browser_smoke.cjs` が125ページ／画面幅条件、検索・履歴・5ダイアログ・reduced motion・JS無効時を含め成功。記事単体を320／390／767／768／1024／1280／1536pxで確認し、目次7件の見出し対応と49件の遷移、旧6アンカーへの42件の到達、参考資料のEnter/Space開閉、画像、横はみ出しなしを検証。390／768／1280pxの本文・参考資料と390／1280pxの題字を画像で目視確認。Chromiumの実描画で参考資料にBGS Press Mincho/English、本文に既存書体が使われることを確認。「セドナ」検索から対象記事へ移動、JS無効時の本文・目次・参考資料のEnter開閉、WOFF2失敗時の可読性も成功。
- **状態：** ローカル実装・検証済み、PR作成準備。コミットとPR URLは作成後に追記する。マージ・デプロイ・本番確認は未実施。Google Fontsは標準検証と同じく遮断し、既存の代替書体で検証。実機・他ブラウザ・実Google Fontsは未確認。


#### PR提出・CI確認 — Codex-BGS-20261031-2

- **PR：** [#93](https://github.com/teruluce/disney-bgs/pull/93)（レビュー可能な通常PR）。実装コミット：[291d5fab](https://github.com/teruluce/disney-bgs/commit/291d5fabf0dcdf385b17aafdd6b1bf397981d7b6)。
- **照合：** 提出先ブランチをfetchし、7ファイルすべてがローカルで検証した内容とバイト単位で一致することを確認。
- **CI：** 実装コミットの [Static SEO validation #41174997389](https://github.com/teruluce/disney-bgs/actions/runs/41174997389) はsuccess。PRはOPEN・非draft・mergeable。末尾の記録追記後も最終コミットのCIを確認する。
- **引き継ぎ：** 本文・出典対応・掲載見送り事項をPRでレビューする。独立した他AIレビューは未実施。マージ・自動マージ・デプロイ・本番確認は行っていない。Google Fontsと実機等の未確認範囲は上記のとおり。


#### PR #93 マージ承認 — Codex-BGS-20261031-2

- 運営者から「マージして」と明示承認を受領。最終実装・記録コミット95f6a3cfのCI [#41175058373](https://github.com/teruluce/disney-bgs/actions/runs/41175058373)成功、PRはOPEN・非draft・mergeable、headに追加変更なしを確認。
- 内容量の質問に対し、見出し・参考資料・ナビを除いた本文段落（旧コラム本文を含む）をHTMLParserで同条件集計。旧4,625字→改稿1,966字、約58％減。暮らしとサム／ディガー等を加筆した一方、未確認情報と強い修辞を削ったため、全体の文字数は増えていない。
- 本追記は承認・比較の記録のみ。本文・HTML実装は変更しない。追記コミットのCI成功後、PR #93をマージし、mainからのPages公開と実ページへの反映を確認する。最終マージSHA・CI・公開結果はPRとActionsタイムラインを参照。


### 2026-10-31 — Codex-BGS-20261031-2：東京ビッグサンダーの記事を約3倍へ加筆

- **継続指示：** 運営者から、PR #93版は短くなりすぎており「体感二分の3倍ぐらい増やしたかった」と追加指示。前稿本文1,966字に対して約6,000字を目安に、追加調査・執筆・HTML・検証・追加PR作成を実施する。
- **前PRの完了確認：** PR #93は明示承認後、7cd6c572でマージ済み。main CI #41175707591とPages #41175707203はsuccess。公開記事をTLS検証有効のHTTP取得で読み、マージ版HTMLとバイト単位で一致することを確認。公開ブラウザ確認は環境の証明書エラーで未完了であり、公開を目視したとは報告しない。
- **着手状態：** 未コミット変更なし、open PR 0件。main 7cd6c572から `codex-bgs-20261031-2/expand-tokyo-big-thunder` を作成。前回読んだ規約・文体・共同作業ルールを引き継ぐ。
- **追加調査：** TDR公式ブログ2020-12-23で、継続中の採掘、鑑定所の秤・型・火、鉱夫・保線作業員、サムの引退後の居住を確認。2021-08-08であいさつ・入口の花・夕景を確認。バークのインタビューを再読し、東京駅舎の構法と旧列車転用を本人の回想として採用。Van Eatonの東京向け図面・作業範囲・初期案・開業前写真群の掲載画像と紹介を確認。公式発表とカタログの性質を区別し、画像転載・未採用案を完成物とする推定はしない。詳細は調査記録の追補。
- **加筆結果：** 本文段落（見出し・参考資料・ナビ・空白を除外）で1,966→5,995字、約3.05倍。初回リライト前4,625字に対しても約30％増。9章＋参考資料10件に再構成し、鑑定所、暮らし、峡谷を独立させた。道具ごとの役割と仕事のつながりを具体化し、制作章には配置・接続・小部品取り付けを記す東京向け資料を追加。事故の詳細・台詞・人物の心情・雷神・水没・未確認トラクター説は復元しない。
- **実装範囲：** 記事、同記事トップカード、調査記録、本ログ、日本語補助書体の5ファイル。旧アンカーをすべて保持し、目次と見出しを同期。description/OGP/Twitter/JSON-LDの説明も整合。同日の加筆のため表示編集日・dateModified・lastmodは2026-10-31を維持。読了時間は既存基準600字／分に従い、記事・カードとも10分。共有文・title・URL・写真・共通部品は継続して本文と整合するため変更しない。
- **ソース検証：** check_site.py成功（25ページ・24共有リンク・22記事・Python12テスト・共有JS構文）、git diff --check成功。物語本文の禁止語検索と全旧ID保持を確認。既存sites.htmlのJSON-LD警告1件は継続。補助書体は指定バージョンとSHA検証済み原本で再生成。
- **ブラウザ検証：** 記事を320/390/767/768/1024/1280/1536pxで検証。目次と見出しの一致・70回の遷移、旧アンカー42回、参考資料のEnter/Space、写真、横はみ出しなし、検索、JS無効・WOFF2失敗時が成功。参考資料の実描画でBGS Press Mincho/English、本文に既存書体を確認。390/768/1280pxの本文・資料欄を画像で確認。標準browser_smoke.cjsの125ページ／画面幅条件、検索・履歴・5ダイアログ・reduced motion・JS無効時も成功。
- **状態：** 加筆版は追加PRのレビュー待ちとして提出する。前回のマージ承認はPR #93に対するものとして扱い、加筆版のマージ・公開は行わない。実機・他ブラウザ・実Google Fontsは未確認。Google Fontsは標準手順に合わせ遮断したフォールバックで確認。


#### 加筆版PR提出・CI確認 — Codex-BGS-20261031-2

- **PR：** [#94](https://github.com/teruluce/disney-bgs/pull/94)。実装コミット：[5f68372d](https://github.com/teruluce/disney-bgs/commit/5f68372d00bfb480248a52858fbdfc25e391a226)。
- **照合・CI：** 提出ブランチをfetchし、変更5ファイルがローカル検証版とバイト単位で一致。実装コミットの [Static SEO validation #41176544587](https://github.com/teruluce/disney-bgs/actions/runs/41176544587) はsuccess。記録追記後も最終headのCIを確認し、その結果はPRのチェック欄を正とする。
- **最終状態：** 加筆版はOPENの通常PRとしてレビュー待ち。5,995字・9章・参考資料10件。未マージ・未公開。次は本文と根拠対応のレビュー、運営者の判断後のマージ・公開確認。


### 2026-10-31 — Codex-BGS-20261031-2：旧版の読みどころを再調査して復活

- **最新指示・着手状態：** 運営者から、トラクター・珍しい開花など旧版の魅力を受け継いで改善し、PRを作成して自動マージしないよう指示。PR #94は既に外部でマージ済み（main `a284c6e9e6ec9cddd85d6e3514b234eb7f137e63`、06:27:22 UTC）で、着手時・提出前ともopen PR 0件。未コミット変更なしのmainから `codex-bgs-20261031-2/restore-mining-stories` を作成。前節のOPEN表記は提出時点の記録。
- **規約・比較：** AGENTS、AI共通憲法、執筆・共同作業ルールと本ログを再確認。Gitの初回改稿前9254bec版を読み、現行版と削除された逸話を比較。代表記事の調子も参照。失われた話題と採否の表、原文URL・調査経路・残る疑問は `docs/research/big-thunder-tokyo.md` の今回追補へ記録した。
- **復活・加筆：** 公式Xの東京の実車写真と銘が読める写真から、トラクターの姿、RUSSELL COMPOUND・9596・BIG THUNDER IRON WORKSを確認。蒸気トラクターの一般的用途を歴史団体の解説で補い、個体の使用歴とは区別。植物は植栽の観察写真、TDR公式の2012年TDS開花記事、2024年TDLの撮影写真、NParks・NC State Extension・産総研の原文で調査し、葉・花茎・開花までの幅・親株の枯死と子株・場所を区別した開花記録のコラムを追加。
- **見送りと理由：** 妻が売却金で旅行を望んだ話は日本語の先行記事・Wikipedia・SNS・英語資料・書籍検索まで追ったが、交渉の当事者証言や原典へ至らない。岡田氏の公開講義には1990/91年の映画の後に1987年以前の東京建設を置く不整合があり、激怒・長い台詞・夫の心情を復活しない。公式Instagram埋め込みも来歴の裏付けではなかった。1898年・世界に数台・元の鉱山用途・ウォルト本人・交渉回数・輸送経路は未確定として本文に戻さず、逸話全体を誤りとも断定しない。2024年ゴゴスマ中継、列車全6台名、地図の事故直前説も裏付け未完。パリの別機体の話は流用しない。
- **読み物への調整：** 東京の鉱山史・ベル・担架・鑑定所・広告・洗濯・異変・サムとディガーを維持。抽象的な言い直しを減らし、仕事の章の小見出しを統合。制作章は2つの小見出しに整理し、本人が語ったジャクソン来訪と東京へ向かう道具の準備を、会話を創作しない間接話法で具体化。外部の写真・図面は転載しない。
- **文章量の訂正と比較：** 全p.article-pとコラム内pをHTMLParserで集計し、空白・タグを除くと、初回改稿前4,625字→着手時6,107字→今回6,972字（現行比約14％増、初回改稿前の約1.51倍）。前回記録の5,995字はid付き列車段落112字の集計漏れだった。記事・カードの読了時間は600字／分で12分に同期。
- **実装：** 記事、ホームの対象カード、調査記録、本ログ、再生成した日本語補助フォントの5ファイルのみ。9章と参考資料16項目の目次を同期し、旧IDを全保持。description・OGP・Twitter・JSON-LDとカードの紹介も整合。同日作業なので実編集日・構造化データ・sitemapは2026-10-31を維持。補助フォントは指定版ツールとSHA検証済み原本で再生成。
- **検証：** `python scripts/check_site.py` 成功（25ページ、24共有リンク、22記事、Python12テスト、共有JS構文）、`git diff --check` 成功。禁止語・資料紹介口調の検索、16項目と見出し・目次を照合。既存sites.htmlのJSON-LD未設定警告1件は継続。
- **表示：** 標準 `node scripts/browser_smoke.cjs` の125ページ／画面幅条件、検索・履歴・5ダイアログ・reduced motion・JS無効時が成功。記事単体は320/390/767/768/1024/1280/1536pxで、目次70遷移・旧アンカー42到達・Enter/Space・全画像・横はみ出しなし・検索・JS無効・WOFF2失敗時を確認。初回はローカルサーバーの応答停止でやり直し、検索語「セドナ」がカードから落ちた点も修正して再実行し成功。本文・資料・植物コラム・トラクターを390/768/1280pxの画像で目視し、資料にBGS Press Mincho、本文に既存書体の実描画を確認。実Google Fonts・他ブラウザ・実機は未確認。
- **提出状態：** 実装・検証済み。レビュー可能な追加PRを作成する。マージ・自動マージ・本番デプロイは実施しない。PR番号・最終CI結果は提出後に記録する。

#### 再調査版PR提出 — Codex-BGS-20261031-2

- **PR：** [#95](https://github.com/teruluce/disney-bgs/pull/95)（OPEN・非draft）。実装コミット：[88ae36aa](https://github.com/teruluce/disney-bgs/commit/88ae36aa4697c66b9eb41a3f87016502f1de8c23)。
- **照合・CI：** 提出ブランチをfetchし、5ファイルすべてがローカル検証版とバイト単位で一致することを確認。実装コミットの [Static SEO validation #41180633094](https://github.com/teruluce/disney-bgs/actions/runs/41180633094) はsuccess。提出記録追記後も最終headのCIを確認し、チェック欄を正とする。
- **引き継ぎ：** トラクターの交渉・製造年等の復活未達を含めて本文・調査記録をレビューする。6,972字、初回改稿前の約1.51倍。マージ・自動マージ・本番デプロイは行っていない。


### 2026-10-31 — Claude-BGS-20261031：ビッグサンダー記事の日本語調整と構成の統一

- **指示：** 運営者から、`bgs-btm.html` の日本語を自然に直し、構成も他の記事に合わせるよう依頼。作業は最新の main（e320b06、PR #95 反映後）を基準にやり直した（同日の先行ブランチは PR #95 より前の版が基準だったため破棄）。
- **対象ファイル：** `bgs-btm.html`、`docs/AI_WORK_LOG.md` のみ。
- **構成の統一：** title・OGP・Twitter・JSON-LD の見出しと description を、他記事と同じ「〜のBGS（背景設定）｜東京ディズニーランド — BGS Chronicles」形式に統一。目次の aria-label を「目次」に、目次から参考資料の項目を外し、参考資料欄の見出しを「参考資料（16件）」に（他記事と同形式）。サブタイトルを他記事に合わせた短い言い回しに変更。参考資料欄末尾の調査作業に触れる一文を削除し、資料確認日のみ残した。
- **文章：** 事実・章立て・見出し・id・画像・コラムの構成は変更せず、不自然・重複・曖昧な言い回し約20か所を調整（例：「金塊をお金に換える」の重複、「そのそば」の指示対象、過去と現在の時制の混在、列車の段落の重複表現）。調査資料口調・禁止語の検索で新たな該当なし（「公式X」は参考資料の出典名）。
- **検証：** `python3 scripts/check_site.py`・`python3 scripts/seo_audit.py` 成功（既存の sites.html の JSON-LD 警告1件は継続）。ブラウザ表示の確認は未実施。
- **状態：** レビュー待ち（PR）。マージ・公開は行っていない。
- **確認事項：** 前回 PR #95 では参考資料を目次に含めていたが、他記事に合わせて外した。残す場合は目次の1行を戻せばよい。

### 2026-11-03 — Codex-BGS-20261103：BGSを優先し、表示を維持してトップの検索向けデータを整合

- **担当・依頼:** Codex-BGS-20261103（本チャット）。運営者の「BGSを優先して改善」に着手後、「サイトの見た目は変えない」と追加指示。未公開の入口・日本語補助見出し・関連リンク・CSS変更をすべて取り消し、以後は表示に影響しない修正に限定。取り消した案のコードは提出差分に含まれない。
- **着手確認:** AGENTS.md、AI_GOVERNANCE.md、EDITORIAL_STANDARDS.md、品質手順、SEO記録、共同ログと実HTMLを調査。main `c665e77`（PR #98反映）、open PR 0件。ローカル既存変更なし。リモートの古い未統合ブランチは上書きせず保持。過去ログの「レビュー待ち」は各記録時点の表記として残す。
- **実際の不整合:** トップのJSON-LDが画面の22資料に対して21項目（ミステリアスアイランド未掲載）で、一部順序も相違。WebSite／CollectionPageの説明・名称に旧文言が残り、CollectionPage.urlもcanonicalと不一致。
- **最終実装:** `index.html` の既存JSON-LDのみ整合。CSS・JS・全記事・本文・写真・見出し・日時・共有コピー・恒久資料番号・カード順は元と同一。記事の最終編集日／サイトマップの日付は技術修正日で更新しない。ブランチ `codex-bgs-20261103/archive-metadata`。
- **再発防止:** seo_audit.pyでホームの表示カードとItemListの件数・URL順序・position、WebSite／CollectionPageとtitle／description／canonicalを照合。新しい4ケースを含む16回帰テスト成功。内容・順序の不一致を壊れたフィクスチャで検出。
- **検証:** `python scripts/check_site.py` 成功（25ページ・24共有・22資料・Python16テスト・共有JS構文）、`git diff --check`成功。index.htmlはJSON-LD以外が元ファイルとバイト一致。Chromiumで外部Google Fontsを遮断した同条件の390／1280px全ページスクリーンショットを変更前後で比較し、ピクセル完全一致。撤回した案に対するブラウザ試験は最終版の検証として扱わない。
- **記録・次の判断:** `docs/SEO_BASELINE.md` に更新内容・次の優先順位。検索データは運営者が提示した範囲のみで、期間・クエリ・CTR・平均順位は不明。ランキング効果、サイト内回遊改善、Googleの再取得を検証済みとはしない。既存sites.htmlのJSON-LD警告1件は継続。実機・実Webフォント・公開ホスト・Search Consoleの状態は未確認。
- **状態:** 検証済みの限定変更をPRでレビューする。マージ・自動マージ・本番公開は実施しない。


### 2026-11-08 — Codex：最終デザインR3のPhase 3実装

- **承認範囲：** 運営者がPhase 2終了・R3最終案確定を指示。追加比較案を作らず、実装・検証・PRまで進める。mainへのマージ・本番公開は別途明示承認を待つ。
- **基準と作業：** main `c665e7798a1a1e78fb0988d0ba41992e6eab3104` と既存Phase 2-3成果物を確認。独立したチェックアウトの `codex/r3-homepage-implementation` で実装。
- **変更：** トップページに既存ID向けの上部移動リンクと専用home.cssを追加。R3の余白・タイポグラフィ・4行説明・写真独立方式を反映。カードのフォーカス消失、上部リンク枠の干渉、900/901pxの配置急変、dateline末尾の省略を修正。試作用の分岐や追加比較案は作成しない。
- **保全：** 記事本文・22カードの内容と順序・写真・クレジット・既存ID・SEO情報・共有JavaScriptは維持。追加要素を除いたHTML照合とカード照合で一致を確認。元のチェックアウトとPhase 2成果物は変更していない。
- **検証：** 標準の静的チェック、225ページ／画面条件のブラウザ回帰、16条件のR3専用回帰（実描画フォーカス・forced colors・境界・検索）が成功。Chromium／Firefox／WebKitの表示と操作を確認。詳細と残る検証限界は `docs/HOMEPAGE_R3.md`。
- **未確認：** 実ブラウザの200/400%ズーム・文字だけの200%拡大、実機Safari・IME・スクリーンリーダー。狭幅代替と区別し、全サイトWCAG適合は宣言しない。
- **提出：** レビュー用PRを作成。マージ・公開・自動マージを実施しない。


### 2026-11-09 — Codex：Phase 4-2 読書ページの品質改善

- **承認：** 運営者から実装・PR作成と、6条件を満たす場合のmainマージ・Pages確認まで明示承認。条件不成立ならマージしない。追加比較案や全面刷新は行わない。
- **基準：** main `31e47d059e8e0f6b964980eca7d473c2b5bee8d0`。専用ブランチ `codex/phase42-accessibility`。既存のPR #99は対象外。
- **実装：** 24読書ページ限定のreading.css、補助文字の濃度と下限、Small World本文と金色文字、Tomorrowlandの青い文字、Sindbad比較表のTab・矢印・focus対応。mainと本文へのskip link、コラム等54見出しの意味階層を改善。既存#tocを保持して記事間ナビの文言を記事目次へ統一。
- **保護：** 本文・写真・クレジット・既存ID・リンク先・SEO・共有JS・R3を保全。比較スクリプトで基準と照合。新しい写真や権利表記は作らず、未記載分の根拠確認は残す。
- **品質：** 正常フォントで3エンジン各168条件（計504）、JS無効時、展開資料、対象axeルール、描画ピクセルを検証済み。静的・既存225・R3専用16・内容保全も成功。CIにも3エンジンとフォールバック検証を追加。詳細と検証限界はdocs/READING_QUALITY.md。
- **提出・公開：** 条件を確認してPRを提出し、CI・競合・main状態を再照合する。承認された条件成立後に限りマージし、Pagesと公開主要ページを確認する。結果は作業完了報告を正とする。


### 2026-11-09 — Claude-BGS-20261109：タワー・オブ・テラー記事の日本語調整（品質レビュー反映）

- **指示：** 運営者がClaudeの品質レビュー案を採用し、`bgs-tot.html` の修正を依頼。関係のない部分は変更しない。基準は main `f3850eb`。
- **対象ファイル：** `bgs-tot.html`、`docs/AI_WORK_LOG.md` のみ。
- **変更：** 「舶刀」→カットラス、「トルコ風呂」→「トルコ式の浴場」、「生前には」→「かつて」、「犬の頭のアヌビス」→「ジャッカルの頭のアヌビス」、「ホテル全体のごく一部」→「コレクション全体のごく一部」、探険／探検の統一、掟8項目の語形を原典（VLEMO）に合わせ「〜すること」で統一、ベアトリス初出への肩書き追加、「その同じ記者」「〜のです」2か所、ソラリウム・舞踏室・書斎と私室の文、香港ディズニーランドの明記など。V章の3段落を内容に合う見出し（書斎・ラジャのプール）の下へ移動。「出口に残った絵」は出典に該当記述がなく、「四方の壁画」に改めた。「品ごとの記録からたどる必要があります」は削除。
- **変更していない（運営者判断・要確認）：** ①出典[9][12][13][24]の「旧公式サイト再録」表記（tot1899.comは非公式の再現サイト）とリンク、②OGP画像・紋章の出所、③8/20と8/22の前後関係、④書斎とプライベートオフィスの用語、⑤「太陽の庭園」まわり（出典VLEMO totnwp4は、太陽の庭園を9階の屋上中庭とし、悲鳴が聞こえた場所と記す。ガラスが降った場所は特定していない）、⑥調査口調の語（によると・とされています等）、⑦注番号・外部リンクと編集基準の食い違い。
- **検証：** `python3 scripts/check_site.py` 成功、`python3 scripts/seo_audit.py` 成功（既存のsites.html警告1件）。ブラウザ表示は未確認。
- **状態：** レビュー待ち（PR）。マージ・公開は行っていない。


### 2026-11-09 — Codex-BGS-20261109-3：タワー記事を旧版の物語に戻して自然に加筆

- **承認範囲：** 運営者が旧版の物語を軸にした追記案を採用し、サイト更新と、今日より前の文章との差分整理を依頼。実装・検証・PR経由のmain反映・Pagesと公開確認までを今回の範囲とする。
- **着手確認：** 最新main `2af87f63f740f7fe684d821a90da79c766898e7e`。AGENTS、AI_GOVERNANCE、EDITORIAL_STANDARDS、本ログの冒頭・タワー記事関連・最新記録、SITE_QUALITY_CHECKSと関連記事を確認。open PR #99はトップの構造化データで本記事とは無関係。未コミット変更なしの専用ブランチ `codex/tot-preserve-original-20261109` で作業した。
- **旧版の基準：** 今日より前の `2e14c0e` と今日の本文拡充直前 `f5b9308` の本文一致を確認。導入、遠征、八つの掟、老人の警告・雷・木箱と嵐、S.E.A.と執事、エンディコット家、海外版比較という5章の流れを復活。今日のアクセシビリティ改善や共通レイアウトは巻き戻さない。
- **加筆：** 記者のウェイターへの変装と再潜入、新聞社の所有関係、ベアトリスと雑誌の縁・盗品照合、1908年のアーチーとの出会いと1912年8月22日の調査、保存協会のベンチを各場面につなげた。父の邸宅・私室の張り出し、壁画と倉庫・地下搬入経路、ヘイゼルの返還行動も短く補った。
- **根拠整理：** 旧公式資料の非公式再現と書き起こしを明示。執事の正体と目的の謎を分け、13人・13段・13点の呪い、村の壊滅の因果、未確認の会話や炎上、父の代からの確執などの断定は復元しない。本文には調べ方・出典の説明を置かず、17件の折りたたみ参考資料と `docs/research/tower-of-terror.md` にURL・採用範囲・変更比較を記録した。
- **分量：** 本文段落とコラムを同条件で集計し、今日より前5,849字→今回6,370字（約8.9％増）。当日拡充版8,922字との比較とは区別する。600字／分で記事とトップカードを11分へ同期。
- **実装：** `bgs-tot.html`、トップの対象カード、`fonts/press-mincho.woff2`、調査・比較記録、本ログ。写真2点の属性・画像原本、共有JSと静的共有文、URL・File No.・前後リンクを保持。記事の既存主要IDと当日版のincident・collection・sourcesを維持。廃止する本文脚注専用source-Nは再利用しない。description等4か所とdateModifiedを整合し、最終編集日・sitemapは同日2026-11-09を維持。部分書体は指定原本のSHA-256を検証し、指定ツールで再生成した。
- **ソース検証：** `python scripts/check_site.py`（25ページ・24共有リンク・22記事・Python12テスト・共有JS構文）と`git diff --check`成功。既存sites.htmlのJSON-LD警告1件は継続。物語本文の禁止語なし、画像・JS同一、旧主要アンカー保持、参考資料の必要な日本語グリフが部分書体に含まれることを確認。
- **ブラウザ検証：** 標準`browser_smoke.cjs`の225ページ／画面条件、検索・履歴・5ダイアログ・reduced motion・JS無効時が成功。記事単体は320/390/767/768/1024/1280/1536pxで目次と5見出し、incident・collectionの直接移動、skip link、参考資料のEnter/Space、画像decode、横はみ出しなしを確認。JS無効かつWOFF2失敗でも本文と折りたたみ資料が読める。トップの検索と読了時間を確認。390pxの本文・参考資料、1280pxの写真を含む表示を画像で目視した。
- **追加読書回帰：** 開発用axe-core 4.10.3を一時ディレクトリへ導入し、`reading_smoke.cjs`のChromium全168条件・native skip link・表のキーボード操作／フォーカス・JS無効時・画像・対象アクセシビリティ検査が成功。
- **未確認範囲：** 実Google Fonts、実機Safari・スクリーンリーダー等は未実施。ブラウザは再現可能なフォールバック書体で検証。画像の利用根拠について新しい推定を加えず、既存写真のみ保持した。
- **記録時点の状態：** 実装・差分レビュー・ローカル検証済み。承認された公開へ向けてPRとGitHub Actionsを確認し、成功後にマージ・公開確認を行う。PR番号、最終コミット、マージ・Pages・公開確認の結果は、このブランチのPRタイムラインと完了報告を正とする。


### 2026-11-09 — Codex-BGS-20261109-3：タワー記事の日本語を校正

- **依頼・範囲：** 同セッションの継続。運営者から、内容・口調はよいので不自然な日本語を見直すよう依頼。公開更新の継続範囲内で、本文の表現だけを修正する。
- **基準：** PR #105公開済みのmain `488cdf10a48266ba33508c3c951d01d4f9ea23fc`。最新AGENTS、AI_GOVERNANCE、EDITORIAL_STANDARDS、本ログの方針・対象記事記録・最新記録と関連記事を再確認。open PR #99は別件。専用ブランチ `codex/tot-japanese-polish-20261109`。
- **校正：** 修飾関係、助詞、指示語の対象、主語・目的語の省略、比喩と述語の不整合など30か所。例：「男の過去は、名前の一致だけでは埋まりません」→「その過去は、同じ名前の兵士がいたというだけでは明らかになりません」。「自作の時を移動する装置」→「自ら作った装置…で時を越え」。アーチーの提案の重複表現と受け身の指示対象、倉庫の未開封箱の文を修正した。
- **保全：** 情報の追加・エピソードの削除・章や段落の移動は行わない。全HTMLタグと属性、全見出し、数値、本文前後のHTML（metadata・CSS・JS・参考資料・画像・リンク・更新日等）が基準と完全一致することを確認。本文とコラムは47段落のまま6,370→6,469字、読了時間は11分のまま。出典欄と補助書体は変更しない。前回の新旧比較記録は、今回の校正を追補して初回加筆時との区別を残す。
- **検証：** check_site.py（25ページ、24共有リンク、22記事、Python12テスト）、git diff --checkが成功。本文の差分を読み、意味と不確実性を変えていないことを確認。記事の7幅（320/390/767/768/1024/1280/1536px）、5章目次、旧アンカー、skip link、参考資料のEnter/Space、画像、横はみ出し、JS無効・フォント失敗時、トップ検索と11分表示の確認に既存の検証手順を使用した。既存sites.htmlのJSON-LD警告1件は継続。
- **記録時点の状態：** 校正・ローカル検証済み。PRとCIの確認後、承認されたサイト更新を実施する。マージSHA・公開結果は本ブランチのPRと完了報告を正とする。実Google Fonts・実機・スクリーンリーダーは未確認。前回同様、公開HTMLの反映とローカル表示検証を公開ブラウザの目視と混同しない。


### 2026-11-09 — Codex-BGS-20261109-4：残存PR #99を最新mainへ追従

- **依頼:** 運営者の「残ってるprをどうにかしたい」に対応。AGENTS、AI_GOVERNANCE、EDITORIAL_STANDARDS、本ログの運営方針・直近記録を確認。未マージPRは#99のみ。
- **調査:** main `3658ba205efc6339e718a4bb481e30b931ab6f64`にもホームJSON-LDの旧説明・旧名称・URL不一致、21項目の一覧と22カードの不一致が残るため、修正は有効。
- **更新:** #99ブランチへ最新mainをmerge。競合した作業ログは双方を保持。mainで更新されたトップ表示・記事・画像・CSS・JS・検査を維持。
- **確認:** index.htmlはJSON-LD以外が最新mainとバイト単位で一致。mainとの差分は元PRの5ファイルのみ。check_site.py（25ページ・24共有リンク・22カード・16回帰テスト・JS構文）成功。sites.htmlの既存JSON-LD警告1件は継続。
- **状態:** SEO構造化データ変更は今回の内部修正限定の自動マージ許可に含まれないため、PRを更新しCI結果を確認後、運営者のマージ・公開承認を待つ。マージ・公開は未実施。ブラウザ再検証はGitHub Actionsで確認し、最終結果はPRチェック欄・完了報告を正とする。実機・実Google Fontsは未確認。


### 2026-11-10 — Claude-BGS-20261110：タワー・オブ・テラー記事の日本語の微修正

- **指示：** 運営者が、内容は変えずに憲章・編集基準に沿って日本語を微修正するよう依頼。読み物として良くなる修正は許可。
- **基準：** main `9d8fcbd`（Pagesの最新デプロイと同一コミット）。AGENTS、AI_GOVERNANCE、EDITORIAL_STANDARDS、本ログを確認。取得できた公開ページの内容は8章・20分の旧い版で、mainの5章・11分と食い違っていたため、GitHub上のmainを正とした（公開側のキャッシュの可能性。ブラウザでの目視は未実施）。
- **対象ファイル：** `bgs-tot.html`（本文4か所）、本ログのみ。
- **変更：** ①冒頭「呼び畏怖する」→「呼んで畏れる」、②ヘイゼルの導入「三世の名は〜受け継がれています」→「三世には、娘の〜がいます」、③搬入路「その全体の構造は分かりません」→「全体の構造は分かっていません」、④スメルディング「消えていたのではなく」→「消えたのではなく」。情報の追加・削除・並べ替えなし。
- **変更していない：** HTML構造・メタ情報・参考資料・画像・リンク・最終編集日（本文の語句修正のみのため）。
- **検証：** `python3 scripts/check_site.py`（16テスト・JS構文）成功、`git diff --check` 成功。本文に `公式|によると|によれば|に沿えば|と伝えられ|発表されています|報じられ|とされています|設定では` なし。ブラウザ表示は未確認。
- **要確認（運営者判断・未変更）：** 「スワヒリ語で懸命に伝えます」の伝える相手（偶像か主人か）が文中で不明。出典（ベアトリスの日記系資料）で確認できるまで書き換えない。
- **状態：** レビュー待ち（PR）。マージ・公開は行っていない。


### 2026-11-10 — Claude-BGS-20261110-2：タワー・オブ・テラー記事の読み物としての推敲

- **指示：** 運営者が、記事の読み物としての完成度をさらに高めたいと依頼（前回PR #107のマージ後）。基準は main `ba2b808`。AGENTS、AI_GOVERNANCE、EDITORIAL_STANDARDS、本ログを前回作業時に確認済み。
- **対象ファイル：** `bgs-tot.html`（本文9か所）、本ログのみ。
- **変更：** ①語尾「〜のです」が14か所に偏っていたため、種明かしや決め所以外の6か所（築き上げた／見ていた／使った／読者にしていた／頼んでいた／最上階へ上っていく）を落ち着いた文末へ。②指示語の曖昧さ：記者会見の「彼が語りたかったのは」→「ハイタワーが〜」、倉庫の「目を輝かせる彼を見て」→「〜ストラングを見て」。③場面転換：ヘイゼルの節から大晦日へ移る「そして迎えた〜」を、「1899年12月31日、大晦日。」と言い切る形にし、「自身のホテルにて」→「自らのホテルで」。事実・構成・見出し・出典の変更なし。
- **変更していない（運営者判断）：** ①III章の見出し「S.E.A.と執事スメルディングの謎」の下に、大晦日の記者会見・エレベーター落下の小見出しが含まれ、章題と内容が一致しない。章の分割または章題の変更は、目次と構成に関わるため未実施。②「スワヒリ語で懸命に伝えます」の伝える相手が不明（出典確認待ち）。③最終編集日は据え置き。
- **検証：** `python3 scripts/check_site.py`、`git diff --check`、本文の禁止語検索を実施（結果は下記PR本文を参照）。ブラウザ表示は未確認。
- **状態：** レビュー待ち（PR）。マージ・公開は行っていない。


### 2026-11-10 — Claude-BGS-20261110-3：タワー・オブ・テラー記事のIII章分割とスワヒリ語の相手の確認

- **指示：** 運営者が、III章の章題と内容の不一致、および「スワヒリ語で懸命に伝えます」の相手を確認し、章を分けるか判断するよう依頼。基準は main `1d1268e`。
- **出典確認：** スメルディングの日記（出典4＝2011年の旧公式サイト非公式書き起こし、`itsnoteasy.blog93.fc2.com/blog-entry-104.html`）の8月13日「ニューヨークへの帰還」に、命令に背いて木箱から出した偶像へ「必死にスワヒリ語で話しかけた」とある（主人がニューヨークでどれほど立派な場所に置こうとしているかを語りかけた）。7月16日のスワヒリ語は、首長の息子が通訳を務めた記述で別件。主人へスワヒリ語で伝えた記述は確認できなかった。取得は本セッションでの1回のみで、原文の全文照合ではなく、要旨の確認。
- **変更（`bgs-tot.html`のみ）：** ①「〜をスワヒリ語で懸命に伝えます」→「〜を、偶像へスワヒリ語で懸命に語りかけます」。②III章を分割。旧III（S.E.A.・ヘイゼル・大晦日・執事・エレベーター）を、「III. 大晦日の失踪」（記者会見、変装、失踪直前）と「IV. S.E.A.と執事スメルディングの謎」（S.E.A.、ヘイゼル、関連カード、執事の忠誠心）に分け、旧IV・Vを V・VI に繰り下げた。事件の描写を先に置くことで、ヘイゼルの「父が消えたとき」が先に語られた失踪を受ける順になり、章題と内容も一致する。段落の本文は変更せず、段落の並べ替えのみ。
- **保持：** 既存アンカー（prologue・taboos・sea・incident・conflict・collection・genesis・sources）はすべて維持。`#incident` は旧小見出しから新章のsectionへ移したため、リンク先は章頭になる。ほかのページ・検査・サイトマップから本記事の章アンカーへの参照はなし。段落・見出しの照合で、差分は目次・章題・上記の付け替え・スワヒリ語の1文のみ。
- **検証：** `python3 scripts/check_site.py` 成功、`git diff --check` 成功、ID重複なし。ブラウザ表示確認は未実施（CIのブラウザ確認に依存）。
- **変更していない：** メタ情報、参考資料、画像、リンク、最終編集日、読了時間（11分）。
- **状態：** レビュー待ち（PR）。マージ・公開は行っていない。


### 2026-11-20 — Codex-BGS-20261120-2：記事写真の配信とワールドバザールのキャプションを改善

- **基準と範囲**　main `05a657c`。運営ルールと関連記録を読み、Claudeの指摘を独立に再測定。7記事の11画像に表示用候補を追加し、ワールドバザールの挿絵キャプションに記事内CSSを調整。原画像・本文・クレジット・OGPを保持。英語alt 31件の日本語候補はPR説明に記載。
- **結果**　幅390px・DPR 2で対象画像のレスポンス本文が5.15 MBから1.48 MBへ減少。昼景のキャプションは10.11:1、夜景は12.04:1。写真はPC・スマートフォンの通常／高密度条件で代表画像を比較。実機は未確認。
- **検証・状態**　静的・リンク・ブラウザ・対象アクセシビリティテスト成功。PRとコミットは作業ブランチ `codex/article-image-quality-20261120` から確認可能。マージ・本番反映は今回の対象外。


### 2026-11-20 — Codex-BGS-20261120-3：ワールドバザール挿絵の試作（不採用・PRなし）

- **基準・範囲：** 最新main `ea6b8918d30dab29c0b5af35e0040d0ec4397f72`を取得。AGENTS、AI_GOVERNANCE、EDITORIAL_STANDARDS、本ログの冒頭・対象記事・直近記録、SITE_QUALITY_CHECKSを確認。GitHub検索でopen PRなし。作業ブランチ `codex-bgs-20261120/worldbazaar-art`。ユーザー指示は品質未達ならPRを作成せず試作と課題を報告すること。
- **調査：** 本文・4点のSVGと既存夜景写真を照合。公式アンバサダーブログamb201906で屋根越しの城の説明を確認。歯科医院名とアイスクリーム店の上下関係を裏付ける写真は得られず、他3点を推測で制作しない。本文の真偽を今回の検索だけで断定・改稿していない。
- **試作・判断：** 既存world-bazaar-seasonal.jpegを直接参照してimage_genでセピア銅版画風の夜景を2回生成。2案目で夜の陰影は改善したが、梁の省略、窓や看板輪郭の変化が残り、建築への忠実さが未達のため不採用。原写真の加工許諾原記録も今回確認できておらず、公開済み写真であるだけで権利処理済みとは判断しない。
- **ローカル成果物：** `/workspace/scratch/worldbazaar-review/REPORT.md`に資料URL、2案の比較、課題、容量・検証を記録。同ディレクトリに生成PNG2案、`site/worldbazaar-trials/`にWebP800/1600px候補、`site/bgs-worldbazaar.html`に4点目だけ仮置きしたローカル比較ページ、6条件の画像と測定JSON。公開用成果物ではなく、この環境内の試作。Pillowは縮小・WebP圧縮に使用。v2は142,746 B／552,172 B。日本語altと画像外キャプションを試作に設定。
- **検証：** 元リポジトリのcheck_site.py成功（SEO25ページ、共有24件、カード22件、Python16テスト、JS構文。既存sites.html警告1件）。比較ページの本文・見出し・SEO・script・写真pictureの保持を照合。比較サイトに対する既存browser_smoke.cjs225条件成功。320/DPR2、390/DPR2・3、768/DPR2、1280/DPR1・2でdecode、画像候補、横はみ出しなし、画像外キャプションを確認。390/DPR2と1280/DPR1の試作を目視。実回線・本番・実機・Safari・実Google Fontsは未確認。
- **状態：** 記事・既存写真・SEO・著作権表記は変更なし。本ログのみリポジトリへ追記。コミット・push・PR作成・マージ・デプロイは未実施。続行には昼景・店舗上階・城方向の照合写真と利用根拠、および建築形状を保持できる描画工程が必要。


### 2026-11-20 — Codex-BGS-20261120-4：ワールドバザールを提供原稿へ差し替え

- **依頼変更：** 運営者が新原稿を指定し、作れる挿絵だけ制作し難しいものは省略、他記事と構造を揃えるよう指示。最新main `ea6b891`と運営ルール・本ログ・関連記事（genesis、origins、tot）の構造を確認。open PRなし。同じ作業ブランチを継続。
- **実装：** 指定原稿の5章・19段落を全文一致で反映。題字・新副題・File No.005・Reading 5 min、5項目目次、12件の折りたたみ資料、共有・更新日・記事間ナビを共通構造で保持。旧SVG4点を撤去。旧主要IDも維持。トップの対象紹介と読了時間、description系、共有文、dateModified・lastmodを整合。写真ファイル・OGP画像・クレジットは保持。
- **挿絵判断：** image_genで既存写真を参照する屋根細部を1案追加試作。接合部や梁配置に写真との差が残り不採用。ユーザーの省略許可により今回は挿絵なし。生成物はPRに含めない。
- **根拠と未確認：** 調査URLと照合範囲は `docs/WORLDBAZAAR_REVISION_20261120.md`。店舗物語、閉店日、屋根交渉、遠近感、窓の伝統などを確認。式典の当初の正確な予定場所と、ライマン原画の十字路の目視照合は未完了。提供原稿を保持し、PRで明示する。記事内に調査経緯を混ぜていない。
- **検証：** check_site.py（Python16テストを含む）とgit diff --check成功。既存browser_smoke225条件成功。対象記事7幅で原稿完全一致・目次35遷移・旧ID・横はみ出し・参考資料12件のEnter/Space操作、JS無効・フォント失敗時、トップ遷移を確認。390／768／1280px画像を目視。指定原本とSHA検証・指定ツールで補助書体を再生成し日本語グリフを確認。HTML49,215→30,442 B、補助書体は約10.6 KiB増、新規画像なし。実機・実Google Fonts・本番は未確認。
- **状態：** レビュー用PRを作成する。マージ・デプロイは未実施。PR URLと最終チェックは本ブランチのPRと完了報告を正とする。


### 2026-11-20 — Codex-BGS-20261120-5：ビッグサンダーの提供リライト原稿を実装

- **依頼・基準：** 引き継ぎの最終原稿を実装し、文章以外を原則維持、別ブランチ＋PR、承認前の公開禁止。最新main `ea6b891`から専用ブランチ `codex-bgs-20261120/btm-rewrite`を作成。AGENTS、AI_GOVERNANCE、EDITORIAL_STANDARDS、本ログの冒頭・ビッグサンダー記録・直近、品質チェック文書と関連記事を確認。ワールドバザールは先行PR #112（個別取得でopen／Draftを確認）で実装済みの別件として、今回変更しない。
- **実装：** I〜IXの9章、42段落に差し替え。提供原稿に残る「ただ、」1か所だけ明示された文体ルールに合わせて「しかし、」に変更し、それ以外は本文・見出しを原稿照合。花暦は提示された最終版の3段落を既存aside内に残した。本文6,925→5,232字（約24%減）。記事とトップのReadingを12→10 min。IX目次を#imagineersへ修正し、#negotiationを同章内の互換アンカーとして維持。最終編集日、既存Article.dateModified、sitemap.lastmodを整合。
- **保全：** CSSとJavaScript、既存写真タグ・原本、参考資料16件と元の資料確認日、SEO説明・OGP・canonical・共有文、前後リンク、既存の全IDを保持。新規画像や書体変更なし。原稿の段落整理に必要な変更とIXの互換アンカーを除き構造を維持。
- **調査と差分：** `docs/research/big-thunder-tokyo.md`に今回の比較表と確認範囲を追記。2009年の本人インタビューで川石・柱梁、東京向け準備とジャクソン、1987年の列車転用を再照合し、既存の図面出品資料の来歴説明も再確認。逸話の独立裏付けとは扱わず、本人の回想として保持。本文へ調査経緯を混ぜていない。
- **検証：** check_site.py成功（SEO25ページ・共有24件・カード22件・Python16テスト・JS構文。sites.html既存警告1件）。browser_smoke.cjs225条件成功。記事7幅で42段落と9見出しの原稿照合、63目次遷移、旧／新IXアンカーの到達位置、16資料のEnter/Space開閉、画像decode、横はみ出しなし、JS無効・WOFF2失敗時、トップの10 minと遷移を確認。390／1280pxの冒頭と390pxの花暦を画像で目視。旧アンカーは面積のないspanのためテストを到達位置確認へ修正し再実行して成功。git diff --check成功。
- **未確認・状態：** 実Google Fonts、実機Safari、スクリーンリーダー、本番は未確認。別ブランチをpushしてmain宛てPRを作成する。マージ・本番公開は行わない。最終PRとCI結果はブランチのPRおよび完了報告を正とする。

- **PR提出後のmain追従：** PR #113作成時にmainが`192f3c4`（ワールドバザールPR #112）へ進んだため作業ブランチへ取り込み。競合した本ログは先行セッション3・4と本セッション5を両方保持。ワールドバザール、書体、共有文は更新済みmainと一致。PR差分はビッグサンダー関連5ファイルのまま。mainへマージした操作ではない。


### 2026-11-20 — Codex-BGS-20261120-6：ビッグサンダーPR #113のマージ・公開承認

- **明示承認：** 運営者が「まーじまでしてほしい」と指示。直前のPR #113を対象とする今回限りのマージと、main更新に伴う公開反映の確認を承認。恒常的な自動マージ権限ではない。
- **確認：** 最新main `192f3c4`、PR差分5ファイル、open・非Draft・競合なし、前回の実装・原稿照合・表示テスト記録を再確認。AGENTS、AI_GOVERNANCE、EDITORIAL_STANDARDS、本ログを再読。本文・画像・CSS等の追加変更はなく、本追記は承認記録のみ。
- **手順・状態：** 承認記録をPRブランチへ反映し、最終headのCI成功後、head SHAを指定してPRをマージする。マージSHA・Pages公開結果・本番HTMLの照合結果はPR #113のタイムラインおよび完了報告を正とする。記録時点では未マージであり、mainへの直接コミットは行わない。


### 2026-11-21 — Codex-BGS-20261121：ホテルミラコスタの確定原稿を新記事として実装

- **依頼・基準：** 最新main `0b1b57b`（PR #113）でAGENTS、AI_GOVERNANCE、EDITORIAL_STANDARDS、本ログ冒頭・関連記事／写真／読了時間の記録・直近を確認。open PR 0件、全リモートbranch名を確認。同主題の進行作業は見当たらず、専用ブランチ `codex-bgs-20261121/miracosta` を作成。既存ブランチは変更しない。
- **参照：** bgs-mysterious-island、bgs-sea、bgs-soarin、bgs-spatial-epic、bgs-originsとdocs/research/mysterious-island.md。既存の本文・前後ナビ・共有・折りたたみ資料・紙面スタイルを参照。
- **実装：** `bgs-miracosta.html`、File No.023。題、リード2段落、7見出し・31段落、参考資料17件を確定原稿どおり反映。編集メモは非掲載。本文3,186字＋リード130字＝3,316字、600字／分で約6分（記事とトップカードを同期）。目次7項目、関連記事3件とS.E.A.／Soarinからの相互リンク、No.022の次記事リンク、ホームのカード／ItemList、canonical／description／OGP／X／Article、sitemapとshare-captionsを整合。既存記事本文・共通CSS／JSは保持。
- **写真：** 本チャットで運営者が「5枚とも利用・縮小可、表記はTERU_LUCE_」と回答。添付5枚を原構図・比率で記事に配置し、全点に指定クレジット。夜景をカードとOGPにも使用。JPEG再圧縮・800px候補・寸法・日本語alt・lazy／async、EXIF除去。新規画像10ファイル計2,477,452 B。外部資料の画像は転載しない。
- **原典と確認事項：** 参考17件のHTMLをHTTP 200で取得し、公式本文を再読。小道、出荷ドック、見張り塔、ホテル名の意味、天井画の内訳、同じ船等を確認。非公式の増築史、Zenoの綴りの独立写真判読、坂からの眺望位置、反射先の「運河」、現況展示、既存S.E.A.本文の強い断定は残る。確定稿を独断で変更せず、具体的変更案を `docs/research/miracosta.md` とPRに記載。本文の調査口調・禁止語検索は該当なし。
- **ソース検証：** check_site.py成功（26ページ、25共有、23記事、Python16テスト、JS構文）。既存sites.htmlのJSON-LD警告1件は継続。git diff --check成功。新記事の題・33段落・7見出しを作業用原稿と全文一致照合。既存S.E.A.／Soarinの全p要素は変更前と一致。指定原本のSHAを検証し、指定版fontTools／Brotliで補助書体を再生成（日本語版のみ差分、資料用文字の欠落なし）。
- **ブラウザ確認：** Chromiumで320／390／767／768／1024／1280／1536pxの目次49遷移・横はみ出しなし・17資料のEnter／Space開閉・写真decode・トップカード6 minと遷移、JS無効・ローカル書体失敗時の可読性を確認。skip linkのfocus、補助書体読み込み、390／1280pxの本文・資料・写真を画面画像で確認。既存回帰の固定記事数22を23へ更新。最終のbrowser_smoke.cjsは234ページ／画面幅条件、検索・履歴・5ダイアログ・reduced motion・JS無効時が成功。homepage_smoke.cjsは16条件、描画focus・forced colors・ナビ・検索が成功。
- **状態・限界：** レビュー用PRを提出する。マージ・自動マージ・本番公開は行わない。実機、実Google Fonts、他ブラウザ、本番ホスト、現地の展示現況は未確認。PR URL・最終CIは当該ブランチのPRと完了報告を正とする。


### 2026-11-21 — Codex-BGS-20261121：PR #114のマージ・公開承認

- **承認：** 運営者が「マージして問題なさそうだったらしてほし」と指示。PR #114を対象に、確認で支障がなければmainへのマージと公開反映の確認まで行う今回限りの承認として受領。
- **再確認：** 最新main `0b1b57b`、PR head `b1b44b7`、OPEN・非Draft・競合なし、レビューによる変更要求なし。AGENTS、AI_GOVERNANCE、EDITORIAL_STANDARDS、本ログの冒頭・関連記録・直近と、22ファイルの差分・新記事・調査記録を再読。静的検査およびChromium／Firefox／WebKitのCI全4ジョブ成功（Actions #44888040548）。
- **判断：** 実装の不具合・範囲外変更・出典と明確に矛盾する新記述は見当たらず、マージ可と判断。根拠の強さや現地の眺望位置等はPR・調査記録の留保を維持し、確認済みへ格上げしない。提供確定原稿・写真・表示を変更しない。本追記は承認と判断の記録のみ。
- **手順：** 追記後の最終headのCI成功を確認し、SHAを指定してPRをマージする。マージSHA・main CI・Pages公開・公開HTML照合結果はPR #114と完了報告を正とする。記録時点では未マージ。

### 2026-11-21 — ChatGPT-BGS-20261121：トップの記事順と表示番号の管理ルールを追記

- **対象：** `AGENTS.md`、`EDITORIAL_STANDARDS.md`。全AIの着手前・引き継ぎ時の参照先を `AGENTS.md` に明記し、トップのパーク別の並び、L／S／Wの表示番号と永久のFile No.の扱い、目次・カード・JSON-LDの生成元と検証項目を明記。
- **確認：** AGENTS、運営憲章、編集基準、本ログの冒頭・直近の記録を確認。規則の追加前後を比較し、既存のFile No.の割り当てと他の編集ルールを保持。
- **状態：** 文書のレビュー用PR。サイト実装とブラウザー検証は後続の実装時に行う。



### 2026-11-21 — Codex-BGS-20261121-2：トップ掲載順と表示番号を単一管理へ変更

- **依頼・基準：** 最新main `885a31c`（ホテルミラコスタPR #114反映後）でAGENTS、AI_GOVERNANCE、EDITORIAL_STANDARDS、本ログの冒頭・トップR3／目次／永久番号／直近記録を確認。open PR 0件。専用ブランチ `codex-bgs-20261121/home-order` を作成。今回の承認範囲は実装・検証・レビュー用PRまで。マージ・公開は別途指示を待つ。
- **並び：** 指定されたTDL10件→TDS12件→Worldwide1件の計23件。各群の先頭はL01東京ディズニーランド誕生史、S01東京ディズニーシー誕生史、W01 A World of Stories。S03 Hotel MiraCostaの目次リンクを既存#miracosta-cardへ追加。残りの並びも依頼の一覧と照合。
- **単一管理：** `archive-order.json`にパーク区分・掲載順・安定した記事URL／カードID・目次の既存短題を集約。`python scripts/build_archive.py`でindex.htmlの静的目次、カード順・L/S/W表示番号、ItemList順・positionを生成。カード本文・画像・読了時間・New表示とItemListの名称は既存HTMLの内容を使用し、管理ファイルに複製しない。JavaScriptなしでも目次と番号が読める。管理ファイルに表示番号を固定せず群内の位置から算出し、URL／IDへの転用を拒否。
- **保全：** 23枚すべてのカードを元HTMLと比較し、表示番号以外の文字・タグ・属性がバイト一致。記事ページは全件変更なしで、本文・永久File No.・前後記事リンク・画像・共有情報を維持。site.jsも変更なし。既存検索／絞り込みはDOM順で表示／非表示を切り替えるため、元の順と番号を保つ。新規写真・書体なし。
- **紙面・編集基準：** home.cssで既存CSSカウンタの擬似番号を止め、同系の紙面用書体で静的番号を表示。既存の色・グリッド・余白を使用。編集基準に表示番号と永久番号の違い、入口から巡る配置、横断記事の扱い、管理ファイルと生成コマンドを追記。
- **検査の分離：** check_archive.pyは目次／カード／ItemListと管理ファイルの完全一致、各記事の一度だけの掲載、連続した表示番号を検査。記事ナビは永久File No.順で引き続き検査する。生成の安定性、1か所の並べ替えによる3か所への反映、重複・欠落・欠番・区分違い・番号由来URL／IDを壊した8ケースと、記事を別群へ移すとカードの区分表記も追従する1ケースを追加。CIのpathsにもarchive-order.jsonを加え、管理ファイルだけの変更でも未生成を検出する。
- **ソース検証：** check_site.py成功（26ページ・25共有・23記事・Python25テスト・JS構文）、build_archive.py --check成功、git diff --check成功。既存sites.htmlのJSON-LD警告1件は継続。全23記事の題と永久File No.を最新mainで確認。
- **表示検証：** トップの既存16画面条件に、管理ファイルと目次／カード／ItemListの順・番号照合、各カテゴリの順序、複数の検索結果と絞り込みの組合せ、検索と区分に隠れたS03の目次移動、JavaScript無効時を追加。320／390／601／768／1280pxの目次・カードを撮影し、番号の二重表示がないこととモバイル／PCの可読性を目視。最終のトップ16条件と全ページ回帰234条件も成功。提出PRにも結果を記載。
- **提出前のmain追従：** 文書PR #115がmain `12b9653`へマージされたため取り込み。追加されたAGENTSの共通ルールとEDITORIAL_STANDARDSのHomepage article order and display numbersを再読。文書競合は先行方針・先行ログを保持し、本実装の生成コマンドだけ編集基準へ補足。HTML・CSS・検査への上流変更はなし。
- **状態・限界：** レビュー用PRを提出する。マージ・自動マージ・本番デプロイは行わない。実機・実Google Fonts・スクリーンリーダー・公開ホストは未確認。ローカルChromiumはGoogle Fontsを遮断し、既存フォールバック書体で検査。最終PR URL・CIは当該ブランチのPRと完了報告を正とする。

### 2026-11-21 — ChatGPT-BGS-20261121-2：読者と現地を歩くような語り口を共通化

- **対象：** `EDITORIAL_STANDARDS.md`、`AGENTS.md`。落ち着いた敬体、景色や手がかりを先に描く構成、発見に至る箇所での「〜のです」を、運営者が校正したミラコスタのガリオン船と天井画の原稿を基準例に採用。読者の視線に沿う順序、一度見たものとの再会で場面をつなぐ方法、「〜のです」の使いどころを明記。全AIの着手前の参照先として `AGENTS.md` からリンク。
- **確認：** 既存の世界観と出典の扱いに関する指示を維持。今回の文体変更は文書に適用し、記事原稿は後続の改稿で扱う。


### 2026-11-21 — Codex-BGS-20261121-3：ミラコスタの提供改稿と写真の表示窓を実装

- **依頼・承認：** 対象はbgs-miracosta.html（File No.023）。提供稿への差し替え、既存5写真の比率・画角・配置、実装・検証・PRを依頼。続けて運営者が「チェックが通り次第マージしてください」と追加指示。今回の最終headのチェック成功を条件に、当該PRのマージ・公開反映確認まで承認として受領。
- **着手確認：** 最新main `7dff465`（PR #117の文章ルール反映済み）でAGENTS、AI_GOVERNANCE、EDITORIAL_STANDARDS、本ログ冒頭・関連／直近記録、ミラコスタ調査記録、S.E.A.／Soarinの関連箇所を確認。open PR 0件、未コミット変更なし。専用ブランチ `codex-bgs-20261121/miracosta-revision`。
- **本文：** 題・リード2段落・7章22段落（計24段落）を提供稿どおり反映。既存全ID・URL・File No.・資料17件と確認日・関連3件・前後ナビ・撮影者名を保持。第I章の目次を新見出しへ同期。本文3,316→2,919字（空白・見出し・caption・資料を除く）、600字／分で6→5分とし記事・トップS03カードを同期。トップは読了時間の1行のみ変更し、管理ファイル・順・番号・写真・紹介文等を保持。生成チェック成功。同日のため既存表示日／dateModified／lastmodは2026-11-21のまま。
- **写真：** 元画像・既存srcsetを全点保持。object-fit:coverと比率・位置だけで可逆的に表示窓を変更。ザンビーニ外壁はI章の銘に触れる直後へ移動し縦4:5・上寄せ。街並みはIII章で横4:3・中央、ロビーはVI章第1段落直後で縦4:5・上寄せ、天井画は第2段落直後で元比率を維持し下中央の発見の精神を残す。夜景はVII章末尾で横2:1・縦位置40%（元画像換算で上約128px／下約191pxを除く）。caption／altを画角と同期し、全点Photograph: TERU_LUCE_を維持。新規画像・画像バイト変更・書体変更なし。
- **ソース検証：** 提供稿との題・24段落・7見出しの完全一致、全ID・canonical・資料欄・関連記事・記事間ナビの保持を確認。check_site.py成功（26ページ・25共有・23記事・Python25テスト・JS構文）、build_archive.py --checkとgit diff --check成功。sites.html既存JSON-LD警告1件は継続。本文に調査経緯や出典説明を追加していない。
- **表示検証：** Chromiumで320／390／767／768／1024／1280／1536px、目次49遷移、写真5点のdecode・画角内の主題点・元画像より拡大なし・横はみ出しなし、資料Enter／Space、JS無効／WOFF2失敗時、S03と5 min、トップからの遷移を確認。390px（DPR2）／1280pxで本文・写真・章内配置を画像で目視。初回の拡大判定はsrcsetの密度補正後naturalWidthを誤って原画素と比較して失敗したため、切り出し元の画素寸法で判定し直して成功。既存browser_smoke.cjs234条件・homepage_smoke.cjs16条件も成功。
- **引き継ぎ・判断：** 詳細な画角座標と任意の文言変更案はdocs/research/miracosta.mdとPRへ記載。提供本文は独断で変更しない。既存調査の増築史・証書名の独立写真判読等の留保は継続。実機・実Google Fonts・現地展示は未確認。最終headのCI成功後にSHAを指定してマージし、Pagesと公開ファイル・表示を確認する。PR番号・CI・マージSHA・公開結果は当該PRと完了報告を正とする。

### 2026-11-21 — Codex-BGS-20261121-4：東京ディズニーシー全12記事の改稿と紙面調整

- 基準はmain `acf4adb`（PR #118）。着手時のopen PRは0件。AGENTS、運営憲章、編集基準の語り口と運営者校正例、本ログの冒頭・関連記録・直近、ミラコスタの調査記録と関連記事を確認。掲載台帳のS01〜S12を対象とした。
- [文章コミット](https://github.com/teruluce/disney-bgs/commit/d0a9985)で11記事を推敲。港の景色、荷札や展示、乗り場の動きといった既存の手がかりから来歴へつないだ。推測の確度を区別し、本文に取材過程や出典説明を加えていない。既存の編集日・該当するdateModified／lastmodを同期。S03ミラコスタは題・リード2段落・7章22段落を含む提供確定稿を保持した。
- [デザインコミット](https://github.com/teruluce/disney-bgs/commit/c669032)で12記事だけに紙面CSSを追加。PCの左右余白を等しくし、左の追従目次と本文左揃えを維持。章見出し、既存の写真説明、参考資料欄に既存色の細罫と余白を加えた。共通回帰にTDS記事の本文中心・行幅上限・左揃えの検査を追加した。
- ソース照合では全12本のDOM構造、リンク・ID・File No.、既存の出典・写真属性・クレジット・ナビ・共有・編集日以外のメタ情報を保持。ミラコスタはCSS読み込み1行を除くHTMLが基準版と全文一致。画像ファイル、トップ、台帳は変更なし。check_site.py（26ページ、23記事、Python 25テスト）とgit diff --check成功。sites.htmlの既存JSON-LD警告1件。
- Chromiumで全12記事を320／390／767／768／1024／1280／1536pxで確認。PCの本文中央を1px以内、横はみ出しなし、スマホの本文幅・位置および本文の書体・サイズ・行間・色の保全を確認。1280px時の本文680px、768px時432px、390px時350px。サイト回帰234条件、トップ16条件、読書ページ175条件（資料開閉、キーボード、JS無効、対象axe検査を含む）が成功。
- [レビュー用PR #119](https://github.com/teruluce/disney-bgs/pull/119)。ポートディスカバリーIII章、ミラコスタVI章の写真説明と展開した出典欄をPC／スマホで撮影し、同位置の前後を目視。画像12枚は[比較用コミット](https://github.com/teruluce/disney-bgs/commit/e3476a6)に保存し、PR本文から原寸を参照できる。フォールバック書体で撮影。実機Safari、現地展示、全出典の再調査は未実施。状態はレビュー待ち。未マージ・本番未公開。最終headのCIはPRのChecksを参照。

#### PR #119 のマージ・公開承認 — Codex-BGS-20261121-4

- 運営者から「マージして」と明示承認を受領。PR #119の最終head `f34fbfa` は競合なしで、静的検査とChromium／Firefox／WebKitの全4チェックが成功していることを再確認した。
- 本追記を最終headへ反映し、そのチェックが成功した場合にReady for reviewへ切り替えてSHAを指定してマージする。main更新後はPagesのデプロイと公開HTML／CSSを確認する。記録時点では未マージ。

### 2026-11-21 — Codex-BGS-20261121-5：東京ディズニーシー記事のPC中央配置を撤回

- 公開後、運営者がPC本文の中央配置に違和感があると確認し、「中央よせだけもとに戻す」と指示。最新main `0d09c30`から専用ブランチ `codex-bgs-20261121/disneysea-left-layout` を作成した。
- `disneysea-reading.css`からPC専用の3列中央配置だけを削除し、既存の `desktop-article.css` による左目次＋右本文の配置へ戻す。章見出し・写真説明・参考資料の細罫と余白、全記事本文、スマホ表示は維持する。中央配置専用の回帰条件も削除し、既存の列重なり・本文幅・横はみ出し検査は継続する。公開時に旧CSSがブラウザキャッシュから再利用されないよう、12記事の同CSS参照に更新識別子を付ける。
- 運営者から「戻せ次第マージして」と明示承認を受領。レビュー用PRの最終headで全チェックが成功し、競合がない場合にマージし、Pagesの公開反映と実ページを確認する。

## 2026-11-22 — Codex-BGS-20261122 / ランドの語り口・紙面と両パークの番号

- 着手時に AGENTS.md、AI_GOVERNANCE.md、EDITORIAL_STANDARDS.md、本ログ、ミラコスタ確定稿と改稿済みシー記事を参照。PR #120 後の main（3deaa0a）を配置の比較基準とした。
- ランド10記事の導入と各章の語り口を改稿。通常8記事は既存の新聞紙面にリード、図版説明、関連記事の案内を統一。スモールワールドとトゥモローランドは専用の紙面を継承。ホーンテッドマンションの既出書名は巻末へ移した。
- ランド10件・シー12件の FILE NO. を一覧の L01–L10・S01–S12 と照合。トゥモローランドの HUD にも L09 を表示。記事の3桁永久番号を data-accession に保存し、記事間ナビは従来の順を使用。シーの差分は各記事の番号要素1か所。
- Chromium の PC 1280×900・スマホ390×844で全件の番号、ランドの目次、通常記事の本文位置・幅・左揃え、出典の開閉を確認。代表の通常記事と例外2記事について main との比較画像をレビュー資料に用意。静的検査と既存ブラウザー検査を通過。差分で画像属性、クレジット、既存リンク・参照資料、記事間移動を照合。
- レビュー用PRで運営者の確認を待つ。本番公開・マージはレビュー後。

- 運営者から、最新公開の2記事だけに New を表示し、トップの更新日を当日に直したうえで全変更をマージするよう承認を受領。記事改稿の PR #121 が先にマージされたため、トップの変更は PR #122 に分けた。新規公開順を履歴で確認し、New はミラコスタとミステリアスアイランドに表示し、トップの最終編集日とサイトマップの日付を日本時間の2026年11月22日に同期した。

## 2026-11-22 — Codex-BGS-20261122 / タワー・オブ・テラーの検索導線

- main `8237678` を基準に、AGENTS.md、AI_GOVERNANCE.md、EDITORIAL_STANDARDS.md、本ログ、SEO_BASELINE.md、タワー記事の調査記録を確認。着手時のopen PRは0件。
- 公式の施設案内、落下の体験解説、背景ストーリーの競合を検索結果のサンプルで確認した。東京版の物語、とくに1899年の失踪から1912年の見学ツアーに至る歩みをページタイトル、説明、導入、章見出しで示した。掟の順序付きリスト、既存の年表、ベアトリスとスメルディングの記述にたどりやすくした。
- 新規リンクは「東京ディズニーシー誕生」から記事全体へ、レイジングスピリッツからホテルの荷物と壁画へ。トップの既存カードでも偶像の名前を検索できる。既存の本文段落、歴史年表、17件の参考資料、URL、目次のアンカー、画像データ、FILE NO. S05を差分で照合した。記事の最終編集日、Article.dateModified、sitemap.lastmodは本日の編集に合わせた。
- 静的検査と一覧の生成整合、Chromiumの320・390・768・1280pxで目次、出典、8項目の番号、関連リンク、サイト内検索を確認。320pxはJavaScript無効。公開後の検索表示、順位、Search Consoleの値は未確認。

## Codex-BGS-20261122 — 2026-11-22 スプラッシュ・マウンテンの増補原稿

- **着手確認**　最新main `2a8fed5` で AGENTS.md、AI_GOVERNANCE.md、EDITORIAL_STANDARDS.md、本ログの冒頭・スプラッシュ関連・読了時間・直近の記録を確認。オープンPRは0件。リモートの既存ブランチに今回の増補と重なる進行中の作業は見当たらず、専用ブランチを作成。
- **変更**　`bgs-sm.html` の提供原稿を9章に組み込み、目次を同期。既存6章と本文スキップ先のID、Ⅶ章の本文、写真・キャプション・題字・副題・FILE NO. L05／永久番号001・共有・ナビ・関連記事を保持。新設小見出しにビッグサンダー・マウンテンの既存書式を使用。リードを含む本文4,292字を600字／分で切り上げ、記事と `index.html` の対象カードを8分に更新。表示編集日とサイトマップの既存日付2026-11-22に合わせ、記事のArticle JSON-LDに `dateModified` を追加。
- **検証**　`python scripts/check_site.py`、`python scripts/build_archive.py --check`、`git diff --check` が成功。既存の `sites.html` のJSON-LD警告1件。原稿とHTMLの段落を照合し、指定のメタ表現は0件。ローカルChromiumの320・390・767・768・1280pxで目次9リンク、既存6アンカーとスキップ先、写真、横はみ出し、記事とカードの読了時間を確認。390pxのⅢ章と1280pxの夜景・目次も表示を目視。
- **未確認・保留**　Ⅷ章の色彩演出は東京版での適用確認待ちのため掲載保留。折りたたみ `source-note` は現行HTMLになく、出典は未提供のため未追記。章別の事実確認事項はPRの「未確認事項」を参照。実機、Google Fontsの配信書体、本番画面は未確認。
- **状態**　実装とローカル検証を完了し、ドラフトPRを作成。マージと本番公開は運営者の明示承認待ち。[実装コミット](https://github.com/teruluce/disney-bgs/commit/deb3525cda8397c49aefa8b5dce1bf660d719788) ／ [PR #124](https://github.com/teruluce/disney-bgs/pull/124)

## Codex-BGS-20261122 — 2026-11-22 インディ・ジョーンズとシンデレラ城の先行増補

- 最新main `23ce42d`、AGENTS.md、AI_GOVERNANCE.md、EDITORIAL_STANDARDS.md、既存記事紙面、添付ZIPの掲載稿を照合。別件の参考資料表示PR #126と対象記事の差分は重複しない。
- `bgs-indy.html`（S07）を4章から6章へ。考古学者の調査本部と焼き物、祭壇の壁画、ユカタンの発掘遺構を追加。既存コラムで東京のC-3POと映画のOB-CPOを区別し、制作上のオマージュとして記載。ハイタワー三世の章は番号のみ更新。
- `cinderella-castle.html`（L03）を7章から9章へ。階ごとの役割、フェアリーテイル・ホールの由来と案内役、モザイクと右足のガラスの靴、ミステリーツアーを追加。Ⅱ章の重複箇所を短くし、金色の塔はファンの逸話と区別。色彩差は配色と見え方を記述。施設案内で2026年10月1日からの休止を確認し、11月22日時点の状態を記載。
- 本文（リード・コラム含む、見出し・空白・写真説明・資料・表を除く）はインディ1,421→2,570字、シンデレラ城2,230→3,492字。600字／分で切り上げ、記事とトップの対象カードを4→5分、4→6分に同期。表示日・Article.dateModified・sitemap.lastmodは両記事とも2026-11-22。
- 検証は `python scripts/check_site.py`、`python scripts/build_archive.py --check`、`git diff --check`、Chromiumの320・390・768・1024・1280px。全15目次項目、既存アンカー、12画像の読み込み、折りたたみ資料、比較表、カード、横はみ出しを確認。既存指定章、画像・属性、キャプション、比較表、関連リンク、CSSを差分で照合。静的検査の既存警告はsites.htmlのJSON-LD 1件。実機・映画本編の独立照合は未実施。
- 元の資料URLを記録。記事末尾には番号付きの資料名を掲載。インディは[施設案内](https://www.tokyodisneyresort.jp/tds/attraction/detail/222/)・[キャストの紹介](https://www.tokyodisneyresort.jp/tdrblog/detail/200610/)・[壁画とユカタン](https://www.tokyodisneyresort.jp/tdrblog/detail/210816/)・[若さの泉の放送](https://www.tokyodisneyresort.jp/tdrblog/detail/120502/)。シンデレラ城は[施設案内](https://www.tokyodisneyresort.jp/tdl/attraction/detail/166/)・[城内の案内](https://www.tokyodisneyresort.jp/tdrblog/detail/210215/)・[右足の靴](https://www.tokyodisneyresort.jp/tdrblog/detail/190220/)・[モザイク](https://www.tokyodisneyresort.jp/tdl/shop/detail/546/)・[歴史写真](https://www.tokyodisneyresort.jp/tdrblog/detail/131030/)・[歴代アトラクション一覧（第三者資料）](https://www.tdlfun.com/history/Attraction.php)。
- 運営者の追加指示で、問題がなければ今回のPRのマージまで承認済み。CIと公開結果は[対象PR](https://github.com/teruluce/disney-bgs/pulls?q=is%3Apr+head%3Acodex-bgs-20261122%2Findy-cinderella)と完了報告を参照。


## Codex-BGS-20261122 — 2026-11-22 ページ間リンクの紙面を統一

- 最新main `1954282`、オープンPR 0件を確認。AGENTS.md、AI_GOVERNANCE.md、EDITORIAL_STANDARDS.md、作業ログの運営方針と関連記録を参照。運営者からBGS Chronicles内のページ間リンクを紙面になじむ形に統一し、青を使わないよう指示。マージの明示承認を受領。
- 全23記事とトップ・著者ページに適用。本文中の参照は点線の下線、記事中・記事末尾の関連記録は細罫・明朝体・右矢印、記事間ナビも同じ紙面の書式で統一。既存の関連記事カードとスモールワールドの別書式は共通CSS・静的HTMLへ移行。戻りリンクの表記を統一。墨色を基本に、えんじとスモールワールドの金茶で矢印・フォーカスを表示。
- 静的検査と生成整合が成功。全25ページのリンク先・target・rel・ID・画像属性をmainと照合。Chromiumの320・390・768・1280pxで全25ページのリンクの幅・高さ、代表8経路のキーボード遷移とフォーカス、JavaScript無効時の遷移を検証。PCとスマホ幅で関連記録の見た目を確認。関連記事などの操作時の色を確認。既存 `sites.html` のJSON-LD警告1件。
- レビュー用PRの最終コミットでCIを確認してからマージする。GitHub Pagesと公開HTML・CSSの確認結果はPRおよび完了報告を参照。

## Codex-BGS-20261122 — 2026-11-22 参考資料欄の折りたたみを統一

- 最新main `23ce42d`、オープンPR 0件。AGENTS.md、AI_GOVERNANCE.md、EDITORIAL_STANDARDS.md、本ログの運営方針と参考資料の先行記録を参照。
- 資料掲載済みの13記事で、初期表示を「＋ 参考資料」の一行と細罫に統一。記事末尾の同じ位置に置き、開くと既存の資料名127件を元の順序で表示。エレクトリカルパレードの分類・案内文、既存の確認日・アンカーを保持。資料欄のない10記事への追加資料は今回の対象外。
- S.E.A.とレイジングスピリッツの資料は既存の編集基準に沿って記事上では資料名を表示し、元のURLを以下に記録。
- 静的検査とトップの生成整合が成功。Chromiumの320・390pxでタップ、768・1280pxでEnterとSpaceを確認。390pxのJavaScript無効時にも13記事の開閉を確認。資料名・順序、分類、確認日、既存リンクとアンカー、画像を差分で照合。既存 `sites.html` のJSON-LD警告1件。
- 実装・ローカル検証済み。実機と本番画面は未確認。マージと公開は承認待ち。[実装コミット](https://github.com/teruluce/disney-bgs/commit/505ebf727b1742d2201452e5cdefe126da039ff8) ／ [PR #126](https://github.com/teruluce/disney-bgs/pull/126)

- `bgs-raging.html` の移動前の参照先
  - [【BGS】レイジング・スピリッツの解説（umezu0505.com）](https://umezu0505.com/bgs_ragingspirits/)
  - [東京ディズニーリゾート公式ブログ](https://www.tokyodisneyresort.jp/tdrblog/detail/220825/)
  - [Wikipedia「Raging Spirits」](https://en.wikipedia.org/wiki/Raging_Spirits)
  - [Wikipedia「Indiana Jones and the Temple of Peril」](https://en.wikipedia.org/wiki/Indiana_Jones_and_the_Temple_of_Peril)
- `bgs-sea.html` の移動前の参照先
  - [Laughing Place「The Search Continues」](https://www.laughingplace.com/disney-parks/disney-sea-mystery-thief-clue-recap/)
  - [Disney Parks Blog「The Society of Explorers and Adventurers at D23 Event 2026」](https://disneyparksblog.com/?p=392926)
  - [Attractions Magazine「The story behind S.E.A.」](https://attractionsmagazine.com/story-behind-sea-disneys-society-of-explorers-and-adventurers)
  - [Blog Mickey「Hazel Hightower Revealed as Newest S.E.A. Member」](https://blogmickey.com/2026/10/hazel-hightower-revealed-as-newest-s-e-a-member/)
  - [WDWNT「Disneyland Expands S.E.A. Lore With Hazel Hightower」](https://wdwnt.com/2026/10/photos-disneyland-expands-s-e-a-lore-with-hazel-hightower-oar-ridge-jewel-souvenir-ticket/)
  - [Main Street Library「Exploring the Skipper Canteen Library」](https://mainstreetlibrary.substack.com/p/exploring-the-skipper-canteen-library)

## 2026-11-22 — Codex-BGS-20261122-SEO / 全26ページの検索表示

- 最新main 50e9307、開始時のオープンPRは0件。運営憲章・編集基準・既存SEO監査と記事の各章を確認。
- 公式タワー・オブ・テラーの施設案内と、梅酢ブログのレイジングスピリッツ解説を比較。利用情報や物語の概要を重ねるより、各記事で読める人物・現地の意匠・歴史を検索タイトルに採用した。比較先は下記2ページ。検索順位・検索量は測定していない。
  - https://www.tokyodisneyresort.jp/tds/attraction/detail/243/
  - https://umezu0505.com/bgs_ragingspirits/
- タイトル21件と主要な説明を本文に合わせ、全23記事の著者をトップとプロフィールの同一人物に接続。サイト案内にWebPageを追加し、ソアリンからホテルの歴史へ関連リンクを追加。
- 26ページの静的SEO検査（警告0）、記事一覧23件、共有リンク25件、単体テスト26件を確認。旧URLの転送とGoogle所有権確認ファイルも確認した。検索結果での表示と順位は公開後の再取得に依存する。

## 2026-11-22 — Codex-BGS-20261122-2 / トップ目次の英語表記を統一

- 最新main `9a8e3c5`、AGENTS.md、AI_GOVERNANCE.md、EDITORIAL_STANDARDS.md、本ログの運営方針・目次・直近の記録を確認。着手時のオープンPRは0件。
- `archive-order.json` の目次表示名9件を指定表記に変更し、`scripts/build_archive.py` で `index.html` を再生成。全23件の番号・順序・カードID・記事URLをmainと照合。目次表示名を除いたトップのHTMLと全23記事のHTMLはmainと一致。同じ目次を表示する別ページは見当たらなかった。
- `home.css` で目次の行配置を調整し、長いタイトルを含む項目が利用できる幅を確保。`scripts/homepage_smoke.cjs` で表示名、1行表示、リンク内の収まりを検査。
- 静的検証と単体テスト26件、生成一致、トップの既存16画面条件が成功。ローカルChromiumの320〜1920pxの21画面条件で、Webフォントと代替書体の両方について全23件の折り返し・はみ出しがないことを確認。390／768／1280pxで目次を目視確認。実機と本番表示は未確認。
- 状態はレビュー待ち。[実装コミット](https://github.com/teruluce/disney-bgs/commit/30a7a4128c129bc8b5d6853ddbf5082c50f3c3da)と[レビュー用PR・CI](https://github.com/teruluce/disney-bgs/pulls?q=is%3Apr+head%3Acodex%2Fhomepage-toc-titles-20261122)を参照。

## 2026-11-22 — Codex-BGS-20261122-3 / 公開記事番号と前後リンクを目次順に統一

- 最新main `4008b9c` と公開ミラコスタ記事を確認。AGENTS.md、運営憲章、編集基準、作業ログの運営方針・記事番号・ページ間リンクの関連記録を参照。オープンPRは0件。従来の前後リンクは永久資料番号順で、最大番号023のミラコスタには次の記事がなかった。
- 全23記事の公開番号と前後リンクを `archive-order.json` から生成。リンクは同じグループ内の掲載順とし、表示番号と目次名を併記。S03の前はS02 Spatial Epic、次はS04 Soaring: Fantastic Flight。各グループの端からは目次に戻れる。Worldwideの記事・トップの装飾カード・SNS共有画像はW01に統一し、021を含む既存の永久資料番号は全件 `data-accession` に保持。運用規則と生成差分の検査も同期した。
- 本文、資料、トップの掲載順、URL、SEO情報はmainと一致。共有画像の差分は番号の文字部分のみ。静的検査（警告0件、単体テスト29件）、生成一致、差分検査、Chromiumの320／390／768／1280pxで全23記事と40件の前後リンク、S03とS04の往復、W01の目次復帰を確認。390pxはJavaScript無効。
- 実機と修正後の本番は未確認。運営者のレビュー待ち。[実装コミット](https://github.com/teruluce/disney-bgs/commit/fb7a4e4ed4cebcc3020dcbf1ec7dd70c078d3860) ／ [レビュー用PR・CI](https://github.com/teruluce/disney-bgs/pulls?q=is%3Apr+head%3Acodex%2Farchive-display-navigation-20261122)。

- 追記（PR #130のマージ承認）　運営者から失敗した検査の修正とマージを指示。WebKitの比較表で、Tabによる到達は成功する一方、右矢印で横スクロールしないことをCIで確認。シンドバッド記事の比較表にフォーカスがあり横にあふれる場合だけ、左右矢印で表を動かす処理を追加。修飾キー付きの操作、Tab、タッチ操作は従来どおり。既存のキーボード回帰検査で再確認する。
- PR #130は修正後のCI全4件成功を確認してmainへマージ。[PR #130](https://github.com/teruluce/disney-bgs/pull/130) ／ [CI](https://github.com/teruluce/disney-bgs/actions/runs/45028928980) ／ [マージコミット](https://github.com/teruluce/disney-bgs/commit/f3b657c9ddb06b46ba99d81a9680adf09d217f5a)。


## 2026-11-22 — Codex-BGS-20261122-4 / 校正確定稿4記事を統合

- 最新main `4008b9c` と、運営憲章・AGENTS.md・編集基準の語り口・作業ログの関連箇所を確認。「2026.11.22 BGS 4articles」ZIPの校正確定稿を部分増補として使用。別件のページ送りPR #130と分け、運営者の当チャットでの指示により今回の4記事PRのみ、検査後のマージまで承認済み。
- Fantasy Springs（S09）は泉の造形を新II章へ加え、三つのエリアとイマジニアの既存章を増補。Soaring（S04）は庭園・常設展の絵画・特別展のランタンと伝承を追加し、噂と展示品を区別。Tomorrowland（L09）は宇宙港の店と2027年予定の2章を追加。Raging Spirits（S08）は発掘・復元・禁忌の重複と、ハイタワー三世が発掘に関わったかのように読める箇所を整理し、眺望を追加。V章は従来のまま。
- 2027年予定を施設案内で再確認。ポッピングステーションは3月17日、シュガー・ラッシュとピクセル・プリズムは4月15日、アースライズ・広場・エレメント・エクスプレスは年のみ。コズミック・エンカウンターは2025年11月4日から休止中。ハイタワーの木箱・壁画は以前の記事にある観察の範囲で記載。既存記事全体の全主張を再調査したものではない。
- 本文（リード・コラムを含み、見出し・資料・表・写真説明を除く）は順に4,389／4,938／5,652／2,985字。600字／分で切り上げ、記事とトップカードを8／9／10／5分に同期。表示編集日・Article.dateModified・sitemap.lastmodを2026-11-22に更新。既存アンカー、写真属性とクレジット、関連記事・ページ送り、SEOのタイトル・説明・URLは維持。追加資料は巻末の折りたたみに掲載。
- 静的検査、単体テスト26件、生成一致、差分検査が成功。Chromiumの320／390／767／768／1024／1280pxと390pxのJavaScript無効時に、4記事の計29目次項目、代表アンカー、資料開閉、画像読み込み、横はみ出しの有無を確認。実機は未確認。最終CI・マージ・GitHub Pagesの状態は下記PRとActionsを参照。
- [実装コミット](https://github.com/teruluce/disney-bgs/commit/089666bf002595b124c30c3925899688229c946a) ／ [PR #131・CI・公開結果](https://github.com/teruluce/disney-bgs/pull/131)。

追加資料の参照先（2026-11-22に取得）。

- [泉の岩山と音楽](https://disneyparksblog.com/tdr/fantasy-springs-rockwork-you-wont-take-for-granite/)、[ファンタジースプリングスの細部](https://disneyparksblog.com/tdr/10-hidden-details-at-fantasy-springs/)
- [ソアリンの展示・庭園](https://www.tokyodisneyresort.jp/tdrblog/detail/220408/)、[カメリアの伝記と噂](https://www.tokyodisneyresort.jp/tdrblog/detail/220728/)
- [ピザ店の物語](https://www.tokyodisneyresort.jp/tdrblog/detail/171219/)、[PZ-5000](https://www.tokyodisneyresort.jp/tdrblog/detail/201120_2/)、[コズミック・エンカウンター](https://www.tokyodisneyresort.jp/tdl/shop/detail/560/)、[スターゲイザーサプライ](https://www.tokyodisneyresort.jp/tdl/shop/detail/576/)、[2027年特設サイト](https://www.tokyodisneyresort.jp/treasure/tomorrowland_2027/)、[ポッピングステーション](https://www.tokyodisneyresort.jp/tdl/restaurant/detail/378/)
- [発掘・復元・眺望](https://www.tokyodisneyresort.jp/tdrblog/detail/220825/)、[禁忌とねじれたレール](https://www.tokyodisneyresort.jp/tdrblog/detail/180914/)
- PR #130の公開番号・前後リンクとWebKit修正を取り込んだmain `f3b657c` に追従し、4記事の変更と作業ログの両方を保持。

## 2026-11-23 — Codex-BGS-20261123 / American Waterfront の新規掲載

- 最新main `aff75a8` でAGENTS.md、AI_GOVERNANCE.md、EDITORIAL_STANDARDS.md、本ログ、掲載順と関連記事を確認。目次の英語表記を統一したPR #129は反映済み。オープンPRは0件。専用ブランチ `codex/american-waterfront-20261123` で作業。
- 運営者提供ZIPの設定に基づき、確定稿の全7章・小見出し5件・リードを含む73段落を `bgs-americanwaterfront.html` に反映。本文8,504字、読了15分。ソアリンとタワー・オブ・テラーの間に挿入し、表示番号S05と永久資料番号024を付与。 `archive-order.json` からトップ `index.html` の目次・カード・ItemList、全24記事のFILE NO.と前後ナビを生成。検索・件数、最新2件のNew表示、サイトマップ、X共有文も同期。
- 本文のリンク3件を保持し、巻末に5件の関連記録を掲載。タワー・オブ・テラー、ミラコスタ、ポートディスカバリー、Spatial Epic、TDS Historyの各関連欄から新記事へ戻れる。既存23記事の本文と永久資料番号、トップの既存目次名を比較して保持を確認。
- 台帳01・02・04・05・06・07を掲載。台帳03はトイビルの場面が重なり、来園者の写り込みも多いため保留。04は本文の縦構図に加え、煙突と港の倉庫が残る4:3カード・1200×630のOGP用も作成。05は広告と船を残して手前の人物を除外。06は25周年バナーを除外し、07は高架と駅舎へ画角を限定。運営者撮影のクレジットを写真ごとに記載。JPEG15ファイルのEXIF・GPSなしを確認。巻末資料用に既存の日本語補助書体も再生成。
- 東京ディズニーリゾートの参考22件を取得し、公式本文の主要箇所と資料名を確認。研究・取材の説明が本文に入っていないことを検索し、資料は巻末の折りたたみに整理。確認に使った資料には[エンディコット家とハイタワー](https://www.tokyodisneyresort.jp/tdrblog/detail/210826/)、[鉄道と灯り](https://www.tokyodisneyresort.jp/tdrblog/detail/210224/)、[トイビルの終点と引き込み線](https://www.tokyodisneyresort.jp/tdrblog/detail/170920/)、[ケープコッドの郷土芸術](https://www.tokyodisneyresort.jp/tdrblog/detail/190313/)が含まれる。
- 静的検査（SEO 27ページ・警告0件、単体テスト29件）、生成差分、原稿・リンク照合が成功。Chromiumの320・390・768・1280pxでトップ検索、新記事カード、全7章、写真6枚、資料22件の折りたたみ、本文3件・巻末5件と戻りリンク5件、前後ナビを操作。320・390pxのJavaScript無効時にも目次・カード・本文・資料を確認。既存ブラウザー検査もChromiumで、243ページ・画面幅の組み合わせ、トップ16条件、読者ページ182条件が成功。
- レビュー待ち。実機・本番環境・現地の展示現況は未確認。マージ・本番公開は未実施。[実装コミット](https://github.com/teruluce/disney-bgs/commit/cd18c9a) ／ [PR #132・CI](https://github.com/teruluce/disney-bgs/pull/132)。

### 2026-11-23（JST）— Codex-BGS-20261123-2 / PR #132 の公開前確認

- 運営者からPR #132のマージと公開検証を正式に承認された。対象ブランチは `codex/american-waterfront-20261123`。最新main `aff75a8` とPRのレビュー開始時点 `ef2f881` で、AGENTS.md、AI_GOVERNANCE.md、EDITORIAL_STANDARDS.md、本ログの運営方針・関連記録・直近の引き継ぎを確認。[PR #132](https://github.com/teruluce/disney-bgs/pull/132)
- 新記事はニューヨークの大港とケープコッドを、商い・新聞・交通・灯りからたどる。構成は I. Two Harbors、II. The Endicotts、III. S.S. Columbia、IV. The City in Print、V. Two Tycoons、VI. Tracks and Lights、VII. Cape Cod。VI章には路面の線路、高架駅、地下鉄、トイビル、ガス灯から電灯への移行の5小見出しがある。表題・副題、リード込み73段落、章と小見出し12件は確定原稿と一致。[記事URL](https://teruluce.github.io/disney-bgs/bgs-americanwaterfront.html)
- 本文リンクはIII章からミラコスタ、V章からタワー・オブ・テラー、VI章からポートディスカバリー。巻末の関連記録にはこの3記事に加えSpatial EpicとTDS Historyを掲載。5記事の既存関連欄に戻りリンクを1本ずつ追加。既存23記事の本文・永久資料番号を保持し、PR #129の目次タイトルとPR #130の前後ナビ生成規則を維持。トップと記事の表示はS05、永久資料番号は `024`。ソアリンS04とタワー・オブ・テラーS06の間に配置。
- 運営者撮影の台帳01・02・04・05・06・07を採用し、`Photograph: TERU_LUCE_` と表記。台帳03の入口アーチは同じ場面の重複と写り込みのため保留。04は本文の縦構図とカード・OGPに使用。05は広告文字と船を残し、画面下の人物を除外。06は25周年のバナーを除外し、07は高架と駅舎を主題にした。原本7件を台帳のSHA-256と照合し、公開JPEG15件は全件デコードとメタデータを検査。APP0/JFIFの基本情報のみで、EXIF・GPS・IPTC・XMP・コメントは検出されなかった。撮影者クレジット、文字の判読性、来園者の写り込み、公開用画像のメタデータについて、編集基準に1項目を追記。
- `fonts/press-mincho.woff2` は従来のShippori Mincho B1由来の補助書体を、参考資料22件などに必要な文字を含めて再生成したもの。既存の文字を保持し、73コードポイント増加。SIL OFL 1.1と上流の著作権・ライセンス情報、BGS Press Minchoの書体名を保持した。既存スクリプトで日英のWOFF2両方をバイト単位で再現し、ブラウザーで参考資料への適用と、配信失敗時に代替書体で開けることを確認。[書体の出典と利用条件](../fonts/README.md)
- 静的検査は27ページ・警告0件、Python単体テスト29件、生成差分なし。全24記事の表示順・FILE NO.・永久資料番号・前後リンク、canonical・OGP・構造化データ・サイトマップを照合。Chromiumの320・390・768・1280pxで検索とフィルター、トップからの遷移、章目次7件、写真6点、巻末資料22件、関連記事と前後リンクを操作。390pxのJavaScript無効時はトップの目次・カード、本文、参考資料を確認。レビュー開始時点のCIは静的SEO・Chromium・Firefox・WebKitの4件が成功。[マージ前再確認の起点となったCI](https://github.com/teruluce/disney-bgs/actions/runs/45177198694)
- 資料は東京ディズニーリゾートの22件。碑文の二世・三世と1887年・1909年、客船と経営者、ベアトリスと保存協会、ザンビーニ家の積荷と輸出先、地下鉄を含む街の交通と照明、トイビルの引き込み線、ケープコッドの意匠を主要資料の記述と照合。現地での再取材や全展示の現況確認は未実施。将来の撮影候補はガス灯、劇場夜景、ギフトトロリー、エンディコット家の碑文。[一族と客船](https://www.tokyodisneyresort.jp/tdrblog/detail/210826/) / [ザンビーニ家の積荷](https://www.tokyodisneyresort.jp/tdrblog/detail/200923/) / [交通と照明](https://www.tokyodisneyresort.jp/tdrblog/detail/210224/) / [トイビル](https://www.tokyodisneyresort.jp/tdrblog/detail/170920/) / [ケープコッドの郷土芸術](https://www.tokyodisneyresort.jp/tdrblog/detail/190313/)
- PR #132の変更ファイルは37件。今回の公開前確認で追加した変更は作業ログと編集基準。
  - 新記事と一覧・共有・サイトマップ。 `bgs-americanwaterfront.html`、`index.html`、`archive-order.json`、`share-captions.json`、`sitemap.xml`
  - 既存記事のリンクと表示番号。 `bgs-fs.html`、`bgs-indy.html`、`bgs-miracosta.html`、`bgs-mysterious-island.html`、`bgs-origins.html`、`bgs-portdiscovery.html`、`bgs-raging.html`、`bgs-sea.html`、`bgs-sindbad.html`、`bgs-soarin.html`、`bgs-spatial-epic.html`、`bgs-tot.html`
  - 画像。 `aw-cape-cod-lighthouse-520.jpg`、`aw-cape-cod-lighthouse-820.jpg`、`aw-elevated-railway-1200.jpg`、`aw-elevated-railway-640.jpg`、`aw-harbor-card-1200.jpg`、`aw-harbor-card-800.jpg`、`aw-harbor-dusk-560.jpg`、`aw-harbor-dusk-960.jpg`、`aw-harbor-og.jpg`、`aw-steamship-advert-480.jpg`、`aw-steamship-advert-692.jpg`、`aw-subway-entrance-560.jpg`、`aw-subway-entrance-840.jpg`、`aw-toyville-rails-1000.jpg`、`aw-toyville-rails-560.jpg`
  - 書体・検査・文書。 `fonts/press-mincho.woff2`、`scripts/browser_smoke.cjs`、`scripts/homepage_smoke.cjs`、`EDITORIAL_STANDARDS.md`、`docs/AI_WORK_LOG.md`
- 本記録の時点では公開前。追記後のPRヘッドでCI全件を再確認してからマージする。実際のマージSHA、Pagesの結果、公開URLの確認結果は、実測後に同じ作業ログへ追記する。[PR #132の検査結果](https://github.com/teruluce/disney-bgs/pull/132/checks)

### 2026-11-23（JST）— Codex-BGS-20261123-2 / PR #132 のマージと公開検証

- 作業ログ・編集基準を含む最終PRヘッド `8d7a5acfd0ad62afecf3f6d6faf74ffb121df87d` で静的SEO・Chromium・Firefox・WebKitの4件が成功。最新main `aff75a8` と競合がないことを再確認して、22:00:17 JSTにPR #132をマージ。マージSHAは `650917761f24d34dbd4e0324a14b06e28300dc6d`、変更37ファイル。マージ後のツリーは承認済みヘッドと一致。[PR #132](https://github.com/teruluce/disney-bgs/pull/132) / [マージコミット](https://github.com/teruluce/disney-bgs/commit/650917761f24d34dbd4e0324a14b06e28300dc6d) / [マージ前CI](https://github.com/teruluce/disney-bgs/actions/runs/45179054374)
- GitHub Pagesのビルド・デプロイ・結果報告が成功。Pages APIのビルド `1395722115` でも同じSHAが22:00:45 JSTに `built` となったことを確認。キャッシュ回避クエリ付きのHTTPS取得で対象のHTML・JPEG15件・補助書体・サイトマップの計31点と、共通JS・CSS・英字補助書体の5点がHTTP 200かつマージコミットとバイト単位で一致。公開canonical、OGP、24記事のItemList、S05・永久資料番号024、新記事のサイトマップ掲載も確認。[Pagesの実行記録](https://github.com/teruluce/disney-bgs/actions/runs/45179627859) / [公開サイトマップ](https://teruluce.github.io/disney-bgs/sitemap.xml)
- 公開Chromiumの390・1280pxでトップの検索・カード遷移、章目次7件、小見出しを含む本文、写真6点、巻末資料22件、本文リンク3件、関連記事5件と各記事からの戻りリンク、ソアリンS04とタワー・オブ・テラーS06への前後移動を操作。320・390・1280pxでカード画像の遅延読み込み後の表示も確認し、390pxのJavaScript無効時はトップの目次・カード、記事本文と資料が利用できた。公開サイトに修正を要する問題は検出されなかった。実機・現地の展示現況は未確認。[トップ](https://teruluce.github.io/disney-bgs/) / [公開記事](https://teruluce.github.io/disney-bgs/bgs-americanwaterfront.html)
- マージコミットに対するmainの静的SEO・Chromium・Firefox・WebKitの4件も成功。既存のActionsにはNode.js 20の廃止警告があるため、依存アクションの更新を今後の保守候補とする。[mainのCI](https://github.com/teruluce/disney-bgs/actions/runs/45179627808)

### 2026-11-24（JST）— Codex-BGS-20261124-3 / Haunted Mansion の v4 全13章

- 最新main `f6fadd2` のAGENTS.md、AI_GOVERNANCE.md、EDITORIAL_STANDARDS.md、本ログ、既存記事と掲載順の生成規則を確認。v2のPR #136はマージ済み。オープンのPR #133は別件の作業ログのみ。両PRの差分を試験的に比較すると、末尾追記が同じ箇所で競合する。双方の履歴を残す調整は統合時に必要。本件は `codex/haunted-mansion-v4` で実施した。
- ZIPの00・02を実装指示、03〜05を照合資料として使用。単体添付と同一の正本 `01.Haunted.Mansion.原稿.v4.md` から、英語題・副題、リード5段落、全13章の見出しと本文163段落を反映。HTMLの文字列・段落境界・順序を正本と照合し、8,619字を確認した。第IV章の「彼の墓碑によれば」は作中の碑文を指す表現として保持。
- `bgs-haunted.html` の専用の導入配置を共通の新聞紙面に揃え、左の索引と右の本文をPCで、単列をスマホで使用。章目次13件と既存ID13件を確認。第I章の `#entrance` は風見鶏の段落、第X章は旧 `#magic`、第XI章は旧 `#graveyard` を使用。第XIII章の学会名からS.E.A. Archivesへつなぎ、既存の関連記事・前後記事・戻りリンクを保持した。
- `index.html` の対象カード説明と読了目安15分、`share-captions.json` とX共有リンク、検索メタデータ・OGP・X Card・Article JSON-LDを同期。掲載番号L06、永久資料番号003、前後L05／L07、canonical、サイトマップと最終編集日を照合した。共通CSS、掲載順JSON、他の記事本文に差分はない。
- 既存の外観写真とカード派生画像2点の運営者名義のアップロードと掲載履歴を確認。バイト一致、デコード、EXIF・GPSの不在を検証。外観・キャプションはホリデーナイトメアー期間を示す。写真の原撮影者・利用許諾の記録は未確認。巻末資料14件を既存の折りたたみに収録し、補助書体 `fonts/press-mincho.woff2` を既存の配布元・ライセンスと再生成手順で更新した。
- 静的SEO検証27ページ、警告0件。Python単体テスト31件、共有リンク26件、アーカイブ生成一致、差分検査が成功。ローカルChromiumの320・390・640・767・768・1024・1440pxで、写真、章目次と旧アンカー、キー操作、資料の開閉、関連記事・前後・トップの導線、横はみ出し、コンソールエラーを確認。320pxのJavaScript無効時も検証。320・1440pxのaxe対象4ルールは違反・判定保留0件。390pxで外部書体・巻末の補助書体の実描画と代替描画を確認した。既存のChromiumで243ページ・画面幅とトップの16条件が成功。最終CIの結果はPRのChecksに記録。
- フラッフィーは墓碑写真・転記の9件と本文にある具体日付6件を照合。残り3日を本文に列挙するか、2023・2024年の公式謎解き原文と詳細な人物伝、東京の花嫁と海外の婚姻譚の結びつけ方、墓碑・展示・写真の原記録確認をPRの未確認事項とした。本文は正本を保持。スマートフォン・タブレット実機、現地、検索インデックス、X実投稿は未検証。
- レビュー待ち。mainへマージ・本番公開は未実施。[実装コミット](https://github.com/teruluce/disney-bgs/commit/f5b2480f38d2f4846b781c3b916fd917da89512d) ／ [PR #137](https://github.com/teruluce/disney-bgs/pull/137) ／ [PRの検証結果](https://github.com/teruluce/disney-bgs/pull/137/checks)。

- 追記（Codex-BGS-20261124-3）　運営者の統合指示を受け、最新main `49c7032` にあるPR #133の記録に続けて本節を配置し、末尾追記の競合を解消した。競合解消前後で記事・一覧・共有設定・書体がバイト単位で同一であることを照合。原稿照合、静的SEOと単体検査を再実施した。[PR #137の検証](https://github.com/teruluce/disney-bgs/pull/137/checks)

### 2026-11-24（JST）— Codex-BGS-20261124-4 / it’s a small world 増補改訂・専用紙面

- レビュー待ち。最新main `d176b86` から専用ブランチを作成。着手時のオープンPRは0件。AGENTS.md、AI_GOVERNANCE.md、EDITORIAL_STANDARDS.mdの語り口・資料欄・掲載順、本ログの冒頭・Small Worldの写真・PC版・最新引き継ぎ、台帳、既存記事・関連記事、共通JS・CSSと検査手順を確認。[実装コミット](https://github.com/teruluce/disney-bgs/commit/3eb9602036d218a5fcad3ef56ecee6515ec1ed39) ／ [比較画像とトップ編集日](https://github.com/teruluce/disney-bgs/commit/49aa6b64ebbd501eb1df8ff44f5ff8566bcb703d) ／ [デザイン確認用PR #138](https://github.com/teruluce/disney-bgs/pull/138)
- 提供資料第3節の7章・22小見出し・本文84段落を掲載。10段落は下記の局所修正、残る74段落は原稿と文字列が一致。人物カード4件は別掲。本文7,698字、600字／分で13分（見出し・カード詳細・写真説明・参考資料を除く）。資料の作業指示・調査経緯を本文へ転載していない。
- 第I章は共通の顔から読み取る思い、子供・動物が主役の岸辺、太陽の探し方を限定。第II章の1,000万人超は展示館の入場者。バラードとテンポ変更はシャーマン本人のインタビューと博物館解説で裏付けられたため保持した。長い直接引用と歌詞転載はない。
- 第III章の選択案内をカード表示に同期。ギブソンのカードは大統領の人形とブロンズ像の作品を区別し、平等への思いを読者が読み取る表現とした。第IV章はプンバァの表記を修正。登場人物の地域、2018年当時の東京独自の顔ぶれ、ベリーメリーホリデーのアジアの新年を当時の記録と照合した。
- 第V章は二度の開催日と写真を照合。共に歌うという全員への帰属を限定し、写真の青いハート形の植物と手、雪景色での盾のそりを描写。「熱帯」「南極」とキリンとの位置関係は断定していない。第VI章はブレアの美術とクランプのファサード・時計の仕事を区別。1966年5月28日の再開、塔が移設されなかったこと、3つのランドマークを照合した。フィナーレの白は船上からの印象、2025年7月17日の追加歌詞は米国2パークの出来事として掲載。
- 1964年の博覧会記念冊子を軸に、クリームの紙、既存の時計写真、章色、太陽と幾何学帯を組み直した。PC・タブレットは追従索引、スマホはネイティブの開閉索引。4件の人物紹介カード（うち1件はシャーマン兄弟）は既存の共有ダイアログで操作でき、JS無効時はHTMLの折りたたみで同じ文を読める。装飾のみが動き、動きを減らす設定に対応。写真4点と既存の権利表記を継承し、画像データの加工は行っていない。
- 記事・専用CSS／JS／SVG、index.html、sitemap.xml、既存ブラウザ検査の2カラムセレクターを更新。旧ID全件、URL・canonical・H1、L07／008、共有先、前後L06／L08を照合。既存関連2件にシンドバッド記事の音楽章を追加。トップ検索、カード、ItemList、Article、パンくず、OGP・X Card、編集日・サイトマップを同期し、非表示の旧FAQを削除。台帳の生成結果に差分なし。
- 静的SEO 27ページ・警告0、共有26件、台帳24記事、単体テスト31件、専用JSの構文と差分検査が成功。ローカルChromiumで1440／1280／1100／768／390／375／320pxの7幅を検証。横はみ出し、JSエラーなし。全章ジャンプ・現在章・キーボード操作・フォーカス復帰、全画像デコード、資料・関連記事・前後とトップ検索を確認。320／768pxはJS無効でも確認。既存回帰検査はサイト全体243条件、トップ16条件、読者ページ182条件が成功。
- 7幅すべてで実書体と代替書体のレイアウトを検査。ブラウザの直接取得は環境の証明書エラーがあるため、実書体の撮影時はシステムのTLS検証を通したGoogle Fontsの同じ応答を使用。本文／紙面は10.74:1、章見出しのアクセントは5.33:1以上。320／1440pxの本文・モーダルでaxe対象4ルールに違反なし。自動判定保留を含む配色は実色からも検算。表紙の実書体を目視し、副題が「イマジニア」の途中で改行されないよう語句のまとまりを指定。7幅で再検証し、1440／768／390pxの表紙とPC・スマホの人物紹介、計5対の比較画像をPRに掲載。[CIの結果](https://github.com/teruluce/disney-bgs/pull/138/checks)
- 実機、現地の展示現況、検索エンジンの再取得、Xへの実投稿、原写真の許諾原票は今回再確認していない。東京の旧外観の変更年や風の塔の処分先は本文に加えていない。
- 追記（公開結果）　運営者がデザインを確認し、問題がなければマージするよう承認。PR #138 の最終ヘッド `1ef13ce` は静的SEO、Chromium、Firefoxが成功。WebKitは検査本体へ進む前のPlaywrightブラウザ導入で長時間停止し、再実行でも同じ段階に停滞したため実行を終了した。ローカルでは上記のChromium検証を完了しており、コードの失敗は検出されていない。PRをレビュー可能に変更し、2026年11月24日13:03:49 JSTにマージした。マージSHAは `d45eb74e8568a4e758518e500fe983c1aa7a1a01`。[PR #138](https://github.com/teruluce/disney-bgs/pull/138) ／ [マージコミット](https://github.com/teruluce/disney-bgs/commit/d45eb74e8568a4e758518e500fe983c1aa7a1a01)
- GitHub Pagesのビルド・デプロイは成功。キャッシュ回避クエリ付きのHTTPS取得で `bgs-smallworld.html`、`smallworld.css`、`smallworld.js` がマージ済みファイルとバイト単位で一致した。実行環境のChromiumから公開HTTPSを開く検証は証明書信頼エラーのため完了していない。ローカルの7画面幅検証と公開ファイルの一致を分けて記録する。[Pagesの実行記録](https://github.com/teruluce/disney-bgs/actions/runs/45323751751) ／ [公開記事](https://teruluce.github.io/disney-bgs/bgs-smallworld.html)

<details>
<summary>巻末資料の確認用URL（本文の掲載順・2026年11月24日）</summary>

1. Disney Parks Blog, “The 60th Anniversary of ‘it’s a small world’: A Celebration of Unity” (2024).　[参照](https://disneyparksblog.com/disney-experiences/the-60th-anniversary-of-its-a-small-world-a-celebration-of-unity/)
2. The Walt Disney Family Museum, “it’s a small world” turns 60: A Global Celebration at The World’s Fair (2024)　[参照](https://www.waltdisney.org/blog/its-small-world-turns-60-global-celebration-worlds-fair)
3. National Endowment for the Arts, Richard Sherman interview (2010)　[参照](https://www.arts.gov/stories/podcast/richard-sherman)
4. The Walt Disney Family Museum, Mary Blair: Mid-Century Magic　[参照](https://www.waltdisney.org/mary-blair)
5. The Walt Disney Family Museum, Walt’s Family & Friends: Alice Davis　[参照](https://www.waltdisney.org/blog/walts-family-friends-alice-davis)
6. The Walt Disney Family Museum, Marc and Alice Davis: The Dynamic Duo of Disney　[参照](https://www.waltdisney.org/blog/marc-and-alice-davis)
7. 東京ディズニーリゾート・ブログ「東京ディズニーランドのアトラクション「イッツ・ア・スモールワールド」がリニューアル！さらに幸せな船旅に。」（2016年11月24日）。　[参照](https://www.tokyodisneyresort.jp/tdrblog/detail/pr161124/)
8. 東京ディズニーリゾート・ブログ「【いよいよ開幕！】東京ディズニーリゾート35周年“Happiest Celebration! ”」（2018年1月18日）。　[参照](https://www.tokyodisneyresort.jp/tdrblog/detail/pr180118/)
9. 東京ディズニーリゾート・ブログ「大幅リニューアルした「イッツ・ア・スモールワールド」の見どころをご紹介！」（2018年9月12日）。　[参照](https://www.tokyodisneyresort.jp/tdrblog/detail/180912/)
10. 東京ディズニーリゾート・ブログ「アトラクションキャストが教える！見どころ紹介 〜「イッツ・ア・スモールワールド」編〜」（2019年11月27日）。　[参照](https://www.tokyodisneyresort.jp/tdrblog/detail/191127/)
11. 東京ディズニーリゾート・ブログ「「イッツ・ア・スモールワールド」をご紹介！」（2021年4月20日）。　[参照](https://www.tokyodisneyresort.jp/tdrblog/detail/210420/)
12. 東京ディズニーリゾート「イッツ・ア・スモールワールド」（東京ディズニーランドの施設案内）。　[参照](https://www.tokyodisneyresort.jp/tdl/attraction/detail/172/)
13. 東京ディズニーリゾート・ブログ「今シーズンが最後のお披露目！ “世界で1番幸せなクリスマスクルーズ”」（2014年11月27日）。　[参照](https://www.tokyodisneyresort.co.jp/tdrblog/detail/141127/)
14. 東京ディズニーリゾート「イベント／プログラム」2024年8月29日（グルート初回の開催期間）。　[参照](https://www.tokyodisneyresort.jp/tdr/news/update/program/202408)
15. 東京ディズニーリゾート「サイト更新情報」2025年10月28日・12月26日（再演期間）。　[参照1](https://www.tokyodisneyresort.jp/tdr/news/update/program/202510) ／ [参照2](https://www.tokyodisneyresort.jp/tdr/news/update/program/202512)
16. Hong Kong Disneyland, it’s a small world　[参照](https://www.hongkongdisneyland.com/en/attractions/its-a-small-world/)
17. Disneyland Paris News, The attraction “it’s a small world” gets dazzling new costumes from February 2025　[参照](https://news.disneylandparis.com/en/the-attraction-its-a-small-world-gets-dazzling-new-costumes-from-february-2025/)
18. Disney Parks Blog, Disney World and Disneyland to Debut “it’s a small world” Finale Scene Lyrics (2025)　[参照](https://disneyparksblog.com/disney-experiences/disney-world-and-disneyland-to-debut-its-a-small-world-finale-scene-lyrics/)
19. TIME, What’s the Most Played Song Ever? (2014)　[参照](https://time.com/82493/its-a-small-world-50th-anniversary/)
20. Designing Disney, Designing “it’s a small world” – The 1964 New York World’s Fair　[参照](https://www.designingdisney.com/parks/disneyland-paris/disneyland-park/fantasyland/designing-its-small-world-1964-new-york-worlds-fair/)
21. Yesterland, “it’s a small world” Times Six　[参照](https://yesterland.com/smallworld.html)
22. D23, “Blaine Gibson” （ディズニー・レジェンド人物紹介）。　[参照](https://d23.com/walt-disney-legend/blaine-gibson/)
23. The Walt Disney Family Museum, “Small World, Big Message: The Music of ‘it’s a small world’” (2017).　[参照](https://www.waltdisney.org/blog/small-world-big-message-music-its-small-world)
24. San Diego Reader, “Interview: A Sweet Spoonful of Legendary Disney Composer Richard M. Sherman” (2012).　[参照](https://www.sandiegoreader.com/weblogs/big-screen/2012/aug/28/interview-a-sweet-spoonful-of-legendary-disney-com/)
25. Disneyland Resort, “it’s a small world”（カリフォルニアの施設案内・開業日）。　[参照](https://disneyland.disney.go.com/en_CA/attractions/disneyland/its-a-small-world/)
26. The Walt Disney Company, “Remembering Disney Legend Rolly Crump” (2023).　[参照](https://thewaltdisneycompany.com/news/remembering-disney-legend-rolly-crump/)
27. Imagination Skyway, “it’s a small world | Disneyland | 1964–1965 World’s Fair”（人形造形とファサード）。　[参照](https://imaginationskyway.com/its-a-small-world-disneyland-1964-1965-worlds-fair/2/)
28. 東京ディズニーリゾート・ブログ「世界中の子どもたちからみなさんへ『ハッピーホリデー！』」（2014年12月25日）。　[参照](https://www.tokyodisneyresort.jp/tdrblog/detail/141225/)
29. All About「『東京ディズニーリゾート35周年』を徹底レポート！」（2018年、各地のキャラクター）。　[参照](https://allabout.co.jp/gm/gc/474579/)
30. WDW News Today, “PHOTOS, VIDEO: ‘it’s a small world with Groot’ Premieres at Tokyo Disneyland” (2025).　[参照](https://wdwnt.com/2025/01/its-a-small-world-with-groot-at-tokyo-disneyland/)

</details>

### 2026-11-24（JST）— Codex-BGS-20261124-5 / スモールワールド確定稿v2の反映

- 運営者確定原稿 `bgs-smallworld-proofread-v2.md` を `bgs-smallworld.html` の既存紙面に反映。着手前に main `468cc91` の必読4文書、既存PR #138・#139、記事のHTML・CSS・JSを確認。競合する未マージPRなし。
- 平和理念の増補は、第I章の人形の共通性・子供の視点・太陽、第II章の「相互理解を通じた平和」とキューバ危機後の歌、第III章のギブソン紹介、第VI章のホワイト・ルームと最後の一節、第VII章の結び。既存巻末資料のDisney Parks BlogとThe Walt Disney Family Museumの解説で万博のテーマ、制作背景、リチャード・シャーマンの説明、米国2パークの新しい一節を照合。巻末の30件と出典URL記録を継承。
- 変更ファイルは `bgs-smallworld.html`、`index.html`、`share-captions.json`、`smallworld.js`、本ログ。章目次、トップカード、meta・OGP・X Card・Article JSON-LD・X共有文を同期。読了目安は本文8,679字、600字／分で切り上げて15分。サイトマップの更新日と表示の最終編集日は作業日と同日の2026-11-24。既存の表紙写真ラベル、写真配置、関連記事と前後ナビ、L07／008を継承。
- ブラウザDOMで、HTMLタグ・空白・Markdownの配置指示を除き、題・副題と135ブロックを原稿と順序・文字単位で照合。内訳は7章見出し、小見出し22件、本文95段落、人物カードの見出しと紹介文4組、写真キャプション3件。キーボードで開いた4件の紹介文も原稿と一致。
- `python scripts/check_site.py` 成功（SEO 27ページ・警告0、共有26件、台帳24記事、単体31件）。HTML5構文、専用JS構文、差分検査も成功。Chromiumは320・375・390・768・1100・1280・1440pxで章リンク、写真4点、人物カードの操作・フォーカス復帰、横はみ出し・JSエラーを確認。320px・1440pxで記事と人物ダイアログのaxe検査を実行し、対象WCAG A／AAルールの違反0件。
- [PR #140](https://github.com/teruluce/disney-bgs/pull/140)。マージおよび公開後の検証結果は公開確認後に追記する。
- 公開確認追記。最終ヘッド `e394a27` の [PR CI](https://github.com/teruluce/disney-bgs/actions/runs/45329725832) は静的SEO・Chromium・Firefox・WebKitの4件すべて成功。2026年11月24日13:58 JSTにマージ。マージコミットは [`7b65e26`](https://github.com/teruluce/disney-bgs/commit/7b65e2648792c6f8e9235213cc5737e215d7c9df)。
- [GitHub Pagesのビルド・デプロイ](https://github.com/teruluce/disney-bgs/actions/runs/45330026873) 成功。HTTPSで取得した記事・トップ・サイトマップ・専用CSS／JSはマージ済みファイルとバイト単位で一致。[公開記事](https://teruluce.github.io/disney-bgs/bgs-smallworld.html) のDOMを確定稿と再照合し、題・副題・135ブロックすべてが一致。公開ページの7画面幅で目次、写真4点、人物カード4件、キーボード操作とフォーカス復帰を確認。JSエラー、横スクロールなし。320pxと1440pxで記事・人物ダイアログのaxe対象ルール違反なし。PC・タブレット・スマートフォンはブラウザの画面幅で検証。実機とXへの実投稿は対象外。
- ローカル回帰検査はサイト全体243条件、トップ16条件、読者ページ182条件が成功。Pagesの自動ワークフローには `actions/upload-artifact@v4` のNode.js 20非推奨通知があり、ビルドとデプロイはいずれも成功。
