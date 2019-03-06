import {MigrationInterface, QueryRunner} from "typeorm";

export class schedule1551896876393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `schedule` (`id` int NOT NULL AUTO_INCREMENT, `description` varchar(255) NOT NULL, `date` datetime(0) NOT NULL, `log` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `schedule`");
    }

}
