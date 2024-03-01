
        var options = {
            series: [
            // George Washington
            {
              name: 'In Store',
              data: [
                {
                  x: 'Status',
                  y: [
                    new Date(2023, 1, 30).getDate(),
                    new Date(2023, 2, 2).getDate()
                  ]
                },
              ]
            },
            // John Adams
            {
              name: 'In Use',
              data: [
                {
                  x: 'Status',
                  y: [
                    new Date(2023, 2,25).getDate(),
                    new Date(2023, 2, 30).getDate()
                  ]
                },
              ]
            },
            // // Thomas Jefferson
            // {
            //   name: 'Thomas Jefferson',
            //   data: [
            //     {
            //       x: 'President',
            //       y: [
            //         new Date(1801, 2, 4),
            //         new Date(1809, 2, 4)
            //       ]
            //     },
            //     {
            //       x: 'Vice President',
            //       y: [
            //         new Date(1797, 2, 4),
            //         new Date(1801, 2, 4)
            //       ]
            //     },
            //     {
            //       x: 'Secretary of State',
            //       y: [
            //         new Date(1790, 2, 22),
            //         new Date(1793, 11, 31)
            //       ]
            //     }
            //   ]
            // },
            // // Aaron Burr
            // {
            //   name: 'Aaron Burr',
            //   data: [
            //     {
            //       x: 'Vice President',
            //       y: [
            //         new Date(1801, 2, 4),
            //         new Date(1805, 2, 4)
            //       ]
            //     }
            //   ]
            // },
            // // George Clinton
            // {
            //   name: 'George Clinton',
            //   data: [
            //     {
            //       x: 'Vice President',
            //       y: [
            //         new Date(1805, 2, 4),
            //         new Date(1812, 3, 20)
            //       ]
            //     }
            //   ]
            // },
            // // John Jay
            // {
            //   name: 'John Jay',
            //   data: [
            //     {
            //       x: 'Secretary of State',
            //       y: [
            //         new Date(1789, 8, 25),
            //         new Date(1790, 2, 22)
            //       ]
            //     }
            //   ]
            // },
            // // Edmund Randolph
            // {
            //   name: 'Edmund Randolph',
            //   data: [
            //     {
            //       x: 'Secretary of State',
            //       y: [
            //         new Date(1794, 0, 2),
            //         new Date(1795, 7, 20)
            //       ]
            //     }
            //   ]
            // },
            // // Timothy Pickering
            // {
            //   name: 'Timothy Pickering',
            //   data: [
            //     {
            //       x: 'Secretary of State',
            //       y: [
            //         new Date(1795, 7, 20),
            //         new Date(1800, 4, 12)
            //       ]
            //     }
            //   ]
            // },
            // // Charles Lee
            // {
            //   name: 'Charles Lee',
            //   data: [
            //     {
            //       x: 'Secretary of State',
            //       y: [
            //         new Date(1800, 4, 13),
            //         new Date(1800, 5, 5)
            //       ]
            //     }
            //   ]
            // },
            // // John Marshall
            // {
            //   name: 'John Marshall',
            //   data: [
            //     {
            //       x: 'Secretary of State',
            //       y: [
            //         new Date(1800, 5, 13),
            //         new Date(1801, 2, 4)
            //       ]
            //     }
            //   ]
            // },
            // // Levi Lincoln
            // {
            //   name: 'Levi Lincoln',
            //   data: [
            //     {
            //       x: 'Secretary of State',
            //       y: [
            //         new Date(1801, 2, 5),
            //         new Date(1801, 4, 1)
            //       ]
            //     }
            //   ]
            // },
            // // James Madison
            // {
            //   name: 'James Madison',
            //   data: [
            //     {
            //       x: 'Secretary of State',
            //       y: [
            //         new Date(1801, 4, 2),
            //         new Date(1809, 2, 3)
            //       ]
            //     }
            //   ]
            // },
          ],
            chart: {
            height: 350,
            type: 'rangeBar'
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: '50%',
              rangeBarGroupRows: true
            }
          },
          colors: [
            "#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0",
            "#3F51B5", "#546E7A", "#D4526E", "#8D5B4C", "#F86624",
            "#D7263D", "#1B998B", "#2E294E", "#F46036", "#E2C044"
          ],
          fill: {
            type: 'solid'
          },
          xaxis: {
            type: 'date'
          },
          legend: {
            position: 'right'
          },
          };
  
          var chart = new ApexCharts(document.querySelector("#canvas-15"), options);
          chart.render();