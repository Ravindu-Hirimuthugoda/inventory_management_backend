const tokenHandler  = require("../../middleware/authorization");



// verify.mockReturnValue({
//   //...
// })

describe('getAllUsers', () => {

    
    let req;
    let res;
    let next;

    let code;
    let data;
    let header;

    const exec = async () => {    
        
        return await tokenHandler(req,res,next);
    }

    const mockResponse = () => {
        const response = {};
        response.status = jest.fn().mockReturnValue(code);
        response.json = jest.fn().mockReturnValue(data);
        return response;
    };

      const mockRequest = () => {
        const request = {};
        request.Authorization = jest.fn().mockReturnValue(header);       
        return request;
      };

    test('should Next() if valid token', async () => {
        header = "aa  a";
        req = mockRequest();
        code = 200,
        data = "aa  a"
        res = mockResponse();
        next = jest.fn((req, res, next) => next());
        const result = await exec();
        expect(result).toBe(next);
    });
});