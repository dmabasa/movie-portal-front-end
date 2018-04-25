import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MovieService } from './movie.service';
import { Movie } from './movie';

@Component({
   selector: 'app-movie',
   templateUrl: './movie.component.html',
   styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit { 
   //Component properties
   allMovies: Movie[];
   statusCode: number;
   requestProcessing = false;
   movieIdToUpdate = null;
   processValidation = false;
   //Create form
   movieForm = new FormGroup({
       title: new FormControl('', Validators.required),
       category: new FormControl('', Validators.required)	   
   });
   //Create constructor to get service instance
   constructor(private movieService: MovieService) {
   }
   //Create ngOnInit() and and load movies
   ngOnInit(): void {
	   this.getAllMovies();
   }   
   //Fetch all movies
   getAllMovies() {
        this.movieService.getAllMovies()
		  .subscribe(
                data => this.allMovies = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update movies
   onMovieFormSubmit() {
	  this.processValidation = true;   
	  if (this.movieForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
      this.preProcessConfigurations();
	  let title = this.movieForm.get('title').value.trim();
      let category = this.movieForm.get('category').value.trim();	  
	  if (this.movieIdToUpdate === null) {  
	    //Handle create movie
	    let movie= new Movie(null, title, category);	  
	    this.movieService.createMovie(movie)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllMovies();	
					this.backToCreateMovie();
			    },
		        errorCode => this.statusCode = errorCode);
	  } else {  
   	    //Handle update movie
	    let movie= new Movie(this.movieIdToUpdate, title, category);	  
	    this.movieService.updateMovie(movie)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllMovies();	
					this.backToCreateMovie();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   //Load movie by id to edit
   loadMovieToEdit(id: string) {
      this.preProcessConfigurations();
      this.movieService.getMovieById(id)
	      .subscribe(movie => {
		            this.movieIdToUpdate = movie.id;   
		            this.movieForm.setValue({ title: movie.title, category: movie.category });
					this.processValidation = true;
					this.requestProcessing = false;   
		        },
		        errorCode =>  this.statusCode = errorCode);   
   }
   //Delete movie
   deleteMovie(id: string) {
      this.preProcessConfigurations();
      this.movieService.deleteMovieById(id)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllMovies();	
				    this.backToCreateMovie();
			    },
		        errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateMovie() {
      this.movieIdToUpdate = null;
      this.movieForm.reset();	  
	  this.processValidation = false;
   }
}
    