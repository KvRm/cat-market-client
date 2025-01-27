import { HttpClientModule } from '@angular/common/http'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
// eslint-disable-next-line ts/consistent-type-imports
import { Router, RouterLink } from '@angular/router'
// eslint-disable-next-line ts/consistent-type-imports
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'auth-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink],
  templateUrl: './register.component.html',
})
export class AuthRegisterPageComponent {
  constructor(private authService: AuthService, private router: Router) {}

  form = {
    password: '',
    first_name: '',
    second_name: '',
    last_name: '',
    email: '',
    phone: '',
    sex: null as null | number,
  }

  validation: Record<string, string> = {}

  getCheckboxStyle(value: number) {
    const base = 'flex items-center justify-center  w-full py-2 border-[1px] border-white hover:border-slate-950 cursor-pointer'
    if (value !== this.form.sex)
      return base
    else
      return `${base} border-black bg-black text-white`
  }

  onSubmit() {
    this.validation = Object.fromEntries(
      Object.entries(this.form)
        .filter(([key, value]) => !value && key !== 'second_name')
        .map(([key]) => [key, 'Поле обязательно к заполнению']),
    )
    if (Object.keys(this.validation).length)
      return

    this.authService.register(this.form).subscribe(() => {
      this.authService.registerLogin = this.form.email
      this.router.navigate(['auth/login'])
    })
  }
}
