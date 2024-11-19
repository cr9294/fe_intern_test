// 生成数据源
const source = (() => {
  const weathers = ['Sunny', 'Rainy', 'Cloudy'];  // 定义天气类型数组
  const source = [];  // 初始化数据源数组
  const now = Date.now();  // 获取当前时间戳
  const ONE_DAY = 86400_000;  // 一天的毫秒数
  const startTime = now - (now % ONE_DAY);  // 计算今天的零点时间戳
  for (let i = 0; i < 20; i++) {  // 生成20条数据
    const weatherIndex = Math.floor((Math.random() * 100) % weathers.length);  // 随机选择天气类型
    source.push({
      time: startTime + ONE_DAY * i,  // 计算每一天的时间戳
      weather: weathers[weatherIndex],  // 选择随机的天气类型
      temperature: 10 + (Math.floor(Math.random() * 100) % 10),  // 随机生成10到19度的温度
    });
  }
  return source;  // 返回生成的数据源
})();

// 1. 温度变化趋势
const temperatureLabels = source.map(item => new Date(item.time).toLocaleDateString());  // 格式化每个时间点为日期标签
const temperatureData = source.map(item => item.temperature);  // 提取每个数据点的温度

// 获取canvas元素
const temperatureCanvas = document.getElementById('temperatureChart').getContext('2d');

// 创建温度变化趋势图
const temperatureChart = new Chart(temperatureCanvas, {
  type: 'line',  // 图表类型为折线图
  data: {
    labels: temperatureLabels,  // 横轴标签：日期
    datasets: [{
      label: 'Temperature (°C)',  // 数据集标签：温度（°C）
      data: temperatureData,  // 数据集：温度值
      fill: false,  // 不填充折线图区域
      borderColor: 'rgb(91,235,207)',  // 折线颜色
      tension: 0.1  // 设置曲线的平滑度
    }]
  },
  options: {
    maintainAspectRatio: false,  // 不保持宽高比，使用固定大小
    scales: {
      x: {
        title: {
          display: true,  // 显示横轴标题
          text: 'Date'  // 横轴标题：日期
        },
        ticks: {
          maxRotation: 0,  // 避免x轴标签旋转，防止重叠
          autoSkip: true,  // 自动跳过标签，避免拥挤
        }
      },
      y: {
        title: {
          display: true,  // 显示纵轴标题
          text: 'Temperature (°C)'  // 纵轴标题：温度（°C）
        }
      }
    }
  }
});

// 2. 天气分布情况
const weatherCounts = {
  Sunny: 0,  // 初始化晴天计数
  Rainy: 0,  // 初始化雨天计数
  Cloudy: 0  // 初始化多云天计数
};

// 统计每种天气出现的次数
source.forEach(item => {
  weatherCounts[item.weather]++;  // 根据天气类型更新计数
});

// 获取canvas元素
const weatherCanvas = document.getElementById('weatherChart').getContext('2d');

// 创建天气分布饼图
const weatherChart = new Chart(weatherCanvas, {
  type: 'pie',  // 图表类型为饼图
  data: {
    labels: Object.keys(weatherCounts),  // 饼图的标签：天气类型
    datasets: [{
      data: Object.values(weatherCounts),  // 饼图的数据：每种天气出现的次数
      backgroundColor: ['#f6ed76', '#7dbcef', '#f28989'],  // 设置不同天气类型的饼图颜色
    }]
  },
  options: {
    maintainAspectRatio: false,  // 不保持宽高比，使用固定大小
    plugins: {
      legend: {
        position: 'top',  // 设置图例位置在顶部
      }
    }
  }
});
