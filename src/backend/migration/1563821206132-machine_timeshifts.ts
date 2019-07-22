import {MigrationInterface, QueryRunner} from "typeorm";

export class machineTimeshifts1563821206132 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `machine` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `setupTime` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `time_shift` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `startTime` int NOT NULL, `endTime` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `machine_time_shifts_time_shift` (`machineId` int NOT NULL, `timeShiftId` int NOT NULL, PRIMARY KEY (`machineId`, `timeShiftId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `machine_time_shifts_time_shift` ADD CONSTRAINT `FK_d955fd6b63027c3616c5bd00795` FOREIGN KEY (`machineId`) REFERENCES `machine`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `machine_time_shifts_time_shift` ADD CONSTRAINT `FK_6d37580b71d73f0e433052eb30f` FOREIGN KEY (`timeShiftId`) REFERENCES `time_shift`(`id`) ON DELETE CASCADE");

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `machine_time_shifts_time_shift` DROP FOREIGN KEY `FK_fef41d967151110d714b9e2f3d0`");
        await queryRunner.query("ALTER TABLE `machine_time_shifts_time_shift` DROP FOREIGN KEY `FK_a4fb688c6471a487701744ed393`");
        await queryRunner.query("DROP TABLE `machine_time_shifts_time_shift`");
        await queryRunner.query("DROP TABLE `time_shift`");
        await queryRunner.query("DROP TABLE `machine`");
    }

}
