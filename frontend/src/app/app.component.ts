import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';

  selectedFile!: File;

  constructor(private http: HttpClient) {}
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http
      .post(
        'https://',
        // fd
        this.selectedFile,
        {
          reportProgress: true,
          observe: 'events',
        }
      )
      .subscribe({
        next: (response: any) => {
          if (response.type === HttpEventType.UploadProgress) {
            console.log(
              'Upload Progress: ' +
                Math.round((response.loaded / response.total) * 100) +
                '%'
            );
          } else if (response.type === HttpEventType.Response) {
            console.log(response);
          }
        },
        error: (error: any) => {},
      });
  }
}
