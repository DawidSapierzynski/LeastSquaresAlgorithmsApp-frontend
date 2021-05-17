import {MathematicalFunctionDTO} from './MathematicalFunction';
import {LeastSquaresMethod} from './LeastSquaresMethod';

export class ApproximationView {
  public mathematicalFunctionDTOs: MathematicalFunctionDTO[];
  public method: LeastSquaresMethod;
  public absoluteError: number;
  public convergenceCoefficient: number;

  constructor(mathematicalFunctionDTOs: MathematicalFunctionDTO[], method: LeastSquaresMethod, absoluteError: number, convergenceCoefficient: number) {
    this.mathematicalFunctionDTOs = mathematicalFunctionDTOs;
    this.method = LeastSquaresMethod[method];
    this.absoluteError = absoluteError;
    this.convergenceCoefficient = convergenceCoefficient;
  }
}
