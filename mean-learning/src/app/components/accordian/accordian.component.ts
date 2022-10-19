import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Config } from 'src/app/models/accordian-model';
import { getPost } from 'src/app/models/post-model';

@Component({
  selector: 'app-accordian',
  templateUrl: './accordian.component.html',
  styleUrls: ['./accordian.component.scss'],
})
export class AccordianComponent implements OnInit {
  config: Config | any;

  @Input() options: any;
  @Input() menus: getPost[] = [];

  @Output() deletePost: EventEmitter<any> = new EventEmitter();
  @Output() editPost: EventEmitter<any> = new EventEmitter();

  constructor(
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.config = this.mergeConfig(this.options);
  }

  mergeConfig(options: Config) {
    const config = {
      multi: true,
    };

    return { ...config, ...options };
  }

  toggle(index: number) {
    if (!this.config.multi) {
      this.menus
        .filter((menu, i) => i !== index && menu.active)
        .forEach((menu) => (menu.active = !menu.active));
    }
    this.menus[index].active = !this.menus[index].active;
  }

  delete(event: any) {
    this.deletePost.emit(event);
  }

  edit(event: any) {
    this.editPost.emit(event);
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
