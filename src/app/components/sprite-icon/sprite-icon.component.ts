import { Component, Input } from '@angular/core'

@Component({
  selector: 'sprite-icon',
  standalone: true,
  imports: [],
  templateUrl: './sprite-icon.component.html',
})
export class SpriteIconComponent {
  @Input({ required: true }) name!: string
  @Input({ required: true }) size!: string

  get svgName() {
    return `#${this.name}`
  }

  get style() {
    return `width: ${this.size}px; height: ${this.size}px`
  }
}
