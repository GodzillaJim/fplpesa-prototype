import { firebaseAuth } from "../../config/firebase";
import Logger from "../../config/Logger";

const log = new Logger("AuthManager").logger;
class AuthManager {
  private firebase: typeof firebaseAuth;
  constructor() {
    this.firebase = firebaseAuth;
  }

  async verifyToken(token: string) {
    if (!token) return null;
    const user = await this.firebase.verifyIdToken(token);
    log.info("Firebase verification response: " + JSON.stringify(user));
    if (!user) {
      throw Error("Unauthorized");
    }
    return user;
  }
}

export default new AuthManager();
