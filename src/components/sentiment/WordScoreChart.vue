<script setup>
import { computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import VChart from 'vue-echarts';

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent]);

const props = defineProps({
  wordScores: { type: Array, required: true },
});
const chartWidth = computed(() => `${Math.max(280, props.wordScores.length * 58)}px`);
const chartOption = computed(() => ({
  animationDuration: 350,
  grid: { left: 42, right: 22, top: 24, bottom: 65, containLabel: true },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    confine: true,
    renderMode: 'richText',
  },
  xAxis: {
    type: 'category',
    data: props.wordScores.map(({ word }) => word),
    axisTick: { show: false },
    axisLine: { lineStyle: { color: '#dfe5e1' } },
    axisLabel: {
      color: '#66756c',
      interval: 0,
      rotate: 35,
      width: 85,
      overflow: 'truncate',
    },
  },
  yAxis: {
    type: 'value',
    minInterval: 1,
    axisLabel: { color: '#66756c' },
    splitLine: { lineStyle: { color: '#edf0ed', type: 'dashed' } },
  },
  series: [{
    type: 'bar',
    barMaxWidth: 40,
    label: { show: true, position: 'top', color: '#526159' },
    data: props.wordScores.map(({ score }) => ({
      value: score,
      itemStyle: { color: score > 0 ? '#3c8064' : '#cc7767', borderRadius: 5 },
    })),
  }],
}));
</script>

<template>
  <div class="chart-scroll">
    <VChart
      class="chart"
      :style="{ minWidth: chartWidth }"
      :option="chartOption"
      autoresize
      role="img"
      aria-label="Bar chart showing sentiment scores for detected words"
    />
  </div>
</template>

<style scoped>
.chart-scroll {
  overflow-x: auto;
  margin-top: 15px;
}

.chart {
  height: 285px;
}
</style>
