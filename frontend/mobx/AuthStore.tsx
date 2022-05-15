import {
  createUserWithEmailAndPassword,
  User,
  UserCredential,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { makeAutoObservable } from "mobx";
import { auth } from "../firebase/firebaseConfig";

class AuthStore {
  user?: User = undefined;
  Loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  signup(username: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, username, password);
  }

  updateUserProfile(data: userProfileInput = {}): Promise<void> {
    if (!auth.currentUser) throw new Error("Please Login First");
    let updateData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != null)
    );
    // console.log(updateData);
    return updateProfile(auth.currentUser, updateData);
  }

  login(username: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, username, password);
  }

  logout(): Promise<void> {
    return signOut(auth);
  }

  setUser(user?: User) {
    this.user = user;
  }

  setIsLoading(isLoading: boolean) {
    this.Loading = isLoading;
  }

  get isLoading(): boolean {
    return this.Loading === true;
  }

  get isLogin(): boolean {
    if (this.user) return true;
    return false;
  }

  async getAuthHeader() {
    const token = await this.user?.getIdToken()
    return new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    })
  }
}

type userProfileInput = {
  password?: string;
  name?: string;
  gender?: string;
  birthDate?: string;
  intro?: string;
};

const Store = new AuthStore();

onAuthStateChanged(auth, (user) => {
  if (user) {
    Store.setUser(user);
  } else Store.setUser(undefined);
  Store.setIsLoading(false);
});

export default Store;
