# 概要

3rdPartyCookieのセットをlocalで確認するためのサンプルです。
hoge.comのCookieにfuga.comのCookieが確認できるようになります。

2023/9現在、Chromeでは確認できますが、Safariでは3rdPartyCookieが禁止されているため確認できません。
Chromeも2024年から段階的に禁止されるため、ゆくゆくはこのサンプルでもChromeで確認できなくなります。

# 準備

1. system1/npm install

2. system2/npm install

3. brew install mkcert

4. mkcert -install

5. system1のrootディレクトリにて、mkcert hoge.com

※system1のrootに-key.pemと.pemが作成されます。

6. system2のrootディレクトリにて、mkcert fuga.com

※system2のrootに-key.pemと.pemが作成されます。

7. hostsに以下を追記

```
# 3rdpartycookie test
127.0.0.1 hoge.com
127.0.0.1 fuga.com
```

# テスト手順

1. system1を起動

```
system1 % node index.js
Listening on 9999
```

2. system2を起動

```
system2 % node index.js
Listening on 7777
```

4. Chromeで「https://hoge.com:9999/」にアクセス


## 解説

`hoge.com` を一般的なwebシステム、 `hoge.com` を広告システムとして考えるとイメージしやすい
`hoge.com` から `https://fuga.com:7777/` が画面表示後に読み込まれ、fuga.comのscript内でCookieがセットされます。
これにより、hoge.comに3rdPartyであるfuga.comのCookieが確認できます。

3rdPartyCookieのセットには3rd側のCookieは `SameSite=None; Secure;` である必要あり、また、Secureがつくとhttpsでないと機能しません。
そのため、localhostでhttpsを実現するのにmkcertを使ってます。

localhostでさらに別ドメインんを実現するために、hostsでhoge.comとfuga.comを定義しています。
mkcertでhoge.comとfuga.comの証明書をそれぞれ用意しているというこにです。
