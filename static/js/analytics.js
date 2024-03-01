var options = {
    series: [44, 55, 41, 17, 15],
    chart: {
    type: 'donut',
  },
  dataLabels: {
    enabled: false
  },
  labels: ["Electronics", "Vehicle", "Equipment", "Furniture", "Laptop"],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();


  var options = {
    series: [44, 55, 41, 17, 15],
    chart: {
    type: 'donut',
  },
  labels: ["Electronics", "Vehicle", "Equipment", "Furniture", "Laptop"],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };

  var chart = new ApexCharts(document.querySelector("#chart2"), options);
  chart.render();


  var options = {
    series: [{
    data: [30,1,20]
  }],
    chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Conference Hall','Training Room','Common Area'
    ],
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart3"), options);
  chart.render();

  
      
  var options = {
    series: [44, 55, 13, 43, 22],
    chart: {
    width: 380,
    type: 'pie',
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };

  var chart = new ApexCharts(document.querySelector("#chart4"), options);
  chart.render();