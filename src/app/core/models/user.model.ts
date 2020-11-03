export interface UserModel {
  uid: string;
  email: string;
  displayName?: string;
  phoneNumber?: string;
  photoURL?: string;
  emailVerified?: boolean;
}
