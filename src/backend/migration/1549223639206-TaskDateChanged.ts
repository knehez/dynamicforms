import {MigrationInterface, QueryRunner} from "typeorm";

export class TaskDateChanged1549223639206 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `task` DROP COLUMN `taskName`");
        await queryRunner.query("ALTER TABLE `task` ADD `taskName` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `task` DROP COLUMN `dueDate`");
        await queryRunner.query("ALTER TABLE `task` ADD `dueDate` date NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `task` DROP COLUMN `dueDate`");
        await queryRunner.query("ALTER TABLE `task` ADD `dueDate` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `task` DROP COLUMN `taskName`");
        await queryRunner.query("ALTER TABLE `task` ADD `taskName` date NOT NULL");
    }

}
