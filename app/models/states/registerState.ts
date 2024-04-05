import { RegisterForm } from "../RegisterForm";


export interface RegisterState {
    user:RegisterForm | null;
    loading: boolean;
    error: any | null;
}