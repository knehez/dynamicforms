import {MigrationInterface, QueryRunner} from "typeorm";

export class routeAdded1563988065630 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `route` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `operations` mediumtext NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `route`");
    }

}
