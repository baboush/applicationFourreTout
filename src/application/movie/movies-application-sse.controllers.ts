import { Controller, Get, MessageEvent, Res, Sse } from "@nestjs/common";
import { Observable, interval } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { FindAllMoviesUsecaseApplication } from "./usecases";

@Controller("movies")
export class MoviesControllerSse {
  constructor(
    private readonly findMovieUsecase: FindAllMoviesUsecaseApplication,
  ) {}

  @Sse("sse")
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      mergeMap(async () => {
        const movies = await this.findMovieUsecase.execute();
        return { data: JSON.stringify(movies), type: "movies" } as MessageEvent;
      }),
    );
  }
}
