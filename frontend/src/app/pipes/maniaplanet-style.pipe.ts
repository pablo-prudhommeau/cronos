import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import * as Parser from '@sh4444dow/maniaplanet-style-js-parser';

declare var MPStyle: any;

@Pipe({name: 'maniaplanetStyle', pure: false})
export class ManiaplanetStylePipe implements PipeTransform {

    parser: any;

    constructor(private sanitizer: DomSanitizer) {
        this.parser = Parser;
    }

    transform(content) {
        if (content !== undefined) {
            return this.sanitizer.bypassSecurityTrustHtml(MPStyle.Parser.toHTML(content));
        }
    }

}
