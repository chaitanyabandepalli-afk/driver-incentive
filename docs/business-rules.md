# Business Rules

## Project Title
Driver Incentive & Performance Bonus Tracker

## Company
Manivtha Tours & Travels

## Purpose
This document defines the main business rules for calculating driver incentives and managing performance records.

---

## 1. Driver Data Rules

1. Driver ID must be unique.
2. Driver name cannot be empty.
3. Month must be selected for every performance record.
4. Each driver should have only one incentive record per month.
5. Only admin or staff users can add or update driver performance data.

---

## 2. Trip Rules

1. Trips completed cannot be negative.
2. On-time trips cannot be greater than total trips completed.
3. Late trips cannot be greater than total trips completed.
4. Total trips should be calculated properly using on-time and late trip values.
5. If trips completed is zero, incentive should also be zero.

---

## 3. Rating Rules

1. Customer rating must be between 1 and 5.
2. Rating below 1 is invalid.
3. Rating above 5 is invalid.
4. Higher customer rating should increase incentive eligibility.
5. Drivers with poor ratings should receive reduced or no incentive.

---

## 4. Punctuality Rules

1. Punctuality percentage should be calculated automatically.
2. Formula:

   Punctuality Percentage = (On-time Trips / Trips Completed) × 100

3. If punctuality is high, incentive amount should increase.
4. If punctuality is low, incentive amount should decrease.
5. Punctuality should be shown clearly on the dashboard.

---

## 5. Incentive Calculation Rules

1. Incentive should be calculated automatically based on trips completed, punctuality, and customer rating.
2. Manual incentive editing should be restricted to admin users only.
3. Final payout should be calculated using:

   Final Payout = Base Salary + Incentive Amount

4. Approved incentives can be marked as paid.
5. Paid records should not be edited without admin permission.

---

## 6. Status Rules

A driver incentive record can have the following statuses:

- Pending
- Approved
- Paid
- Rejected

### Status Flow

Pending → Approved → Paid

Pending → Rejected

---

## 7. Access Rules

| User Role | Permission |
|---|---|
| Admin | Full access to add, edit, approve, pay, delete, and export |
| Staff | Can add and update performance records |
| Management | Can view reports and dashboard |
| Driver | Can only view own performance in future version, but cannot update data |

---

## 8. Report Rules

1. Reports should show total incentive paid.
2. Reports should show top-performing drivers.
3. Reports should show monthly trip count.
4. Reports should show rating and punctuality trends.
5. Reports should be exportable as CSV or PDF in the final version.