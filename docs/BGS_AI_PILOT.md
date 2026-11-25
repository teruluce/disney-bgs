# BGS Chronicles 資料室（仮称） 非公開試験

確認日 2026-11-25（JST）

担当 Codex-BGS-20261124-9

## 試験の範囲

試験先は既存の Cloudflare Worker `bgs-chronicles-ai`。公開サイトは [GitHub Pages](https://teruluce.github.io/disney-bgs/) で配信し、試験画面は Worker の専用 URL で配信する。追跡する Wrangler 設定は `workers.dev`、プレビュー URL、回答 API を停止する。手動 Actions でこの設定を反映できる。試験用 URL の有効化と Gemini への実送信には運営者の個別承認が必要。

Google の追加利用規約は開発者に18歳以上を求め、18歳未満を対象とするか、その利用が見込まれる API クライアントへの組み込みを制限している。一般読者に開く BGS Chronicles への Gemini 組み込みは見送る。開発目的の試験は、日本からアクセスする成人の運営者1名に限定する。EEA・スイス・英国で利用者に API クライアントを提供する場合は有料サービスが必須。 [Gemini API 追加利用規約](https://aistudio.google.com/docs/terms) ／ [提供地域](https://aistudio.google.com/docs/available-regions)

Gemini の無料サービスでは、Google が入力・出力をサービス改善に利用し、人が確認する場合がある。Worker は質問・回答を保存せず、ブラウザーは画面表示のためだけに保持する。Google 側の保存や二次利用も認めない運用条件なら、Gemini を有効にしない。送信対象は運営者が送信できる権利を確認した公開記事の短い抜粋と、個人情報を含まない質問に限る。 [無料サービスのデータ利用条件](https://aistudio.google.com/docs/terms#data-use-unpaid)

## 構成

1. `archive-order.json` の公開記事台帳から、`build.py` が記事本文の段落・リスト・表を抽出する。参照資料欄、引用ブロック、画像・キャプション、ナビゲーション、スクリプト、非表示要素は除外。正規 URL と章アンカーを記事 HTML と照合する。
2. `build-search.js` が日英の語・日本語の連続2文字・固有名詞の対訳を使い、Worker に同梱する検索データを生成する。検索は Worker 内で完結する。質問のたびにサイトを取得する処理、外部検索サービス、外部ベクトルデータベースは使わない。
3. Worker は日本の接続と試験用の認証を確認。質問は500文字、HTTP 本文は4 KiBまで。関連性のある抜粋を最大9件選び、質問と一緒に Gemini へ送る。モデルには候補 ID の選択と、英語の場合の翻訳を依頼する。記事や質問を命令として実行するツールは提供しない。
4. API 応答は型と候補 ID を確認し、最大3件を返す。日本語は選択された記事の文をそのまま表示し、英語は原文も確認できる。参照元 URL と分類はサーバーが付ける。公式資料と照合した箇所だけを `official-passages.json` に記録する。記事内の考察や不明を示す表現は索引の分類に反映し、ほかの箇所は「記事の記述」と表示する。根拠が足りない場合は回答を控える。
5. 単一の SQLite Durable Object が、全リクエストの利用回数・トークン予約・同時実行・上流429による停止を管理する。永続データはカウンター、時刻、処理中の予約 ID のみ。Worker の Observability は無効にし、キー、質問、回答、上流エラー本文をログへ出力しない。Gemini のキーは Worker Secret から取得し、Google 公式エンドポイントへの HTTPS ヘッダーにだけ使う。

認証は HTTPS Basic。パスワードには Apple のパスワードアプリなどで生成した試験専用のランダム値を使う。空白を除く印字可能な ASCII 20〜64文字に対応し、従来の64桁の16進数も使える。画面・CSS・JavaScript・API の各ルートに同じ認証がかかる。認証情報には通常のアカウントパスワードを使わず、運営者本人だけが保管する。API は同一オリジンの JSON POST のみ受け付ける。Worker のリージョン判定は接続元 IP に基づく。Cloudflare Zero Trust は Free の新規設定にも支払い情報登録を求めるため、試験の依存先から外した。 [Cloudflare One 初期設定](https://developers.cloudflare.com/cloudflare-one/setup/) ／ [workers.dev の Browser Integrity Check](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/)

英語の固有名詞・言い換えへの対応範囲は対訳辞書と記事中の英語表記に依存する。候補 ID の検証は、訳がすべて忠実であることや、選択文が質問に完全に答えることまでは保証できない。公式照合の対象は現時点で3箇所。その他の記事に公式由来の内容があっても、個別に照合するまでは「記事の記述」と表示する。

## 無料枠

| 対象 | 公表値・条件 | 試験設定 |
| --- | --- | --- |
| Gemini 3.1 Flash-Lite / 3.8 Flash | Free の標準生成は両モデルとも入力・出力が無料。実効 RPM・TPM・RPD はプロジェクトとモデルに依存し、AI Studio に表示。RPD は米国太平洋時間の午前0時に更新。 | 3.8 Flash は毎分3回、毎日20回。設定上、毎分は実効 RPM と3の小さい方、毎日は実効 RPD と20の小さい方。プロジェクトは試験専用とする。 |
| Cloudflare Workers Free | アカウント合計100,000リクエスト／日、毎日 UTC 00:00（JST 09:00）更新。CPU は10 ms／リクエスト。 | Worker は Free のまま使用。限度超過時は Cloudflare がリクエストを拒否。 |
| SQLite Durable Objects Free | 100,000リクエスト／日、13,000 GB秒／日、500万行読み取り／日、10万行書き込み／日、5 GB保存。 | 一つのオブジェクトだけに小さな利用枠カウンターを保存。 |

[Gemini 3.1 Flash-Lite 料金](https://aistudio.google.com/docs/pricing#gemini-3.1-flash-lite) ／ [Gemini 3.8 Flash 料金](https://aistudio.google.com/docs/pricing#gemini-3.8-flash) ／ [Gemini の実効上限](https://aistudio.google.com/rate-limit) ／ [Gemini 上限の仕様](https://aistudio.google.com/docs/rate-limits#how-rate-limits-work) ／ [Workers 料金](https://developers.cloudflare.com/workers/platform/pricing/) ／ [Workers 制限](https://developers.cloudflare.com/workers/platform/limits/) ／ [Durable Objects 料金](https://developers.cloudflare.com/durable-objects/platform/pricing/) ／ [Cloudflare セルフサービス利用規約](https://www.cloudflare.com/terms/)

Gemini への入力予約は UTF-8 バイト数に固定の余裕を加えて算出し、1リクエストあたり最大8,400。入力予約の合計を直近60秒の TPM 以内に収める。TPD が表示される場合は入力予約と最大出力の両方を当日の上限に算入する。予約値はモデルのトークナイザーによる実測値と異なる。生成の上限は思考を含めて640出力トークン、同時推論は1件。429が返った場合は再試行せず、次の米国太平洋時間の午前0時まで受付停止。日本時間では夏時間の16時、標準時間の17時にあたる。Gemini 無料枠を超えて課金できないよう、対象 Google Cloud プロジェクトには請求先をリンクせず、Cloudflare は Workers Free を維持する。課金状態は API キーから確認できないため、この確認が済むまで稼働させない。 [Gemini API の課金設定](https://aistudio.google.com/docs/billing)

## Gemini のモデル選択

| モデル | 位置づけ | 試験の思考レベル |
| --- | --- | --- |
| `gemini-3.1-flash-lite` | 比較用。低遅延で、根拠の選択と翻訳の比較基準にする。 | `minimal` |
| `gemini-3.8-flash` | 今回の試験モデル。Google は複雑な処理向けの Flash モデルと位置づけている。 | `low` |

`GEMINI_MODEL` でこの2モデルを選ぶ。対象プロジェクトの AI Studio で選択したモデルの実効上限を確認し、`AI_STUDIO_VERIFIED_MODEL` に同じモデル ID を設定する。モデル ID が一致しない場合は推論を停止する。自動で別モデルへ切り替える仕組みは設けていない。

両モデルを同じ質問で試し、根拠の正しさ、引用先、考察と不明の区別、英訳、応答時間、上限内での完答を比較する。3.8 Flash は `minimal` に対応していないため `low` を使う。思考や応答に時間がかかる場合は、640トークンの制限や15秒のタイムアウトでエラーになり得る。対象プロジェクトの実効無料枠と実モデルの品質比較は、承認後の試験で確認する。 [3.1 Flash-Lite](https://aistudio.google.com/docs/models/gemini-3.1-flash-lite) ／ [3.8 Flash](https://aistudio.google.com/docs/models/gemini-3.8-flash) ／ [思考レベル](https://aistudio.google.com/docs/thinking)

## Workers AI との比較

| 観点 | Gemini 3.1 Flash-Lite / 3.8 Flash | Cloudflare Workers AI の候補 |
| --- | --- | --- |
| 無料枠 | Free プロジェクトのモデル別 RPM・TPM・RPD。実効値は AI Studio。 | Workers Free で10,000 Neurons／日。UTC 00:00 更新。超過時はエラー。 |
| 候補モデル | 試験モデルは `gemini-3.8-flash`。比較用に 3.1 Flash-Lite を選択可能。 | `@cf/google/gemma-4-26b-a4b-it`。入力1Mトークン9,091 Neurons、出力1Mトークン27,273 Neurons。入力2,500・出力640なら約40.18 Neurons／回、約248回／日の計算例。実数は使用トークンとアカウント内の共有利用量による。 |
| データ | 無料枠の入出力を製品改善に使用する場合がある。 | 通常のステートレス推論は原則として入出力を保持せず、学習に使わない。安全、セキュリティ、法律上の例外と運用メタデータの扱いあり。 |
| 一般公開の条件 | 未成年の利用が見込まれる公開サイトには採用しない。 | Gemma 4 のモデルライセンスは Apache 2.0。Cloudflare のプライバシーポリシーは同社のサイト・サービスを18歳未満向けとしておらず、顧客サイトの法令遵守は顧客の責任とする。未成年が利用する顧客サイトへの適用、個人情報の扱い、日英の品質を公開判断前に確認する。 |

Workers AI は比較のみ。モデル変更には運営者の承認が必要。 [Workers AI 料金](https://developers.cloudflare.com/workers-ai/platform/pricing/) ／ [Gemma 4 モデル仕様](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/) ／ [Workers AI のデータ利用](https://developers.cloudflare.com/workers-ai/platform/data-usage/) ／ [Gemma 4 の Apache 2.0 ライセンス](https://ai.google.dev/gemma/apache_2) ／ [Cloudflare プライバシーポリシー](https://www.cloudflare.com/privacypolicy/)

## ローカル確認

Node.js 22以上、npm、Python 3を用意し、PR のブランチをチェックアウトする。

```sh
cd tools/bgs-chronicles-ai
npm ci
npm test
npm run test:runtime
npm run preview
```

`http://127.0.0.1:8789/` を開くと、質問例2件について実際の索引と模擬回答で UI を確認できる。Gemini キーや Cloudflare アカウントは不要。`test:runtime` は Wrangler のドライランで生成したバンドルをローカルの Workers ランタイムで実行し、Gemini の応答を模擬する。ほかの質問には模擬環境で「根拠なし」と応答する。`preview.js` はループバック専用で、デプロイする Worker に含めない。

記事を更新したときは、公開中の `main` と同じ記事・台帳を作業ブランチへ取り込み、`npm run build` と `npm test` を実行する。公式照合済みの文が変わると索引生成が止まるため、該当する公式資料を再照合して記録を修正または外す。新しい固有名詞の英語表記は必要に応じて `src/terms.js` に追加する。生成ファイルはコミットせず、有効化と同じ手順で試験 Worker を更新する。

## GitHub Actions での事前確認と閉鎖状態のデプロイ

ワークフローは **BGS AI pilot Cloudflare release**（`.github/workflows/bgs-ai-deploy.yml`）。登録後は `main` を選んだ運営者の `workflow_dispatch` で実行する。PR の **BGS AI pilot checks** はテストとドライランを行う。Cloudflare の認証情報は手動ワークフローの最後のステップだけに渡し、標準ランナーで実行する。 [GitHub Actions 手動実行](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow) ／ [Cloudflare の GitHub Actions 手順](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/)

1. 運営者が PR #148 を確認し、承認した後に `main` へ取り込む。GitHub の仕様上、初めて追加する手動ワークフローはデフォルトブランチに存在する必要がある。取り込み時点では手動ワークフローが登録される。
2. **Actions → BGS AI pilot Cloudflare release → Run workflow** を開き、`main` と `preflight` を選ぶ。既存の Repository Secrets `CLOUDFLARE_API_TOKEN` と `CLOUDFLARE_ACCOUNT_ID` で対象 Worker を読み取る。`GEMINI_API_KEY` の Secret 登録、試験用 Secret の有無、`workers.dev` とプレビュー URL の状態を確認する。Cloudflare のレスポンス本文や認証情報をログ・成果物に残さない。この確認でデプロイ、Secret の変更、Gemini への送信は行われない。
3. 閉鎖状態でのデプロイが承認されたら、Cloudflare ダッシュボードで Workers Free、対象 Worker の **Settings → Domains & Routes**、既存バインディングと Durable Object 移行の有無を確認する。カスタムドメインや追加のルートが見つかった場合は影響を確認する。`workers.dev` とプレビュー URL が有効な場合は、運営者が承認済みの閉鎖を反映してから再度 `preflight` を実行する。
4. 確認後、同じ画面で `deploy` を選び、Workers Free とルート・ドメインがないことの確認欄をオンにする。Wrangler は既存 Worker に初回設定を反映し、Secret は継承する。実行後に再び URL の閉鎖と既存 Secret 名の保持を照合する。閉鎖状態でもバージョンと SQLite Durable Object の構成は反映される。回答と外部 URL の有効化は別の承認事項。

事前確認には、対象アカウント・Worker の Secret メタデータと URL を読める Workers 権限が必要。Cloudflare API は `Workers Scripts Read` または同等のスコープを受け付ける。デプロイには同じ対象への `Workers Scripts Write`（ダッシュボードでは Workers Scripts の Edit）または同等の権限が必要。401・403 の場合は、トークンの期限と対象アカウントのスコープを確認する。カスタムドメインの有無とアカウントの契約プランは管理画面で確認する。 [Secret 名の一覧 API](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/secrets/methods/list/) ／ [Worker 更新 API](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/methods/update/) ／ [Secret の継承](https://developers.cloudflare.com/workers/wrangler/configuration/#source-of-truth)

## 別途承認後の試験有効化

運営者が AI Studio の Default Gemini Project で Free と請求先未リンクを確認した。11月25日に報告された上限は次のとおり。

| モデル | RPM | TPM | RPD | 用途 |
| --- | ---: | ---: | ---: | --- |
| Gemini 3.8 Flash | 5 | 250,000 | 20 | 試験採用。独自上限は毎分3回・毎日20回 |
| Gemini 4 Hydrogen | 5 | 250,000 | 20 | 将来の比較候補 |
| Gemini 3.6 Flash | 5 | 250,000 | 20 | 確認値の記録 |
| Gemini 3.5 Flash Lite | 15 | 250,000 | 500 | 将来の比較候補 |
| Gemini 3.1 Flash Lite | 15 | 250,000 | 500 | 比較基準 |

1. 両 Secret の存在を preflight で確認し、手動の `open-private` で運営者用 URL を開く。推論・プレビューは停止したまま、4つのルートで匿名拒否を照合する。URL は Cloudflare の対象 Worker の **Settings → Domains & Routes** で確認できる。任意の `url_public_key` を指定した場合は受取人の RSA 公開鍵で URL だけを暗号化して返す。
2. 日本国内の回線から iPad の Safari で HTTPS の試験 URL を開き、ユーザー名 `editor` とパスワードアプリに保存した試験用パスワードでログインする。停止中に質問を送ると受付停止が表示される。手動の `close-private` で URL も閉じる。
3. 推論には、登録した Gemini キーが確認済みの無料プロジェクトに属する証拠が必要。Cloudflare では Secret の値を再表示できない。所属を特定できない場合、運営者が AI Studio で対象プロジェクトを明示してキーを発行し、Cloudflare の既存 `GEMINI_API_KEY` を管理画面でそのキーに更新する。値はチャットや作業記録に貼らず、所属確認と更新完了のみ報告する。
4. 2026年11月25日、運営者が Default Gemini Project で発行したキーへの更新と請求先未リンクを確認。Actions で `enable-inference` を選び、Cloudflare と Gemini の無料条件の確認欄をオンにする。既存の保護された URL で匿名拒否を先に確認し、3.8 Flash の確認済み上限で有効化する。稼働後は下記の日英の回答、出典、上限を検証する。

## 有効化後の確認と停止

- 日本語「ホテル・ハイタワーの見学ツアーはいつ始まりましたか？」と英語「Why did the gods get angry at Raging Spirits?」で、回答の根拠、翻訳、リンク先の章を確認する。
- 「野獣が呪いをかけられた年齢は？」は記事の考察として扱い、正確な年齢を断定しない。「ハイタワー三世が翌朝見つかった港はどこですか？」は根拠不足として扱う。モデルの信頼性を判断するため、固有名詞の別表記でも試す。
- 実 API を使った動作確認では、1日の独自上限を意図的に小さくして消費できるよう、`AI_STUDIO_RPD` を確認済みの上限以下の小さい値に下げる。上限後の画面、モックで確認済みの上流429での停止、Workers の CPU 使用時間とエラー状況を区別して記録する。本番の無料枠を意図して使い切る必要はない。
- 推論だけを止めるには手動操作 `open-private` を実行する。試験画面への入口も閉じるには `workers_dev: false` に戻す。試験トークンが漏れた場合は再発行する。GitHub Pages に変更を反映する操作はこの手順に含まれない。

## 質問送信時の診断

運営者用画面では、失敗した段階を括弧内に表示する。GEMINI_HTTP と数字は上流のHTTPステータス。GEMINI_200_MAX_TOKENS は生成打ち切り、GEMINI_JSON はJSON解析失敗、GEMINI_TIMEOUT は上流の待機期限、CLIENT_TIMEOUT はブラウザ側の期限を示す。CF_1102 はCloudflareエラーページにあるリソース超過コード。Workers FreeのCPU上限は1要求10 msで、外部通信の待機はCPU時間に含まれない。問い合わせ時は診断コードだけを共有する。 [Workers limits](https://developers.cloudflare.com/workers/platform/limits/)

認証済みの `/api/provider-check` は、保存済みキーを使って選択モデルのメタデータだけをGoogleから取得する。質問や生成指示を送らず、生成回数を消費しない。`provider_ok` ならキー、API、モデルIDの組み合わせは利用可能。403なら、APIの無効、キー制限、請求条件、地域、モデルアクセスを機密性のない分類コードで返す。Googleのエラー本文、キー、プロジェクト番号は返さない。
