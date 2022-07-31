const mockResponse = {
  data: {
    status: "OK",
    results: [
      {
        name: "Apple",
        ticker: "AAPL",
      },
    ],
  },
};

export default {
  get: jest.fn().mockResolvedValue(mockResponse),
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() },
  },
};
