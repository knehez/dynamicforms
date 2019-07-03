import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRoleTable1552484946583 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `role` ( `id` INT PRIMARY KEY AUTO_INCREMENT, `roleName` VARCHAR(100) UNIQUE NOT NULL ) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_roles_role` ( `userId` INT NOT NULL, `roleId` INT NOT NULL, UNIQUE KEY `user_role_unique` (`userId`, `roleId`), FOREIGN KEY (`userId`) REFERENCES `user`(`id`)) ENGINE=InnoDB")
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `user_roles_role`")
        await queryRunner.query("DROP TABLE `role`");
    }
}