import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlphabeticalFiltersComponent } from './alphabetical-filters/alphabetical-filters.component';
import {MatDialog} from '@angular/material/dialog';
import { AddOrEditEmployeeComponent } from './add-or-edit-employee/add-or-edit-employee.component';
import { EmployeeServiceService } from 'src/app/employee-service.service';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class ContentComponent implements OnInit{

  @Input() currentScreenSize:any;
  @ViewChild(AlphabeticalFiltersComponent) alpha!:AlphabeticalFiltersComponent;
  
  constructor(config: NgbModalConfig, private modalService: NgbModal,public dialog: MatDialog,private count:EmployeeServiceService) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
    //console.log(this.currentScreenSize);
	}


	open(content: any,id:any) {
    // this.alpha.addAlphabets();
    
    this.modalService.open(content);
    
	}

  openDialog() {
    
    const dialogRef = this.dialog.open(AddOrEditEmployeeComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
 
  opened: boolean=true;

 

  ngOnInit(): void {
  }

}
