# Frontend Screen List

## Project Title
Driver Incentive & Performance Bonus Tracker

## Company
Manivtha Tours & Travels

## Purpose
This document lists the main frontend screens required for the Driver Incentive & Performance Bonus Tracker. The system is mainly designed for admin, staff, and management users. Drivers are the people whose performance is tracked, but they do not directly update the dashboard data.

---

## 1. Admin Dashboard

### Purpose
The Admin Dashboard gives management a quick overview of driver performance and incentive status.

### Main Features
- Total drivers
- Total trips completed
- Total incentive amount
- Pending approvals
- Paid incentives
- Top-performing drivers
- Monthly performance summary

---

## 2. Driver Performance Entry Form

### Purpose
This screen allows admin or staff users to enter monthly driver performance details.

### Fields
- Driver ID
- Driver Name
- Month
- Trips Completed
- On-time Trips
- Late Trips
- Customer Rating
- Complaints
- Base Salary
- Incentive Amount
- Final Payout
- Status

### Notes
The incentive amount and final payout should be calculated automatically based on performance data.

---

## 3. Driver Incentive Dashboard

### Purpose
This screen shows all driver performance and incentive records in a table format.

### Table Columns
- Driver ID
- Driver Name
- Month
- Trips Completed
- Punctuality Percentage
- Customer Rating
- Incentive Amount
- Final Payout
- Status
- Actions

### Actions
- View
- Edit
- Approve
- Mark as Paid
- Export

---

## 4. Detail and History View

### Purpose
This screen shows complete details of one selected driver record.

### Main Details
- Driver information
- Monthly performance data
- Incentive calculation breakdown
- Payment status
- Previous month history
- Action history

---

## 5. Reports and Analytics Dashboard

### Purpose
This screen helps management understand performance trends and incentive payouts.

### Main Features
- Monthly incentive summary
- Top-performing drivers
- Rating trends
- Punctuality chart
- Trips completed chart
- Total payout report
- CSV or PDF export option