export type Result<Value, Err extends ResultError> = {
    /**
     * Applies a given predicate function to a successful value in the `Result`
     * The predicate returns a value mapped to a `Result`
     * @example
     * const moviesResult: Result<Movie[], MoviesError> = moviesService.getAllMovies();
     * const sortedMoviesResult = moviesResult.map(movies => movies.sort()); // sort the movies if `getAllMovies` is successful
     */
    map: <A>(predicate: (arg: Value) => A) => Result<A, Err>

    /**
     * Applies a given predicate function to an error value in the `Result
     * The predicate returns a value mapped to a `Result`
     * @example
     * const moviesResult: Result<Movie[], MoviesError> = moviesService.getAllMovies();
     * return moviesResult // add the id of the user to the error if an error occurred
     *     .mapErr(movieError => new MoviesError(movieError.name, `${movieError.message}` for user[id: ${user.id}]));
     */
    mapErr: <B extends ResultError>(predicate: (arg: Err) => B) => Result<Value, B>

    /**
     * Applies a given predicate function to a successful value in the `Result`
     * The predicate returns a `Result`
     * @example
     * const moviesResult: Result<Movie[], MoviesError> = moviesService.getWatchedMovies();
     * const sortedMoviesResult = moviesResult.chain(movies => {
     *     if (movies.length === 0) { // if no movies are watched return an error
     *         return fail(new MoviesError('MoviesError.noWatchedMovies', 'No watched movies found'));
     *     }
     *     return succeed(movies.sort()); // sort the movies if `getWatchedMovies` is successful
     * });
     */
    chain: <A>(predicate: (arg: Value) => Result<A, Err>) => Result<A, Err>

    /**
     * Applies a given predicate function to an error value in the `Result
     * The predicate returns a `Result`
     * @example
     * const moviesResult: Result<Movie[], MoviesError> = moviesService.getAllMovies();
     * return moviesResult
     *     .chainErr(movieError => { // if an error occurred because no movies were found
     *         if (movieError instanceof MoviesError.notFound) { // chains it to a successful result of an empty array
     *             return succeed([]);
     *         }
     *         return fail(movieError); // otherwise pass the error
     *     });
     */
    chainErr: <B extends ResultError>(predicate: (arg: Err) => Result<Value, B>) => Result<Value, B>

    /**
     * Used to perform side-effects for the successful value from the `Result`
     * @example
     * const creationResult: Result<void, TodoListError> = todoListService.create(todoList);
     * creationResult.tap(() => toast.success('Todo list created')); // If successful show a toast without modifying the result
     * return creationResult;
     */
    tap: (predicate: (arg: Value) => void) => Result<Value, Err>

    /**
     * Used to perform side-effects for the error value from the `Result`
     * @example
     * const creationResult: Result<void, TodoListError> = todoListService.create(todoList);
     * creationResult.catchError(() => toast.error('Todo list could not be created')); // If an error occurred show a toast without modifying the result
     * return creationResult;
     */
    catchErr: (predicate: (arg: Err) => void) => Result<Value, Err>

    /**
     * Matches the `Result` against the successful case `ok` and the error case `err`.
     * Used to trigger side effects based on the result.
     * @example
     * const userResult: Result<User, UserError> = userService.get(userId);
     * userResult.match({ // match the userResult against the success and error cases
     *     ok: (user: User) => setUserState(user), // If no error occurred, set the user state
     *     err: (error: UserError) => toast.error(`An error occurred: ${error.message}`), // If an error occurred, show a toast
     * });
     */
    match: (obj: {
        ok: (arg: Value) => void
        err: (arg: Err) => void
    }) => void

    /**
     * Safely get the value inside the Result by handling the error case.
     * @example
     * const result = unsafeCalculation(); // some Result<number, ResultError> to handle
     * const value = result.unwrap({ // safely unwrap the value
     *     err: (error: ResultError) => { // handle the error case
     *         if (error instanceof DivisionByZeroError) {
     *             return 0; // example: return 0 in case of this specific error
     *         }
     * 
     *         throw new Error(`Unexpected error: ${error}`); // example: throw an exception to be handled out of the result pattern
     *     }
     * });
     */
    unwrap: (obj: {
        err: (arg: Err) => Value
    }) => Value

    /**
     * Returns a string representation of the `Result`.
     * If the `Result` is an error, the string representation is `Err(<error>)`.
     * If the `Result` is not an error, the string representation is `Ok(<value>)`.
     */
    inspect: () => string

    /**
     * Returns `true` if the `Result` is an error, `false` otherwise.
     */
    isFailure: () => boolean

    /**
     * Returns `true` if the `Result` is not an error, `false` otherwise.
     */
    isSuccess: () => boolean

    /**
     * /!\ Unsafely /!\ Returns the value inside the `Result`.
     * If the `Result` is an error, an error is thrown.
     */
    value: () => Value
}

export class ResultError extends Error {
    constructor(name: string, message: string) {
        super();
        this.name = name;
        this.message = message;
    }
}

const success = <O>(arg: O): Result<O, ResultError> => ({
    map: <A>(predicate: (a: O) => A) => succeed(predicate(arg)),
    mapErr: () => succeed(arg),
    chain: <A>(predicate: (a: O) => Result<A, any>): Result<A, any> => predicate(arg),
    chainErr: () => succeed(arg),
    tap: predicate => { predicate(arg); return succeed(arg) },
    catchErr: () => succeed(arg),
    match: obj => obj.ok(arg),
    unwrap: () => arg,
    inspect: () => `Success(${arg})`,
    isFailure: () => false,
    isSuccess: () => true,
    value: () => arg
})

const failure = <E extends ResultError>(arg: E): Result<any, E> => ({
    map: () => failure(arg),
    mapErr: <B extends ResultError>(predicate: (arg: E) => B) => fail(predicate(arg)),
    chain: () => failure(arg),
    chainErr: predicate => predicate(arg),
    tap: () => failure(arg),
    catchErr: predicate => { predicate(arg); return failure(arg) },
    match: obj => obj.err(arg),
    unwrap: obj => obj.err(arg),
    inspect: () => `Failure(${arg})`,
    isFailure: () => true,
    isSuccess: () => false,
    value: () => { throw new Error('Result: Cannot get value from Err') }
})

export function succeed(): Result<any, any>
export function succeed<O>(arg: O): Result<O, any>
export function succeed<O>(arg?: O): Result<O | undefined, any> {
    return success(arg)
}

export function fail<E extends ResultError>(arg: E): Result<any, E> {
    return failure(arg)
}