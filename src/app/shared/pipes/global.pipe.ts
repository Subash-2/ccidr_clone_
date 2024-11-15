import { Pipe, PipeTransform } from '@angular/core';

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

