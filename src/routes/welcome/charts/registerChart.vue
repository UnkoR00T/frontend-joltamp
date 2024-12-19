<script setup lang="ts">
import * as d3 from 'd3'
import { watch } from 'vue'

const props = defineProps<{
  data: {
    Day: string;
    MessagesCount: number;
    RegisterCount: number;
    WebsocketConnectionCount: number;
  }[]
}>()

watch(props, () => drawChart())

const drawChart = () => {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Clear previous chart if any
  d3.select("#registerChart").selectAll("*").remove();

  const svg = d3.select("#registerChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);

  const y = d3.scaleLinear()
    .range([height, 0]);

  x.domain(props.data.map(d => d.Day));
  y.domain([0, d3.max(props.data, d => d.RegisterCount) || 0]);

  // Create a tooltip
  const tooltip = d3.select("#registerChart")
    .append("div")
    .style("position", "absolute")
    .style("background", "#fff")
    .style("color", "#000")
    .style("border", "1px solid #ccc")
    .style("padding", "5px")
    .style("border-radius", "4px")
    .style("box-shadow", "0px 0px 10px rgba(0, 0, 0, 0.1)")
    .style("visibility", "hidden");

  svg.selectAll(".bar")
    .data(props.data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.Day) || 0)
    .attr("width", x.bandwidth())
    .attr("y", d => y(d.RegisterCount) || 0)
    .attr("height", d => height - y(d.RegisterCount) || 0)
    .attr("fill", "#498467")
    // @ts-ignore
    .on("mouseover", (event, d) => {
      tooltip.style("visibility", "visible")
        .text(`Registrations: ${d.RegisterCount}`);
    })
    .on("mousemove", (event) => {
      tooltip.style("top", `${event.pageY - 20}px`)
        .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", () => {
      tooltip.style("visibility", "hidden");
    });

  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .call(d3.axisLeft(y));
};
</script>

<template>
  <div id="registerChart"></div>
</template>

<style scoped>
.bar {
  cursor: pointer;
}
</style>
