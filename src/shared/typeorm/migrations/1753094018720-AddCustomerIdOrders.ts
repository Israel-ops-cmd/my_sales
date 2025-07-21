import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCustomerIdOrders1753094018720 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'orders',
        new TableColumn({
          name: 'customer_id',
          type: 'integer',
          isNullable: true
        })
      )

      await queryRunner.createForeignKey(
        'orders',
        new TableForeignKey({
          name: 'OrdersCurtomer',
          columnNames: ['customer_id'],
          referencedTableName: 'customers',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL'
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('orders', 'orderCustomer')
      await queryRunner.dropColumn('orders', 'customer_id')
    }

}
