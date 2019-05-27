import {MigrationInterface, QueryRunner} from "typeorm";

export class FieldUpdate1554335864729 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `project` ADD `fileName` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `project` DROP COLUMN `fileName`");
    }

}
