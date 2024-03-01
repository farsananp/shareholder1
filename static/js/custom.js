const pieChart = new Chart(document.getElementById('canvas-5'), {
    type: 'pie',
    data: {
      labels: ['Repair', 'Available', 'Active'],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }]
    },
    options: {
      responsive: true
    }
  });
// const random = () => Math.round(Math.random() * 100);
// eslint-disable-next-line no-unused-vars
const barChart = new Chart(document.getElementById('canvas-2'), {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        backgroundColor: 'rgba(220, 220, 220, 0.5)',
        borderColor: 'rgba(220, 220, 220, 0.8)',
        highlightFill: 'rgba(220, 220, 220, 0.75)',
        highlightStroke: 'rgba(220, 220, 220, 1)',
        data: [10, 0, 2,7,5, 2,1],
        label:'Work Orders'
      }, {
        backgroundColor: 'rgba(151, 187, 205, 0.5)',
        borderColor: 'rgba(151, 187, 205, 0.8)',
        highlightFill: 'rgba(151, 187, 205, 0.75)',
        highlightStroke: 'rgba(151, 187, 205, 1)',
        data: [8,2, 2,7,5, 0, 3],
        label:'Work Completed'
      }]
    },
    options: {
      responsive: true
    }
  });
  
// const assettypechart = new Chart(document.getElementById('canvas-10'), {
  
//     type: 'doughnut',
//     data: {
//       labels: ['Vehicle', 'Electronics', 'Mobile','Power Supply'],
//       datasets: [{
//         data: [280, 50, 100,70],
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#0c7607'],
//         hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#0c7607']
//       }]
//     },
//     options: {
//       responsive: true
//     }
//   });
  var ctx2 = document.getElementById("dashboardChart2");
    var dashboardChart2 = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ["Ok","Poor","Bad"],
            datasets: [{
                label: '# of Votes',
                data: [15,5,6],
                backgroundColor: ["#9bbc5b","#3a6d7a","#FF6384"],
                borderColor: [
                    'rgba(255, 255, 255 ,1)',
                ],
                // borderWidth: 2
            }]

        },
        options: {
          rotation: -90,
          circumference: 180,
        }
        // options: {
        //     rotation: 1 * Math.PI,/** This is where you need to work out where 89% is */
        //     circumference: 1 * Math.PI,/** put in a much smaller amount  so it does not take up an entire semi circle */
        //     legend: {
        //         display: false
        //     },
        //     tooltip: {
        //         enabled: false
        //     },
        //     cutoutPercentage: 95
        // }
    });


$('.delete-kit').on('click',function(){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      }
  })
})