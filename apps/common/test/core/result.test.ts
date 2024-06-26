import { ResultError, succeed, fail, Result } from '@friezz/common';

describe('Result', () => {
    describe('succeed', () => {
        it('returns a success Result with the provided value', () => {
            // Arrange
            // Act
            const result = succeed('test');

            // Assert
            expect(result.value()).toBe('test');
            expect(result.isSuccess()).toBeTruthy();
            expect(result.isFailure()).toBeFalsy();
            expect(result.inspect()).toBe('Success(test)');
        });
    });

    describe('fail', () => {
        it('returns a failure Result with the provided error', () => {
            // Arrange
            const error = new ResultError('TestError', 'Something went wrong');

            // Act
            const result = fail(error);

            // Assert
            expect(result.isSuccess()).toBeFalsy();
            expect(result.isFailure()).toBeTruthy();
            expect(result.inspect()).toBe('Failure(TestError: Something went wrong)');
        });
    });

    describe('map', () => {
        it('applies a mapping on a success Result', () => {
            // Arrange
            // Act
            const result = succeed('test').map((str) => str.toUpperCase());

            // Assert
            expect(result.value()).toBe('TEST');
            expect(result.isSuccess()).toBeTruthy();
            expect(result.isFailure()).toBeFalsy();
            expect(result.inspect()).toBe('Success(TEST)');
        });
        
        it('passes the error down without applying a mapping on a fail Result', () => {
            // Arrange
            let predicateCallNumber = 0;
            const predicate = (arg: any) => { predicateCallNumber++; return arg; }

            // Act
            const result = fail(new ResultError('TestError', 'Something went wrong')).map(predicate);

            // Assert
            expect(result.isSuccess()).toBeFalsy();
            expect(result.isFailure()).toBeTruthy();
            expect(result.inspect()).toBe('Failure(TestError: Something went wrong)');
            expect(predicateCallNumber).toBe(0);
        });
    });

    describe('mapErr', () => {
        it('passes the value down without applying a mapping on a success Result', () => {
            // Arrange
            const error = new ResultError('TestError', 'Something went wrong');
            const expectedValue = 'test';

            // Act
            const result = succeed(expectedValue).mapErr(() => error);

            // Assert
            expect(result.value()).toBe(expectedValue);
            expect(result.isSuccess()).toBeTruthy();
            expect(result.isFailure()).toBeFalsy();
            expect(result.inspect()).toBe(`Success(${expectedValue})`);
        });

        it('applies a mapping on a fail Result', () => {
            // Arrange
            const error = new ResultError('TestError', 'Something went wrong');

            // Act
            const result = fail(error).mapErr((e) => new ResultError('MappedError', e.message));

            // Assert
            expect(result.isSuccess()).toBeFalsy();
            expect(result.isFailure()).toBeTruthy();
            expect(result.inspect()).toBe('Failure(MappedError: Something went wrong)');
        });
    });

    describe('chain', () => {
        it('applies a mapping on a success Result', () => {
            // Arrange
            const expectedValue = 'test';
            const nextResult = succeed('test2');

            // Act
            const result = succeed(expectedValue).chain(() => nextResult);

            // Assert
            expect(result.isSuccess()).toBeTruthy();
            expect(result.value()).toBe('test2');
            expect(result.isFailure()).toBeFalsy();
            expect(result.inspect()).toBe(`Success(test2)`);
        });

        it('passes the error down without applying a mapping on a fail Result', () => {
            // Arrange
            const error = new ResultError('TestError', 'Something went wrong');

            // Act
            const result = fail(error).chain(() => succeed('test'));

            // Assert
            expect(result.isSuccess()).toBeFalsy();
            expect(result.isFailure()).toBeTruthy();
            expect(result.inspect()).toBe('Failure(TestError: Something went wrong)');
        });
    });

    describe('chainErr', () => {
        it('passes the value down without applying a mapping on a success Result', () => {
            // Arrange
            const expectedValue = 'test';
            const nextResult = fail(new ResultError('TestError', 'Something went wrong'));

            // Act
            const result = succeed(expectedValue).chainErr(() => nextResult);

            // Assert
            expect(result.isSuccess()).toBeTruthy();
            expect(result.value()).toBe(expectedValue);
            expect(result.isFailure()).toBeFalsy();
            expect(result.inspect()).toBe(`Success(${expectedValue})`);
        });

        it('applies a mapping on a fail Result', () => {
            // Arrange
            const error = new ResultError('TestError', 'Something went wrong');
            const nextResult = fail(new ResultError('MappedError', error.message));

            // Act
            const result = fail(error).chainErr(() => nextResult);

            // Assert
            expect(result.isSuccess()).toBeFalsy();
            expect(result.isFailure()).toBeTruthy();
            expect(result.inspect()).toBe('Failure(MappedError: Something went wrong)');
        });
    });

    describe('tap', () => {
        it('executes the provided callback on a success Result', () => {
            // Arrange
            const expectedValue = 'test';
            let tapExecuted = false;

            // Act
            const result = succeed(expectedValue).tap(() => tapExecuted = true);

            // Assert
            expect(result.isSuccess()).toBeTruthy();
            expect(result.isFailure()).toBeFalsy();
            expect(result.value()).toBe(expectedValue);
            expect(result.inspect()).toBe(`Success(${expectedValue})`);
            expect(tapExecuted).toBeTruthy();
        });

        it('does not execute the provided callback on a fail Result', () => {
            // Arrange
            const error = new ResultError('TestError', 'Something went wrong');
            let tapExecuted = false;

            // Act
            const result = fail(error).tap(() => tapExecuted = true);

            // Assert
            expect(result.isSuccess()).toBeFalsy();
            expect(result.isFailure()).toBeTruthy();
            expect(result.inspect()).toBe('Failure(TestError: Something went wrong)');
            expect(tapExecuted).toBeFalsy();
        });
    });

    describe('catchErr', () => {
        it('returns a success Result without executing the provided callback on a success Result', () => {
            // Arrange
            const expectedValue = 'test';
            let predicateExecuted = false;

            // Act
            const result = succeed(expectedValue).catchErr(() => {
                predicateExecuted = true;
            });

            // Assert
            expect(result.isSuccess()).toBeTruthy();
            expect(result.isFailure()).toBeFalsy();
            expect(result.value()).toBe(expectedValue);
            expect(result.inspect()).toBe(`Success(${expectedValue})`);
            expect(predicateExecuted).toBeFalsy();
        });

        it('executes the provided callback on a fail Result', () => {
            // Arrange
            const error = new ResultError('TestError', 'Something went wrong');
            let predicateExecuted = false;

            // Act
            const result = fail(error).catchErr(() => {
                predicateExecuted = true;
            });

            // Assert
            expect(result.isFailure()).toBeTruthy();
            expect(result.isSuccess()).toBeFalsy();
            expect(result.inspect()).toBe('Failure(TestError: Something went wrong)');
            expect(predicateExecuted).toBeTruthy();
        });
    });
    
    describe('match', () => {
        it('calls the success callback if the Result is a success', () => {
            // Arrange
            const value = 'test';
            let successCalled = false;
            let failCalled = false;

            // Act
            const result = succeed(value).match({
                ok: _value => successCalled = true,
                err: _error => failCalled = true
            });

            // Assert
            expect(result.isSuccess()).toBeTruthy();
            expect(result.isFailure()).toBeFalsy();
            expect(result.value()).toBe(value);
            expect(result.inspect()).toBe(`Success(${value})`);
            expect(successCalled).toBeTruthy();
            expect(failCalled).toBeFalsy();
        });

        it('calls the failure callback if the Result is a failure', () => {
            // Arrange
            const error = new ResultError('TestError', 'Something went wrong');
            let successCalled = false;
            let failCalled = false;

            // Act
            const result = fail(error).match({
                ok: _value => successCalled = true,
                err: _error => failCalled = true
            });

            // Assert
            expect(result.isSuccess()).toBeFalsy();
            expect(result.isFailure()).toBeTruthy();
            expect(result.inspect()).toBe('Failure(TestError: Something went wrong)');
            expect(successCalled).toBeFalsy();
            expect(failCalled).toBeTruthy();
        });
    });

    describe('unwrap', () => {
        it('returns the value of the Result for a success Result', () => {
            // Arrange
            const value = 'test';
            const defaultValue = 'default';
            const valueResult: Result<string, ResultError> = succeed(value);

            // Act
            const result = valueResult.unwrap({ err: _error => defaultValue });

            // Assert
            expect(result).toBe(value);
        });

        it('returns the result of the provided error handler if the Result is a fail Result', () => {
            // Arrange
            const error = new ResultError('TestError', 'Something went wrong');
            const defaultValue = 'default';
            const errorResult: Result<string, ResultError> = fail(error);

            // Act
            const result = errorResult.unwrap({ err: _error => defaultValue });

            // Assert
            expect(result).toBe(defaultValue);
        });
    });
    
    describe('inspect', () => {
        it('returns the inspection string of the Result for a success Result', () => {
            // Arrange
            const value = 'test';
            const expectedInspectionString = `Success(${value})`;

            // Act
            const result = succeed(value);

            // Assert
            expect(result.inspect()).toBe(expectedInspectionString);
        });

        it('returns the inspection string of the Result for a fail Result', () => {
            // Arrange
            const error = new ResultError('TestError', 'Something went wrong');
            const expectedInspectionString = `Failure(TestError: Something went wrong)`;

            // Act
            const result = fail(error);

            // Assert
            expect(result.inspect()).toBe(expectedInspectionString);
        });
    });

    describe('isSuccess', () => {
        it('returns true if the Result is a success', () => {
            // Arrange
            const value = 'test';

            // Act
            const result = succeed(value);

            // Assert
            expect(result.isSuccess()).toBe(true);
        });

        it('returns false if the Result is a fail', () => {
            // Arrange
            const error = new ResultError('TestError', 'Something went wrong');

            // Act
            const result = fail(error);

            // Assert
            expect(result.isSuccess()).toBe(false);
        });
    });
    
    describe('isFailure', () => {
        it('returns false if the Result is a success', () => {
            // Arrange
            const value = 'test';

            // Act
            const result = succeed(value);

            // Assert
            expect(result.isFailure()).toBe(false);
        });

        it('returns true if the Result is a fail', () => {
            // Arrange
            const error = new ResultError('TestError', 'Something went wrong');

            // Act
            const result = fail(error);

            // Assert
            expect(result.isFailure()).toBe(true);
        });
    });

    
    describe('value', () => {
        it('returns the value of the success Result', () => {
            // Arrange
            const value = 'test';

            // Act
            const result = succeed(value);

            // Assert
            expect(result.value()).toBe(value);
        });

        it('throws an error when called on a fail Result', () => {
            // Arrange
            const error = new ResultError('TestError', 'Something went wrong');

            // Act & Assert
            expect(() => fail(error).value()).toThrow('Result: Cannot get value from Err');
        });
    });
});