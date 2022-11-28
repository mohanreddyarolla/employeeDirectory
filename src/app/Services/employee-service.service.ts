import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {
  profileSlected!: string; //storees the current selcted profile id
  editProfileClicked: boolean = false;
  totalCount = 1;
  employeeAddedSubject = new Subject(); //subject to be subcribed when an employee is edited or added.
  filtersSubject = new Subject(); //subject to be subscribed to load the filtered profiles
  clearFilterSubject = new Subject(); //subject to be subcribed to clear all the selected filters
  employeeRecord: { [key: string]: any } = {}; //stores the employee record

  title={id:[],count:0}

  titleFilterRecord: any = {
    Job_Title: {
      Intern: this.title,
      Junior_Software_Development:this.title,
      Software_Developer: this.title,
      Account_Manager:this.title,
      HR:this.title,
    },
    Department: {
      Product_Engineer:this.title,
      HR_Operations:this.title,
      Finance_Accounts:this.title,
      Quality_Analyst:this.title,
      Data_Science:this.title,
    },
    Location: {
      Hyderabad:this.title,
      Seatle:this.title,
      Hyderabad_Keka:this.title,
      Remote:this.title,
    },
  };

  countList={
    count: 0,
    list: [],
  }
  selectedFiltersList: any = {
    numberOfOptionSelected: 0,
    Job_Title: this.countList,
    Department: this.countList,
    Location: this.countList,
    alphabeticalFilters: this.countList,
    inputSearchFilters: this.countList,
  };

  loadServiceData() {
    //load the emplyee data when at initial stage
    if (localStorage.getItem('TitleFilterRecord')) {
      this.titleFilterRecord = JSON.parse(
        localStorage.getItem('TitleFilterRecord')!
      );
    }

    if (localStorage.getItem('TotalCount')) {
      this.totalCount = JSON.parse(localStorage.getItem('TotalCount')!);
    }

    if (localStorage.getItem('EmployeeRecord') != null) {
      this.employeeRecord = JSON.parse(localStorage.getItem('EmployeeRecord')!);
      console.log('this.employeeRecord');
      this.raiseAddEmployeeEvent();
    }
  }

  raiseAddEmployeeEvent() {
    //indicates about adding employee
    this.employeeAddedSubject.next('');
  }
}
