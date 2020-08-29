import {MathematicalFunctionDTO} from './MathematicalFunction';
import {LeastSquaresMethod} from './LeastSquaresMethod';

export class ApproximationView {
  public mathematicalFunctionDTOs: MathematicalFunctionDTO[];
  public method: LeastSquaresMethod;
  public absoluteError: number;

  constructor(mathematicalFunctionDTOs: MathematicalFunctionDTO[], method: LeastSquaresMethod, absoluteError: number) {
    this.mathematicalFunctionDTOs = mathematicalFunctionDTOs;
    this.method = LeastSquaresMethod[method];
    this.absoluteError = absoluteError;
  }
}
