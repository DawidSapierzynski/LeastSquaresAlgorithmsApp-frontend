import {LeastSquaresMethod} from './LeastSquaresMethod';

export class ChosenMethodDTO {
  public leastSquaresMethod: LeastSquaresMethod;
  public leastSquaresMethodName: string;
  public degree: number;
  public isUsed: boolean;

  constructor(method: LeastSquaresMethod, degree: number) {
    this.leastSquaresMethod = method;
    this.leastSquaresMethodName = LeastSquaresMethod[method];
    this.degree = degree;
    this.isUsed = false;
  }
}
