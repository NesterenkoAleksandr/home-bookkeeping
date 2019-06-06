import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';


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
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  showMessage(text: string, type: string = 'danger' ) {
    this.message = new Message(type, text);

    window.setTimeout(() => {
      this.message.text = '';
    }, 3000);
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
            this.showMessage('пароль не верный!');
          }
        } else {
          this.showMessage('Такого пользователя не существует!');
        }
      }
    );
  }

}
