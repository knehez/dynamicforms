import {MigrationInterface, QueryRunner} from "typeorm";

export class GenderAdded1549138436238 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `gender` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `gender`");
    }

}
