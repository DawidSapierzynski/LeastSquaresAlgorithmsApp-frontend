import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpApproximationPropertiesService} from '../../service/approximation-properties/http-approximation-properties.service';
import {ChosenMethodDTO} from '../../dto/ChosenMethodDTO';
import {ApproximationPropertiesDTO} from '../../dto/ApproximationPropertiesDTO';
import {Chart} from 'chart.js';
import 'chartjs-plugin-zoom';
import {ApproximationView} from '../../dto/ApproximationView';
import {DomainFunction} from '../../dto/DomainFunction';
import {HttpDownloadService} from '../../service/download/http-download.service';
import {MathematicalFunctionDTO} from '../../dto/MathematicalFunction';
import {saveAs as importedSaveAs} from 'file-saver';
import {TokenStorageService} from '../../service/auth/token-storage.service';
import {LeastSquaresMethod} from '../../dto/LeastSquaresMethod';

@Component({
  selector: 'app-series-properties',
  templateUrl: './approximation-properties-detail.component.html',
  styleUrls: ['./approximation-properties-detail.component.css']
})
export class ApproximationPropertiesDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private approximationPropertiesService: HttpApproximationPropertiesService,
    private downloadService: HttpDownloadService,
    private tokenStorage: TokenStorageService,
  ) {
  }

  private fileName = 'approximationFile.txt';

  roles: string[];
  approximationProperties: ApproximationPropertiesDTO;
  chosenMethods: ChosenMethodDTO[];
  approximationViews: ApproximationView[] = [];
  private scatterChart: Chart;
  private colors: string[] = ['yellow', 'green', 'blue', 'black'];
  private nbColor = 0;
  private datasets = [];

  private static getChart(data) {
    return new Chart('scatterChart', {
      type: 'scatter',
      data: {
        datasets: data
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy'
            },
            zoom: {
              enabled: true,
              mode: 'xy'
            }
          }
        },
        responsive: true
      }
    });
  }

  ngOnInit() {
    this.tokenStorage.rolesObservable.subscribe(r => {
      this.roles = r;
    });
    this.route.params.subscribe(
      (queryparams: Params) => {
        this.approximationPropertiesService.getApproximationProperties(queryparams.id).subscribe(
          data => {
            this.approximationProperties = data;
            this.chosenMethods = undefined;
            this.datasets = [{
              label: 'Points (' + data.dataSeriesFileDTO.points.length + ')',
              data: data.dataSeriesFileDTO.points,
              borderColor: 'red',
              backgroundColor: 'red',
              borderWidth: 1.5
            }];
            this.scatterChart = ApproximationPropertiesDetailComponent.getChart(this.datasets);
          });
      });
  }

  selectMethods(): void {
    this.approximationPropertiesService.selectMethods(this.approximationProperties)
      .subscribe(data => {
        this.chosenMethods = data;
        this.chosenMethods.forEach(c =>
          c.leastSquaresMethodName = LeastSquaresMethod[c.leastSquaresMethod]
        );
      });
  }

  doApproximations(chosenMethod: ChosenMethodDTO): void {
    if (this.nbColor >= 3) {
      this.nbColor = 0;
    } else {
      this.nbColor++;
    }
    this.approximationPropertiesService.doApproximations(chosenMethod, this.approximationProperties.dataSeriesFileDTO.points).subscribe(
      data => {
        this.approximationViews
          .push(new ApproximationView(data.mathematicalFunctionDTOs, chosenMethod.leastSquaresMethod, data.absoluteError, data.convergenceCoefficient));
        this.datasets.push({
          label: LeastSquaresMethod[chosenMethod.leastSquaresMethod] + ' (' + chosenMethod.degree + ')',
          data: data.points,
          borderColor: this.colors[this.nbColor],
          backgroundColor: this.colors[this.nbColor],
          showLine: true,
          fill: false,
          pointRadius: 0
        });
        this.scatterChart.update();
      });

    chosenMethod.isUsed = true;
  }

  coefficientsString(coefficients: number[]): string {
    return coefficients.map((value, index) => `a${index}=${value}`).join(', ');
  }

  domainString(domain: DomainFunction): string {
    return (domain.leftClosedInterval ? '<' : '(') + domain.beginningInterval + '; '
      + domain.endInterval + (domain.rightClosedInterval ? '>' : ')');
  }

  download(mathematicalFunctionDTOs: MathematicalFunctionDTO[]) {
    this.downloadService.downloadApproximation(mathematicalFunctionDTOs).subscribe(blobParts => {
      importedSaveAs(blobParts, this.fileName);
    });

  }
}
