% セグメント木

モノイド $(T, \oplus)$ の配列 $a[0\ldots n-1]$ に対して，区間に対するクエリを処理できる．

---

基本的なものでは，$\oplus: T\times T\to T$ に対して以下の操作を $O(\log n)$ 回の演算で行える．

- $\mathtt{fold}(l, r)$
  - $a[l] \oplus a[l+1] \oplus \dots \oplus a[r-1]$ を計算する．
- $\mathtt{update}(i, x)$
  - $a[i] \gets x$ で更新する．

さらに，以下の性質を満たす $\circ: T\times E\to T$ および $\ast: E\times E\to E$ を考える．

- $(x\oplus y)\circ u = (x\circ u) \oplus (y\circ u)$
  - 分配法則が成り立つ．
- $(x\circ u)\circ v = x \circ (u\ast v)$
  - 作用素をまとめて作用させられる．
- $\ast$ の単位元 $e_{\ast}$ に対して $x\circ e_{\ast} = x$

このとき，以下の操作を $O(\log n)$ 回の演算で行える．

- $\mathtt{fold}(l, r)$
  - $a[l] \oplus a[l+1] \oplus \dots \oplus a[r-1]$ を計算する．
- $\mathtt{modify}(l, r, u)$
  - 各 $i \in [l, r)$ に対して $a[i]\gets a[i]\circ u$ で更新する．

---

実装については，図があるとわかりやすいはずなので，図を載せるとよい．

$\mathtt{ceil2}(2n)$ 個ではなく $2n$ 個の $T$ の要素を持ち，非再帰で行う実装の説明を載せる．

区間更新に対応する方はさらに $n$ 個の $E$ の要素を持つ．