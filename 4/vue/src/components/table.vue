<template>
  <div>
    <div>
      <label for="shape">Shape:</label>
      <select v-model="filters.shape">
        <option value="">All</option>
        <option value="Circle">Circle</option>
        <option value="Triangle">Triangle</option>
        <option value="Square">Square</option>
      </select>

      <label for="color">Color:</label>
      <select v-model="filters.color">
        <option value="">All</option>
        <option value="White">White</option>
        <option value="Black">Black</option>
        <option value="Blue">Blue</option>
        <option value="Red">Red</option>
      </select>
    </div>

    <table>
      <thead>
        <tr>
          <th @click="sortTable('shape')">Shape</th>
          <th @click="sortTable('color')">Color</th>
          <th @click="sortTable('area')">Area</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData" :key="item.id">
          <td>{{ item.shape }}</td>
          <td>{{ item.color }}</td>
          <td>{{ item.area }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        shape: '',
        color: ''
      },
      sortKey: 'area',
      sortAsc: true,
      data: (() => {
        const shapes = ['Circle', 'Triangle', 'Square'];
        const colors = ['White', 'Black', 'Blue', 'Red'];
        const source = [];
        for (let i = 0; i < 100; i++) {
          const shapeIndex = Math.floor(Math.random() * shapes.length);
          const colorIndex = Math.floor(Math.random() * colors.length);
          source.push({
            id: i,
            shape: shapes[shapeIndex],
            color: colors[colorIndex],
            area: Math.floor(Math.random() * 100)
          });
        }
        return source;
      })()
    };
  },
  computed: {
    filteredData() {
      let filtered = this.data;

      // 筛选数据
      if (this.filters.shape) {
        filtered = filtered.filter(item => item.shape === this.filters.shape);
      }
      if (this.filters.color) {
        filtered = filtered.filter(item => item.color === this.filters.color);
      }

      // 排序数据
      return filtered.sort((a, b) => {
        if (this.sortAsc) {
          return a[this.sortKey] > b[this.sortKey] ? 1 : -1;
        } else {
          return a[this.sortKey] < b[this.sortKey] ? 1 : -1;
        }
      });
    }
  },
  methods: {
    sortTable(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}
th {
  cursor: pointer;
}
select {
  margin-bottom: 10px;
}
</style>
