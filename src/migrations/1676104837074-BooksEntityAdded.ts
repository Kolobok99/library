import { MigrationInterface, QueryRunner } from "typeorm";

export class BooksEntityAdded1676104837074 implements MigrationInterface {
    name = 'BooksEntityAdded1676104837074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "subscriptionId" integer, CONSTRAINT "PK_2c244e2a14402a6a9f943295412" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "books_entity" ADD CONSTRAINT "FK_71c16bc7adc01b313bd2481338c" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books_entity" DROP CONSTRAINT "FK_71c16bc7adc01b313bd2481338c"`);
        await queryRunner.query(`DROP TABLE "books_entity"`);
    }

}
