import { User, } from "@contexts/shared/domain/models";
import { SuccessfullyOperation, UnsuccessfullyOperation, } from "@contexts/shared/domain/types";

export interface UpdateAccountPort {
  updateUserData(user: User): Promise<SuccessfullyOperation | UnsuccessfullyOperation>;
}