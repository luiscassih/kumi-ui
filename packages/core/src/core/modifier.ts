export type CSSProperties = {
  [key: string]: string | number | undefined;
}

class ModifierBuilder {
  private styles: CSSProperties
  private _scale: number | { x: number, y: number }
  private _rotate: number | { x: number, y: number, z: number }
  private _rotate3d: { x: number, y: number, z: number, angle: number }
  private _translate: { x: number | string, y: number | string, z: number | string }


  constructor(styles: CSSProperties = {}) {
    this.styles = styles
  }

  extend(extra: CSSProperties): this {
    this.styles = { ...this.styles, ...extra }
    return this
  }

  build(): CSSProperties {
    return this.styles
  }
}

export type Modifier = ModifierBuilder

export const Modifier = (styles: CSSProperties = {}) => {
  return new ModifierBuilder(styles)
}
