import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileDropModule } from 'ngx-file-drop';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DockerAssetComponent } from './dashboard/docker-asset/docker-asset.component';
import { KubernetesAssetComponent } from './dashboard/kubernetes-asset/kubernetes-asset.component';
import { WelcomePageComponent } from './dashboard/welcome-page/welcome-page.component';
import { TerraformUploadComponent } from './dashboard/terraform-upload/terraform-upload.component';
import { OkeDeploymentService } from './oke-deployment.service';

@NgModule({
  declarations: [
    AppComponent,
    DockerAssetComponent,
    KubernetesAssetComponent,
    WelcomePageComponent,
    TerraformUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FileDropModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: WelcomePageComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'kubernetes', component: KubernetesAssetComponent},
      { path: 'docker', component: DockerAssetComponent},
      { path: 'deployment', component: TerraformUploadComponent},

    ]),
    MaterialModule,
    BrowserAnimationsModule
    
  ],
  providers: [
    OkeDeploymentService
    ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
