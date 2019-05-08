import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OkeDeploymentService } from '../../oke-deployment.service';

@Component({
  selector: 'app-terraform-upload',
  templateUrl: './terraform-upload.component.html',
  styleUrls: ['./terraform-upload.component.scss']
})
export class TerraformUploadComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  uploadForm: FormGroup;

  clustercreate: any;
  createnewCluster: Boolean = false;
  existingcluster: Boolean = false;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  public files: UploadFile[] = [];
 
  from: any;
  user: any;
  githublink: any;
  expose: any;
  copyfrom: any;
  copyto: any;
  workdir: any;
  cmd: any;
  cmdArray = [];
  runcmd: any;
  runcmdarray = [];
  finalcmdRUN: any;
  finalcmdCMD: any;
  dockerObj: any;

  showbutton: Boolean = false;


  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, 
    private router: Router, private okeservice: OkeDeploymentService) {

    const finalstring = '';
    //"[" + "'" + this.cmdArray.join("','") + "'" + "]";
    const dockerObj = `
FROM ${this.from}
USER ${this.user}
EXPOSE ${this.expose}
RUN ${this.finalcmdRUN}
COPY ${this.copyFromAndTo}
WORKDIR ${this.workdir}
CMD ${finalstring}`;

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params.from)
      if(params.from == 'deployment'){
        this.showbutton = true;
      }

    })
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }

  newCluster() {
    console.log('new cluster', this.clustercreate);
    if ( this.clustercreate == 'true'){
      this.createnewCluster = true;
      this.existingcluster = false;

    }
    else if (this.clustercreate == 'false'){
      this.createnewCluster = false;
      this.existingcluster = true;

    }
  }



  openDockerPage(){
    this.router.navigate(['/docker'], { queryParams: { from: 'deployment' } });
  }
  addruncmds(rcmd) {
    console.log(rcmd)
    const arraysplit = rcmd.split(',');
    for (let i = 0; i < arraysplit.length; i++) {
      this.runcmdarray.push(arraysplit[i]);
    }
    this.runcmd = '';
    this.finalcmdRUN = (this.runcmdarray.toString()).replace(/,/g, ' && ');
  }

  addcmds(cmd) {
    const arraysplit = cmd.split(',');
    console.log(arraysplit)
    for (let i = 0; i < arraysplit.length; i++) {
      this.cmdArray.push(arraysplit[i]);
      console.log(this.cmdArray)
    }
    this.cmd = '';
    this.finalcmdCMD = (this.cmdArray.toString());

  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      console.log(event)
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
      console.log(this.uploadForm)
    }
  }

  initiateTenency(){
    console.log(this.uploadForm.get('profile').value)
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    console.log(formData)
    this.okeservice.uploadOciKey(this.uploadForm.get('profile').value)
      .subscribe(
        data => console.log('success', data),
        error => console.log(error)
      );
  }

  generateDocker() {
    console.log(this.dockerfile);
    document.getElementById('dockerDiv').style.display = 'block';


  }

  clear(clearobj) {

    if (clearobj == 'runcmd') {
      this.runcmd = '';
      this.runcmdarray = [];
      this.finalcmdRUN = '';
    }
    else if (clearobj == 'cmd') {
      this.cmd = '';
      this.cmdArray = [];
      this.finalcmdCMD = '';

    }

  }

  downloadyaml(yamlfile) {
    console.log(yamlfile)
    function download(filename, text) {
      const pom = document.createElement('a');
      pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      pom.setAttribute('download', filename);

      if (document.createEvent) {
        const event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
      }
      else {
        pom.click();
      }
    }
    download('docker.yaml', yamlfile);
  }

  dockerfile() {
    const finalstring = "[" + "'" + this.cmdArray.join("','") + "'" + "]";
     this.dockerObj = `
FROM ${this.from}
USER ${this.user}
EXPOSE ${this.expose}
RUN ${this.finalcmdRUN}
COPY ${this.copyFromAndTo}
WORKDIR ${this.workdir}
CMD ${finalstring}`;
    return this.dockerObj;

  }

copyFromAndTo() {
    return (this.copyfrom + ' ' + this.copyto);
  }





}
