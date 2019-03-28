import {MigrationInterface, QueryRunner} from "typeorm";

export class file1553389447775 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `project` ADD `fileData` longtext NULL");
       }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `project` DROP COLUMN `fileData`");
    }

}
