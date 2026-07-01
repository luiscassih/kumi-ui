import type { CSSProperties, Modifier } from "./modifier";

export type Composable =
  | UINode
  | string
  | number
  | boolean
  | null
  | undefined
  | ElementBuilder;

export interface UINode {
  name: string;
  ref: any;
  tag: string;
  props: Record<string, any>;
  styles: CSSProperties;
  _class: string;
  children: Composable[];
  _rawChildren: any[];
}

export class ElementBuilder<E extends HTMLElement = HTMLElement> {
  node: UINode;
  protected _parent?: ElementBuilder;
  protected _elements?: E;

  protected _accumulatedStyles: CSSProperties[] = []
  protected _pseudoStyles: { selector: string, modifier: Modifier }[] = []

  constructor(name: string, tag?: string) {
    this.node = {
      name,
      ref: null,
      tag: tag ?? name,
      props: {},
      styles: {},
      _class: "",
      children: [],
      _rawChildren: [],
    };
  }

  get parent() {
    return this.parent
  }

  protected onParentSet(_parent?: ElementBuilder) {}
  set parent(parent: ElementBuilder | undefined) {
    this._parent = parent
    this.onParentSet(parent)
  }

  modifier(modifier: Modifier): this {
    this._accumulatedStyles.push(modifier.build())
    return this
  }

  hover(modifier: Modifier): this {
    this._pseudoStyles.push({ selector: ":hover", modifier })
    return this
  }

  before(modifier: Modifier): this {
    this._pseudoStyles.push({ selector: "::before", modifier })
    return this
  }

  after(modifier: Modifier): this {
    this._pseudoStyles.push({ selector: "::after", modifier })
    return this
  }

  class(_class: string): this {
    if (this.node._class !== "") {
      this.node._class += " "
    }
    this.node._class += _class
    return this
  }

  children(...children: Composable[]): this {
    const normalized = children.map( c => {
      if (c instanceof ElementBuilder) {
        c.parent = this
        return c.build()
      }
      return c
    })
    this.node.children.push(...normalized)
    return this
  }

  rawChildren(_rawChildren: any[]): this {
    this.node._rawChildren = _rawChildren
    return this
  }

  prop(key: string, value: any): this {
    this.node.props[key] = value
    return this
  }

  ref(ref: any): this {
    this.node.ref = ref
    return this
  }

  build(): UINode {
    return this.node
  }
}

// export type ConstructedElement<E, Tag extends keyof HTMLElementTagNameMap> = T & {
//   [K in keyof ElementProps<Tag>]-?: (
//     value: NonNullable<ElementProps<Tag>[K]>
//   ) => ConstructedElement<E, Tag>;
// }

export const ConstructElement = (clazz: any, _tag: any) => (
  ...args: any[]
) => new clazz(_tag, ...args)
