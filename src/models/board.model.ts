// board.model.ts
import { Column } from "./column.model";

export class Board {
  id: number;
  name: string;
  columns: Column[];

  constructor(id: number, name: string, columns: Column[] = []) {
    this.id = id;
    this.name = name;
    this.columns = columns;
  }
}
