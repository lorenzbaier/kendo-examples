import {Component, OnInit, ViewChild} from '@angular/core';
import {ExpandEvent, TreeListComponent} from "@progress/kendo-angular-treelist";
import {delay, Observable, of} from "rxjs";
import {SortDescriptor} from '@progress/kendo-data-query';
import {SimpleTreeWrapperComponent} from "./simple-tree-wrapper/simple-tree-wrapper.component";

interface DummyData {
  id: number;
  name: string;
  description: string;
  children: DummyData[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SimpleTreeWrapperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'tree-row-height';

  @ViewChild('treeList', {static: true})
  treeList!: TreeListComponent;

  protected rowHeight = 48;

  protected treeData?: DummyData[];

  private treeDataBacking: DummyData[] = [
    {
      id: 1,
      name: 'some dummy',
      description: 'beautiful',
      children: []
    },
    {
      id: 2,
      name: 'another dummy',
      description: 'beautiful',
      children: [
        {
          id: 2001,
          name: 'child1',
          description: 'beautiful',
          children: []
        },
        {
          id: 2002,
          name: 'child2',
          description: 'beautiful',
          children: []
        }
      ]
    },
    {
      id: 3,
      name: 'i am',
      description: 'beautiful',
      children: []
    }
  ];

  protected pageSize = 20;

  // initResizeService in afterViewInit does not pick up any resize sensor because they are not initialized yet...

  constructor() {
    const addItems = this.pageSize - this.treeDataBacking.length - 1;
    for (let i = 0; i < addItems; i++) {
      this.treeDataBacking.push({
          id: 100000 + i,
          name: 'dummy' + i,
          description: 'some desc ' + i,
          children: i > addItems - 3 ? [
            {
              id: 3001,
              name: 'child1',
              description: 'beautiful',
              children: []
            },
            {
              id: 3002,
              name: 'child2',
              description: 'beautiful',
              children: []
            },
            {
              id: 3003,
              name: 'child3',
              description: 'beautiful',
              children: []
            }
          ] : []
        }
      )
    }
  }

  reload() {
    setTimeout(() => this.treeData = [...this.treeDataBacking], 1000); // simulate loading data
  }

  ngOnInit() {
    this.reload();
  }

  protected colDefs = [
    {field: 'id', locked: true, width: 100},
    {field: 'name', title: 'NAME', width: 200, sortable: true, expandable: true},
    {field: 'description', title: 'DESCRIPTION', width: 1000, sortable: true},
  ];
  protected sort: SortDescriptor[] = [];

  protected expandedIds: Set<number> = new Set();

  protected fetchChildrenImpl: (node: DummyData) => (Observable<DummyData[]>) = node => of(node.children).pipe(delay(500));
  protected hasChildrenImpl: (node: DummyData) => boolean = node => !!node.children.length
  protected isExpanded: (node: DummyData) => boolean = node => this.expandedIds.has(node.id)

  protected handleCollapse(e: ExpandEvent) {
    this.expandedIds.delete(e.dataItem.id);
  }

  protected handleExpand(e: ExpandEvent) {
    this.expandedIds.add(e.dataItem.id);
  }

  public toggleItem(event: MouseEvent, dataItem: DummyData): void {
    event.stopPropagation();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (this.treeList as any).expandStateService.toggleState(dataItem);
    // this.updateDropzoneRows();
  }
}
