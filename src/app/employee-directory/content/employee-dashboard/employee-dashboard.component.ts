import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, timeout } from 'rxjs';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { ProfileComponent } from '../profile/profile.component';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeDashboardComponent implements OnInit, AfterViewInit {
  addEmployeeSubscriber: Subscription = new Subscription();
  filterChangeSubscriber: Subscription = new Subscription();
  @ViewChild('employeeDashboard') employeeDashboard!: ElementRef;

  constructor(
    private dataService: EmployeeServiceService,
    public dialog: MatDialog
  ) {
    this.addEmployeeSubscriber =
      this.dataService.employeeAddedSubject.subscribe(() => {
        this.loadDashboard();
      });

    this.filterChangeSubscriber = this.dataService.filtersSubject.subscribe(
      () => {
        this.getRequiredResults();
      }
    );
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadDashboard();
    }, 100);
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.loadDashboard();
    }, 100);
  }

  loadDashboard() {
    let employeeRecord = this.dataService.employeeRecord;
    document.getElementById('employeeDashboard')!.innerHTML = '';
    for (const key in employeeRecord) {
      this.addEmployeeCard(key);
    }
  }

  addEmployeeCard(key: any) {
    let employeeRecord = this.dataService.employeeRecord;

    let dashboard = document.getElementById('employeeDashboard');

    let employeeCard = document.createElement('div');
    employeeCard.id = key;
    employeeCard.className = 'employee-card';
    employeeCard.addEventListener('click', (e) => {
      this.openProfile(key);
    });
    //div for image
    let photo = document.createElement('div');
    photo.className = 'photo';

    let img = document.createElement('img');
    img.src = './assets/images/profile-1.png';

    photo.appendChild(img);

    //div for employee data
    let empData = document.createElement('div');
    empData.className = 'employee-data';

    let name = employeeRecord[key].firstName.concat(
      ' ',
      employeeRecord[key].lastName
    );

    empData.innerHTML =
      '<p class="name">' +
      name +
      '</p>' +
      '<P>' +
      employeeRecord[key].jobTitle.split('_').join(' ') +
      '<p>' +
      '<P>' +
      employeeRecord[key].department.split('_').join(' ') +
      '<p>';
    '<P>' + employeeRecord[key].location.split('_').join(' ') + '<p>';

    let socialIcons = document.createElement('div');
    socialIcons.id = 'socialIcons';
    this.addSocialIcons(socialIcons);
    empData.appendChild(socialIcons);
    //adding photo and employee data
    employeeCard.appendChild(photo);
    employeeCard.appendChild(empData);

    dashboard?.appendChild(employeeCard);
  }

  addSocialIcons(div: { appendChild: (arg0: HTMLAnchorElement) => void }) {
    //function to add social icons in employee data
    let icon;
    let atag;

    //icon for phone

    icon = document.createElement('i');
    icon.className = 'bi bi-telephone-fill';
    atag = document.createElement('a');
    atag.href = '..';
    atag.appendChild(icon);
    div.appendChild(atag);

    //icon for email
    icon = document.createElement('i');
    icon.className = 'bi bi-envelope-fill';
    atag = document.createElement('a');
    atag.href = '..';
    atag.appendChild(icon);
    div.appendChild(atag);

    //icon for message
    icon = document.createElement('i');
    icon.className = 'bi bi-chat-fill';
    atag = document.createElement('a');
    atag.href = '..';
    atag.appendChild(icon);
    div.appendChild(atag);

    //icon for star
    icon = document.createElement('i');
    icon.className = 'bi bi-star-fill';
    atag = document.createElement('a');
    atag.href = '..';
    atag.appendChild(icon);
    div.appendChild(atag);

    //icon for heart
    icon = document.createElement('i');
    icon.className = 'bi bi-heart-fill';
    atag = document.createElement('a');
    atag.href = '..';
    atag.appendChild(icon);
    div.appendChild(atag);
  }

  openProfile(id: any) {
    //console.log(id);

    this.dataService.profileSlected = id;
    const dialogRef = this.dialog.open(ProfileComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getRequiredResults() {
    if (this.dataService.selectedFiltersList.numberOfOptionSelected == 0) {
      this.loadDashboard();
      return;
    }
    document.getElementById('employeeDashboard')!.innerHTML = '';

    let resultMap = new Map<string, number>();

    for (let parent in this.dataService.selectedFiltersList) {
      if (this.dataService.selectedFiltersList[parent].count > 0) {
        for (let index in this.dataService.selectedFiltersList[parent].list) {
          let id = this.dataService.selectedFiltersList[parent].list[index];
          if (!resultMap.has(id)) {
            resultMap.set(id, 0);
          }
          let tmp = resultMap.get(id);
          resultMap.set(id, tmp! + 1);
        }
      }
    }

    resultMap.forEach((value: Number, key: string) => {
      if (
        value >= this.dataService.selectedFiltersList.numberOfOptionSelected
      ) {
        this.addEmployeeCard(key);
      }
    });

    for (let key in resultMap) {
      if (
        resultMap.get(key)! >=
        this.dataService.selectedFiltersList.numberOfOptionSelected
      ) {
        this.addEmployeeCard(key);
      }
    }
  }
}
