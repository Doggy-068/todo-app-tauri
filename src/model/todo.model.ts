export enum TodoModelType {
  GREEN,
  RED,
  ORANGE
}

export class TodoModel {
  constructor(
    public id: number,
    public title: string,
    public type: TodoModelType,
    public startDate: Date,
    public content: string
  ) { }

  get color() {
    switch (this.type) {
      case TodoModelType.GREEN:
        return '#a2c69b'
      case TodoModelType.ORANGE:
        return '#f3af27'
      case TodoModelType.RED:
        return '#df4c5b'
      default:
        return '#ffffff'
    }
  }

  get isOutdated() {
    return this.startDate < new Date()
  }
}
