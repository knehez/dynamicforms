import {MigrationInterface, QueryRunner} from "typeorm";

export class TaskItem1549316020902 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `task_item` (`id` int NOT NULL AUTO_INCREMENT, `itemName` varchar(255) NOT NULL, `dueDate` datetime NOT NULL, `taskId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `task` CHANGE `dueDate` `dueDate` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `task_item` ADD CONSTRAINT `FK_684166faa827a4689abd35c83b1` FOREIGN KEY (`taskId`) REFERENCES `task`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `task_item` DROP FOREIGN KEY `FK_684166faa827a4689abd35c83b1`");
        await queryRunner.query("ALTER TABLE `task` CHANGE `dueDate` `dueDate` datetime(0) NOT NULL");
        await queryRunner.query("DROP TABLE `task_item`");
    }

}
