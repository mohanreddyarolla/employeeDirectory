import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
@Component({
  selector: 'app-alphabetical-filters',
  templateUrl: './alphabetical-filters.component.html',
  styleUrls: ['./alphabetical-filters.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AlphabeticalFiltersComponent implements OnInit, AfterViewInit {
  constructor(private dataService: EmployeeServiceService) {
    this.dataService.clearFilterSubject.subscribe(() => {
      this.clearFilters();
    });
  }

  ngAfterViewInit() {
    this.addAlphabets();
  }

  ngOnInit() {
    // this.addAlphabets();
  }

  addAlphabets() {
    let element = document.createElement('button');
    element.id = 'alpha-icon';
    element.classList.add('optionDeSelected');
    element.type = 'button';
    element.innerText = '0';

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
    }
  }

  optionClickedInAlphabets(alphabet: string) {
    
    let employeeRecord = this.dataService.employeeRecord;
    const item = document.getElementById(alphabet);

    if (item?.classList.contains('optionSelected')) {
      if (this.dataService.selectedFiltersList.alphabeticalFilters.count == 1) {
        this.dataService.selectedFiltersList.numberOfOptionSelected -= 1;
      }
      this.dataService.selectedFiltersList.alphabeticalFilters.count -= 1;
    } else {
      if (this.dataService.selectedFiltersList.alphabeticalFilters.count == 0) {
        this.dataService.selectedFiltersList.numberOfOptionSelected += 1;
      }

      this.dataService.selectedFiltersList.alphabeticalFilters.count += 1;
    }

    let key: keyof typeof employeeRecord;
    for (key in employeeRecord) {
      if (employeeRecord[key].firstName[0].toUpperCase() == alphabet) {
        //if it matches then included int the list
        if (item?.classList.contains('optionSelected')) {
          let index =
            this.dataService.selectedFiltersList.alphabeticalFilters.list.indexOf(
              key
            );

          this.dataService.selectedFiltersList.alphabeticalFilters.list.splice(
            index,
            1
          );
        } else {
          this.dataService.selectedFiltersList.alphabeticalFilters.list.push(
            key
          );
        }
      }
    }

    //setting required class to teh buttons
    if (item?.classList.contains('optionSelected')) {
      item.classList.remove('optionSelected');
      item.classList.add('optionDeSelected');
    } else {
      item?.classList.remove('optionDeSelected');
      item?.classList.add('optionSelected');
    }

    this.dataService.filtersSubject.next('');
  }

  clearFilters() {
    for (let i = 65; i <= 90; i++) {
      let char = String.fromCharCode(i);
      let element = document.getElementById(char);
    
      if (element!.classList.contains('optionSelected')) {
        console.log(char);
        element!.classList.remove('optionSelected');
        element!.classList.add('optionDeSelected');
      }
    }
    
  }
}
