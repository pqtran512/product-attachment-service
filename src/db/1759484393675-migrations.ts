import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1759484393675 implements MigrationInterface {
    name = 'Migrations1759484393675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`attachment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`filename\` varchar(255) NOT NULL, \`path\` varchar(500) NOT NULL, \`extension\` varchar(50) NOT NULL, \`size\` int NOT NULL, \`mime_type\` varchar(100) NOT NULL, \`uploaded_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`alias\` varchar(400) CHARACTER SET "utf8" NOT NULL, \`name\` varchar(400) CHARACTER SET "utf8" NOT NULL, \`brand_id\` int NOT NULL DEFAULT '1', \`category_id\` int NULL, \`price\` int NOT NULL DEFAULT '0', \`barcode\` varchar(50) CHARACTER SET "utf8" NULL, \`description\` varchar(4000) NULL, \`weight\` float NULL, \`length\` float NULL, \`width\` float NULL, \`height\` float NULL, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`created_by_uuid\` varchar(255) CHARACTER SET "utf8mb4" NULL, \`created_by_name\` varchar(50) NULL, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`updated_by_uuid\` varchar(255) CHARACTER SET "utf8mb4" NULL, \`updated_by_name\` varchar(50) NULL, \`deleted_at\` date NULL, \`deleted_by_uuid\` varchar(255) NULL, \`deleted_by_name\` varchar(50) NULL, FULLTEXT INDEX \`name\` (\`name\`), INDEX \`fk_product_brand_idx\` (\`brand_id\`), INDEX \`fk_product_category_idx\` (\`category_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_d2a80c3a8d467f08a750ac4b420\` FOREIGN KEY (\`id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_d2a80c3a8d467f08a750ac4b420\``);
        await queryRunner.query(`DROP INDEX \`fk_product_category_idx\` ON \`product\``);
        await queryRunner.query(`DROP INDEX \`fk_product_brand_idx\` ON \`product\``);
        await queryRunner.query(`DROP INDEX \`name\` ON \`product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`attachment\``);
    }

}
