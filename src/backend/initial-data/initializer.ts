import { Repository } from 'typeorm';

export abstract class Initializer {
    entities: any[] = [];
    repository: Repository<any>;

    async initialize () {
        const entityCount = await this.repository.createQueryBuilder().getCount();

        if (entityCount === 0) {
            this.repository.save(this.entities);
        }
    }
}
