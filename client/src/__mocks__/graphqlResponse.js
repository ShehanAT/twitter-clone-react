const mockResponse = {
    data: {
       
    }
}


export default {
    get: jest.fn().mockResolvedValue(mockResponse)
}