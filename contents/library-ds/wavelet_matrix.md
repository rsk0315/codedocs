% ウェーブレット行列

$\sigma$ 以下の整数の配列 $a[0\ldots n-1]$ に対して，いろいろなクエリを処理できる．
ただし静的データ構造で，最初に構築した後は変更できない．空間計算量は $O(n\log\sigma)$ bits のはず．
本来は $n\log\sigma+o(n\log\sigma)$ bits？

$O(\log n)$ 倍だけ遅くすることを許せば動的にもできる．

---

以下の基本操作が $O(\log\sigma\cdot\log\log n)$ 時間で処理できる．本来は $\log\log n$ の項はなくせるはず．この項は bitvector の `rank`, `select` の計算量に由来しており，本来これは $O(1)$ でできるため．
- $\mathtt{rank}(x, s, t)$
  - 区間 $[s, t)$ 内の $x$ の個数を返す．
- $\mathtt{select}(x, k, s)$
  - 区間 $[s, n)$ 内で $k$ 個目の $x$ の出現位置を返す．
  - $\mathtt{rank}(x, s, t) = n$ となる $t \ge s$ の最小値．

また，以下のクエリも同様の時間で処理できる．
- $\mathtt{quantile}(k, s, t)$
  - 区間 $[s, t)$ を昇順に並べたとき先頭から $k$ 番目にくる値を返す．
- $\mathtt{rank\\_3way}(x, s, t)$
  - 区間 $[s, t)$ のうち，$x$ 未満の要素の個数，$x$ の個数，$x$ より大きい要素の個数をまとめて返す．
- $\mathtt{xored\\_rank\\_3way}(x, y, s, t)$
  - 区間 $[s, t)$ のうちの要素 $a$ に対して $y$ と排他的論理和をとった値 $a\oplus y$ と $x$ を比較し，$\mathtt{rank\\_3way}$ 同様に個数を返す．
  - $\\{i\in[s, t)\mid (a_i\oplus y) \lesseqgtr x\\}$ の要素数を同時に返す．
- $\mathtt{min\\_greater}(x, s, t)$
  - 区間 $[s, t)$ の要素のうち，$x$ より大きい要素のうち最小の値を返す．
- $\mathtt{min\\_greater\\_equal}(x, s, t)$
  - 区間 $[s, t)$ の要素のうち，$x$ 以上の要素のうち最小の値を返す．
- $\mathtt{max\\_less}(x, s, t)$
  - 区間 $[s, t)$ の要素のうち，$x$ より小さい要素のうち最大の値を返す．
- $\mathtt{max\\_less\\_equal}(x, s, t)$
  - 区間 $[s, t)$ の要素のうち，$x$ 以下の要素のうち最大の値を返す．

さらに，以下のクエリについて $O(\log\sigma\cdot\log n\cdot\log\log n)$ 時間で処理できる．さすがに重い．もしかすると $\log n$ の項を落とせる？ できなさそう．上の演算を用いて二分探索して求めている．

- $\mathtt{select\\_greater}(x, k, s)$
  - 区間 $[s, t)$ のうち，$x$ より大きい要素の $k$ 個目の出現位置を返す．
- $\mathtt{select\\_greater\\_equal}(x, k, s)$
  - 区間 $[s, t)$ のうち，$x$ 以上の要素の $k$ 個目の出現位置を返す．
- $\mathtt{select\\_less}(x, k, s)$
  - 区間 $[s, t)$ のうち，$x$ より小さい要素の $k$ 個目の出現位置を返す．
- $\mathtt{select\\_less\\_equal}(x, k, s)$
  - 区間 $[s, t)$ のうち，$x$ 以下の要素の $k$ 個目の出現位置を返す．

## verify など

転倒数を言い換えなしで片付けられたりして便利．

- https://atcoder.jp/contests/chokudai_S001/tasks
- https://atcoder.jp/contests/agc005/tasks/agc005_b
- https://atcoder.jp/contests/abc140/tasks/abc140_e
- https://atcoder.jp/contests/abc019/tasks/abc019_3
  - unique の用途で $\mathtt{max\\_less}$ を verify．

## 設計に関して

$k$ 個や $k$ 個目というときは 1-indexed で，$k$ 番目というときは 0-indexed になっているはず．

引数については，値 $x$, $y$, 個数 $k$, 区間 $[s, t)$ の順に並んでいる．

`select` 系の関数には $t$ は渡さないほか，該当する値がないときは `-1` を返す．

`min_greater` 系の関数について，理想的には `std::optional` を返すべきだと思う．

```c++
template <size_t Nb, typename Tp = uintmax_t>
class wavelet_matrix;
```
- `Nb` はビット数で，$\lfloor\log_2\sigma\rfloor+1$ 以上である必要あり．
- `Tp` は $x$ などを表す型．符号なしがよい．