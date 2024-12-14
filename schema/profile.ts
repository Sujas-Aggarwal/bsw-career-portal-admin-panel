import { ObjectId } from "mongodb";
export type Profile = {
  id: ObjectId;
  name: string;
  name2: string;
  cover_image: string;
  bg_image: string;
  overview: string;
  readmore: string;
  payscale: string;
  branches: string;
  skills: string;
  trajectory: string;
  resume: string;
  companies: string;
  resources: string;
};
