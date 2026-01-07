EXPENSE SPLITTER APPLICATION
Day 11 - 45 Days of Code Challenge

PROJECT OVERVIEW

The Expense Splitter is a web-based financial utility application designed to simplify the process of tracking shared expenses within a group. Whether for trips, roommates, or social gatherings, this tool solves the complexity of calculating debts. It features a robust algorithm that automatically determines net balances, clearly indicating who owes whom and the specific amounts, eliminating the need for manual calculations.

KEY FEATURES

1. Group Management
Users can create a digital ledger by adding multiple participants to a tracking group.

2. Expense Recording
The application allows users to input specific expenses, selecting the payer and selecting which group members share the cost.

3. Automated Balance Calculation
The core engine calculates the net financial position of every individual. It updates in real-time to show if a person owes money or is owed money.

4. Total Expense Tracking
A dedicated dashboard section displays the total accumulated cost of the trip or event.

5. Data Persistence
The application utilizes the browser LocalStorage API to save all user data, expenses, and transaction history, ensuring information is not lost upon page refresh.

6. Crash Protection
Implemented error handling to manage data corruption scenarios, ensuring the application resets gracefully rather than crashing.

TECHNICAL STACK

1. Frontend Framework: React.js (Vite environment)
2. Styling: Pure CSS (Implementing Glassmorphism and Responsive Grid Layouts)
3. State Management: React useState and useEffect Hooks
4. Local Storage: Browser-based data persistence

LOGIC EXPLANATION

The application operates on a zero-sum net balance algorithm.

1. Initialization:
Every participant starts with a balance of zero.

2. Transaction Processing:
When an expense is added, the algorithm takes the total amount and the number of people involved.
The Payer receives a positive credit equal to the total amount paid.
The Splitters (people sharing the cost) receive a negative debit equal to their split share.

3. Result:
A positive final balance indicates the user should receive money.
A negative final balance indicates the user owes money to the group.

INSTALLATION INSTRUCTIONS

Follow these steps to run the project locally:

1. Clone the repository using the command:
   git clone https://github.com/VYANKEE/Day11-ExpenseSplitter.git

2. Navigate to the project directory:
   cd Day11-ExpenseSplitter

3. Install the required dependencies:
   npm install

4. Start the development server:
   npm run dev

PROJECT STRUCTURE

1. src/components/BalanceSummary.jsx
Contains the logic for calculating and displaying net debts and total group spending.

2. src/components/ExpenseForm.jsx
Handles the user input for expenses, including multi-select logic for splitting costs.

3. src/components/ExpenseList.jsx
Renders the chronological history of all added transactions.

4. src/App.jsx
Manages the global state and handles data synchronization with LocalStorage.

##LIVE DEMO - : 

Developed by VYANKEE
