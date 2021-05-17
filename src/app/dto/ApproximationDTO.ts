import {PointXY} from './PointXY';
import {MathematicalFunctionDTO} from './MathematicalFunction';

export class ApproximationDTO {
  public mathematicalFunctionDTOs: MathematicalFunctionDTO[];
  public points: PointXY[];
  public absoluteError: number;
  public rsquared: number;

  constructor(mathematicalFunctionDTOs: MathematicalFunctionDTO[], points: PointXY[], absoluteError: number, rSquared: number) {
    this.mathematicalFunctionDTOs = mathematicalFunctionDTOs;
    this.points = points;
    this.absoluteError = absoluteError;
    this.rsquared = rSquared;
  }
}
