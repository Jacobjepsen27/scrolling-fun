/**
 * Holds information about when animation should start/end and from where.
 */
export interface Position {
  start: {
    percent: number
    x: number
    y: number
  }
  end: {
    percent: number
    x: number
    y: number
  }
}
