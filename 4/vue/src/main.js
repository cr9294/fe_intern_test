import { createApp } from 'vue';
import App from './App.vue';
import Table from './components/Table.vue';

const app = createApp(App);

// 注册 Table 组件
app.component('Table', Table);

app.mount('#app');
