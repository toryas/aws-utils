import { getAWSSdk } from './sdk.service';

describe('Unit Test for SDK service', () => {
    test('', () => {
        let resp = getAWSSdk();
        console.log(resp.configured);
    });
});