// Question 3
// 请实现一个 batch 函数, 来实现一组异步操作的并发
// , 在全部操作完成后, 分别打印成功的操作结果和失败的操作结果

/**
 * @param {(() => Promise<any>)[]} asyncActions
 */
async function batch(asyncActions) {
  // 用于存储成功和失败的结果
  const results = {
    success: [],
    failure: []
  };

  // 使用 Promise.allSettled 来等待所有异步操作完成，无论是成功还是失败
  const promises = asyncActions.map(action =>
    action().then(
      result => {
        results.success.push(result); // 如果成功，保存结果到 success 数组
      },
      error => {
        results.failure.push(error); // 如果失败，保存错误信息到 failure 数组
      }
    )
  );

  // 等待所有 Promise 都完成
  await Promise.allSettled(promises);

  // 打印成功的结果
  console.log('成功的操作结果:', results.success);

  // 打印失败的操作结果
  console.log('失败的操作结果:', results.failure);
}



// 测试数据: 一组异步操作（成功和失败的组合）

// 模拟异步操作
const asyncActions = [
  // 成功的操作
  () => new Promise(resolve => setTimeout(() => resolve("操作 1 成功"), 1000)),

  // 失败的操作
  () => new Promise((_, reject) => setTimeout(() => reject("操作 2 失败"), 1500)),

  // 成功的操作
  () => new Promise(resolve => setTimeout(() => resolve("操作 3 成功"), 500)),

  // 失败的操作
  () => new Promise((_, reject) => setTimeout(() => reject("操作 4 失败"), 2000))
];

// 执行批处理函数
batch(asyncActions);

