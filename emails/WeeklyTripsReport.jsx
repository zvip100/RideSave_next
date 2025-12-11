import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components';

const WeeklyTripsReport = ({
  userName,
  unitNumber,
  weekStart,
  weekEnd,
  trips = [],
  totalTrips = trips.length,
}) => {
  // Calculate statistics
  const medicaidTrips = trips.filter(t => t.type === 'Medicaid').length;
  const cashTrips = trips.filter(t => t.type === 'Cash').length;

  // Helper function to format date/time
  const formatDateTime = timestamp => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    const dateStr = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return { date: dateStr, time: timeStr };
  };

  // Helper to format payment method
  const formatPaymentMethod = method => {
    if (!method) return <div style={emptyPaymentWrapper}>—</div>;
    const methodData = {
      Cash: { icon: '💵', text: 'Cash' },
      CC: { icon: '💳', text: 'Card' },
      Account: { icon: '👤', text: 'Account' },
    };

    const data = methodData[method];
    if (!data) return method;

    return (
      <div style={paymentWrapper}>
        <span style={paymentIconSpan}>{data.icon}</span>
        <span style={paymentTextSpan}>{data.text}</span>
      </div>
    );
  };

  return (
    <Html>
      <Head />
      <Preview>
        Your weekly trip summary: {totalTrips} trips completed from {weekStart}{' '}
        to {weekEnd}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Row>
              <Column>
                <Heading style={logo}>🚕 RideSave</Heading>
              </Column>
              <Column align="right">
                <Text style={headerDate}>
                  {weekStart} - {weekEnd}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Hero Section */}
          <Section style={hero}>
            <Heading style={heroTitle}>Weekly Trip Report</Heading>

            <Text style={heroText}>
              Here's a summary of {userName} - Unit {unitNumber}'s trips from
              the past week.
            </Text>
          </Section>

          {/* Stats Cards */}
          <Section style={statsContainer}>
            <Row>
              <Column style={statColumn}>
                <div style={statCard}>
                  <Text style={statNumber}>{totalTrips}</Text>
                  <Text style={statLabel}>Total Trips</Text>
                </div>
              </Column>
              <Column style={statColumn}>
                <div style={statCard}>
                  <Text style={statNumber}>{medicaidTrips}</Text>
                  <Text style={statLabel}>Medicaid</Text>
                </div>
              </Column>
              <Column style={statColumn}>
                <div style={statCard}>
                  <Text style={statNumber}>{cashTrips}</Text>
                  <Text style={statLabel}>Cash</Text>
                </div>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Trips Table */}
          <Section style={tableSection}>
            <Heading as="h2" style={sectionTitle}>
              Trip Details
            </Heading>

            {trips.length === 0 ? (
              <Section style={emptyState}>
                <Text style={emptyStateText}>
                  No trips recorded this week. Time to hit the road! 🛣️
                </Text>
              </Section>
            ) : (
              <table style={table}>
                <thead>
                  <tr>
                    <th style={tableHeaderCell}>Date & Time</th>
                    <th style={tableHeaderCell}>Route</th>
                    <th style={tableHeaderCellCenter}>Type</th>
                    <th style={tableHeaderCell}>Payment</th>
                    <th style={tableHeaderCell}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((trip, index) => {
                    const { date, time } = formatDateTime(trip.time);
                    const isEven = index % 2 === 0;

                    return (
                      <tr
                        key={trip.id || index}
                        style={isEven ? tableRowEven : tableRowOdd}
                      >
                        {/* Date & Time */}
                        <td style={tableCellDateTime}>
                          <Text style={tableCellDate}>{date}</Text>
                          <Text style={tableCellTime}>{time}</Text>
                        </td>

                        {/* Route */}
                        <td style={tableCellRoute}>
                          <Text style={tableCellStrong}>{trip.from}</Text>
                          <Text style={tableCellArrow}>↓</Text>
                          <Text style={tableCellDestination}>{trip.to}</Text>
                        </td>

                        {/* Type */}
                        <td style={tableCellType}>
                          <span
                            style={
                              trip.type === 'Medicaid'
                                ? typeBadgeMedicaid
                                : typeBadgeCash
                            }
                          >
                            {trip.type}
                          </span>
                        </td>

                        {/* Payment */}
                        <td style={tableCellPayment}>
                          <div style={tableCellText}>
                            {formatPaymentMethod(trip.paymentMethod)}
                          </div>
                          {trip.stopsPaymentMethod && (
                            <div style={tableCellSubtext}>
                              Stops:{' '}
                              {formatPaymentMethod(trip.stopsPaymentMethod)}
                            </div>
                          )}
                          {trip.waitingPaymentMethod && (
                            <div style={tableCellSubtext}>
                              Waiting:{' '}
                              {formatPaymentMethod(trip.waitingPaymentMethod)}
                            </div>
                          )}
                        </td>

                        {/* Details */}
                        <td style={tableCellDetails}>
                          <div style={detailsContainer}>
                            {trip.clockOnly && (
                              <Text style={detailBadge}>⏱️ Clock Only</Text>
                            )}
                            {trip.stopsPrice && trip.stopsPrice > 0 && (
                              <Text style={tableCellSubtext}>
                                Stops: ${(trip.stopsPrice / 100).toFixed(2)}
                              </Text>
                            )}
                            {trip.waitingPrice && trip.waitingPrice > 0 && (
                              <Text style={tableCellSubtext}>
                                Waiting: ${(trip.waitingPrice / 100).toFixed(2)}
                              </Text>
                            )}
                            {trip.notes && (
                              <Text style={tableCellNotes}>
                                📝 {trip.notes}
                              </Text>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This is your automated weekly report from RideSave.
            </Text>

            <Text style={footerCopyright}>
              © 2025 RideSave. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WeeklyTripsReport;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '64px auto',
  padding: '20px 0',
  maxWidth: '900px',
};

const header = {
  padding: '24px 32px',
  backgroundColor: '#ffffff',
};

const logo = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#2563eb',
  margin: '0',
  lineHeight: '1.2',
};

const headerDate = {
  fontSize: '14px',
  color: '#64748b',
  margin: '0',
  lineHeight: '1.5',
};

const hero = {
  padding: '48px 32px',
  backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  background: '#2563eb',
  textAlign: 'center',
};

const heroTitle = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#ffffff',
  margin: '0 0 16px',
  lineHeight: '1.2',
};

const heroText = {
  fontSize: '16px',
  color: '#e0e7ff',
  margin: '0',
  lineHeight: '1.5',
};

const statsContainer = {
  padding: '32px 32px 24px',
};

const statColumn = {
  padding: '0 8px',
  width: '33.33%',
};

const statCard = {
  textAlign: 'center',
  padding: '20px 16px',
  backgroundColor: '#f8fafc',
  borderRadius: '12px',
};

const statNumber = {
  fontSize: '36px',
  fontWeight: 'bold',
  color: '#0f172a',
  margin: '0 0 4px',
  lineHeight: '1.2',
};

const statLabel = {
  fontSize: '14px',
  color: '#64748b',
  margin: '0',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  fontWeight: '600',
};

const divider = {
  width: 'auto',
  borderColor: '#e2e8f0',
  margin: '24px 32px',
};

const tableSection = {
  padding: '0 32px 32px',
};

const sectionTitle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#0f172a',
  margin: '0 0 24px',
  lineHeight: '1.2',
};

const table = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  overflow: 'hidden',
};

const tableHeaderCell = {
  padding: '16px 12px',
  backgroundColor: '#f8fafc',
  borderBottom: '2px solid #e2e8f0',
  fontSize: '13px',
  fontWeight: '700',
  color: '#475569',
  textAlign: 'left',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const tableHeaderCellCenter = {
  padding: '16px 12px',
  backgroundColor: '#f8fafc',
  borderBottom: '2px solid #e2e8f0',
  fontSize: '13px',
  fontWeight: '700',
  color: '#475569',
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const tableRowEven = {
  backgroundColor: '#ffffff',
};

const tableRowOdd = {
  backgroundColor: '#f8fafc',
};

const tableCellDateTime = {
  padding: '16px 12px',
  borderBottom: '1px solid #e2e8f0',
  fontSize: '14px',
  color: '#334155',
  verticalAlign: 'middle',
};

const tableCellRoute = {
  padding: '16px 12px',
  borderBottom: '1px solid #e2e8f0',
  fontSize: '14px',
  color: '#334155',
  verticalAlign: 'middle',
};

const tableCellType = {
  padding: '16px 12px',
  borderBottom: '1px solid #e2e8f0',
  fontSize: '14px',
  color: '#334155',
  verticalAlign: 'middle',
  textAlign: 'center',
  minWidth: '100px',
};

const tableCellPayment = {
  padding: '20px 12px',
  borderBottom: '1px solid #e2e8f0',
  fontSize: '14px',
  color: '#334155',
  verticalAlign: 'middle',
  minWidth: '150px',
};

const tableCellDetails = {
  padding: '16px 12px',
  borderBottom: '1px solid #e2e8f0',
  fontSize: '14px',
  color: '#334155',
  verticalAlign: 'middle',
};

const detailsContainer = {
  display: 'block',
};

const tableCellDate = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#0f172a',
  margin: '0 0 4px',
  lineHeight: '1.3',
};

const tableCellTime = {
  fontSize: '13px',
  color: '#64748b',
  margin: '0',
  lineHeight: '1.3',
};

const tableCellStrong = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#0f172a',
  margin: '0 0 4px',
  lineHeight: '1.4',
};

const tableCellArrow = {
  fontSize: '12px',
  color: '#94a3b8',
  margin: '0 0 4px',
  lineHeight: '1',
};

const tableCellDestination = {
  fontSize: '14px',
  color: '#475569',
  margin: '0',
  lineHeight: '1.4',
};

const tableCellText = {
  fontSize: '14px',
  color: '#334155',
  margin: '0 0 6px',
  lineHeight: '1.5',
};

const tableCellSubtext = {
  fontSize: '12px',
  color: '#64748b',
  margin: '3px 0',
  lineHeight: '1.5',
};

const paymentWrapper = {
  display: 'inline-block',
  lineHeight: '1.5',
};

const emptyPaymentWrapper = {
  fontSize: '16px',
  color: '#94a3b8',
  lineHeight: '1.5',
};

const paymentIconSpan = {
  fontSize: '15px',
  marginRight: '3px',
};

const paymentTextSpan = {
  verticalAlign: 'middle',
};

const tableCellNotes = {
  fontSize: '12px',
  color: '#64748b',
  margin: '4px 0',
  lineHeight: '1.5',
  wordBreak: 'break-word',
  maxWidth: '250px',
};

const typeBadgeMedicaid = {
  display: 'inline-block',
  padding: '6px 12px',
  backgroundColor: '#dbeafe',
  color: '#1e40af',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.3px',
  whiteSpace: 'nowrap',
};

const typeBadgeCash = {
  display: 'inline-block',
  padding: '6px 12px',
  backgroundColor: '#dcfce7',
  color: '#166534',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.3px',
  whiteSpace: 'nowrap',
};

const detailBadge = {
  fontSize: '12px',
  color: '#7c3aed',
  backgroundColor: '#f3e8ff',
  padding: '4px 8px',
  borderRadius: '4px',
  display: 'inline-block',
  margin: '0 0 6px 0',
  fontWeight: '600',
  whiteSpace: 'nowrap',
};

const emptyState = {
  padding: '48px 24px',
  textAlign: 'center',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  border: '2px dashed #cbd5e1',
};

const emptyStateText = {
  fontSize: '16px',
  color: '#64748b',
  margin: '0',
  lineHeight: '1.5',
};

const footer = {
  padding: '32px 32px 24px',
  textAlign: 'center',
};

const footerText = {
  fontSize: '14px',
  color: '#64748b',
  margin: '0 0 8px',
  lineHeight: '1.5',
};

const footerCopyright = {
  fontSize: '12px',
  color: '#94a3b8',
  margin: '16px 0 0',
  lineHeight: '1.5',
};


