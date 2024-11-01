export function makeQuerablePromise(
  promise: any,
  handleError: (e: any) => void
) {
  // Don't modify any promise that has been already modified.
  if (promise.isFulfilled) return promise;

  // Set initial state
  let isPending = true;
  let isRejected = false;
  let isFulfilled = false;
  let data: any = null;

  // Observe the promise, saving the fulfillment in a closure scope.
  const result = promise.then(
    function (v: any) {
      isFulfilled = true;
      isPending = false;
      data = v;
      return v;
    },
    function (e: any) {
      isRejected = true;
      isPending = false;
      handleError(e);
    }
  );

  result.isFulfilled = function () {
    return isFulfilled;
  };
  result.isPending = function () {
    return isPending;
  };
  result.isRejected = function () {
    return isRejected;
  };
  result.getData = function () {
    return data;
  };
  return result;
}
