export interface Task {
  id?: number;
  description: string;
  title: string;
  startAt: string;
  endAt: string;
  priority: string;
  createdAt?: Date;
  status?: string;
  idUser?: string;
}
