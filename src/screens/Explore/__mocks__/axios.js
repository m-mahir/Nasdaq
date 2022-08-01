import { results } from "./results";

const mockResponse = {
  data: {
    status: "OK",
    results: results,
  },
};

const mockEmptyResponse = {
  data: {
    status: "OK",
    results: [],
  },
};

export default {
  get: jest
    .fn()
    .mockResolvedValueOnce(mockEmptyResponse)
    .mockResolvedValue(mockResponse),
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() },
  },
};
