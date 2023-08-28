export interface Layout {
  // create a property for the id
  header?: {
    class?: string;
    children: Widget[]
  };
  body?: {
    class?: string;
    children: Widget[]
  };
  footer?: {
    class?: string;
    children: Widget[]
  };
}

export interface Widget {
  class?: string;
  component?: string;
  // to create a props property with key value pairs
  props?: any;
}

export interface SchemaData {
  id?: string;
  layout: Layout;
}
