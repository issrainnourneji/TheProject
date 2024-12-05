import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContractService } from '../../services/services/contrat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-contrat',
  templateUrl: './add-contrat.component.html',
  styleUrl: './add-contrat.component.css'
})
export class AddContratComponent
implements OnInit {
  pdfUrl: SafeResourceUrl | null = null;
  contracts: any[] = [];
  selectedFile!: File;
  userId: number = 16;

  constructor(private route: ActivatedRoute,
    private contractService: ContractService,
    private sanitizer: DomSanitizer ) { }

  ngOnInit(): void {
    this.loadContracts();
    const contractIdString = this.route.snapshot.paramMap.get('contractId');

    if (contractIdString) {
      const contractId = +contractIdString;

      if (contractId) {

        const unsafeUrl = this.contractService.getContractPdfUrl(contractId);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      }
    }
  }

  loadContracts(): void {
    this.contractService.getUserContracts(this.userId).subscribe(data => {
      this.contracts = data;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    this.contractService.uploadContract(this.selectedFile, this.userId).subscribe(() => {
      this.loadContracts();  
    });
  }

}
