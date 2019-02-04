import {MigrationInterface, QueryRunner} from "typeorm";

export class TaskDateChanged21549232024527 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `task` DROP COLUMN `dueDate`");
        await queryRunner.query("ALTER TABLE `task` ADD `dueDate` datetime NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `task` DROP COLUMN `dueDate`");
        await queryRunner.query("ALTER TABLE `task` ADD `dueDate` date NOT NULL");
    }

}
