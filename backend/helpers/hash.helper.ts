import { compare, genSalt, hash } from "../deps.ts";

class HashHelper {
  public static async encrypt(str: string): Promise<string> {
    const salt = await genSalt(8);
    return hash(str, salt);
  }
  public static async compare(plain: string, _hash: string): Promise<boolean> {
    return await compare(plain, _hash);
  }
}

export default HashHelper;
