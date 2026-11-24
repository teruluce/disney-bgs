# BGS Chronicles 資料室（仮称） 非公開試験

確認日 2026-11-24（JST）

担当 Codex-BGS-20261124-9

## 試験の範囲

試験先は既存の Cloudflare Worker `bgs-chronicles-ai`。公開サイトは [GitHub Pages](https://teruluce.github.io/disney-bgs/) で配信し、試験画面は Worker の専用 URL で配信する。コミット済みの設定では `workers.dev` とプレビュー URL を無効にし、回答 API も停止する。試験用 URL の有効化と Gemini への実送信は運営者の承認後に行う。

Google の追加利用規約は開発者に18歳以上を求め、18歳未満を対象とするか、その利用が見込まれる API クライアントへの組み込みを制限している。一般読者に開く BGS Chronicles への Gemini 組み込みは見送る。開発目的の試験は、日本からアクセスする成人の運営者1名に限定する。EEA・スイス・英国で利用者に API クライアントを提供する場合は有料サービスが必須。 [Gemini API 追加利用規約](https://aistudio.google.com/docs/terms) ／ [提供地域](https://aistudio.google.com/docs/available-regions)

Gemini の無料サービスでは、Google が入力・出力をサービス改善に利用し、人が確認する場合がある。Worker は質問・回答を保存せず、ブラウザーは画面表示のためだけに保持する。Google 側の保存や二次利用も認めない運用条件なら、Gemini を有効にしない。送信対象は運営者が送信できる権利を確認した公開記事の短い抜粋と、個人情報を含まない質問に限る。 [無料サービスのデータ利用条件](https://aistudio.google.com/docs/terms#data-use-unpaid)

## 構成

1. `archive-order.json` の公開記事台帳から、`build.py` が記事本文の段落・リスト・表を抽出する。参照資料欄、引用ブロック、画像・キャプション、ナビゲーション、スクリプト、非表示要素は除外。正規 URL と章アンカーを記事 HTML と照合する。
2. `build-search.js` が日英の語・日本語の連続2文字・固有名詞の対訳を使い、Worker に同梱する検索データを生成する。検索は Worker 内で完結する。質問のたびにサイトを取得する処理、外部検索サービス、外部ベクトルデータベースは使わない。
3. Worker は日本の接続と試験用の認証を確認。質問は500文字、HTTP 本文は4 KiBまで。関連性のある抜粋を最大9件選び、質問と一緒に Gemini へ送る。モデルには候補 ID の選択と、英語の場合の翻訳を依頼する。記事や質問を命令として実行するツールは提供しない。
4. API 応答は型と候補 ID を確認し、最大3件を返す。日本語は選択された記事の文をそのまま表示し、英語は原文も確認できる。参照元 URL と分類はサーバーが付ける。公式資料と照合した箇所だけを `official-passages.json` に記録する。記事内の考察や不明を示す表現は索引の分類に反映し、ほかの箇所は「記事の記述」と表示する。根拠が足りない場合は回答を控える。
5. 単一の SQLite Durable Object が、全リクエストの利用回数・トークン予約・同時実行・上流429による停止を管理する。永続データはカウンター、時刻、処理中の予約 ID のみ。Worker の Observability は無効にし、キー、質問、回答、上流エラー本文をログへ出力しない。Gemini のキーは Worker Secret から取得し、Google 公式エンドポイントへの HTTPS ヘッダーにだけ使う。

認証には、試験専用に生成した32バイトのランダム値をパスワードにする HTTPS Basic 認証を使う。画面・CSS・JavaScript・API の各ルートに同じ認証がかかる。認証情報には通常のアカウントパスワードを使わず、運営者本人だけが保管する。API は同一オリジンの JSON POST のみ受け付ける。Worker のリージョン判定は接続元 IP に基づく。Cloudflare Zero Trust は Free の新規設定にも支払い情報登録を求めるため、試験の依存先から外した。 [Cloudflare One 初期設定](https://developers.cloudflare.com/cloudflare-one/setup/) ／ [workers.dev の Browser Integrity Check](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/)

英語の固有名詞・言い換えへの対応範囲は対訳辞書と記事中の英語表記に依存する。候補 ID の検証は、訳がすべて忠実であることや、選択文が質問に完全に答えることまでは保証できない。公式照合の対象は現時点で3箇所。その他の記事に公式由来の内容があっても、個別に照合するまでは「記事の記述」と表示する。

## 無料枠

| 対象 | 公表値・条件 | 試験設定 |
| --- | --- | --- |
| Gemini 3.1 Flash-Lite | Free の標準生成は入力・出力ともに無料。実効 RPM・TPM・RPD はプロジェクトとモデルに依存し、AI Studio に表示。RPD は米国太平洋時間の午前0時に更新。 | 状態未確認のため初期値は **0回**。確認後も、毎分は実効 RPM と3の小さい方、毎日は実効 RPD と20の小さい方。プロジェクトは試験専用とする。 |
| Cloudflare Workers Free | アカウント合計100,000リクエスト／日、毎日 UTC 00:00（JST 09:00）更新。CPU は10 ms／リクエスト。 | Worker は Free のまま使用。限度超過時は Cloudflare がリクエストを拒否。 |
| SQLite Durable Objects Free | 100,000リクエスト／日、13,000 GB秒／日、500万行読み取り／日、10万行書き込み／日、5 GB保存。 | 一つのオブジェクトだけに小さな利用枠カウンターを保存。 |

[Gemini モデル料金](https://aistudio.google.com/docs/pricing#gemini-3.1-flash-lite) ／ [Gemini の実効上限](https://aistudio.google.com/rate-limit) ／ [Gemini 上限の仕様](https://aistudio.google.com/docs/rate-limits#how-rate-limits-work) ／ [Workers 料金](https://developers.cloudflare.com/workers/platform/pricing/) ／ [Workers 制限](https://developers.cloudflare.com/workers/platform/limits/) ／ [Durable Objects 料金](https://developers.cloudflare.com/durable-objects/platform/pricing/) ／ [Cloudflare セルフサービス利用規約](https://www.cloudflare.com/terms/)

Gemini への入力予約は UTF-8 バイト数に固定の余裕を加えて算出し、1リクエストあたり最大8,400。入力予約の合計を直近60秒の TPM 以内に収める。TPD が表示される場合は入力予約と最大出力の両方を当日の上限に算入する。予約値はモデルのトークナイザーによる実測値と異なる。回答の上限は640出力トークン、同時推論は1件。429が返った場合は再試行せず、次の米国太平洋時間の午前0時まで受付停止。日本時間では夏時間の16時、標準時間の17時にあたる。Gemini 無料枠を超えて課金できないよう、対象 Google Cloud プロジェクトには請求先をリンクせず、Cloudflare は Workers Free を維持する。課金状態は API キーから確認できないため、この確認が済むまで稼働させない。 [Gemini API の課金設定](https://aistudio.google.com/docs/billing)

## Workers AI との比較

| 観点 | Gemini 3.1 Flash-Lite | Cloudflare Workers AI の候補 |
| --- | --- | --- |
| 無料枠 | Free プロジェクトのモデル別 RPM・TPM・RPD。実効値は AI Studio。 | Workers Free で10,000 Neurons／日。UTC 00:00 更新。超過時はエラー。 |
| 候補モデル | `gemini-3.1-flash-lite` を試験実装で使用。 | `@cf/google/gemma-4-26b-a4b-it`。入力1Mトークン9,091 Neurons、出力1Mトークン27,273 Neurons。入力2,500・出力640なら約40.18 Neurons／回、約248回／日の計算例。実数は使用トークンとアカウント内の共有利用量による。 |
| データ | 無料枠の入出力を製品改善に使用する場合がある。 | 通常のステートレス推論は原則として入出力を保持せず、学習に使わない。安全、セキュリティ、法律上の例外と運用メタデータの扱いあり。 |
| 一般公開の条件 | 未成年の利用が見込まれる公開サイトには採用しない。 | 調査した Workers AI 条件には Gemini と同文の制限は見当たらない。モデルのライセンス・利用方針、対象利用者とデータの扱い、日英の品質を公開の判断前に確認する。 |

Workers AI は比較のみ。モデル変更には運営者の承認が必要。 [Workers AI 料金](https://developers.cloudflare.com/workers-ai/platform/pricing/) ／ [Gemma 4 モデル仕様](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/) ／ [Workers AI のデータ利用](https://developers.cloudflare.com/workers-ai/platform/data-usage/) ／ [Gemma 利用規約](https://ai.google.dev/gemma/terms)

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

## 運営者による確認と、承認後の有効化

1. [Google AI Studio の Projects](https://aistudio.google.com/projects) で対象プロジェクトが Free であることを確認する。キーの属するプロジェクトを選び、請求先のリンクがないことと、他用途からの同時利用がないことも確認。 [Google AI Studio の Rate limits](https://aistudio.google.com/rate-limit) で `gemini-3.1-flash-lite` の RPM、TPM、RPD と、表示される場合は TPD を確認する。共有するのは上限の数値と Free であることだけで十分。API キーはチャットへ貼らない。
2. Cloudflare に GitHub でサインインし、Workers Free を確認。`Workers & Pages → bgs-chronicles-ai → Settings → Variables and Secrets` に `GEMINI_API_KEY` が Secret としてあるか、名前だけ確認する。CLI の場合は試験ディレクトリで `npx wrangler login` を実行し、ブラウザーで運営アカウントに認可した後、`npx wrangler whoami` と `npx wrangler secret list --name bgs-chronicles-ai` で確認する。既存キーの種類や利用可否は [Gemini API キーの公式手順](https://aistudio.google.com/docs/api-key) と照合する。
3. 承認後、対象 Worker の現行バージョン、公開ルート、既存の Durable Object 移行を確認する。初回反映時はリポジトリの `workers_dev: false`、`preview_urls: false`、`PILOT_ENABLED: "false"` の設定を使用する。既存の別用途のルートやバインディングが見つかった場合は、移行対象と影響を運営者に確認する。
4. `openssl rand -hex 32` で32バイトの試験専用トークンを手元で生成し、パスワード管理ツールに保管する。Cloudflare ダッシュボードで `PILOT_ACCESS_TOKEN` を Secret として登録する。CLI を使う場合は `npx wrangler secret put PILOT_ACCESS_TOKEN --name bgs-chronicles-ai` の非表示プロンプトで入力する。`GEMINI_API_KEY` が未登録または更新が必要な場合も同じ方式を使用する。Secret の変更は Worker のバージョンに反映されるため、受付停止中に行う。 [Workers Secret](https://developers.cloudflare.com/workers/configuration/secrets/)
5. `wrangler.jsonc` を同じディレクトリの非追跡ファイル `wrangler.trial.json` にコピーする。`workers_dev` を `true` にし、`preview_urls: false` と `PILOT_ENABLED: "false"` を維持する。`secrets.required` に `GEMINI_API_KEY` と `PILOT_ACCESS_TOKEN` を指定し、`npm run build` と `npx wrangler deploy --config wrangler.trial.json` を実行。シークレット値は構成ファイルへ記載しない。未認証アクセスが401、認証後でも質問 API が503となることを確認する。
6. 無料枠と公開記事の送信可否を確認できた段階で、同じ非追跡の設定の `vars` に `AI_STUDIO_RPM`、`AI_STUDIO_TPM`、`AI_STUDIO_RPD` を整数の文字列で追加する。対象モデルに TPD が表示される場合は `AI_STUDIO_TPD` も設定する。`FREE_TIER_VERIFIED: "true"` と `PILOT_ENABLED: "true"` にして同じ構成で再デプロイする。日本から Worker の専用 URL を開き、ユーザー名 `editor` と試験トークンで認証する。

## 有効化後の確認と停止

- 日本語「ホテル・ハイタワーの見学ツアーはいつ始まりましたか？」と英語「Why did the gods get angry at Raging Spirits?」で、回答の根拠、翻訳、リンク先の章を確認する。
- 「野獣が呪いをかけられた年齢は？」は記事の考察として扱い、正確な年齢を断定しない。「ハイタワー三世が翌朝見つかった港はどこですか？」は根拠不足として扱う。モデルの信頼性を判断するため、固有名詞の別表記でも試す。
- 実 API を使った動作確認では、1日の独自上限を意図的に小さくして消費できるよう、`AI_STUDIO_RPD` を確認済みの上限以下の小さい値に下げる。上限後の画面、モックで確認済みの上流429での停止、Workers の CPU 使用時間とエラー状況を区別して記録する。本番の無料枠を意図して使い切る必要はない。
- 試験を止めるときは `PILOT_ENABLED: "false"` で再デプロイする。試験画面への入口も閉じるには `workers_dev: false` に戻す。試験トークンが漏れた場合は再発行する。GitHub Pages に変更を反映する操作はこの手順に含まれない。
