import { PartialType } from '@nestjs/swagger';
import { CreateMockDto } from './create-mock.dto';

export class UpdateMockDto extends PartialType(CreateMockDto) {}
