import { ConstructElement, ElementBuilder } from "../core/builder";

class BoxBuilder extends ElementBuilder {
  constructor() {
    super("Box")
  }
}

export const Box = ConstructElement(BoxBuilder, "div")
