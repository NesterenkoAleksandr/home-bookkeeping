import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { fadeStateTrigger } from '../../shared/animations/fade.animation';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Домашняя бухгалтерия | Вход в систему');
    meta.addTags([
      {name: 'keywords', tags: 'логин, авторизация, вход, система'},
      {name: 'description', tags: 'Страница для входа в систему'}
    ]);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params.canLogin) {
          this.showMessage({
            text: 'Теперь вы можете ввойти в систему!',
            type: 'success'
          });
          // tslint:disable-next-line:no-string-literal
        } else if (params['accessDenied']) {
          this.showMessage({
            text: 'Для работы с системой вам необходимо войти',
            type: 'warning'
          });
        }
      }
    );
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  showMessage(message: Message) {
    this.message = message;

    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email).subscribe(
      (user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.authService.login(user);
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage({
              text: 'Пароль не верный!',
              type: 'danger'
            });
          }
        } else {
          this.showMessage({
            text: 'Такого пользователя не существует!',
            type: 'danger'
          });
        }
      }
    );
  }
}
