import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';

@Component({
  selector: 'app-title-filters',
  templateUrl: './title-filters.component.html',
  styleUrls: ['./title-filters.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TitleFiltersComponent implements OnInit {
  constructor(private dataService: EmployeeServiceService) {
    //Subscription for employee add event
    this.dataService.employeeAddedSubject.subscribe(() => {
      this.loadTitleFilters();
    });

    //Subscription to triger clear filters
    this.dataService.clearFilterSubject.subscribe(() => {
      this.clearFilters();
    });
  }

  ngOnInit(): void {
    this.loadTitleFilters();
  }

  loadTitleFilters() {
    const titleFilters = this.dataService.titleFilterRecord;
    let titleFiltersDiv = document.getElementById('title-filters');

    if (titleFiltersDiv) {
      titleFiltersDiv!.innerHTML = '';
      let title: keyof typeof titleFilters;
      for (title in titleFilters) {
        let titleDiv = document.createElement('div');

        let h3tag = document.createElement('h3');
        h3tag.innerText = title;
        h3tag.id = title;
        titleDiv.appendChild(h3tag);

        let item: keyof typeof titleFilters[typeof title];

        for (item in titleFilters[title]) {
          let parent = title;
          let child = item;
          let itemButton = document.createElement('button');
          itemButton.innerText =
            item.split('_').join(' ') +
            ' (' +
            titleFilters[title][item].count +
            ')';

          itemButton.id = item;
          itemButton.className = 'optionDeSeleted';

          itemButton.addEventListener('click', (e: Event) => {
            this.optionClickedInTtleFilters(parent, child);
          });

          titleDiv.appendChild(itemButton);
        }

        titleFiltersDiv?.appendChild(titleDiv);
      }
    }
  }

  optionClickedInTtleFilters(parent: any, child: any) {
    let titleFiltersRecord = this.dataService.titleFilterRecord;

    let element = document.getElementById(child);

    let optionSelected: Boolean =
      element?.className == 'optionSelected' ? true : false;
    if (optionSelected) {
      if (this.dataService.selectedFiltersList[parent].count == 1) {
        this.dataService.selectedFiltersList.numberOfOptionSelected -= 1;
      }
      this.dataService.selectedFiltersList[parent].count -= 1;
    } else {
      if (this.dataService.selectedFiltersList[parent].count == 0) {
        this.dataService.selectedFiltersList.numberOfOptionSelected += 1;
      }
      this.dataService.selectedFiltersList[parent].count += 1;
    }

    for (let indx in titleFiltersRecord[parent][child].id) {
      let key = titleFiltersRecord[parent][child].id[indx];

      if (optionSelected) {
        let index =
          this.dataService.selectedFiltersList[parent].list.indexOf(key);
        this.dataService.selectedFiltersList[parent].list.splice(index, 1);
      } else {
        this.dataService.selectedFiltersList[parent].list.push(key);
      }
    }

    element!.className = optionSelected ? 'optionDeSelected' : 'optionSelected';
    this.dataService.filtersSubject.next('');
  }

  clearFilters() {
    const titleFilters = this.dataService.titleFilterRecord;
    let titleFiltersDiv = document.getElementById('title-filters');

    if (titleFiltersDiv) {
      let title: keyof typeof titleFilters;
      for (title in titleFilters) {
        let item: keyof typeof titleFilters[typeof title];

        for (item in titleFilters[title]) {
          let itemButton = document.getElementById(item);

          itemButton!.className = 'optionDeSeleted';
        }
      }
    }
  }
}
