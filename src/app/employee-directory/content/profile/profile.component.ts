import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { AddOrEditEmployeeComponent } from '../add-or-edit-employee/add-or-edit-employee.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('content')
  content!: ElementRef;

  fullName = '';
  preferedName = '';
  jobTitle = '';
  department = '';
  email = '';
  location = '';
  phoneNumber = '';

  constructor(
    private dataService: EmployeeServiceService,
    public dialog: MatDialog
  ) {
    const key = this.dataService.profileSlected;
    this.preferedName = this.dataService.employeeRecord[key].preferedName;
    this.fullName = this.dataService.employeeRecord[key].firstName.concat(
      ' ',
      this.dataService.employeeRecord[key].lastName
    );
    this.jobTitle = this.dataService.employeeRecord[key].jobTitle
      .split('_')
      .join(' ');
    this.department = this.dataService.employeeRecord[key].department
      .split('_')
      .join(' ');
    this.email = this.dataService.employeeRecord[key].email;
    this.location = this.dataService.employeeRecord[key].location
      .split('_')
      .join(' ');
    this.phoneNumber = this.dataService.employeeRecord[key].phoneNumber;
  }

  ngOnInit(): void {}

  edit_profile() {
    this.dialog.closeAll();

    this.dataService.clearFilterSubject.next('');
    this.dataService.editProfileClicked = true;
    const dialogRef = this.dialog.open(AddOrEditEmployeeComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.dataService.editProfileClicked = false;
    });
  }
}
