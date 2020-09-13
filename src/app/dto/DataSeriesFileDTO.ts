import {PointXY} from './PointXY';

export class DataSeriesFileDTO {
  public id: number;
  public userId: number;
  public size: number;
  public variance: number;
  public standardDeviation: number;
  public name: string;
  public hashName: string;
  public dateSent: Date;
  public deleted: boolean;
  public points: Array<PointXY>;

  constructor() {
  }
}
