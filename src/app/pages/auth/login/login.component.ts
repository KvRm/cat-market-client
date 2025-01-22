import type { OnInit } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
// eslint-disable-next-line ts/consistent-type-imports
import { Router, RouterLink } from '@angular/router'
// eslint-disable-next-line ts/consistent-type-imports
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
})
export class AuthLoginPageComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  form = {
    login: '',
    password: '',
  }

  validation: Record<string, string> = {}

  ngOnInit(): void {
    this.form.login = this.authService.registerLogin
  }

  onSubmit() {
    this.validation = Object.fromEntries(
      Object.entries(this.form)
        .filter(([, value]) => !value)
        .map(([key]) => [key, 'Поле обязательно к заполнению']),
    )
    if (Object.keys(this.validation).length)
      return

    this.authService.login(this.form).subscribe((v) => {
      const { accessToken } = (v as { accessToken: string }) || {}
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        this.router.navigate(['/profile'])
      }
    })
  }
}
