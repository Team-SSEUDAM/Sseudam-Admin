import { Address, Point, ReportStatus } from "./report";
import { TrashType } from "./suggestion";

export interface User {
  userId: number;
  email: string;
  nickname: string;
  createdAt: string;
}

export interface UserListResponse {
  list: User[];
  totalCount: number;
}

export interface UserDetail {
  userId: number;
  email: string;
  nickname: string;
  createdAt: string;
  visitedSpot: VisitedSpot[];
}

export interface VisitedSpot {
  id: number;
  userId: number;
  spotName: string;
  point: Point;
  region: string;
  address: Address;
  trashType: TrashType;
  imageUrl?: string;
  status: ReportStatus;
  updatedAt: string;
}
