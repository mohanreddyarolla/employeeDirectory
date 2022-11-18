import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';

interface Title {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-or-edit-employee',
  templateUrl: './add-or-edit-employee.component.html',
  styleUrls: ['./add-or-edit-employee.component.css'],
})
export class AddOrEditEmployeeComponent implements OnInit, AfterViewInit {
  selectedValue!: string;
  presentProfileJobTitle!: string;
  presentProfileDepartment!: string;
  presentProfileLocation!: string;

  jobTitle: Title[] = [
    { value: 'Intern', viewValue: 'Intern' },
    {
      value: 'Junior_Software_Development',
      viewValue: 'Junior Software Development',
    },
    { value: 'Software_Developer', viewValue: 'Software Developer' },
    { value: 'Account_Manager', viewValue: 'Account Manager' },
    { value: 'HR', viewValue: 'HR' },
  ];
  departments: Title[] = [
    { value: 'Product_Engineer', viewValue: 'Product Engineer' },
    { value: 'HR_Operations', viewValue: 'HR Operations' },
    { value: 'Finance_Accounts', viewValue: 'Finance Accounts' },
    { value: 'Quality_Analyst', viewValue: 'Quality Analyst' },
    { value: 'Data_Science', viewValue: 'Data Science' },
  ];

  location: Title[] = [
    { value: 'Hyderabad', viewValue: 'Hyderabad' },
    { value: 'Seatle', viewValue: 'Seatle' },
    { value: 'Hyderabad_Keka', viewValue: 'Hyderabad Keka' },
    { value: 'Remote', viewValue: 'Remote' },
  ];

  employeeData = {
    firstName: '',
    lastName: '',
    preferedName: '',
    jobTitle: '',
    department: '',
    email: '',
    phoneNumber: '',
    location: '',
    image: '',
  };

  constructor(
    private dataService: EmployeeServiceService,
    public dialog: MatDialog
  ) {
    this.dataService.clearFilterSubject.subscribe(() => {
      this.clearFilters();
    });
  }
  ngAfterViewInit(): void {
    let btn = document.getElementById('addOrCloseBtn');
    if (this.dataService.editProfileClicked) {
      btn!.innerText = 'Save';
      btn!.addEventListener('click', (e: Event) => this.save_profile_changes());
      setTimeout(() => {
        this.loadEditProfileCard();
      }, 100);
    } else {
      btn!.innerText = 'Add';
      btn!.addEventListener('click', (e: Event) => this.AddEmployeeEvent());
    }
  }

  loadEditProfileCard() {
    const employeeRecord = this.dataService.employeeRecord;
    const key = this.dataService.profileSlected;

    this.presentProfileJobTitle = employeeRecord[key].jobTitle;
    this.presentProfileDepartment = employeeRecord[key].department;
    this.presentProfileLocation = employeeRecord[key].location;

    this.employeeData.firstName = employeeRecord[key].firstName;
    this.employeeData.lastName = employeeRecord[key].lastName;
    this.employeeData.preferedName = employeeRecord[key].preferedName;
    this.employeeData.jobTitle = employeeRecord[key].jobTitle;
    this.employeeData.department = employeeRecord[key].department;
    this.employeeData.email = employeeRecord[key].email;
    this.employeeData.location = employeeRecord[key].location;
  }

  ngOnInit(): void {}

  AddEmployeeEvent() {
    this.AddOrEditEmployee(this.dataService.totalCount.toString());
    
    localStorage.setItem(
      'TotalCount',
      JSON.stringify(this.dataService.totalCount)
    );
    this.dataService.totalCount += 1;
  }

  AddOrEditEmployee(key: string) {
    this.dataService.clearFilterSubject.next('');

    this.dataService.employeeRecord[key] = this.employeeData;
    localStorage.setItem(
      'EmployeeRecord',
      JSON.stringify(this.dataService.employeeRecord)
    );

    this.updateTitleFilters();
    this.dataService.raiseAddEmployeeEvent();
  }

  updateTitleFilters() {
    let id: string = this.dataService.totalCount.toString();
    this.addId('Job_Title', this.employeeData.jobTitle, id);
    this.addId('Department', this.employeeData.department, id);
    this.addId('Location', this.employeeData.location, id);

    this.UpdateFilterCount('Job_Title', this.employeeData.jobTitle, 1);
    this.UpdateFilterCount('Department', this.employeeData.department, 1);
    this.UpdateFilterCount('Location', this.employeeData.location, 1);

    localStorage.setItem(
      'TitleFilterRecord',
      JSON.stringify(this.dataService.titleFilterRecord)
    );
  }

  save_profile_changes() {
    const key = this.dataService.profileSlected;
    this.dataService.employeeRecord[key] = this.employeeData;

    this.removeID('Job_Title', this.presentProfileJobTitle);
    this.removeID('Department', this.presentProfileDepartment);
    this.removeID('Location', this.presentProfileLocation);

    this.UpdateFilterCount('Job_Title', this.presentProfileJobTitle, -1);
    this.UpdateFilterCount('Department', this.presentProfileDepartment, -1);
    this.UpdateFilterCount('Location', this.presentProfileLocation, -1);

    this.AddOrEditEmployee(this.dataService.profileSlected);
  }

  removeID(parent: string, child: string) {
    let index = this.dataService.titleFilterRecord[parent][child].id.indexOf(
      this.dataService.profileSlected
    );
    this.dataService.titleFilterRecord[parent][child].id.splice(index, 1);
  }

  addId(parent: string, child: string, id: string) {
    this.dataService.titleFilterRecord[parent][child].id.push(id);
  }

  UpdateFilterCount(parent: string, child: string, count: number) {
    this.dataService.titleFilterRecord[parent][child].count += count;
  }

  clearFilters() {
    let Filterslist = [
      'Job_Title',
      'Department',
      'Location',
      'alphabeticalFilters',
      'inputSearchFilters',
    ];
    this.dataService.selectedFiltersList.numberOfOptionSelected = 0;
    Filterslist.forEach((key) => {
      this.dataService.selectedFiltersList[key].count = 0;
      this.dataService.selectedFiltersList[key].list = [];
    });
  }
}
