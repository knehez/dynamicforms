import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveColumns1549044343070 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `note`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `note2`");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `note2` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `note` varchar(255) NOT NULL");
    }

}
