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
function sort(array, { compareA, compareB, compareC, compareD }) {
  return array.sort((str1, str2) => {
    // 拆解字符串为 [A, B, C, D]
    const [a1, b1, c1, d1] = str1.split(/[-.]/);
    const [a2, b2, c2, d2] = str2.split(/[-.]/);

    // 比较 A 部分
    let result = compareA(a1, a2);
    if (result !== 0) return result;

    // 比较 D 部分
    result = compareD(d1, d2);
    if (result !== 0) return result;

    // 比较 C 部分
    result = compareC(c1, c2);
    if (result !== 0) return result;

    // 最后比较 B 部分
    return compareB(b1, b2);
  });
}

// 示例比较函数

// 数字比较函数
function compareNumber(a1, a2) {
  return Number(a1) - Number(a2); // 将字符串转为数字进行比较
}

// 字符串比较函数
function compareString(a1, a2) {
  if (a1 < a2) return -1;
  if (a1 > a2) return 1;
  return 0; // a1 === a2
}

// 使用不同的比较函数进行排序
const comparators = {
  compareA: compareNumber,
  compareB: compareString,
  compareC: compareNumber,
  compareD: compareNumber,
};

// 测试数据
const arr = [
  "10-5-2.1",  // A = 10, B = 5, C = 2, D = 1
  "10-5-3.2",  // A = 10, B = 5, C = 3, D = 2
  "10-4-3.1",  // A = 10, B = 4, C = 3, D = 1
  "9-5-2.0",   // A = 9, B = 5, C = 2, D = 0
  "8-5-2.1",   // A = 8, B = 5, C = 2, D = 1
  "10-3-3.0",  // A = 10, B = 3, C = 3, D = 0
  "8-5-3.2",   // A = 8, B = 5, C = 3, D = 2
  "9-4-2.5",   // A = 9, B = 4, C = 2, D = 5
  "9-4-3.0",   // A = 9, B = 4, C = 3, D = 0
  "9-3-2.3",   // A = 9, B = 3, C = 2, D = 3
];

// 调用排序函数
const sortedArray = sort(arr, comparators);
console.log(sortedArray);
//  `A > D > C > B` 的权重排序的函数



