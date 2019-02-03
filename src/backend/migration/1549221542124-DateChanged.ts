import {MigrationInterface, QueryRunner} from "typeorm";

export class DateChanged1549221542124 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `task` DROP COLUMN `taskName`");
        await queryRunner.query("ALTER TABLE `task` ADD `taskName` date NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `task` DROP COLUMN `taskName`");
        await queryRunner.query("ALTER TABLE `task` ADD `taskName` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
    }

}
