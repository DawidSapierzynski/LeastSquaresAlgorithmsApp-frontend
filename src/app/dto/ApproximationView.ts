import {MathematicalFunctionDTO} from './MathematicalFunction';
import {LeastSquaresMethod} from './LeastSquaresMethod';

export class ApproximationView {
  public mathematicalFunctionDTOs: MathematicalFunctionDTO[];
  public method: LeastSquaresMethod;
  public absoluteError: number;
  public rSquared: number;

  constructor(mathematicalFunctionDTOs: MathematicalFunctionDTO[], method: LeastSquaresMethod, absoluteError: number, rSquared: number) {
    this.mathematicalFunctionDTOs = mathematicalFunctionDTOs;
    this.method = LeastSquaresMethod[method];
    this.absoluteError = absoluteError;
    this.rSquared = rSquared;
  }
}
