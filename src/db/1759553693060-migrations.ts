import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1759553693060 implements MigrationInterface {
    name = 'Migrations1759553693060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_d2a80c3a8d467f08a750ac4b420\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD \`product_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_d82808707e524ee56d0e9c8fc71\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_d82808707e524ee56d0e9c8fc71\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP COLUMN \`product_id\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_d2a80c3a8d467f08a750ac4b420\` FOREIGN KEY (\`id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
