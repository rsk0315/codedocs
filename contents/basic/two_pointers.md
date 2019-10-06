% 尺取り法

配列 $a[0\ldots n-1]$ と，その区間 $[i, j) \subseteq [0, n)$ に関する述語 $P$ があり，各 $i$ ($0 \le i < n$) に対して $P(i, j)$ が成り立つ最小の $j$ を求めることを考える（そうした $j$ が存在しない場合は $n$ とする）．

各 $i$ に対する答えを $j(i)$ と書く．

ただし，$P$ は次の性質を満たすとする．
- 各 $i$ について，以下が成り立つ $k$ が存在する．
  - $j < k$ について $P(i, j)$ は false．
  - $j \ge k$ について $P(i, j)$ は true．
- $i < i'$ のとき $j(i) \le j(i')$．

$i$ の昇順に求めることを考える．
$j(i)$ を求めた後，$j(i+1)$ を求めるときは $[j(i), n]$ から探せばよい．
$i$, $j$ は各々たかだか $n+1$ 回しか移動しないので，たかだか $2n+1$ 回の $P$ の計算で各 $j(i)$ を求められる．

実装は次のようになる．
```c++
template <typename Sequence, typename OutputIt>
OutputIt partition_points(Sequence sq, OutputIt d_first) {
  sq.initialize();
  for (size_type i = 0; i < sq.size(); ++i) {
    while (sq.end_index() < sq.size() && !sq.pred()) sq.push();
    *d_first++ = sq.end_index();
    if (i+1 < sq.size()) sq.pop();
  }
  return d_first;
}
```

ここで，各 `sq` のメンバ関数には以下を期待している．
- `initialize()`: 添字を $[0, 0)$ に初期化する．
- `size()`: $n$ を返す．
- `end_index()`: 区間の右端の添字を返す．
- `pred()`: 現在の区間 $[i, j)$ での $P(i, j)$ を返す．
- `push()`: 区間の右端を一つ伸ばす（進める）．
- `pop()`: 区間の左端を一つ縮める（進める）．
  - ただし，区間が空の場合は右端も進める．

---

上の方法は，条件を満たす最大の区間を求めているのに相当しているが，右端を固定して左端をできるだけ進めることにすると．最小の区間を求めるのに対応する．