export enum TodoModelType {
  GREEN,
  RED,
  ORANGE
}

export const getColor = (type: TodoModelType) => {
  switch (type) {
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

export class TodoModel {
  constructor(
    public id: number,
    public title: string,
    public type: TodoModelType,
    public startDate: Date,
    public content: string
  ) { }

  get color() {
    return getColor(this.type)
  }

  get isOutdated() {
    return this.startDate < new Date()
  }
}
