import {
  pgTable,
  serial,
  timestamp,
  varchar,
  integer,
  pgEnum,
  boolean,
} from 'drizzle-orm/pg-core';

export const paymentMethodEnum = pgEnum('payment_method', [
  'Cash',
  'CC',
  'Account',
]);
export const tripTypeEnum = pgEnum('trip_type', ['Medicaid', 'Cash']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }).notNull().unique(),
  unit: varchar('unit', { length: 10 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const trips = pgTable('trips', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  from: varchar('_from', { length: 255 }).notNull(),
  to: varchar('_to', { length: 255 }).notNull(),
  time: timestamp('time', { mode: 'string' }).notNull(),
  type: tripTypeEnum('type').notNull().default('Medicaid'),
  paymentMethod: paymentMethodEnum('payment_method'),
  clockOnly: boolean('clock_only').default(false),
  stopsPrice: integer('stops_price'),
  stopsPaymentMethod: paymentMethodEnum('stops_payment_method'),
  waitingPrice: integer('waiting_price'),
  waitingPaymentMethod: paymentMethodEnum('waiting_payment_method'),
  notes: varchar('notes', { length: 1024 }).default(''),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
});


