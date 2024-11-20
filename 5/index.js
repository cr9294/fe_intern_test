// Question 5 (Optional)
// 请以 source 为数据源, 用一些合适的可视化图表来分析这些数据
// , 如变化趋势, 分布情况等,
// , 可以选择你熟悉的图表库实现

// 生成数据源
const source = (() => {
  const weathers = ['Sunny', 'Rainy', 'Cloudy'];
  const source = [];
  const now = Date.now();
  const ONE_DAY = 86400_000;
  const startTime = now - (now % ONE_DAY);
  for (let i = 0; i < 20; i++) {
    const weatherIndex = Math.floor((Math.random() * 100) % weathers.length);
    source.push({
      time: startTime + ONE_DAY * i,
      weather: weathers[weatherIndex],
      temperature: 10 + (Math.floor(Math.random() * 100) % 10),
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
  type: 'line',
  data: {
    labels: temperatureLabels,  // 横轴标签：日期
    datasets: [{
      label: 'Temperature (°C)',
      data: temperatureData,
      fill: false,
      borderColor: 'rgb(91,235,207)',
      tension: 0.1
    }]
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
        }
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)'
        }
      }
    }
  }
});

// 2. 天气分布情况
const weatherCounts = {
  Sunny: 0,
  Rainy: 0,
  Cloudy: 0
};

// 统计每种天气出现的次数
source.forEach(item => {
  weatherCounts[item.weather]++;  // 根据天气类型更新计数
});

// 获取canvas元素
const weatherCanvas = document.getElementById('weatherChart').getContext('2d');

// 创建天气分布饼图
const weatherChart = new Chart(weatherCanvas, {
  type: 'pie',
  data: {
    labels: Object.keys(weatherCounts),
    datasets: [{
      data: Object.values(weatherCounts),  // 饼图的数据：每种天气出现的次数
      backgroundColor: ['#f6ed76', '#7dbcef', '#f28989'],
    }]
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  }
});
