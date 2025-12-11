// Sample data for email preview/testing
export const sampleTrips = [
  {
    id: 1,
    userId: 3,
    from: 'Brooklyn Medical Center',
    to: 'Manhattan Specialist Clinic',
    time: '2025-11-25 09:30:00',
    type: 'Medicaid',
    paymentMethod: null,
    clockOnly: false,
    notes: 'Patient needs wheelchair assistance',
    stopsPrice: 1500, // $15.00 in cents
    stopsPaymentMethod: 'Cash',
    waitingPrice: null,
    waitingPaymentMethod: null,
  },
  {
    id: 2,
    userId: 3,
    from: '123 Oak Street, Apartment 4B',
    to: 'Queens General Hospital - ER',
    time: '2025-11-25 14:15:00',
    type: 'Cash',
    paymentMethod: 'CC',
    clockOnly: false,
    notes: '',
    stopsPrice: null,
    stopsPaymentMethod: null,
    waitingPrice: 2000, // $20.00 in cents
    waitingPaymentMethod: 'CC',
  },
  {
    id: 3,
    userId: 3,
    from: 'Staten Island Ferry Terminal',
    to: 'Brooklyn Heights Pharmacy',
    time: '2025-11-26 10:00:00',
    type: 'Medicaid',
    paymentMethod: null,
    clockOnly: true,
    notes: '',
    stopsPrice: null,
    stopsPaymentMethod: null,
    waitingPrice: null,
    waitingPaymentMethod: null,
  },
  {
    id: 4,
    userId: 3,
    from: 'Bronx Community Hospital',
    to: '456 Elm Avenue, Suite 200',
    time: '2025-11-26 16:45:00',
    type: 'Cash',
    paymentMethod: 'Cash',
    clockOnly: false,
    notes: 'Call upon arrival',
    stopsPrice: 800, // $8.00 in cents
    stopsPaymentMethod: 'Cash',
    waitingPrice: 1200, // $12.00 in cents
    waitingPaymentMethod: 'Account',
  },
  {
    id: 5,
    userId: 3,
    from: 'Manhattan Dialysis Center',
    to: '789 Pine Street',
    time: '2025-11-27 08:00:00',
    type: 'Medicaid',
    paymentMethod: null,
    clockOnly: false,
    notes: 'Regular morning pickup',
    stopsPrice: null,
    stopsPaymentMethod: null,
    waitingPrice: null,
    waitingPaymentMethod: null,
  },
  {
    id: 6,
    userId: 3,
    from: 'JFK Airport Terminal 4',
    to: 'Mount Sinai Hospital',
    time: '2025-11-27 11:30:00',
    type: 'Cash',
    paymentMethod: 'CC',
    clockOnly: false,
    notes: 'International arrival - may be delayed',
    stopsPrice: 2500, // $25.00 in cents
    stopsPaymentMethod: 'CC',
    waitingPrice: 3000, // $30.00 in cents
    waitingPaymentMethod: 'CC',
  },
  {
    id: 7,
    userId: 3,
    from: 'Queens Rehabilitation Center',
    to: '321 Maple Drive',
    time: '2025-11-28 13:20:00',
    type: 'Medicaid',
    paymentMethod: null,
    clockOnly: false,
    notes: '',
    stopsPrice: null,
    stopsPaymentMethod: null,
    waitingPrice: 500, // $5.00 in cents
    waitingPaymentMethod: 'Cash',
  },
];

export const sampleEmailProps = {
  userName: 'John Driver',
  weekStart: 'Nov 21, 2025',
  weekEnd: 'Nov 28, 2025',
  trips: sampleTrips,
  totalTrips: sampleTrips.length,
  totalEarnings: 7500, // $75.00
};


