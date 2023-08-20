import User from "../../models/User";

class UserService {
  async findByFirebaseId(firebaseId: string) {
    if (!firebaseId) return;
    return User.findOne({ firebaseId });
  }
}

export default new UserService();
