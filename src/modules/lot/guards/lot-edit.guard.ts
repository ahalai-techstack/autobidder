import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LotService } from '../lot.service';
import { LotPolicy } from '../lot.policy';

@Injectable()
export class LotEditGuard implements CanActivate {
  constructor(private lotService: LotService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const lotId = request.params.id;

    const lot = await this.lotService.findById(lotId);

    if (!lot) throw new ForbiddenException('Post not found');

    if (!LotPolicy.canUpdate(user, lot)) {
      throw new ForbiddenException(
        'You do not have permission to update this post',
      );
    }

    return true;
  }
}
