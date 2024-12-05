import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContractService } from '../../services/services/contrat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-contrat',
  templateUrl: './list-contrat.component.html',
  styleUrl: './list-contrat.component.css'
})
export class ListContratComponent implements OnInit {
  pdfUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private contractService: ContractService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const contractIdString = this.route.snapshot.paramMap.get('contractId');

    if (contractIdString) {
      const contractId = +contractIdString;

      if (contractId) {
        const unsafeUrl = this.contractService.getContractPdfUrl(contractId);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      }
    }
  }
}
