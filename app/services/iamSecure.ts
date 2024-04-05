import { AxSecure } from "./axSecure";

class IamSecure extends AxSecure{
    constructor(){
        super(process.env.NEXT_PUBLIC_IAM_URL || '');
    }

}

const iamsecure = new IamSecure();
export default iamsecure;