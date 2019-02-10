import {MigrationInterface, QueryRunner} from "typeorm";

export class userTaskRelation1549823383972 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user_tasks_task` (`userId` int NOT NULL, `taskId` int NOT NULL, PRIMARY KEY (`userId`, `taskId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user_tasks_task` ADD CONSTRAINT `FK_1fb6a986133f8f6cafb3d4fb31e` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `user_tasks_task` ADD CONSTRAINT `FK_9bcb8e9773d79c9874a61f79c3d` FOREIGN KEY (`taskId`) REFERENCES `task`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_tasks_task` DROP FOREIGN KEY `FK_9bcb8e9773d79c9874a61f79c3d`");
        await queryRunner.query("ALTER TABLE `user_tasks_task` DROP FOREIGN KEY `FK_1fb6a986133f8f6cafb3d4fb31e`");
        await queryRunner.query("DROP TABLE `user_tasks_task`");
    }

}
