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
