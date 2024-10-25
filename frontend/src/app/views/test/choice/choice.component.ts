import {Component, OnInit} from '@angular/core';
import {TestService} from "../../../shared/services/test.service";
import {QuizListType} from "../../../../types/quiz-list.type";
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {TestResultType} from "../../../../types/test-result.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {

  quizzes: QuizListType[] = [];
  testResult: TestResultType[] | null = null;

  constructor(private testService: TestService, private authService: AuthService, private  router: Router) {
  }

  ngOnInit(): void {
    this.testService.getTests()
      .subscribe((result: QuizListType[]) => {      //или тут вместо subscribe можно использовать switchMap и затем получать в subscribe результат 2го запроса вместе с 1ым
        this.quizzes = result;

        const userInfo = this.authService.getUserInfo();
        if (userInfo) {
          this.testService.getUserResults(userInfo.userId)
            .subscribe((result: DefaultResponseType | TestResultType[]) => {
              if (result) {
                if ((result as DefaultResponseType).error !== undefined) {      //predicates
                  throw new Error((result as DefaultResponseType).message);     //тут можно через снек бар ангулар матириал что-то выводить пользователю и, например, перекидывать на главную страницу, а может и разлогинивать...
                }

                const testResult = result as TestResultType[];                     //predicates
                if (testResult) {
                  this.quizzes = this.quizzes.map(quiz => {
                    const foundItem: TestResultType | undefined = testResult.find(item => item.testId === quiz.id);
                    if (foundItem) {
                      quiz.result = foundItem.score + '/' + foundItem.total;
                    }
                    return quiz;
                  });
                }
              }
            });
        }
      });
  }

  chooseQuiz(id: number): void {
    this.router.navigate(['/test', id])   //для примера используем здесь параметр страницы в get запросе, но изменяем тогда роутинг в test-routing.module.ts на test/:id
  }

}
