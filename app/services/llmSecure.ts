import { AxSecure } from "./axSecure";

class LLMSecure extends AxSecure{
    constructor(){
        super(process.env.NEXT_PUBLIC_LLM_URL || '');
    }
}

const llmsecure = new LLMSecure();
export default llmsecure;