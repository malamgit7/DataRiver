import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Queries } from 'src/app/models/auth/data-analysis.model';
import { AnalysisService } from 'src/app/services/auth/analysis.service';

import { ConfirmationService, MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Clipboard } from "@angular/cdk/clipboard"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SideBarService } from 'src/app/services/side-bar.service';
import { MsalAuthenticationService } from 'src/app/services/msal-authentication.service';

@Component({
  selector: 'app-all-queries',
  templateUrl: './all-queries.component.html',
  styleUrls: ['./all-queries.component.scss']
})
export class AllQueriesComponent implements OnInit {
  userName!: string;
  displayModal!: boolean;
  scheduleFrequencies: any[] = []
  deleteSchedule_loading = false
  queries!: Queries[];
  selectedQuery!: Queries;
  items!: MenuItem[];
  time: number = 0;
  interval: any;
  executeQueryForm!: FormGroup;
  executeQueryForm_loading = false;
  scheduleQueryForm!: FormGroup;
  scheduleQueryForm_loading = false;

  todayDate = new Date().toISOString();
  private returnUrl!: string;


  constructor(
    private msalAuthenticationService: MsalAuthenticationService,
    private analysisService: AnalysisService,
    private confirmationService: ConfirmationService,
    private clipboard: Clipboard,
    private router: Router,
    private formBuilder: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private toastr: ToastrService,
    public sidebarService: SideBarService
  ) {
    this.userName = this.msalAuthenticationService.userName()
    this.buildExecuteQueryForm();
    this.buildScheduleQueryForm();
  }

  ngOnInit(): void {
    this.returnUrl = this.router.url;
    this.GetQueries();
    this.primengConfig.ripple = true;
    this.items = [
      { label: 'View/Edit', icon: 'pi pi-fw pi-pencil', command: () => this.viewQuery(this.selectedQuery) },
      { label: 'Copy SQL', icon: 'pi pi-fw pi-copy', command: () => this.copyQuery(this.selectedQuery) },
      { label: 'Execute', icon: 'pi pi-fw pi-align-left', command: () => this.executeQuery(this.selectedQuery) },
      { label: 'Schedule', icon: 'pi pi-fw pi-clock', command: () => this.showModalDialog(this.selectedQuery) },
      { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.confirmDeleteQuery(this.selectedQuery) }
    ];
    this.GetScheduleFrequency();
  }

  GetScheduleFrequency() {
    this.analysisService.GetScheduleFrequency().subscribe(
      res => {
        this.scheduleFrequencies = res;
      },
      err => { }
    );
  }

  buildExecuteQueryForm() {
    this.executeQueryForm = this.formBuilder.group({
      ConnectionStringId: ['', Validators.required],
      QueryId: ['', Validators.required],
      QuerySQL: null,
      AddedBy: this.userName,
      AddedDate: this.todayDate
    });
  }

  buildScheduleQueryForm() {
    this.scheduleQueryForm = this.formBuilder.group({
      QueryId: ['', Validators.required],
      ScheduledStartDateTime: ['', Validators.required],
      FrequencyNumber: [null, Validators.required],
      Scheduled: null,
      AddedBy: this.userName,
      AddedTime: this.todayDate,
      UpdatedBy: this.userName,
      UpdatedDate: this.todayDate
    });
  }

  clearScheduleQueryForm() {
    this.scheduleQueryForm.reset();
  }

  GetQueries() {
    this.analysisService.GetQueries().subscribe(
      res => {
        this.queries = res;
      },
      err => { }
    );
  }

  viewQuery(query: any) {
    this.router.navigate(['/auth/sql-server/sql-editor'], { queryParams: { QueryId: query.queryId, returnUrl: this.returnUrl } });
  }

  copyQuery(query: any) {
    this.clipboard.copy(query.querySQL);
    this.toastr.success('Query copied!', '', { positionClass: 'toast-bottom-right' });
  }

  executeQuery(query: any) {
    this.executeQueryForm_loading = true;
    this.executeQueryForm.patchValue({
      ConnectionStringId: query.connectionStringId,
      QueryId: query.queryId,
      QuerySQL: query.querySQL
    });
    if (!this.executeQueryForm.valid) {
      
      this.executeQueryForm_loading = false;
      return;
    }
    
    this.time = 0;
    this.startTimer();
    this.analysisService.ExecuteQuery(this.executeQueryForm.value).subscribe(
      res => {
        this.executeQueryForm_loading = false; this.pauseTimer();
        this.toastr.success('Query executed successfully!', '', { positionClass: 'toast-bottom-right' });
      },
      err => {
        this.executeQueryForm_loading = false; this.pauseTimer();
        this.toastr.error('Query execution failed!', '', { positionClass: 'toast-bottom-right' });
      }
    );
  }

  onSubmitScheduleQueryForm() {
    this.scheduleQueryForm_loading = true;
    this.scheduleQueryForm.patchValue({
      AddedBy: this.userName,
      AddedDate: this.todayDate,
      UpdatedBy: this.userName,
      UpdatedDate: this.todayDate
    });
    if (!this.scheduleQueryForm.valid) {
      this.scheduleQueryForm_loading = false;
      this.toastr.error('Please fill all the required fields', '', { positionClass: 'toast-bottom-right' });
      return;
    }
    this.analysisService.ScheduleQuery(this.scheduleQueryForm.value).subscribe(
      res => {
        this.scheduleQueryForm_loading = false;
        this.displayModal = false;
        this.clearScheduleQueryForm();
        this.GetQueries();
        this.toastr.success('Query scheduled successfully', 'Success', { positionClass: 'toast-bottom-right' });
      },
      err => {
        this.scheduleQueryForm_loading = false;
        window.alert(err.error.message);
        this.toastr.error('Query scheduling failed', 'Error', { positionClass: 'toast-bottom-right' });
      }
    );
  }

  confirmDeleteQuery(query: any) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.analysisService.DeleteQuery(query.queryId).subscribe(
          res => {
            this.GetQueries();
            this.toastr.success('Query deleted successfully', '', { positionClass: 'toast-bottom-right' });
          },
          err => {
            this.toastr.error('Query deletion failed', '', { positionClass: 'toast-bottom-right' });
          }
        );
      },
      reject: () => { }
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.time++;
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  showModalDialog(query: any) {
    this.clearScheduleQueryForm();
    if (query.scheduled == null) {
      this.scheduleQueryForm.patchValue({
        QueryId: query.queryId,
        Scheduled: query.scheduled
      });
      this.displayModal = true;
    }
    else {
      this.getScheduleDataToUpdate(query.queryId)
    }
  }

  getScheduleDataToUpdate(QueryId: string) {
    this.analysisService.GetScheduleDataToUpdate(QueryId).subscribe(
      (res: any) => {
        this.scheduleQueryForm.patchValue({
          QueryId: res[0].queryId,
          ScheduledStartDateTime: res[0].scheduledStartDateTime,
          FrequencyNumber: res[0].frequencyNumber,
          AddedBy: res[0].addedBy,
          AddedTime: res[0].addedDate,
          Scheduled: res[0].scheduled
        });
        this.displayModal = true;
      },
      err => { }
    );
  }

  deleteSchedule() {
    this.deleteSchedule_loading = true;
    if (this.scheduleQueryForm.value.QueryId != null) {
      this.displayModal = false;
      this.confirmationService.confirm({
        message: "Are you sure that you want to delete?",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.analysisService.DeleteSchedule(this.scheduleQueryForm.value.QueryId).subscribe(
            res => {
              this.deleteSchedule_loading = false;
              // this.displayModal = false;
              this.GetQueries();
              this.toastr.success('Schedule deleted successfully', '', { positionClass: 'toast-bottom-right' });
            },
            err => {
              this.deleteSchedule_loading = false;
              this.toastr.error('Schedule deletion failed', '', { positionClass: 'toast-bottom-right' });
            }
          );
        },
        reject: () => { }
      })
    }
    else {
      return;
    }

  }

  redirectToNewQuery() {
    this.router.navigate(['/auth/sql-server/sql-editor'], { queryParams: { returnUrl: this.returnUrl } });
  }

}
