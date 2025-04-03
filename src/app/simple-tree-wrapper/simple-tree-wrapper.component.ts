import {AfterViewInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList} from '@angular/core';
import {
  CellTemplateDirective,
  CheckboxColumnComponent,
  ColumnComponent,
  ColumnInfoService,
  ExpandableDirective,
  ExpandEvent,
  TreeListComponent
} from "@progress/kendo-angular-treelist";
import {NgForOf, NgIf} from "@angular/common";
import {EMPTY, Observable} from "rxjs";

type ColDef = { field: string, sortable?: boolean, locked?: boolean, width: number, title?: string, expandable?: boolean };

@Component({
  selector: 'app-simple-tree-wrapper',
  standalone: true,
  imports: [
    CellTemplateDirective,
    CheckboxColumnComponent,
    ColumnComponent,
    ExpandableDirective,
    TreeListComponent,
    NgForOf,
    NgIf
  ],
  providers: [
    ColumnInfoService,
  ],
  templateUrl: './simple-tree-wrapper.component.html',
  styleUrl: './simple-tree-wrapper.component.scss'
})
export class SimpleTreeWrapperComponent implements AfterViewInit {
  @Input() data: Array<any> | null | undefined;
  @Input() fetchChildren: (node: any) => (Observable<any[]> | any[]) = node => EMPTY;
  @Input() hasChildren: (node: any) => boolean = node => false;
  @Input() isExpanded: (node: any) => boolean = node => false;
  @Input() rowHeight: number = 0;
  @Input() pageSize: number = 0;
  @Output() collapse: EventEmitter<ExpandEvent> = new EventEmitter();
  @Output() expand: EventEmitter<ExpandEvent> = new EventEmitter();

  @Input()
  colDefs!: ColDef[];

  lockable: boolean = false

  ngAfterViewInit() {
    // simulate locked columns late initialized
    // -> resize sensors not yet available in afterViewInit of treelist list component
    setTimeout(() => this.lockable = true);
  }
}
