% 二分探索 (2)

陽に配列を持つことができない場合でも，二分探索は適用できうる．

ある述語 $P$ に対して境界 $p$ があり，以下が成り立つ場合を考える．
- $P(x)$ holds, if $x \ge p$
- $P(x)$ does not hold, if $x < p$

このとき，$p$ を二分探索で求めることができる．
$P(x)$ が成り立たない十分小さい $x_{\text{LB}}$ と，$P(x)$ が成り立つ十分大きい $x_{\text{UB}}$ をとっておき，以下の手順を行う．

```c++
template <typename Tp, typename Predicate>
Tp partition_point(Tp lb, Tp ub, Predicate, pred) {
  while (ub-lb > 1) {
    Tp mid = (lb+ub) / 2;
    (!pred(mid)? lb: ub) = mid;
  }
  return ub;
}
```

これにより，$\log_2 (x_{\text{UB}}-x_{\text{LB}})+O(1)$ 回の $P$ の計算により境界を求めることができる．

---

実数でこの境界を求める場合，要求精度 $\varepsilon$ に対して $x_{\text{UB}}-x_{\text{LB}} > \varepsilon$ である限りループを回したくなるが，これは浮動小数点数の計算誤差でうまくいかないことが多い．

$x_{\text{UB}}$ と $x_{\text{LB}}$ の初期値の差を $\Delta x$ として，ループ回数を $\log_2 (\Delta x/\varepsilon)$ 回程度に決め打ちして繰り返すのがよいとされる．これは，$\Delta x = 10^{18}$, $\varepsilon = 10^9$ でも $90$ くらいである．

---

与えられた条件を満たす $x$ の最大値や最小値などを求めるときに使える．

- [ABC 023 D](https://atcoder.jp/contests/abc023/tasks/abc023_d)
- [ABC 026 D](https://atcoder.jp/contests/abc026/tasks/abc026_d)
- [ABC 034 D](https://atcoder.jp/contests/abc034/tasks/abc034_d)
