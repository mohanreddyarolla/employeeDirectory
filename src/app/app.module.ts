import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {EmployeeServiceService} from './employee-service.service';
//flexLayout
import { FlexLayoutModule } from '@angular/flex-layout';

//Material UI apis
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EmployeeDirectoryComponent } from './employee-directory/employee-directory.component';
import { HeaderComponent } from './employee-directory/header/header.component';
import { ContentComponent } from './employee-directory/content/content.component';
import { TitleFiltersComponent } from './employee-directory/content/title-filters/title-filters.component';
import { AlphabeticalFiltersComponent } from './employee-directory/content/alphabetical-filters/alphabetical-filters.component';
import { InputSearchFiltersComponent } from './employee-directory/content/input-search-filters/input-search-filters.component';
import { AddOrEditEmployeeComponent } from './employee-directory/content/add-or-edit-employee/add-or-edit-employee.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { EmployeeDashboardComponent } from './employee-directory/content/employee-dashboard/employee-dashboard.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { ProfileComponent } from './employee-directory/content/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeDirectoryComponent,
    HeaderComponent,
    ContentComponent,
    TitleFiltersComponent,
    AlphabeticalFiltersComponent,
    InputSearchFiltersComponent,
    AddOrEditEmployeeComponent,
    EmployeeDashboardComponent,
    ProfileComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSelectModule,
    MatSidenavModule,
    MatCheckboxModule,
    FormsModule,
    MatDialogModule,
    MatInputModule
    
  ],
  providers: [EmployeeServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
