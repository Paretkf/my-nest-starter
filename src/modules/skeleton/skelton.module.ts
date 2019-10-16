import { SkeletonController } from "./controllers/skelton.controller";
import { Module } from "@nestjs/common";

@Module({
  controllers: [SkeletonController]
})

export class SkeltonModule {}
