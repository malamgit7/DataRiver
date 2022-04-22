import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/auth/reports.service';
import { SideBarService } from 'src/app/services/side-bar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //#region Dates
  private today: Date = new Date();
  private yesterday: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1);
  private thisWeekFirst: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - this.today.getDay() + 1);
  private thisWeekLast: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - this.today.getDay() + 1 + 6);
  private lastWeekFirst: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - this.today.getDay() - 6);
  private lastWeekLast: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - this.today.getDay());
  private thisMonthFirst: Date = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  private thisMonthLast: Date = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
  private lastMonthFirst: Date = new Date(this.today.getFullYear(), this.today.getMonth() - 1, 1);
  private lastMonthLast: Date = new Date(this.today.getFullYear(), this.today.getMonth(), 0);
  private thisQuarterFirst: Date = new Date(this.today.getFullYear(), this.today.getMonth() - this.today.getMonth() % 3, 1);
  private thisQuarterLast: Date = new Date(this.today.getFullYear(), this.today.getMonth() - this.today.getMonth() % 3 + 3, 0);
  private lastQuarterFirst: Date = new Date(this.today.getFullYear(), this.today.getMonth() - this.today.getMonth() % 3 - 3, 1);
  private lastQuarterLast: Date = new Date(this.today.getFullYear(), this.today.getMonth() - this.today.getMonth() % 3, 0);

  dateRangeSelected: boolean = false;
  bucketSelected: boolean = false;
  chartSelected: boolean = false;

  _labels: any[] = [];
  dropdowns: any = []
  bucket: any = []
  charts: any

  selectedStartDate!: Date;
  selectedEndDate!: Date;

  rawData: any[] = [];
  rawData_loading: boolean = false;

  isLineChart: boolean = false;
  isBarChart: boolean = false;

  _dates: any[] = [];
  _successData: any[] = [];
  _failedData: any[] = [];

  lineData: any;
  lineOptions: any;
  barData: any;
  barOptions: any;

  constructor(
    public sidebarService: SideBarService,
    private reportsService: ReportsService
  ) { }

  ngOnInit(): void {
    this.getJsonData();
  }

  getJsonData() {
    this.reportsService.getJsonData().subscribe(data => { this.dropdowns = data; });
  }

  onSelectDateRange(event: any) {
    this.bucket = [];
    var a: Number = Number((<HTMLInputElement>event.target).value);
    if (a) {
      this.bucket = this.dropdowns.find((bucket: any) => bucket.value == a).bucket;
      if (a == 1) {
        this.dateRangeSelected = true;
        this.selectedStartDate = this.today;
        this.selectedEndDate = this.today;
        this.GetQueryOutputStatus(this.today.toISOString(), this.today.toISOString());
      }
      else if (a == 2) {
        this.dateRangeSelected = true;
        this.selectedStartDate = this.yesterday;
        this.selectedEndDate = this.yesterday;
        this.GetQueryOutputStatus(this.yesterday.toISOString(), this.yesterday.toISOString());
      }
      else if (a == 3) {
        this.dateRangeSelected = true;
        this.selectedStartDate = this.thisWeekFirst;
        this.selectedEndDate = this.thisWeekLast;
        this.GetQueryOutputStatus(this.thisWeekFirst.toISOString(), this.thisWeekLast.toISOString());
      }
      else if (a == 4) {
        this.dateRangeSelected = true;
        this.selectedStartDate = this.lastWeekFirst;
        this.selectedEndDate = this.lastWeekLast;
        this.GetQueryOutputStatus(this.lastWeekFirst.toISOString(), this.lastWeekLast.toISOString());
      }
      else if (a == 5) {
        this.dateRangeSelected = true;
        this.selectedStartDate = this.thisMonthFirst;
        this.selectedEndDate = this.thisMonthLast;
        this.GetQueryOutputStatus(this.thisMonthFirst.toISOString(), this.thisMonthLast.toISOString());
      }
      else if (a == 6) {
        this.dateRangeSelected = true;
        this.selectedStartDate = this.lastMonthFirst;
        this.selectedEndDate = this.lastMonthLast;
        this.GetQueryOutputStatus(this.lastMonthFirst.toISOString(), this.lastMonthLast.toISOString());
      }
      else if (a == 7) {
        this.dateRangeSelected = true;
        this.selectedStartDate = this.thisQuarterFirst;
        this.selectedEndDate = this.thisQuarterLast;
        this.GetQueryOutputStatus(this.thisQuarterFirst.toISOString(), this.thisQuarterLast.toISOString());
      }
      else if (a == 8) {
        this.dateRangeSelected = true;
        this.selectedStartDate = this.lastQuarterFirst;
        this.selectedEndDate = this.lastQuarterLast;
        this.GetQueryOutputStatus(this.lastQuarterFirst.toISOString(), this.lastQuarterLast.toISOString());
      }
    }
  }
  onSelectBucketType(event: any) {
    var a: Number = Number((<HTMLInputElement>event.target).value);
    this.charts = a;

    if (a == 1) {
      this.bucketSelected = true;
      this.generateDailyData(this.selectedStartDate, this.selectedEndDate);
    }
    else if (a == 2) {
      this.bucketSelected = true;
      this.generateWeeklyData(this.selectedStartDate, this.selectedEndDate)
    }
    else if (a == 3) {
      this.bucketSelected = true;
      this.generateMonthlyData(this.selectedStartDate, this.selectedEndDate)
    }
  }
  onSelectChartType(event: any) {
    var a: Number = Number((<HTMLInputElement>event.target).value)
    if (a == 1) {
      this.chartSelected = true;
      this.isLineChart = true;
      this.isBarChart = false;
    }
    else if (a == 2) {
      this.chartSelected = true;
      this.isLineChart = false;
      this.isBarChart = true;
    }
  }

  generateDailyData(selectedStartDate: any, selectedEndDate: any) {
    console.log(this.rawData, selectedStartDate, selectedEndDate);
    this._labels = [];
    const theDate = new Date(selectedStartDate.toISOString().split('T')[0]);
    while (theDate <= selectedEndDate) {
      this._labels.push({
        date: theDate.toISOString().split('T')[0],
        success: 0,
        failed: 0,
      });
      theDate.setDate(theDate.getDate() + 1)
    }
    var merge = (a: any[], b: any[], p: string | number) => a.filter(aa => !b.find(bb => aa[p] === bb[p])).concat(b);
    var finalData = merge(this._labels, this.rawData, 'date');
    finalData.sort((a, b) => (a.date > b.date) ? 1 : -1);
    try {
      this._dates = finalData.map(x => x.date);
      this._successData = finalData.map(x => x.success);
      this._failedData = finalData.map(x => x.failed);
      console.log(this._dates, this._successData, this._failedData);
    }
    finally {
      this.buildLineChart();
      this.buildBarChart();
    }

  }
  generateWeeklyData(selectedStartDate: Date, selectedEndDate: Date) {
    this._labels = [];
    const theDate = new Date(selectedStartDate.toISOString().split('T')[0])
    while (theDate <= selectedEndDate) {
      this._labels.push({
        date: theDate.toISOString().split('T')[0],
        success: 0,
        failed: 0,
      });
      theDate.setDate(theDate.getDate() + 7)
    }
    var merge = (a: any[], b: any[], p: string | number) => a.filter(aa => !b.find(bb => aa[p] === bb[p])).concat(b);
    var finalData = merge(this._labels, this.rawData, 'date');
    finalData.sort((a, b) => (a.date > b.date) ? 1 : -1);
    try {
      this._dates = finalData.map(x => x.date);
      console.log(this._dates)
      this._dates.forEach(element => {
        this._successData.push(finalData.filter(x => x.date >= element && x.date <= element + 7).map(x => x.success)[0]);
        this._failedData.push(finalData.filter(x => x.date >= element && x.date <= element + 7).map(x => x.failed)[0]);
      });
    }
    finally {
      this.buildLineChart();
      this.buildBarChart();
    }
  }
  generateMonthlyData(selectedStartDate: Date, selectedEndDate: Date) {
    this._labels = [];
    const theDate = new Date(selectedStartDate.toISOString().split('T')[0])
    while (theDate <= selectedEndDate) {
      this._labels.push({
        date: theDate.toISOString().split('T')[0],
        success: 0,
        failed: 0,
      });
      theDate.setMonth(theDate.getMonth() + 1)
    }
    var merge = (a: any[], b: any[], p: string | number) => a.filter(aa => !b.find(bb => aa[p] === bb[p])).concat(b);
    var finalData = merge(this._labels, this.rawData, 'date');
    finalData.sort((a, b) => (a.date > b.date) ? 1 : -1);
    try {
      this._dates = finalData.map(x => x.date);

      this._dates.forEach(element => {
        const olDate = new Date(element)
        var ixxx = new Date(olDate.getFullYear(), olDate.getMonth() + 1, 0).toISOString().split('T')[0];
        this._successData.push(finalData.filter(x => x.date >= element && x.date <= ixxx).map(x => x.success)[0]);
        this._failedData.push(finalData.filter(x => x.date >= element && x.date <= ixxx).map(x => x.failed)[0]);
      });
    }
    finally {
      this.buildLineChart();
      this.buildBarChart();
    }
    console.log(this._dates, this._successData, this._failedData);
  }

  buildLineChart() {
    this.lineData = {
      labels: this._dates,
      datasets: [
        {
          label: 'Success',
          data: this._successData,
          fill: false,
          borderColor: '#42A5F5',
          tension: .4

        }, {
          label: 'Failed',
          data: this._failedData,
          fill: false,
          borderColor: '#FFA726',
          tension: .4
        }
      ]
    };
    this.lineOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
  }
  buildBarChart() {
    this.barData = {
      labels: this._dates,
      datasets: [{
        type: 'bar',
        label: 'Success',
        backgroundColor: '#42A5F5',
        data: this._successData
      }, {
        type: 'bar',
        label: 'Failed',
        backgroundColor: '#FFA726',
        data: this._failedData
      }]
    };
    this.barOptions = {
      plugins: {
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          stacked: true,
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
  }

  GetQueryOutputStatus(startDate: any, endDate: any) {
    console.log(startDate, endDate);
    this.rawData_loading = true;
    this.reportsService.GetQueryOutputStatus(startDate, endDate).subscribe(
      data => {
        this.rawData = data;
        this.rawData_loading = false;
      },
      error => {
        console.log(error);
        this.rawData_loading = false;
      }
    );
  }
}
