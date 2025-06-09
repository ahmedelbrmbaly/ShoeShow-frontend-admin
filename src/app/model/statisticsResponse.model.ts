export interface StatisticsResponse {
  totalSales: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  salesStatistics: SalesStatistics[];
}
export interface SalesStatistics{
  month: string;
  totalSales: number;
  totalOrders: number;
}
