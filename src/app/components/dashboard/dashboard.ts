import {Component, OnInit} from '@angular/core';
import {StatisticsService} from '../../services/statistics.service';
import {StatisticsResponse} from '../../model/statisticsResponse.model';

@Component({
  selector: 'app-dashboard',
  standalone:false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit{
  statisticsResponse: StatisticsResponse | undefined;
  revenue: number = 0;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe(data => {
      console.log("Data", data);
      this.statisticsResponse = data;
      this.revenue = ((data.salesStatistics[data.salesStatistics.length -1].totalSales - data.salesStatistics[data.salesStatistics.length -2].totalSales) / data.salesStatistics[data.salesStatistics.length -2].totalSales) * 100;
    })
  }

}
