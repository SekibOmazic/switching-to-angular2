import {QueryList, ContentChildren, Directive, Inject, EventEmitter, Output, Component, forwardRef, View, Host, Attribute, CORE_DIRECTIVES, bootstrap} from 'angular2/angular2';

@Component({
  selector: 'tab-title',
  styles: [`
    .tab-title {
      display: inline-block;
      cursor: pointer;
      padding: 5px;
      border: 1px solid #ccc;
    }
  `],
  template: `
    <div class="tab-title" (click)="handleClick()">
      <ng-content/>
    </div>
  `
})
class TabTitle {
  @Output('selected')
  tabClicked: EventEmitter = new EventEmitter();
  handleClick() {
    this.tabClicked.next();
  }
}

@Component({
  selector: 'tab-content',
  styles: [`
    .tab-content {
      border: 1px solid #ccc;
      border-top: none;
      padding: 5px;
    }
  `],
  template: `
    <div class="tab-content" [hidden]="!isActive">
      <ng-content/>
    </div>
  `
})
class TabContent {
  isActive: boolean = false;
}

@Component({
  selector: 'tabs',
  directives: [CORE_DIRECTIVES],
  styles: [
    `
      .tab {
        display: inline-block;
      }
      .tab-nav {
        list-style: none;
        padding: 0;
        margin: 0;
      }
    `
  ],
  template: `
    <div class="tab">
      <div class="tab-nav">
        <ng-content select="tab-title"/>
      </div>
      <ng-content select="tab-content"/>
    </div>
  `
})
class Tabs {
  @Output('changed')
  tabChanged: EventEmitter = new EventEmitter();

  @ContentChildren(TabTitle)
  tabTitles: QueryList<TabTitle>;

  @ContentChildren(TabContent)
  tabContents: QueryList<TabContent>;

  active: number;

  select(index) {
    let contents: TabContent[] = this.tabContents.toArray();
    contents[this.active].isActive = false;
    this.active = index;
    contents[this.active].isActive = true;
    this.tabChanged.next(index);
  }
  afterContentInit() {
    this.tabTitles.map(t => t.tabClicked.toRx()).forEach((t, i) => {
      t.subscribe(_ => {
        this.select(i)
      });
    });
    this.active = 0;
    this.select(0);
  }
}

@Component({
  selector: 'app',
  template: `
    <tabs (changed)="tabChanged($event)">
      <tab-title>Tab 1</tab-title>
      <tab-content>Content 1</tab-content>
      <tab-title>Tab 2</tab-title>
      <tab-content>Content 2</tab-content>
    </tabs>
  `,
  directives: [Tabs, TabContent, TabTitle, CORE_DIRECTIVES]
})
class App {
  tabChanged(tab) {
    console.log(tab);
  }
}

bootstrap(App);

