import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-docker-asset',
  templateUrl: './docker-asset.component.html',
  styleUrls: ['./docker-asset.component.scss']
})
export class DockerAssetComponent implements OnInit {
  from: any;
  user: any;
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


  constructor(private route: ActivatedRoute) {

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
