import { Directive, ElementRef, Input, Renderer2, AfterViewInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appBorderStatus]'
})
export class BorderStatusDirective implements AfterViewInit {

  @Input() emptyWarningColor: string = 'yellow';
  @Input() invalidColor: string = 'red';
  @Input() validColor: string = 'green';
  ngControl: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }


  ngAfterViewInit(): void {

    this.ngControl.statusChanges?.subscribe(() => {
      this.updateBorderColor();
    });

  }


  private updateBorderColor(): void {
    const control = this.ngControl.control;
    if (control?.touched) {
      this.renderer.setStyle(this.el.nativeElement, '--border-color', control?.hasError('required')
        ? this.emptyWarningColor
        : control?.valid
          ? this.validColor
          : this.invalidColor);
    }
  }
}