import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartdataService } from 'src/app/services/auth/chartdata.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-charting',
  templateUrl: './charting.component.html',
  styleUrls: ['./charting.component.scss']
})
export class ChartingComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  };

  private chartdata!: object
  public subscription!: Subscription;

  constructor(
    private chartdataService: ChartdataService
  ) { }

  ngOnInit(): void {
    this.subscription = this.chartdataService.getData().subscribe(
      data => {
        this.chartdata = data
        
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
