import { Component, Input, OnInit, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Injector, ViewChild } from '@angular/core';
import { Widget } from 'src/app/models/layout.modle';
import { WidgetEngineService } from 'src/app/services/widget-engine.service';

@Component({
  selector: 'app-widget-engine',
  templateUrl: './widget-engine.component.html',
  styleUrls: ['./widget-engine.component.scss']
})
export class WidgetEngineComponent implements OnInit {
  @Input() widgets: Widget[] = [];
  @ViewChild("widgetsRef", {read: ViewContainerRef, static: true}) widgetsRef!: ViewContainerRef;
  // create a view container ref mapping to widgetsRef


  constructor(
    private widgetEngineService: WidgetEngineService,
    private injector: Injector,
  ) { }

  ngOnInit(): void {
    this.loadWidgets(this.widgets, this.widgetsRef).forEach((componentRef: ComponentRef<any>, index: number) => {
      console.log('componentRef', componentRef)
      const widget = this.widgets[index];
      this.bindComponentInputs(widget, componentRef);
      this.widgetsRef.insert(componentRef.hostView);
    });
  }


  loadComponent(widget: Widget, viewContainerRef: ViewContainerRef): ComponentRef<any> {
    // to crette a component factory resolver
    const componentFactoryResolver = this.injector.get(ComponentFactoryResolver);
    console.log('widget.component', widget.component)
    if (!widget.component) {
      throw new Error('Widget component is not defined');
    }
    const componentFactory = componentFactoryResolver.resolveComponentFactory(this.widgetEngineService.getComponentType(widget.component));
    const componentRef = viewContainerRef.createComponent(componentFactory);
    return componentRef;
  }

  /**
   * to bind component inputs
   * @param widget 
   * @param componentRef 
   */
  bindComponentInputs(widget: Widget, componentRef: ComponentRef<any>): void {
    const componentInputs = widget.props;
    console.log(widget.props)
    if (componentInputs) {
      Object.keys(componentInputs).forEach((key: string) => {
        componentRef.instance[key] = componentInputs[key];
      });
    }
  }

  loadWidgets(widgets: Widget[], viewContainerRef: ViewContainerRef): ComponentRef<any>[] {
    const componentRefs: ComponentRef<any>[] = [];
    widgets.forEach((widget: Widget) => {
      const componentRef = this.loadComponent(widget, viewContainerRef);
      componentRefs.push(componentRef);
    });
    return componentRefs;
  }  

  
}
