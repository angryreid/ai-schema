export interface Layout {
  // create a property for the id
  header?: {
    children: Widget[]
  };
  body?: {
    children: Widget[]
  };
  footer?: {
    children: Widget[]
  };
}

export interface Widget {
  class?: string;
  component?: string;
  // to create a props property with key value pairs
  props?: any;
}

