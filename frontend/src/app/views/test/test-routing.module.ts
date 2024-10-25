import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChoiceComponent} from "./choice/choice.component";
import {TestComponent} from "./test/test.component";
import {ResultComponent} from "./result/result.component";
import {AnswersComponent} from "./answers/answers.component";

const routes: Routes = [
  {path: 'choice', component: ChoiceComponent},
  {path: 'test/:id', component: TestComponent},
  {path: 'result', component: ResultComponent},
  {path: 'answers', component: AnswersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
