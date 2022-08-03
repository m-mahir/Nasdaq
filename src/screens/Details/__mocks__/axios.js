export default {
  // get: jest.fn().mockRejectedValue(new Error("Async error message")),
  get: jest.fn().mockRejectedValue({
    status: "ERROR",
    error:
      "You've exceeded the maximum requests per minute, please wait or upgrade your subscription to continue. https://polygon.io/pricing",
  }),
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() },
  },
};
