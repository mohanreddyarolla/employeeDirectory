import { AfterViewInit, Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeServiceService } from './Services/employee-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class AppComponent implements AfterViewInit {
  title = 'employeeDirectory';

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private dataService: EmployeeServiceService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngAfterViewInit(): void {
    //to get the data from the local storage
    this.dataService.loadServiceData();
  }

  open(content: any) {
    this.modalService.open(content);
  }
}
