import { FileMetaData } from "./File.type";
import User from "./user.type";

export type Share = {
  id: string;
  files: FileMetaData[];
  creator: User;
  description?: string;
  expiration: Date;
  hasPassword: boolean;
};

export type CreateShare = {
  id: string;
  description?: string;
  recipients: string[];
  expiration: string;
  security: ShareSecurity;
};

export type ShareMetaData = {
  id: string;
  isZipReady: boolean;
};

export type MyShare = Share & {
  views: number;
  cratedAt: Date;
  accessLogs: AccessLog[];
  downLogs: DownLog[];
};

export type AccessLog = {
  id: string;
  timestamp: Date;
  ip: string;
};

export type DownLog = {
  createdAt: any;
  id: string;
  takenTime: number;
  ip: string;
  createAt: Date;
};

export type MyReverseShare = {
  id: string;
  maxShareSize: string;
  shareExpiration: Date;
  remainingUses: number;
  shares: MyShare[];
};

export type ShareSecurity = {
  maxViews?: number;
  password?: string;
};
