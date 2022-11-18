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

  titleFilterRecord: any = {
    Job_Title: {
      Intern: {
        name: 'Intern',
        id: [],
        count: 0,
      },
      Junior_Software_Development: {
        name: '',
        id: [],
        count: 0,
      },
      Software_Developer: {
        name: '',
        id: [],
        count: 0,
      },
      Account_Manager: {
        name: '',
        id: [],
        count: 0,
      },
      HR: {
        name: '',
        id: [],
        count: 0,
      },
    },
    Department: {
      Product_Engineer: {
        name: '',
        id: [],
        count: 0,
      },
      HR_Operations: {
        name: '',
        id: [],
        count: 0,
      },
      Finance_Accounts: {
        name: '',
        id: [],
        count: 0,
      },
      Quality_Analyst: {
        name: '',
        id: [],
        count: 0,
      },
      Data_Science: {
        name: '',
        id: [],
        count: 0,
      },
    },
    Location: {
      Hyderabad: {
        name: '',
        id: [],
        count: 0,
      },
      Seatle: {
        name: '',
        id: [],
        count: 0,
      },
      Hyderabad_Keka: {
        name: '',
        id: [],
        count: 0,
      },
      Remote: {
        name: '',
        id: [],
        count: 0,
      },
    },
  };

  selectedFiltersList: any = {
    numberOfOptionSelected: 0,
    Job_Title: {
      count: 0,
      list: [],
    },
    Department: {
      count: 0,
      list: [],
    },
    Location: {
      count: 0,
      list: [],
    },
    alphabeticalFilters: {
      count: 0,
      list: [],
    },
    inputSearchFilters: {
      count: 0,
      list: [],
    },
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
