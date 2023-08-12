import { Component, Input, OnInit } from '@angular/core';
import { MetadataService } from '../../services/metadata.service';
import { Layout } from '../../models/layout.modle';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout-engine',
  templateUrl: './layout-engine.component.html',
  styleUrls: ['./layout-engine.component.scss']
})
export class LayoutEngineComponent implements OnInit {
  @Input() pageName: string;

  public config: Layout = {};
  public layoutId: string = 'layout-1';

  constructor(
    private metadataService: MetadataService,
    private route: ActivatedRoute,
  ) { 
    // get this page name from router path
    console.log('this.route', this.route)
    const path = this.route.snapshot.routeConfig?.path
     || 'home';
    // this page name should be `ai-schema-` with path
    this.pageName = `ai-schema-${path}`;
    console.log('this.pageName', this.pageName)
    this.metadataService.getMetadata(this.pageName).subscribe((data: any) => {
      this.config = data?.layout;
      this.layoutId = data?.id;
      });
  }

  ngOnInit(): void {
  }
}
