import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params.canLogin) {
          this.showMessage({
            text: 'Теперь вы можете ввойти в систему!',
            type: 'success'
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
            this.router.navigate(['/registration']);
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
