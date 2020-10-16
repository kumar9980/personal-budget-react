import React,  { useEffect }  from 'react';
import Chart from 'chart.js';
import axios from 'axios';

function ChartJS() {

  var dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
            '#1A5276',
            '#1ABC9C',
            '#BB8FCE',
            '#7B7D7D'
        ],
      },
    ],
    labels: [],
};

useEffect(() => {
    axios.get('http://localhost:4000/budget').then((res)=>{
        for (var i = 0; i < res.data.myBudget.length; i++) {
          dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
          dataSource.labels[i] = res.data.myBudget[i].title;
        }
        console.log(res);
        console.log(dataSource);
        
        const ctx = document.getElementById("myChart");
        new Chart(ctx, {
        type: "pie",
        data: dataSource,
      });
    });
});  

  return (
    <canvas id="myChart" width = "50" height = "60"></canvas> 
  );
}

export default ChartJS;
