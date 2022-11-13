import { outputAst, parseHostBindings } from '@angular/compiler';
import { Directive, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandele } from './_model/file.model';
import { EventEmitter } from '@angular/core'

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @Output() files: EventEmitter<any> = new EventEmitter();

  @HostBinding("style.background") private background = "#f5a623";
  constructor(private sanitizer: DomSanitizer) { }

  @HostListener("dragover",["$event"])
  public onDragOber(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#999";
  }

@HostListener("dragleave",["$event"])
public onDragLeave(evt: DragEvent){
  evt.preventDefault();
  evt.stopPropagation();
  this.background = "#f5a623";
}
@HostListener("drop",["$event"])
public onDrop(evt: DragEvent){
  evt.preventDefault();
  evt.stopPropagation();
  this.background = "#f5a623";


  const file = evt.dataTransfer?.files[0];
  const url =this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file!));
  let fileHandele: FileHandele = null! ?? {file, url};
  this.files.emit(fileHandele);

  }




}




