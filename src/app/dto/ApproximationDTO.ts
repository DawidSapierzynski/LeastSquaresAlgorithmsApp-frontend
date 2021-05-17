import {PointXY} from './PointXY';
import {MathematicalFunctionDTO} from './MathematicalFunction';

export class ApproximationDTO {
  public mathematicalFunctionDTOs: MathematicalFunctionDTO[];
  public points: PointXY[];
  public absoluteError: number;
  public convergenceCoefficient: number;

  constructor(mathematicalFunctionDTOs: MathematicalFunctionDTO[], points: PointXY[], absoluteError: number, convergenceCoefficient: number) {
    this.mathematicalFunctionDTOs = mathematicalFunctionDTOs;
    this.points = points;
    this.absoluteError = absoluteError;
    this.convergenceCoefficient = convergenceCoefficient;
  }
}
