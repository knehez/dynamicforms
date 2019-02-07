import {MigrationInterface, QueryRunner} from "typeorm";

export class isDone1549547343236 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `task` ADD `isDone` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `task_item` CHANGE `dueDate` `dueDate` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `task` CHANGE `dueDate` `dueDate` datetime NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `task` CHANGE `dueDate` `dueDate` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `task_item` CHANGE `dueDate` `dueDate` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `task` DROP COLUMN `isDone`");
    }

}
