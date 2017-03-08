import Transport from './public/modules/Transport/Transport';

describe('Example of testing with Jasmine and Karma', function () {
  it('does not matter how to create an array', function () {
    let a = 3;
    expect(a).toBe(3);
  });
  it('does not matter how to create an array', function () {
    expect([1, 2, 3]).toEqual(new Array(1, 2, 3));
  });
});