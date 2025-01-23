import type { OnInit } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { Component, Inject, PLATFORM_ID } from '@angular/core'
import { FormsModule } from '@angular/forms'
// eslint-disable-next-line ts/consistent-type-imports
import { Router } from '@angular/router'
// eslint-disable-next-line ts/consistent-type-imports
import { User, UserService } from '../../services/user.service'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    if (isPlatformBrowser(platformId)) {
      this.fetchUser()
    }
  }

  isLoading = false

  form = {
    id: 0,
    firstName: '',
    secondName: '',
    lastName: '',
    email: '',
    phone: '',
    sex: null as null | number,
  }

  formSnapshot = { ...this.form }

  validation: Record<string, string> = {}

  ngOnInit(): void {
  }

  fetchUser() {
    this.isLoading = true
    this.userService.fetchUser().subscribe(
      (v) => {
        const { id, firstName, email, lastName, phone, secondName, sex } = v as User
        const value = { id, firstName, email, lastName, phone, secondName, sex }
        this.form = { ...value }
        this.formSnapshot = { ...value }
        this.isLoading = false
      },
      () => this.isLoading = false,
    )
  }

  get isBtnDisabled() {
    return JSON.stringify(this.form) === JSON.stringify(this.formSnapshot)
  }

  getCheckboxStyle(value: number) {
    const base = 'flex items-center justify-center  w-full py-2 border-[1px] border-white hover:border-slate-950 cursor-pointer'
    if (value !== this.form.sex)
      return base
    else
      return `${base} border-black bg-black text-white`
  }

  handleLogout() {
    localStorage.removeItem('accessToken')
    window.location.href = `${window.location.origin}/auth/login`
  }

  onSubmit() {
    this.validation = Object.fromEntries(
      Object.entries(this.form)
        .filter(([key, value]) => !value && key !== 'secondName')
        .map(([key]) => [key, 'Поле обязательно к заполнению']),
    )
    if (Object.keys(this.validation).length)
      return
    this.isLoading = true
    this.userService.updateUser(this.form)
      .subscribe(
        () => {
          this.isLoading = false
          this.fetchUser()
        },
        () => this.isLoading = false,
      )
  }
}
