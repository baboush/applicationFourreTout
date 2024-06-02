import { faker } from '@faker-js/faker';
// Optional: Import TypeORM related classes for saving data
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// Function to generate a single user object with Faker.js data
import { inject } from '@angular/core';
import { MovieService } from './client';
// Function to generate a specified number of users (optional: save them to database)
async function generateAndSaveUsers(numberOfUsers: number): Promise<void> {
  inject(MovieService);
  let test: MovieService;
  function generateMovie() {
    test.movieApplicationControllerHandleCreateAndPublishMovie({
      title: faker.name.firstName(),
      director: faker.name.lastName(),
      poster: faker.image.cats(289, 420, true),
    });
  }

  // Uncomment and configure the following for saving to database
  // const userRepository = await this.userRepository.getRepository(User); // Inject TypeORM repository

  for (let i = 0; i < numberOfUsers; i++) {
    const user = generateMovie();

    // Optionally save the user to the database using TypeORM
    // await userRepository.save(user);

    console.log(`Generated user: ${JSON.stringify(user)}`); // Log generated user data
  }
}

// Example usage: Generate and log 10 users
generateAndSaveUsers(50);
