import {MigrationInterface, QueryRunner} from "typeorm";

export class TaskItem21549484834168 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `task_item` CHANGE `dueDate` `dueDate` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `task` CHANGE `dueDate` `dueDate` datetime NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `task` CHANGE `dueDate` `dueDate` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `task_item` CHANGE `dueDate` `dueDate` datetime(0) NOT NULL");
    }

}
