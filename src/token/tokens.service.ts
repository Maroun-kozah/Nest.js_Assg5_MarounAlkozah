import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './token.schema';

@Injectable()
export class TokensService {
  constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {}

  async create(userId: string, refreshToken: string): Promise<Token> {
    const createdToken = new this.tokenModel({ userId, refreshToken });
    return createdToken.save();
  }

  async validate(refreshToken: string): Promise<Token | null> {
    return this.tokenModel.findOne({ refreshToken });
  }

  async delete(refreshToken: string): Promise<any> {
    return this.tokenModel.deleteOne({ refreshToken });
  }
}
