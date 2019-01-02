import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onmouseenter(): void {
    this.renderer.addClass(this.el.nativeElement, 'highlight');
  }

  @HostListener('mouseleave') onmouseleave(): void {
    this.renderer.removeClass(this.el.nativeElement, 'highlight');
  }
}
