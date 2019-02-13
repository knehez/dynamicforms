import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductProject1550088862973 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `project` (`id` int NOT NULL AUTO_INCREMENT, `projectName` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `productName` varchar(255) NOT NULL, `projectId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_ddb019b1a0244697911f4e6e118` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_ddb019b1a0244697911f4e6e118`");
        await queryRunner.query("DROP TABLE `product`");
        await queryRunner.query("DROP TABLE `project`");
    }

}
