export type UserDTO = { 
  id: string; 
  email: string; 
  name?: string;
  createdAt: Date;
};

export type ContactMessageDTO = {
  id: string;
  email: string;
  message: string;
  createdAt: Date;
};
