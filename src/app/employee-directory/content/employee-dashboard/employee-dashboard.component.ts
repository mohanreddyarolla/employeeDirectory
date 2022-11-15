
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, timeout } from 'rxjs';
import { EmployeeServiceService } from 'src/app/employee-service.service';
import { ProfileComponent } from '../profile/profile.component';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeDashboardComponent implements OnInit,AfterViewInit {
  addEmployeeSubscriber: Subscription = new Subscription();
  filterChangeSubscriber:Subscription = new Subscription();
  @ViewChild('employeeDashboard') employeeDashboard!: ElementRef;

  constructor(private dataService: EmployeeServiceService,public dialog: MatDialog) {
    this.addEmployeeSubscriber =
      this.dataService.employeeAddedSubject.subscribe(() => {
        this.loadDashboard();
      });

    this.filterChangeSubscriber = this.dataService.filtersSubject.subscribe(()=>{
      this.getRequiredResults();
    })
  }
  ngAfterViewInit(): void {
    setTimeout( () => {
      this.loadDashboard();
    }, 100);
  }
  ngOnInit(): void {
    setTimeout( () => {
      this.loadDashboard();
    }, 100);
    
  }

  

  loadDashboard() {
    
    let employeeRecord = this.dataService.employeeRecord;
    document.getElementById('employeeDashboard')!.innerHTML='';
    for (const key in employeeRecord) {
      this.addEmployeeCard(key)
    }
    // console.log('load dashboard called');
    // console.log(this.dataService.employeeRecord);
  }

  addEmployeeCard(key:any)
  {
    
    let employeeRecord = this.dataService.employeeRecord;
    //console.log(key,'-----',employeeRecord[key]);
    let dashboard = document.getElementById('employeeDashboard');

    let employeeCard = document.createElement('div');
      employeeCard.id = key;
      employeeCard.className = "employee-card";
      employeeCard.addEventListener('click', (e) => {

        this.openProfile(key);//your typescript function
        
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
        '<h4>' +
        name +
        '</h4>' +
        '<P>' +
        employeeRecord[key].jobTitle.split('_').join(' ') +
        '<p>' +
        '<P>' +
        employeeRecord[key].department.split('_').join(' ') +
        '<p>';
        '<P>' +
        employeeRecord[key].location.split('_').join(' ') +
        '<p>';

      //adding photo and employee data
      employeeCard.appendChild(photo);
      employeeCard.appendChild(empData);

      dashboard?.appendChild(employeeCard);
      //console.log(dashboard?.parentNode?.parentNode);
    }

    openProfile(id: any)
    {
      //console.log(id);

      this.dataService.profileSlected = id;
      const dialogRef = this.dialog.open(ProfileComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    }

    // loadFilteredCards()
    // {
      
    //   if(this.dataService.selectedFiltersList.numberOfOptionSelected == 0)
    //   {
    //     this.loadDashboard();
    //     return;
    //   }
      
    //   document.getElementById('employeeDashboard')!.innerHTML='';
    //   for(const key in this.dataService.selectedFiltersList.alphabeticalFilters.list){
    //     //console.log(key,this.dataService.selectedFiltersList.alphabeticalFilters.list[key]);
    //     this.addEmployeeCard(this.dataService.selectedFiltersList.alphabeticalFilters.list[key]);
    //   }
    //   this.getRequiredResults();
    // }

    getRequiredResults()
    {
      console.log(this.dataService.selectedFiltersList);
      if(this.dataService.selectedFiltersList.numberOfOptionSelected == 0)
      {
        this.loadDashboard();
        return;
      }
      document.getElementById('employeeDashboard')!.innerHTML='';

      let resultMap = new Map<string,number>();

      for(let parent in this.dataService.selectedFiltersList)
      {
        if(this.dataService.selectedFiltersList[parent].count > 0)
        {
          for(let index in this.dataService.selectedFiltersList[parent].list)
          {
            let id = this.dataService.selectedFiltersList[parent].list[index];
            if(!resultMap.has(id))
            {
              resultMap.set(id,0);
            }
            let tmp = resultMap.get(id);
            resultMap.set(id,tmp!+1)
          }
        }
      }

      //console.log('-------',resultMap.keys());

      resultMap.forEach((value:Number,key:string)=>
      {
        //console.log('rest---',resultMap.get(key));
        if(value >= this.dataService.selectedFiltersList.numberOfOptionSelected)
        {
          this.addEmployeeCard(key);
        }
      })

      for (let key in resultMap)
      {
        //console.log('result---',resultMap.get(key));
        if(resultMap.get(key)! >= this.dataService.selectedFiltersList.numberOfOptionSelected)
        {
          //console.log(key);
          this.addEmployeeCard(key);
        }
      }

      console.log('-------',resultMap);


    }

  }

