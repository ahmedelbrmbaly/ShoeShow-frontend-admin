import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {StatisticsService} from '../../services/statistics.service';
import {SalesStatistics, StatisticsResponse} from '../../model/statisticsResponse.model';

@Component({
  selector: 'app-chart-component',
  standalone: false,
  templateUrl: './chart-component.html',
  styleUrl: './chart-component.css'
})

export class ChartComponent implements OnInit {
  statisticsResponse: StatisticsResponse | undefined;
  statisticsSales: SalesStatistics[] = [];
  constructor(private statisticsService: StatisticsService) {
    Chart.register(...registerables);

  }

  ngOnInit(): void {

    this.statisticsService.getStatistics().subscribe(data => {
      console.log("Data", data);
      this.statisticsResponse = data;
      this.statisticsSales = this.statisticsResponse.salesStatistics;
      this.createSalesChart();
      this.createOrdersChart();
    });
  }

  createSalesChart(): void {
    if (!this.statisticsSales || this.statisticsSales.length === 0) {
      console.warn('No sales statistics data available');
      return;
    }

    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;

    // Extract month labels and sales data from the API response
    const labels = this.statisticsSales.map(stat => stat.month);
    const salesData = this.statisticsSales.map(stat => stat.totalSales);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Sales Value',
          data: salesData,
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
    if (!this.statisticsSales || this.statisticsSales.length === 0) {
      console.warn('No orders statistics data available');
      return;
    }

    const ctx = document.getElementById('ordersChart') as HTMLCanvasElement;

    // Extract month labels and orders data from the API response
    const labels = this.statisticsSales.map(stat => stat.month);
    const ordersData = this.statisticsSales.map(stat => stat.totalOrders);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Orders',
          data: ordersData,
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
