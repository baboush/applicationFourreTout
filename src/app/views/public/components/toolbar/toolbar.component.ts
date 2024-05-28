import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements AfterViewInit {
  @ViewChild('btnBurger') btnBuger!: ElementRef;
  @ViewChild('menuMobile') menuMobile!: ElementRef;
  private isOpen = false;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {}
  handleShowMenu() {
    if (!this.isOpen) {
      this.renderer.addClass(this.btnBuger.nativeElement, 'animate-menu-in');
      this.renderer.removeClass(
        this.btnBuger.nativeElement,
        'animate-close-menu',
      );
      this.renderer.addClass(this.menuMobile.nativeElement, 'is-visible');
      this.renderer.removeClass(this.menuMobile.nativeElement, 'is-hidden');
      this.isOpen = !this.isOpen;
    } else {
      this.renderer.addClass(this.btnBuger.nativeElement, 'animate-close-menu');
      this.renderer.addClass(this.menuMobile.nativeElement, 'is-hidden');
      this.renderer.removeClass(this.btnBuger.nativeElement, 'animate-menu-in');
      this.renderer.removeClass(this.menuMobile.nativeElement, 'is-visible');
      this.isOpen = !this.isOpen;
    }
  }
}
