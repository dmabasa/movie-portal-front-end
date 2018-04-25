import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Movie } from './movie';

@Injectable()
export class MovieService {
    //URLs for CRUD operations
    allMoviesUrl = "http://localhost:8080/api/all-movies";
	movieUrl = "http://localhost:8080/api/movie";
	//Create constructor to get Http instance
	constructor(private http:Http) { 
	}
	//Fetch all articles
    getAllMovies(): Observable<Movie[]> {
        return this.http.get(this.allMoviesUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);

    }
	//Create movie
    createMovie(movie: Movie):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.movieUrl, movie, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	//Fetch movie by id
    getMovieById(id: string): Observable<Movie> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', id);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.get(this.movieUrl, options)
			   .map(this.extractData)
			   .catch(this.handleError);
    }	
	//Update movie
    updateMovie(movie: Movie):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.movieUrl, movie, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete movie	
    deleteMovieById(id: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', id);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.delete(this.movieUrl, options)
			   .map(success => success.status)
			   .catch(this.handleError);
    }		
	private extractData(res: Response) {
	    let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
}