import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'global',
  standalone: true
})
export class GlobalPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}



@Pipe({ name: 'splitChars',
        standalone: true
 })
export class SplitCharsPipe implements PipeTransform {
  transform(value: string): any[] {
    return value.split('').map((char, index) => ({ char, index }));
  }
}

@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
