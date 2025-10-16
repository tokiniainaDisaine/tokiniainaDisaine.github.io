
const xValues = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const yValues = [55, 49, 44, 24, 15, 12, 26];
// const barColors = ["red", "green","blue","orange","brown", "gray", "purple"];
const barColors = ["gray"];

const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {display: false},
      title: {
        display: true,
        text: "Weekly Score",
        font: {size: 16}
      }
    }
  }
});