% いもす法

名称は [@imos](https://twitter.com/imos) に由来する．

配列 $a[0\ldots n-1]$ があり，まず $1 \le j \le m$ に対して以下の処理を行う．
$$ a_i \gets a_i + x_j\text{ for }l_j\le i<r_j. $$
ただし $0\le l_j<r_j\le n$ とする．この処理の後，$1 \le j \le m'$ に対して $a_{k_j}$ の値を求める．
これは，愚直に行うと最悪 $O(nm+m')$ 時間かかる．

まず，前半の処理において，$a_i-a_{i-1}$ の値が変わるのは $i \in \{l_j, r_j\}$ のみであることに注目する．そこで，一旦 $a'[0\ldots n]$ を考え，以下のように定義する．
- $a_0' = a_0$
- $a_i' = a_i-a_{i-1}$ for $0 < i < n$

仮想的に $a[n] = 0$ と考えることで，$r_j = n$ の場合の処理を楽に済ませられる．
$a_i$ の $[l_j, r_j)$ の各要素に対して処理する代わりに以下の処理を行う．
- $a_{l_j}' \gets a_{l_j}' + x$
- $a_{r_j}' \gets a_{r_j}' - x$

ここで，以下の式が成り立つことに注目する．
$$ \sum_{k=0}^i a_k' = a_0 + (a_1-a_0) + \cdots + (a_i-a_{i-1}) = a_i. $$
すなわち，累積和の手法を用いることで $a_i$ を求めることができる．

実装する際は，以下のように配列を使い回すことができる．
```c++
std::vector<value_type> a(n+1);
for (size_type j = 0; j < m; ++j) {
  a[l[j]] += x[j];
  a[r[j]] -= x[j];
}
// a[n] is no longer accessed
for (size_type i = 1; i < n; ++i) {
  a[i] += a[i-1];
}
```

全体の計算時間は $O(n+m+m')$ である．
