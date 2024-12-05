import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  title = '';
  description = '';
  image: File | null = null;
  userId: number | null = null;

  constructor(private postService: PostService) { }

  onFileChange(event: any): void {
    this.image = event.target.files[0];
  }

  addPost(): void {
    if (this.userId && this.image) {
      this.postService.addPostForUser(this.userId, this.title, this.description, this.image)
        .subscribe(response => {
          console.log('Post added:', response);
          alert('Post added successfully!');
        }, error => {
          console.error('Error:', error);
          alert('Failed to add post');
        });
    }
  }
}
