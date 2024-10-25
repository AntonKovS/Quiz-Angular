import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  link: string = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.link = this.authService.getLoggedIn() ? '/choice' : '/signup';   //или можно сделать подписку, чтобы менять ссылку у кнопки сразу (1:46 урока)
  }

}
