import { createAsyncStorage } from '@react-native-async-storage/async-storage';
import { SignUpData, User } from '../context/AuthContext';

const storage = createAsyncStorage('appDB');

const setStorageItem = async (key: string, value: string) => {
  try {
    await storage.setItem(key, value);
  } catch (error) {
    console.error('Error setting item in storage:', error);
  }
};

const getStorageItem = async (key: string): Promise<string | null> => {
  try {
    const value = await storage.getItem(key);
    return value;
  } catch (error) {
    console.error('Error getting item from storage:', error);
    return null;
  }
};

const getUserFromStorage = async (): Promise<User | null> => {
  try {
    const user = await getStorageItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting user from storage:', error);
    return null;
  }
};

const setUserInStorage = async (user: User) => {
  try {
    await setStorageItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error setting user in storage:', error);
  }
};

const removeUserFromStorage = async () => {
  try {
    await storage.removeItem('user');
  } catch (error) {
    console.error('Error removing user from storage:', error);
  }
};

const addUserToUserList = async (user: SignUpData) => {
  try {
    const userListString = await getStorageItem('userList');
    const userList = userListString ? JSON.parse(userListString) : [];
    userList.push(user);
    await setStorageItem('userList', JSON.stringify(userList));
  } catch (error) {
    console.error('Error adding user to user list in storage:', error);
  }
};

const getUserListFromStorage = async (): Promise<SignUpData[]> => {
  try {
    const userListString = await getStorageItem('userList');
    return userListString ? JSON.parse(userListString) : [];
  } catch (error) {
    console.error('Error getting user list from storage:', error);
    return [];
  }
};

export {
  addUserToUserList,
  getUserFromStorage,
  getUserListFromStorage,
  removeUserFromStorage,
  setUserInStorage,
};
