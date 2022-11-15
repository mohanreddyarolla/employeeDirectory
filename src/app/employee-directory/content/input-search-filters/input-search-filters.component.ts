import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from 'src/app/employee-service.service';

@Component({
  selector: 'app-input-search-filters',
  templateUrl: './input-search-filters.component.html',
  styleUrls: ['./input-search-filters.component.css']
})
export class InputSearchFiltersComponent implements OnInit {
  
  enteredInput='';
  selectedOption='';
  clearBtndisable=true;
  constructor(private dataService:EmployeeServiceService) { 
    this.dataService.clearFilterSubject.subscribe(()=>{
      this.clearFilter();
    });
  }


  ngOnInit(): void {
  }

  searchInput()
  {
    if(this.clearBtndisable)
    {
      this.dataService.selectedFiltersList.numberOfOptionSelected += 1;
    }
    this.clearBtndisable = false;
    let employeeRecord = this.dataService.employeeRecord;
    this.dataService.selectedFiltersList.inputSearchFilters.count = 0;
    this.dataService.selectedFiltersList.inputSearchFilters.list=[]
    
   for(let key in employeeRecord)
   {
    console.log('inFor ',key);
    if(employeeRecord[key][this.selectedOption].toLowerCase() == this.enteredInput.toLowerCase())
    {
      console.log('inIf ',key);
      
      this.dataService.selectedFiltersList.inputSearchFilters.list.push(key);
      this.dataService.selectedFiltersList.inputSearchFilters.count +=1 ;

    }

    
    this.dataService.filtersSubject.next('');
   }

  }
  clearFilter(){
    if(!this.clearBtndisable)
    {
      this.dataService.selectedFiltersList.numberOfOptionSelected -= 1;
      this.clearBtndisable = true;
    }
    this.dataService.selectedFiltersList.inputSearchFilters.list=[]
    this.dataService.selectedFiltersList.inputSearchFilters.count = 0;
    
    this.enteredInput='';
    this.selectedOption='';
  }

}
