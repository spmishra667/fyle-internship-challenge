import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }

  getRepoList(repourl: string, per_page: number, page: number){
    return this.httpClient.get(`${repourl}?per_page=${per_page}&page=${page}`);
  }

  getLanguages(langURL: string){
    return this.httpClient.get(`${langURL}`).pipe(
      map((response: any) => Object.keys(response))
    );
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
