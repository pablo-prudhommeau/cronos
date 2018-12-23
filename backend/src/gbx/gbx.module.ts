import {Module, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import {GbxService} from './gbx.service';

@Module({
    providers: [
        GbxService
    ],
    exports: [
        GbxService
    ]
})
export class GbxModule implements OnModuleInit, OnModuleDestroy {

    constructor(private gbxService: GbxService) {}

    onModuleInit(): any {
        this.gbxService.connect();
    }

    onModuleDestroy(): any {
        this.gbxService.disconnect();
    }

}