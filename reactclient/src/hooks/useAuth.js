import React, { createContext, useContext } from 'react';

// Auth Context তৈরি করা হলো
export const AuthContext = createContext();

// একটি কাস্টম হুক, যা অন্য কম্পোনেন্টগুলো থেকে Context ব্যবহার করতে সাহায্য করবে
export const useAuth = () => {
  return useContext(AuthContext);
};