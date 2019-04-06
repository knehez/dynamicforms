import {MigrationInterface, QueryRunner} from "typeorm";

export class resultColumn1554576705528 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `schedule` ADD `result` varchar(255) NOT NULL");
            }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `schedule` DROP COLUMN `result`");
    }

}
