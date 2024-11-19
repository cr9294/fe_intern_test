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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // 如果响应状态码不是 2xx 范围内，抛出异常
        if (!response.ok) {
            // 可以根据需求进一步处理不同的 HTTP 状态码
            const errorData = await response.text(); // 使用 text() 而不是 json() 以防返回非 JSON 格式
            throw new Error(`HTTP Error: ${response.status} - ${errorData || 'Unknown error'}`);
        }

        // 检查响应是否为空，如果为空，直接返回空对象或者抛出异常
        const responseText = await response.text();
        if (!responseText) {
            throw new Error('Empty response body');
        }

        // 解析返回的 JSON 数据
        const responseData = JSON.parse(responseText);

        // 根据 code 判断是否成功，成功返回 data，否则抛出错误
        if (responseData.code === 200) {
            return responseData.data;
        } else {
            throw new Error(`API Error: ${responseData.message || 'Unknown error'}`);
        }
    } catch (error) {
        // 处理请求过程中可能出现的错误
        console.error('Request failed:', error);
        throw new Error(`Request failed: ${error.message}`);
    }
}

post('https://example.com/apihttps://example.com/api', { key: 'value' })
    .then(data => {
        console.log('Request succeeded with data:', data);
    })
    .catch(error => {
        console.error('Request failed with error:', error.message);
    });

