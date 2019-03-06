import {MigrationInterface, QueryRunner} from "typeorm";

export class mediumtext1551901254903 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `schedule` DROP COLUMN `log`");
        await queryRunner.query("ALTER TABLE `schedule` ADD `log` mediumtext NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `schedule` DROP COLUMN `log`");
        await queryRunner.query("ALTER TABLE `schedule` ADD `log` text NOT NULL");
    }

}
