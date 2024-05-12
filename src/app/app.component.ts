import { Component, OnInit, OnChanges } from '@angular/core';
import { ApiService } from './services/api.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable, map } from 'rxjs';
import { FormControl } from '@angular/forms';

interface repoType {
  name: string;
  description: string;
  languages: string[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  searchInput: FormControl = new FormControl('');
  repos: any[] = [];
  filterdRepo: any[] = [];
  user: any
  isLoading: boolean = true;
  value: any;
  page: number = 1;
  per_page: number = 10;
  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.apiService.getUser('johnpapa').subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.user = response;
      this.getRepoList();
      this.isLoading = false;
      return
    });
  }

  getRepoList() {
    this.isLoading = true;
    this.apiService.getRepoList(this.user.repos_url, this.per_page, this.page).subscribe((reposList: any) => {
      this.repos = reposList;
      this.repos.map(repo => {
        this.apiService.getLanguages(repo.languages_url).subscribe(response => {
          repo.languages = response;
          // return repo
        })
      })
      this.filterdRepo = this.repos;
    this.isLoading = false;
    })

    }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.repos, event.previousIndex, event.currentIndex);
  }

  filterRepo(){
    console.log(this.searchInput.value);
    this.filterdRepo = this.repos.filter((obj: any) => {
      return obj.name.toLowerCase().includes(this.searchInput.value.toLowerCase());
    });
  }

  clearSearch(){
    this.searchInput.setValue('');
    this.filterdRepo = this.repos;
  }

  handlePageChange(event: any){
    this.per_page = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getRepoList();
  }
}
