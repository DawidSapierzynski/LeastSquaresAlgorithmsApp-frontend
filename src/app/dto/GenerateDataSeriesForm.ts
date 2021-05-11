import {MathematicalFunctionDTO} from './MathematicalFunction';

export class GenerateDataSeriesForm {
  public mathematicalFunctionDTO: MathematicalFunctionDTO;
  public numberPoints: number;
  public weightDistribution: string;
  public distanceX: string;
  public noise: boolean;

  constructor() {
  }
}
