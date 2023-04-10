// // export const switchLatestFrom =
// //   <T>(target$: Observable<T>): ((source$: Observable<any>) => Observable<T>) =>
// //   (source$: Observable<any>): Observable<T> =>
// //     source$.pipe(
// //       withLatestFrom(target$),
// //       map(([, target]) => target)
// //     );
//
// const height$ = timer(0, 5000).pipe(shareReplay(1));
//
// const width$ = timer(0, 6000).pipe(shareReplay(1));
//
// const depth$ = timer(0, 7000).pipe(shareReplay(1));
//
//
// interface Cuboid {
//   height: number;
//   width: number;
//   depth: number;
// }
//
// const cuboid$:Observable<Cuboid> =of({height:1,width:3,depth:2})
//
//
// const string$=of("bite me")
//
// const volume$=cuboid$.pipe(mapToVolume)
//
// const volume2$=string$.pipe(mapToVolume)
//
// const  mapToVolume: OperatorFunction<Cuboid, number> =
//    $=>$.pipe( map<Cuboid, number>(
//       ({height, width, depth}: Cuboid) => height * width * depth
//     ));
//
