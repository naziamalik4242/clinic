export interface PerformanceMetricsSnapshot {
  grossRevenue: number;
  totalLeadsAcquired: number;
  conversionRatePercentage: number;
  activeAutomatedSessions: number;
}

export interface TimeSeriesDataPoint {
  dateLabel: string; // e.g., "2026-07-01"
  volumeCount: number;
  revenueValue?: number;
}

export interface ChannelDistributionMetrics {
  platform: string;
  percentageAllocation: number;
  totalCount: number;
}