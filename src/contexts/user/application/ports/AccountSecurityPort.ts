import { 
  SuccessfullyOperation, 
  UnsuccessfullyOperation, 
} from "@contexts/shared/domain/types";

export interface AccountSecurityPort {
  sendEmailVerificationCode(): Promise<boolean>;
  verifyEmail(code: string): Promise<boolean>;
  sendPhoneVerificationCode(): Promise<boolean>;
  verifyPhone(code: string): Promise<boolean>;
  validatePassword(currentPassword: string): Promise<SuccessfullyOperation | UnsuccessfullyOperation>;
  updatePassword(
    currentPassword: string, 
    newPassword: string,
  ): Promise<SuccessfullyOperation | UnsuccessfullyOperation>;
}