// Question 1
// 有一组符合 `A-B-C.D` 模式的字符串数组
// , 请实现以 `A > D > C > B` 的权重排序的函数
// , 比较函数分别为 `compareA`, `compareB`, `compareC`, `compareD`
// , 可以用尽可能多的方式实现它

// 提示: 可参考 `Array.prototype.toSorted`, `Array.prototype.sort` 方法

/**
 * @param {string[]} array
 * @param {object} comparators
 * @param {(a1: string, a2: string) => number} comparators.compareA
 * @param {(b1: string, b2: string) => number} comparators.compareB
 * @param {(c1: string, c2: string) => number} comparators.compareC
 * @param {(d1: string, d2: string) => number} comparators.compareD
 * @returns {string[]} outputArray
 */
function sort(array, { compareA, compareB, compareC, compareD }) {}
