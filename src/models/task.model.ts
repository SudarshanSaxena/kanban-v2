// task.model.ts
export class Task {
  id: number;
  name: string;
  description: string;
  currentIndex: number;

  constructor(id: number, name: string, description: string,currentIndex: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.currentIndex = currentIndex
  }
}
