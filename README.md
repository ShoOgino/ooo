# ホームページ作成
## 報酬
- 自分の知識や経験を大勢に公開するためのシステムを得る
    - 自己紹介の場
    - 人に貢献する
    - 人との繋がりを得る
- web関連技術の勉強
- 目的志向の訓練
- プログラミングの訓練
- デザインの訓練
## 完了条件
### 要件
- 機能
    - ロジック
        - 高速
        - 履歴表示可能
    - ビュー
        - UIがシンプル
        - ダークモード
    - 管理
        - 記事の管理(CRUD)が簡単
        - デプロイが簡単
### 最適化条件
- [システム構築](../20200523_184744/readme.md)に準ずる
## 実装
### タイトル
- Objective Oriented Optimizer
### サーバ
- Webarena indigo VPS(CPU2u, mem2GB, SSD40GB, 700円/月)
### デザイン
- タイトルバーに
    - タイトル
    - 電気のスイッチ
- タイトルの横に電気のスイッチのデザインをおいて、それでライトモード・ダークモードを切り替える。
- タイトルバーは下スクロールで消える。上スクロールで出てくる。
- 検索バーは要らない。記事数も少ないし、googleでタイトルと組み合わせて検索できる。
### ロジック
- SSG: next.js
- ルーティング: next.js
- デザイン/レイアウト: react
    - mdをhtml形式に変換:react-markdown
- バージョン管理: git
- コメント機能: utterances
- フレームワーク
    - node.js
    - next.js
        - react
    - typescript
- ディレクトリ構成
    - node_modules/
    - components/
    - features/
    - pages/
        - index.tsx
            - id: ファイル名
            - タイトル: mdのh1から取得
            - 配信日時: ファイル生成時刻(gitを利用)
            - 更新回数: ファイル変更回数(gitを利用)
        - article.tsx (id, ver)
            - mdファイルをhtmlに変換して表示
            - utteranceでコメント欄をつくる。
    - public/
        - yyyymmdd_hhmmss.${extension}
        - yyyymmdd_hhmmss.md
            - 中身は普通のmd
    - readme.md
- 記事更新
    - publicフォルダ以下でmdファイルをCRUD → githubへpush → サーバ側でdocker build + docker run(コンテナ起動時にgithubから記事をpullしてくる)
- デプロイ
    1. サーバを用意
        - インターネットにつながってて、ネットワーク設定可能
        - Dockerをインストール
    2. DNSサーバ設定
    3. git clone
    4. docker build -t nextjs-docker .
    5. docker run -p 80:80 nextjs-docker
