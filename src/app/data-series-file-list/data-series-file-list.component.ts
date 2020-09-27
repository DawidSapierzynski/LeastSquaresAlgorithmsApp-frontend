import {Component, OnInit} from '@angular/core';
import {DataSeriesFileDTO} from '../dto/DataSeriesFileDTO';
import {HttpDataSeriesFileService} from '../service/data-series-file/http-data-series-file.service';
import {TokenStorageService} from '../service/auth/token-storage.service';
import {HttpApproximationPropertiesService} from '../service/approximation-properties/http-approximation-properties.service';
import {Router} from '@angular/router';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from '../service/message/message.service';
import {Message, MessageType} from '../message/Message';

@Component({
  selector: 'app-data-series-file-listr',
  templateUrl: './data-series-file-list.component.html',
  styleUrls: ['./data-series-file-list.component.css']
})
export class DataSeriesFileListComponent implements OnInit {

  constructor(
    private dataSeriesFileService: HttpDataSeriesFileService,
    private tokenStorage: TokenStorageService,
    private modalService: NgbModal,
    private approximationPropertiesService: HttpApproximationPropertiesService,
    private router: Router,
    private messageService: MessageService
  ) {
  }

  private roles: string[];
  degree: number;
  dataSeriesFileDTOList: DataSeriesFileDTO[];
  isDisabledButton: boolean;
  private selectedList: DataSeriesFileDTO[];

  static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.tokenStorage.rolesObservable.subscribe(r => {
      this.roles = r;
    });

    this.loadDataSeriesFile();
    this.degree = 3;
  }

  checkRoles(role: string) {
    return this.roles.includes(role);
  }

  openCreate(create, id: number) {
    this.modalService.open(create, {ariaLabelledBy: 'create-approximation-properties'}).result.then((result) => {
      this.degree = result;
      this.approximationPropertiesService.postApproximationProperties(this.degree, id)
        .subscribe(data => {
          this.router.navigate(['/approximation-properties-detail', data.id]);
        });
    }, (reason) => {
      console.log(`Dismissed ${DataSeriesFileListComponent.getDismissReason(reason)}`);
    });
  }

  openDelete(deleted) {
    this.modalService.open(deleted, {ariaLabelledBy: 'Delete-approximation-properties'}).result.then(() => {
      this.deletedSelected();
    }, (reason) => {
      console.log(`Dismissed ${DataSeriesFileListComponent.getDismissReason(reason)}`);
    });
  }

  selected(dataSeriesFileDTO: DataSeriesFileDTO) {
    if (this.selectedList.includes(dataSeriesFileDTO)) {
      const index = this.selectedList.indexOf(dataSeriesFileDTO, 0);
      if (index > -1) {
        this.selectedList.splice(index, 1);
      }
    } else {
      this.selectedList.push(dataSeriesFileDTO);
    }
    this.isDisabledButton = this.selectedList.length === 0;
  }

  private deletedSelected() {
    this.isDisabledButton = true;
    for (const i of this.selectedList) {
      this.dataSeriesFileService.deleteDataSeriesFilesAdmin(i.id).subscribe(
        data => {
          this.messageService.sendMessage(new Message(data.message, MessageType.SUCCESS));
          this.loadDataSeriesFile();
        });
    }
  }

  private loadDataSeriesFile() {
    if (this.checkRoles('ADMIN')) {
      this.dataSeriesFileService.getDataSeriesFilesAdmin().subscribe(
        data => {
          this.dataSeriesFileDTOList = data;
        });
    } else if (this.checkRoles('USER')) {
      this.dataSeriesFileService.getDataSeriesFilesUser().subscribe(
        data => {
          this.dataSeriesFileDTOList = data;
        });
    }
    this.selectedList = [];
    this.isDisabledButton = true;
  }

}
