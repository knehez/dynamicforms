import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUniqueConstraintForUserEmailCol1551989881554 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT user_email_unique UNIQUE(`email`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP INDEX user_email_unique");
    }

}
