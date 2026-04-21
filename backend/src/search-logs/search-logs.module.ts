import { Module } from '@nestjs/common';
import { SearchLogsService } from './search-logs.service';
import { SearchLogsController } from './search-logs.controller';

@Module({
  controllers: [SearchLogsController],
  providers: [SearchLogsService],
})
export class SearchLogsModule {}
