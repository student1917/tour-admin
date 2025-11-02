export interface TopTour {
  views: number;
  tourId: string;
  tourName: string;
}

export interface VisitStats {
  totalVisits: number;
  todayVisits: number;
  topTours: TopTour[];
}

export interface VisitStatsSummary {
  totalVisits: number;
  totalUsers: number;
  totalReviews: number;
  totalTours:number;
}

export interface MonthlyRevenue {
  month: number;
  totalRevenue: number;
}