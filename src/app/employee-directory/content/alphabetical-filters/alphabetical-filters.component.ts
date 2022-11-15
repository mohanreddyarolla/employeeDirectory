import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { EmployeeServiceService } from 'src/app/employee-service.service';
@Component({
  selector: 'app-alphabetical-filters',
  templateUrl: './alphabetical-filters.component.html',
  styleUrls: ['./alphabetical-filters.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AlphabeticalFiltersComponent implements OnInit, AfterViewInit {
  constructor(private dataService: EmployeeServiceService) {
    this.dataService.clearFilterSubject.subscribe(()=>{
      this.clearFilters();
    });
  }

  ngAfterViewInit() {
    this.addAlphabets();
  }
  faCoffee = faCoffee;

  ngOnInit() {
    // this.addAlphabets();
  }

  addAlphabets() {
    console.log('called');
    let element = document.createElement('button');
    element.id = 'alpha-icon';
    element.classList.add('optionDeSelected');
    element.type = 'button';
    element.innerText = '0';
    // element.innerHTML='<fa-icon [icon]="faCoffee"></fa-icon>';

    // let iTag = document.createElement("fa-icon");
    // iTag.className = "fa-solid fa-user";
    // iTag.setAttribute('icon',"faCoffee")
    // element.appendChild(iTag);

    let alphaSearch: any = document.querySelector('#alphabets');
    alphaSearch.appendChild(element);
    for (let i = 65; i <= 90; i++) {
      let char = String.fromCharCode(i);

      let element = document.createElement('button');
      element.classList.add('alpha-button', 'alphabets', 'optionDeSelected');
      element.id = char;
      element.type = 'button';
      element.innerHTML = char;
      element.addEventListener('click', (e: Event) =>
        this.optionClickedInAlphabets(char)
      );

      let alphaSearch: any = document.querySelector('#alphabets');
      alphaSearch.appendChild(element);
      // console.log(alphaSearch);
    }
  }

  optionClickedInAlphabets(alphabet: string) {
    console.log(alphabet)
    let employeeRecord = this.dataService.employeeRecord;
    const item = document.getElementById(alphabet);

    if (item?.classList.contains('optionSelected')) {
      if (this.dataService.selectedFiltersList.alphabeticalFilters.count == 1) 
      {
        this.dataService.selectedFiltersList.numberOfOptionSelected -= 1;
      }
      this.dataService.selectedFiltersList.alphabeticalFilters.count -= 1;
    }
    else{
      if (this.dataService.selectedFiltersList.alphabeticalFilters.count == 0) 
          {
            this.dataService.selectedFiltersList.numberOfOptionSelected += 1;
          }

          this.dataService.selectedFiltersList.alphabeticalFilters.count += 1;

    }
    let key: keyof typeof employeeRecord;
    for (key in employeeRecord) {
      if (employeeRecord[key].firstName[0].toUpperCase() == alphabet) {
        console.log(key);
        if (item?.classList.contains('optionSelected')) {
          // if (this.dataService.selectedFiltersList.alphabeticalFilters.count == 1) 
          // {
          //   this.dataService.selectedFiltersList.numberOfOptionSelected -= 1;
          // }
          // this.dataService.selectedFiltersList.alphabeticalFilters.count -= 1;

          let index = this.dataService.selectedFiltersList.alphabeticalFilters.list.indexOf(key);
          console.log('index',index);
          console.log(this.dataService.selectedFiltersList.alphabeticalFilters.list);

          this.dataService.selectedFiltersList.alphabeticalFilters.list.splice(index,1);
          console.log(this.dataService.selectedFiltersList.alphabeticalFilters.list);

         
        } 
        else 
        {
          // if (this.dataService.selectedFiltersList.alphabeticalFilters.count == 0) 
          // {
          //   this.dataService.selectedFiltersList.numberOfOptionSelected += 1;
          // }

          // this.dataService.selectedFiltersList.alphabeticalFilters.count += 1;
          this.dataService.selectedFiltersList.alphabeticalFilters.list.push(key);
        }

       
      }
    }

    if (item?.classList.contains('optionSelected')){
      item.classList.remove('optionSelected');
      item.classList.add('optionDeSelected');
    }
    else{
      item?.classList.remove('optionDeSelected');
      item?.classList.add('optionSelected');
    }
    console.log(this.dataService.selectedFiltersList);
    this.dataService.filtersSubject.next('');

    // let employeeRecord = JSON.parse(localStorage.employeeRecord);
    // let ids = Object.keys(employeeRecord);
    // item = document.getElementById(alphabet);

    // //calculate the number of selected alphabets
    // if (item.classList.contains("optionSelected")) {
    //   no_alphabets_selected -= 1;
    // } else {
    //   no_alphabets_selected += 1;
    // }

    // ids.forEach((id) => {
    //   let a1 = employeeRecord[id].firstName[0].toLowerCase();
    //   let a2 = alphabet.toLowerCase();

    //   if (a1 == a2) {
    //     if (item.classList.contains("optionSelected")) {
    //       remove_from_search_inputs("alphabets", id);
    //     } else {
    //       save_in_search_inputs("alphabets", id);
    //     }
    //   }
    // });

    // //set the class of selected option as not selected and vice-versa
    // if (item.classList.contains("optionSelected")) {
    //   item.classList.remove("optionSelected");
    //   item.classList.add("optionDeSelected");
    //   no_option_selected -= 1;
    // } else {
    //   item.classList.remove("optionDeSelected");
    //   item.classList.add("optionSelected");
    //   no_option_selected += 1;
    // }
    // loadFilteredProfiles();
    // if (no_option_selected < 1) {
    //   //if no option is selected, then all the employee detiles to be displayed
    //   loadDashboard();
    // }
  }

  clearFilters()
  {
    for (let i = 65; i <= 90; i++) {
      let char = String.fromCharCode(i);
      let element = document.getElementById(char);

      if(element?.classList.contains('optiionSelected'))
      {
        element.classList.remove('optionselected');
        element.classList.add('optionDeSelected');
      }
    }  
  }
}
