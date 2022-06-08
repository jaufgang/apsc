import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  readonly selectedBoatName$ = this.route.paramMap.pipe(
    // tap((params) => console.log('params', params)),
    map((params) => params.get('boatName'))
    // tap((params) => console.log('boatName!!!', params))
  );

  constructor(private route: ActivatedRoute) {
    // this.route.url.subscribe((url) => console.log('url', url));
  }
}
