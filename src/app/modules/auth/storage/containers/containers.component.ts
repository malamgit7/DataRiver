import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLakeService } from 'src/app/services/auth/data-lake.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MsalAuthenticationService } from 'src/app/services/msal-authentication.service';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { SideBarService } from 'src/app/services/side-bar.service';
import { BridgeManagerService } from 'src/app/services/auth/bridge-manager.service';
import { DataAnalysisService } from 'src/app/services/auth/sql-server.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FileSizePipe } from 'src/app/pipes/filesize.pipe';
import { LazyLoadEvent } from 'primeng/api';
import { HttpEventType } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent implements OnInit {

  default_select = null;
  uploadFile_loading = false
  public progress!: number;
  public message!: string;
  @Output() public onUploadFinished = new EventEmitter();

  containers: any[] = []
  GetFileSystems_loading = false;

  items!: MenuItem[];

  createFileSystemForm!: FormGroup;
  createFileSystems_loading = false

  role?: string;

  connectionStrings: any[] = [];
  connectionString_Next: any = null
  connectionString_loading = false;

  GetBlobs_loading = false;
  GetBlobSchema_loading = false;
  CreateView_loading = false;

  fileSystems: any[] = [];
  fileSystem_Next: any = null
  blobs: any[] = [];
  selectedBlob!: any;
  blob_next!: string;

  deleteBlob_loading = false;

  arrayBuffer: any
  arraylist: any[] = [];
  cols: any[] = [];
  totalRecords!: number;
  arraylist_loading: boolean = true

  displayBlobDataModal: boolean = false;
  displayRenameModal: boolean = false;
  displayPropertiesModal = false;
  displayUploadModal = false;

  renameBlobForm!: FormGroup;
  renameBlobForm_loading = false;
  old_blob_name!: string
  old_blob_name_ext!: string

  properties_of_this_blob = '';
  acceptRanges!: string;
  accessTier!: string;
  contentLength!: string;
  contentType!: string;
  createdOn!: any;
  lastModified!: any;
  GetBlobProperties_loading = false;

  fileName!: string;

  constructor(
    private dataLakeService: DataLakeService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private msalAuthenticationService: MsalAuthenticationService,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    public sidebarService: SideBarService,
    private bridgeManagerService: BridgeManagerService,
    private dataAnalysisService: DataAnalysisService,
    private fileSizePipe: FileSizePipe
  ) {
    this.buildCreateFileSystemForm();
    this.buildRenameBlobForm();
  }

  ngOnInit(): void {
    $('[data-bs-toggle="tooltip"]').tooltip();
    this.msalBroadcastService.inProgress$
      .pipe(filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.getClaims(this.msalService.instance.getActiveAccount()?.idTokenClaims)
      });
    this.primengConfig.ripple = true;
    this.GetStorageConnectionStrings();
  }

  get f() { return this.createFileSystemForm.controls; }
  get g() { return this.renameBlobForm.controls; }


  public onContextMenuSelect(event: any, item: any) {

    this.buildContextMenu();
    if (event.data.ext != 'csv') {
      this.items[0].disabled = true;
    }
  }

  buildContextMenu() {
    this.items = [
      { label: 'Preview', disabled: false, icon: 'pi pi-fw pi-eye', command: (event) => { this.GetBlobData(this.selectedBlob); } },
      { label: 'Download', icon: 'pi pi-fw pi-download', command: () => this.DownloadBlob(this.selectedBlob) },
      { label: 'Rename', icon: 'pi pi-fw pi-pencil', command: () => this.RenameBlob(this.selectedBlob) },
      { label: 'Properties', icon: 'pi pi-fw pi-info-circle', command: () => this.GetBlobProperties(this.selectedBlob) },
      { separator: true },
      { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.DeleteBlob(this.selectedBlob) },
    ];
  }

  getClaims(claims: any) {
    this.role = claims['roles'][0]
    
  }

  buildCreateFileSystemForm() {
    this.createFileSystemForm = this.formBuilder.group({
      FileSystem: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  buildRenameBlobForm() {
    this.renameBlobForm = this.formBuilder.group({
      ConnectionStringId: null,
      FileSystem: null,
      Path_Blob_old: null,
      Path_Blob_New: ['', Validators.required]
    });
  }

  GetStorageConnectionStrings() {
    this.connectionString_loading = true
    this.bridgeManagerService.GetStorageConnectionStrings().subscribe(
      data => {
        this.connectionStrings = data;
        this.connectionString_loading = false
      },
      error => {
        this.connectionString_loading = false
      }
    );
  }

  DeleteFileSystems(FileSystem: any) {
    this.dataLakeService.DeleteFileSystems(this.connectionString_Next, FileSystem.name).subscribe(data => {
      // this.GetFileSystems();
      this.toastr.success('Container deleted!', 'Success', { positionClass: 'toast-bottom-center' })
    })
  }

  OnSubmit() {
    if (this.createFileSystemForm.invalid) {
      this.toastr.error('Invalid input!', 'Error', { positionClass: 'toast-bottom-center' })
      return
    }
    this.createFileSystems_loading = true
    this.dataLakeService.CreateFileSystem(this.createFileSystemForm.value)
      .pipe(first())
      .subscribe(data => {
        // this.GetFileSystems();
        this.createFileSystems_loading = false;
        this.createFileSystemForm.reset();
        this.toastr.success('Container created!', 'Success', { positionClass: 'toast-bottom-center' })
      },
        error => {
          this.createFileSystems_loading = false;
          window.alert(error.error.split('\n')[0].split(':')[1].trim());
          this.toastr.error('Something wrong!', 'Error', { positionClass: 'toast-bottom-center' })
        }
      )
  }

  RedirectToBlobComponent(container: any) {
    this.router.navigate(['/auth/data-lake/blobs'], { queryParams: { container: container.name } })
  }

  confirmDeleteQuery(FileSystem: any) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.dataLakeService.DeleteFileSystems(this.connectionString_Next, FileSystem.name).subscribe(
          res => {
            // this.GetFileSystems();
            this.toastr.success('Container deleted!', 'Success', { positionClass: 'toast-bottom-center' })
          },
          err => {
            this.toastr.error('Query deletion failed', 'Error', { positionClass: 'toast-bottom-center' });
            
          }
        );
      },
      reject: () => { }
    });
  }

  onSelectConnectionString(event: Event) {
    var connectionStringId = (<HTMLInputElement>event.target).value;
    this.connectionString_Next = connectionStringId;
    this.containers = [];
    this.GetFileSystems_loading = true;
    this.dataAnalysisService.GetFileSystems(connectionStringId).subscribe(
      res => {
        
        this.containers = res;
        this.GetFileSystems_loading = false
      },
      err => {
        this.containers = [];
        this.GetFileSystems_loading = false
        
      }
    )
  }

  onSelectFileSystem(event: Event) {
    this.blobs = [];
    var fileSystem = (<HTMLInputElement>event.target).value;
    this.fileSystem_Next = fileSystem;
    this.GetBlobs();
  }

  GetBlobs() {
    this.GetBlobs_loading = true;
    this.dataAnalysisService.GetBlobs(this.connectionString_Next, this.fileSystem_Next).subscribe(
      data => {
        this.blobs = [];
        for (var a of data) {
          a.fileSize = this.fileSizePipe.transform(a.contentLength, 'MB');
          a.ext = a.name.split('.').pop();
          this.blobs.push(a);
          // if (a.name.includes(".csv")) {
          //   a.fileSize = this.fileSizePipe.transform(a.contentLength, 'MB');
          //   this.blobs.push(a);
          // }
        }
        this.GetBlobs_loading = false;
      },
      err => { this.GetBlobs_loading = false; }
    )
  }

  DownloadBlob(blob: any) {
    this.dataLakeService.DownloadBlob(this.connectionString_Next, this.fileSystem_Next, blob.name).subscribe((data: any) => {
      
      saveAs(data.body, blob.name)
    });
  }

  DeleteBlob(blob: any) {
    this.deleteBlob_loading = true;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete ' + blob.name + '?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteBlob_loading = true;
        this.dataLakeService.DeleteBlob(this.connectionString_Next, this.fileSystem_Next, blob.name).subscribe(data => {
          this.GetBlobs();
          this.deleteBlob_loading = false;
          this.toastr.success('File deleted!', 'Success', { positionClass: 'toast-bottom-center' })
        },
          error => {
            this.deleteBlob_loading = false;

            this.toastr.error('Unable to delete!', 'warning', { positionClass: 'toast-bottom-center' })
          }
        );
      },
      reject: () => { }
    });

  }

  GetBlobProperties(blob: any) {
    this.displayPropertiesModal = true;
    
    this.properties_of_this_blob = blob.name;

    this.GetBlobProperties_loading = true
    this.dataLakeService.GetBlobProperties(this.connectionString_Next, this.fileSystem_Next, blob.name).subscribe((data: any) => {
      this.acceptRanges = data.acceptRanges;
      this.accessTier = data.accessTier
      this.contentLength = this.fileSizePipe.transform(data.contentLength, 'MB');
      this.contentType = data.contentType
      this.createdOn = data.createdOn
      this.lastModified = data.lastModified
      this.GetBlobProperties_loading = false;
    })
  }

  LockFile(blob: any) {
    // this.dataLakeService.LockFile(this.container, path_blob).subscribe(data => {
    //   this.GetBlobs();
    
    // });
  }

  UnlockFile(blob: any) {
    // this.dataLakeService.UnlockFile(this.container, path_blob).subscribe(data => {
    //   this.GetBlobs();
    
    // });
  }

  RedirectToViewBlobComponent(blob: any) {
    // this.router.navigate(['/auth/data-lake/view-blob'], { queryParams: { container: this.container, blob: path_blob } })
  }

  RenameBlob(blob: any) {
    this.renameBlobForm.patchValue({
      ConnectionStringId: this.connectionString_Next,
      FileSystem: this.fileSystem_Next,
      Path_Blob_old: blob.name
    });
    this.old_blob_name = blob.name.split('.')[0];
    this.old_blob_name_ext = blob.name.split('.')[1];
    this.showRenameDialog()
  }

  UploadFiles(files: any) {
    if (files.length === 0) {
      return;
    }
    
    const formData = new FormData();
    for (let file of files) {
      formData.append(file.name, file)
    }
    this.uploadFile_loading = true;
    this.dataLakeService.UploadFiles(formData, this.connectionString_Next, this.fileSystem_Next).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total) - 1
        }
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          this.progress = 100;
          this.uploadFile_loading = false;
          this.toastr.success('Files Uploaded!', 'Success', { positionClass: 'toast-bottom-center' })
          this.progress = 0;
          this.GetBlobs();
        }
      },
      error => {
        this.progress = 0;
        window.alert(error.error)
        this.toastr.error('Upload Failed', 'warning', { positionClass: 'toast-bottom-center' })
      })

  }

  OnSubmitRenameBlob() {
    if (this.renameBlobForm.invalid) {
      this.toastr.error('Invalid input!', 'Error', { positionClass: 'toast-bottom-center' })
      this.renameBlobForm;
      return
    }
    this.renameBlobForm_loading = true;
    this.dataLakeService.RenameBlob(this.renameBlobForm.value)
      .pipe(first())
      .subscribe(data => {
        this.GetBlobs();
        this.renameBlobForm_loading = false;
        this.renameBlobForm.reset();
        this.buildRenameBlobForm();
        this.displayRenameModal = false;
        this.toastr.success('File Renamed!', 'Success', { positionClass: 'toast-bottom-center' })
      },
        error => {
          this.renameBlobForm_loading = false;
          this.renameBlobForm;
          this.toastr.error('Something wrong!', 'Error', { positionClass: 'toast-bottom-center' })
        });
  }

  GetBlobData(blob: any) {
    this.cols = [];
    this.arraylist = [];
    this.fileName = blob.name;
    this.GetBlobs_loading = true;
    this.dataLakeService.ViewBlob(this.connectionString_Next, this.fileSystem_Next, blob.name).subscribe(
      (data: any) => {
        this.ReadBlobData(data);
        this.GetBlobs_loading = false;
      },
      error => { this.GetBlobs_loading = false; }
    );
  }

  ReadBlobData(blob_data: any) {
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(blob_data.body);
    fileReader.onload = (e: any) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);

      

      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.totalRecords = this.arraylist.length;
      var keys = Object.keys(this.arraylist[0]);
      keys.forEach((key) => {
        this.cols.push({ field: key, header: key.trim() })
      })
    };
    this.showBlobDataDialog()
  }

  LazyLoadBlobData(event: LazyLoadEvent) {
    this.arraylist_loading = true;
    setTimeout(() => {
      
    }, 1000);
  }

  showBlobDataDialog() {
    this.displayBlobDataModal = true;
  }

  showRenameDialog() {
    this.displayRenameModal = true;
  }

  showUploadDialog() {
    this.displayUploadModal = true;
  }

}
