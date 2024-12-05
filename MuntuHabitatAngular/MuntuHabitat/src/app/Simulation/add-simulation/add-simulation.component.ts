import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimulationControllerService } from '../../services/services';
import { Question } from '../../services/models';
import { TypeSimulation } from '../../services/models/type-simulation';

@Component({
  selector: 'app-add-simulation',
  templateUrl: './add-simulation.component.html',
  styleUrls: ['./add-simulation.component.css']
})
export class AddSimulationComponent implements OnInit {
  addSimulationForm: FormGroup;
  simulationTypes = Object.values(TypeSimulation);

  constructor(private fb: FormBuilder, private simulationService: SimulationControllerService) {
    this.addSimulationForm = this.fb.group({
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.addQuestion();
  }

  get questions(): FormArray {
    return this.addSimulationForm.get('questions') as FormArray;
  }

  categories(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('categories') as FormArray;
  }

  addQuestion(): void {
    const questionForm = this.fb.group({
      text: ['', Validators.required],
      type: ['', Validators.required],
      categories: this.fb.array([])
    });
    this.questions.push(questionForm);
    this.addCategory(this.questions.length - 1);
  }

  addCategory(questionIndex: number): void {
    const categories = this.categories(questionIndex);
    const categoryForm = this.fb.group({
      content: ['', Validators.required],
      price: [0],
      title: ['', Validators.required],
      imageUrl: [''],
      description: [''],
      descriptionTitle: ['']
    });
    categories.push(categoryForm);
  }

  onSubmit(): void {
    if (this.addSimulationForm.valid) {
      this.addSimulationForm.value.questions.forEach((q: any) => {
        const question: Question = {
          text: q.text,
          type: q.type,
          categories: q.categories.map((c: any) => ({
            content: c.content,
            price: c.price,
            title: c.title,
            imageUrl: c.imageUrl,
            description: c.description,
            descriptionTitle: c.descriptionTitle
          }))
        };

        this.simulationService.AddQuestion(question).subscribe(data => {
          console.log('Question added', data);
        });
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
