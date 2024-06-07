import { ResultError } from '@friezz/common';

export class HttpResponseError extends ResultError {
    static couldNotFetch = new HttpResponseError(
        'HttpResponse.couldNotFetch',
        'Could not fetch data',
    );
    static couldNotUpdate = new HttpResponseError(
        'HttpResponse.couldNotFetch',
        'Could not fetch data',
    );
    static couldNotDelete = new HttpResponseError(
        'HttpResponse.couldNotDelete',
        'Could not delete data',
    );
}
