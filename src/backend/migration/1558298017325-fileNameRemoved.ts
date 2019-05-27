import {MigrationInterface, QueryRunner} from "typeorm";

export class fileNameRemoved1558298017325 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        
        await queryRunner.query("ALTER TABLE `project` DROP COLUMN `fileName`");
       
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
       
        await queryRunner.query("ALTER TABLE `project` ADD `fileName` varchar(255) NULL");
    
    }

}
