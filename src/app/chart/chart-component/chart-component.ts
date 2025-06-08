import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-chart-component',
  standalone: false,
  templateUrl: './chart-component.html',
  styleUrl: './chart-component.css'
})

export class ChartComponent implements OnInit {

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createSalesChart();
    this.createOrdersChart();
  }

  createSalesChart(): void {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Sales Value',
          data: [5000, 20000, 12000, 30000, 16000, 38000, 22000, 58000],
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#6366f1',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#94a3b8'
            }
          },
          y: {
            grid: {
              color: 'rgba(148, 163, 184, 0.2)'
            },
            ticks: {
              color: '#94a3b8',
              callback: function(value: any) {
                return '$' + (value / 1000) + 'k';
              }
            }
          }
        },
        elements: {
          point: {
            hoverBackgroundColor: '#6366f1'
          }
        }
      }
    });
  }

  createOrdersChart(): void {
    const ctx = document.getElementById('ordersChart') as HTMLCanvasElement;
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Total Orders',
          data: [26, 19, 28, 22, 16, 28],
          backgroundColor: '#ff5722',
          borderRadius: 6,
          borderSkipped: 'bottom',
          barThickness:10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#94a3b8'
            }
          },
          y: {
            grid: {
              color: 'rgba(148, 163, 184, 0.2)'
            },
            ticks: {
              color: '#94a3b8',
              stepSize: 10
            },
            beginAtZero: true
          }
        }
      }
    });
  }
}
  