import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

function D3JS(props) {
  const [data, setdata] = useState([]);
  
  const { outerRadius = 170, innerRadius = 100 } = props;

  const width = 2*outerRadius;
  const height = 2*outerRadius;

  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateWarm)
    .domain([0, data.length]);

  useEffect(() => {
    if(data.length === 0){
      var data1=[];
      axios.get("http://localhost:4000/budget").then((res) => {
        for (var i = 0; i < res.data.myBudget.length; i++) {
          data1.push({ label: res.data.myBudget[i].title, value: res.data.myBudget[i].budget });
        }
        setdata(data1);
        drawChart();
      });
    }else{
      drawChart();
    }
  });

  function drawChart() {
    
    d3.select("#d3js-container").select("svg").remove();

    const svg = d3
      .select("#d3js-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");
    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const color = d3
      .scaleOrdinal()
      .range(['#ffcd56','#ff6384','#36a2eb','#fd6b19','#1A5276','#1ABC9C','#BB8FCE','#7B7D7D']);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.value);

    const arc = svg.selectAll().data(pieGenerator(data)).enter();

    arc
      .append("path")
      .attr("d", arcGenerator)
      .style('fill', (d) => color(d.data.value));

    arc
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text((d) => d.data.label)
      .style("fill", (_, i) => colorScale(data.length - 75*i))
      .attr("transform", (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
  }

  return <div id="d3js-container"/>;
}

export default D3JS;