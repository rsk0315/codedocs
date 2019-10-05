% つくりかた

これはえびちゃん用のメモ．
これ以外もそうなんですけど．

# ディレクトリ構成
以下，`<xxx>` で書かれたものは適宜すきなように置き換える．

```
/
|- js/
|   |- constants.js
|
|- contents/
    |- index.json
    |- <parent>/
    |   |- .config
    |   |- <child>.md
    :   :
```

`.config` には以下のように記述しておく．
```
[INDEX]
title = <TITLE-PARENT>
```
記述できる内容は今後ふえるとうれしい．

`<child>.md` は以下の形式で記述しておく．
```
% <TITLE-CHILD>

<任意の内容>
```

`<parent>` や `<child>` は HTML 内部の `id` として使用される．

# ビルド

- `contents/` で `make` を実行
- `js/constants.js` の `TARGET` にディレクトリ名を追加

これにより，**\<TITLE-PARENT\>** で区切られた下に \<TITLE-CHILD\> の名前でパネルが作られる．
また，目次にも \<TITLE-PARENT\> が追加される．

表示順は，ジャンルは `js/constants.js` の `TARGET` に記述した順，ジャンル内の各パネルはファイル名の辞書順となる．

`make` は，タイトルを変更したときと，ファイルを追加したときに必要となる．
`<child>.md` の `<任意の内容>` を変更したときは実行し直さなくてよい．

# その他

- ファイル名順で並べるのはよくないかも．
- `js/constants.js` をいちいち変更するのは面倒そう．