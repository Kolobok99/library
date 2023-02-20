import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserToRoles1676822788522 implements MigrationInterface {
    name = 'AddUserToRoles1676822788522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books_entity" ADD CONSTRAINT "UQ_9e7710dcf6ac96859d41eb30ea4" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "books_entity" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books_entity" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "books_entity" DROP CONSTRAINT "UQ_9e7710dcf6ac96859d41eb30ea4"`);
    }

}
