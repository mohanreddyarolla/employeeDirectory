import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';



@Injectable({
  providedIn: 'root'
})


export class EmployeeServiceService {

  profileSlected!: string;
  editProfileClicked:boolean = false;

  employeeRecord:{ [key: string]: any }= {};
  titleFilterRecord:any={
    'Job_Title':{
      "Intern":{
        'name':'Intern',
        'id':[],
        'count':0
      },
      "Junior_Software_Development":{
        'name':'',
        'id':[],
        'count':0
      },
      "Software_Developer":{
        'name':'',
        'id':[],
        'count':0
      },
      "Account_Manager":{
        'name':'',
        'id':[],
        'count':0
      },
      "HR":{
        'name':'',
        'id':[],
        'count':0
      },

    },
    'Department':{
      "Product_Engineer":{
        'name':'',
        'id':[],
        'count':0
      },
      "HR_Operations":{
        'name':'',
        'id':[],
        'count':0
      },
      "Finance_Accounts":{
        'name':'',
        'id':[],
        'count':0
      },
      "Quality_Analyst":{
        'name':'',
        'id':[],
        'count':0
      },
      "Data_Science":{
        'name':'',
        'id':[],
        'count':0
      },
    },
    'Location':{
      "Hyderabad":{
        'name':'',
        'id':[],
        'count':0
      },
      "Seatle":{
        'name':'',
        'id':[],
        'count':0
      },
      "Hyderabad_Keka":{
        'name':'',
        'id':[],
        'count':0
      },
      "Remote":{
        'name':'',
        'id':[],
        'count':0
      },

    }
  }

//   output!: JSON;
//  output: JSON = <JSON>this.titleFilterRecord;

  employeeAddedSubject = new Subject();
  filtersSubject = new Subject();
  clearFilterSubject = new Subject();
  totalCount = 1;

  raiseAddEmployeeEvent()
  {
    this.employeeAddedSubject.next('');
  }
  
  // interface filtersList{
  //   count:0,
  //   list:[]
  // }
 

  selectedFiltersList :any =  {
    numberOfOptionSelected:0,
    Job_Title : {
      count:0,
      list: []
    },
    Department: {
      count:0,
      list: []
    },
    Location: {
      count:0,
      list:[]
    },
    alphabeticalFilters: {
      count:0,
      list: []
    },
    inputSearchFilters: {
      count:0,
      list:[]
    }
  }


  

}
