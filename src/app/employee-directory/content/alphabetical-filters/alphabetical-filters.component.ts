import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-alphabetical-filters',
  templateUrl: './alphabetical-filters.component.html',
  styleUrls: ['./alphabetical-filters.component.css'],
  
})
export class AlphabeticalFiltersComponent implements OnInit {

  constructor() { 
    
  }
  faCoffee = faCoffee;
  
  ngOnInit(){
    this.addAlphabets();
  }


  addAlphabets() {
    console.log('dlfdk');
    let element = document.createElement("button");
    element.id = "alpha-icon";
    element.classList.add("optionDeSelected");
    element.type = "button";
    element.setAttribute("onclick", "optionClickedOnAlphaIcon();");
    element.innerText='0';
    // element.innerHTML='<fa-icon [icon]="faCoffee"></fa-icon>';

    // let iTag = document.createElement("fa-icon");
    // iTag.className = "fa-solid fa-user";
    // iTag.setAttribute('icon',"faCoffee")
    // element.appendChild(iTag);
    
  
    let alphaSearch:any = document.querySelector("#alphabets");
    alphaSearch.appendChild(element);
    for (let i = 65; i <= 90; i++) {
      let char = String.fromCharCode(i);
  
      let element = document.createElement("button");
      element.classList.add("alpha-button", "alphabets", "optionDeSelected");
      element.id = char;
      element.type = "button";
      element.innerHTML = char;
      element.setAttribute("onclick", "optionClickedInAlphabets(this.id);");
  
      let alphaSearch:any = document.querySelector("#alphabets");
      alphaSearch.appendChild(element);
      
    }
    
  }

}
