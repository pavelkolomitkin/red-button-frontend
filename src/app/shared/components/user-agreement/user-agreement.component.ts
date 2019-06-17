import { Component, OnInit } from '@angular/core';
import {UserAgreementService} from '../../../core/services/user-agreement-service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-user-agreement',
  templateUrl: './user-agreement.component.html',
  styleUrls: ['./user-agreement.component.css']
})
export class UserAgreementComponent implements OnInit {

  contents: SafeHtml;

  constructor(
      private service: UserAgreementService,
      private sanitizer: DomSanitizer
  ) { }

  async ngOnInit() {

      const text = await this.service.get().toPromise();

      this.contents = this.sanitizer.bypassSecurityTrustHtml(text);

  }

}
