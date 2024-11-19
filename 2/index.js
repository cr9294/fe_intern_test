// Question 2
// 有一个 http service, 接收 POST 请求
// , Request & Response 的 ContentType 均为 `application/json`
// , 请求成功时, service 返回结构为 `{ code: number, data: any }`, 其中 code = 200
// , 请求失败时, service 返回结构为 `{ code: number, message: string }`
// , 请用 fetch 简单封装一个适配该 http service 的 post 函数
// , 以一致地处理成功返回和常见 HTTP 状态码异常

// 提示: 客户端需要考虑请求不一定能到达 http service 的情况

/**
 * @param {string} api service api 地址
 * @param {any} data 请求内容
 */
async function post(api, data) {
  try {
    // 发起 POST 请求
    const response = await fetch(api, {
      method: 'POST', // 使用 POST 方法
      headers: {
        'Content-Type': 'application/json', // 请求头设置为 JSON 格式
      },
      body: JSON.stringify(data), // 请求体将数据转换为 JSON 字符串
    });

    // 检查 HTTP 响应状态码是否为 2xx 以外的值
    if (!response.ok) {
      const errorResponse = await response.json(); // 如果不是 2xx，解析响应体中的错误信息
      throw new Error(errorResponse.message || `HTTP 错误！状态码: ${response.status}`); // 抛出错误
    }

    // 解析成功的响应内容
    const result = await response.json();

    // 如果服务端返回的 code 是 200，则表示成功，返回数据部分
    if (result.code === 200) {
      return result.data;
    } else {
      // 如果 code 不是 200，说明发生了业务错误，抛出错误信息
      throw new Error(`错误: ${result.message}`);
    }
  } catch (error) {
    // 捕获请求过程中可能出现的网络错误、超时等异常
    console.error('请求失败:', error.message);
    throw error; // 将错误重新抛出，方便调用者处理
  }
}

