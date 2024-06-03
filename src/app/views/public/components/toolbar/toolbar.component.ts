import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements AfterViewInit {
  @ViewChild('btnBurger') btnBuger!: ElementRef;
  @ViewChild('menuMobile') menuMobile!: ElementRef;
  private isOpen = false;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {}
  openMenu() {
    this.renderer.addClass(this.btnBuger.nativeElement, 'animate-menu-in');
    this.renderer.addClass(this.menuMobile.nativeElement, 'is-visible');
    this.renderer.removeClass(
      this.btnBuger.nativeElement,
      'animate-close-menu',
    );
    this.renderer.removeClass(this.menuMobile.nativeElement, 'is-hidden');
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.renderer.addClass(this.btnBuger.nativeElement, 'animate-close-menu');
    this.renderer.addClass(this.menuMobile.nativeElement, 'is-hidden');
    this.renderer.removeClass(this.btnBuger.nativeElement, 'animate-menu-in');
    this.renderer.removeClass(this.menuMobile.nativeElement, 'is-visible');
    this.isOpen = !this.isOpen;
  }

  handleShowMenu() {
    if (!this.isOpen) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }
}
