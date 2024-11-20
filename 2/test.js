// post.test.js

// test.js
const { post } = require('./index');  // 用 require 替代 import
const fetchMock = require('jest-fetch-mock');  // 用 require 替代 import

fetchMock.enableMocks();

describe('post function tests', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should return data on successful request', async () => {
    const mockApi = 'https://api.example.com/data';
    const requestData = { key: 'value' };
    const mockResponse = { code: 200, data: { result: 'success' } };

    // 模拟 fetch 成功的响应
    fetchMock.mockResponseOnce(
      JSON.stringify(mockResponse),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

    const result = await post(mockApi, requestData);
    expect(result).toEqual(mockResponse.data);
    expect(fetchMock).toHaveBeenCalledWith(
      mockApi,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(requestData),
      })
    );
  });

  it('should throw an error when the response code is not 200', async () => {
    const mockApi = 'https://api.example.com/data';
    const requestData = { key: 'value' };
    const mockResponse = { code: 400, message: 'Bad Request' };

    // 模拟 fetch 成功的响应，但返回 400 状态
    fetchMock.mockResponseOnce(
      JSON.stringify(mockResponse),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );

     await expect(post(mockApi, requestData)).rejects.toThrow(
    'Request failed: HTTP Error: 400 - {"code":400,"message":"Bad Request"}'
  );
  });

  it('should throw an error if the response status is not OK', async () => {
    const mockApi = 'https://api.example.com/data';
    const requestData = { key: 'value' };

    // 模拟 fetch 返回非 2xx 状态码
    fetchMock.mockResponseOnce('', { status: 500 });

    await expect(post(mockApi, requestData)).rejects.toThrow('HTTP Error: 500 - Unknown error');
  });

  it('should throw an error if response body is empty', async () => {
    const mockApi = 'https://api.example.com/data';
    const requestData = { key: 'value' };

    // 模拟 fetch 返回一个 200 状态，但返回空响应体
    fetchMock.mockResponseOnce('', { status: 200 });

    await expect(post(mockApi, requestData)).rejects.toThrow('Empty response body');
  });

  it('should handle network errors gracefully', async () => {
    const mockApi = 'https://api.example.com/data';
    const requestData = { key: 'value' };

    // 模拟网络错误，fetch 会抛出异常
    fetchMock.mockRejectOnce(new Error('Network Error'));

    await expect(post(mockApi, requestData)).rejects.toThrow('Request failed: Network Error');
  });
});
