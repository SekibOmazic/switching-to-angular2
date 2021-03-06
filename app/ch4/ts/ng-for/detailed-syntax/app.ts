import {Component, View, bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';

@Component({
  selector: 'app'
})
@View({
  templateUrl: '<%= currentPath %>app.html',
  directives: [CORE_DIRECTIVES]
})
class App {
  todos:string[];
  name:string;
  constructor() {
    this.name = "John";
    this.todos = ['Buy milk', "Save the world"];
  }
}

bootstrap(App);
