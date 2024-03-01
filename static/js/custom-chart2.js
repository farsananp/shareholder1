var options = {
    series: [40],
    chart: {
        height: 120,
        width: 100,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '40%',
      },
      dataLabels: {
        name: {
            offsetY: -10,
            color: "#4b9bfa",
            fontSize: "10px",
            show: false
        },
        value: {
            offsetY: 5,
            color: "#4b9bfa",
            fontSize: "12px",
            show: true,
            fontWeight: 800
        }
    }
    },
  },
  labels: ['Cricket'],
  };

  var chart11 = new ApexCharts(document.querySelector("#canvas-11"), options);
  chart11.render();

  var options = {
    series: [10],
    chart: {
        height: 120,
        width: 100,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '10%',
      },
      dataLabels: {
        name: {
            offsetY: -10,
            color: "#4b9bfa",
            fontSize: "10px",
            show: false
        },
        value: {
            offsetY: 5,
            color: "#4b9bfa",
            fontSize: "12px",
            show: true,
            fontWeight: 800
        }
    }
    },
  },
  labels: ['Cricket'],
  };

  var chart11 = new ApexCharts(document.querySelector("#canvas-12"), options);
  chart11.render();


  var options = {
    series: [30],
    colors: ["#FF6384"],
    chart: {
        height: 120,
        width: 100,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '30%',
      },
      dataLabels: {
        name: {
            offsetY: -10,
            color: "#FF6384",
            fontSize: "10px",
            show: false
        },
        value: {
            offsetY: 5,
            color: "#FF6384",
            fontSize: "12px",
            show: true,
            fontWeight: 800
        }
    }
    },
  },
  labels: ['Cricket'],
  };

  var chart13 = new ApexCharts(document.querySelector("#canvas-13"), options);
  chart13.render();
  var chart14 = new ApexCharts(document.querySelector("#canvas-14"), options);
  chart14.render();
// document.querySelector("#canvas-11").innerHTML = ""
// var chart5 = new ApexCharts(document.querySelector("#canvas-11"), options);
// chart5.render();