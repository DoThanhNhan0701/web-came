export interface IUser {
  id: number;
  username: string;
  email: string;
  full_name: string | null;
  is_lock: boolean;
  is_superuser: boolean;
  is_staff: boolean;
}