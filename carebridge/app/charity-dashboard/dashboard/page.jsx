import React from 'react'

function page() {
  return (
    <div>
        <nav class="navbar">
            <h3>Welcome, Admin</h3>
            <button class="logout-btn">Logout</button>
        </nav>
        <section class="dashboard">
            <div class="card">
                <h4>Total Donations</h4>
                <p>$12,400</p>
            </div>
            <div class="card">
                <h4>Beneficiaries Helped</h4>
                <p>1,250</p>
            </div>
            <div class="card">
                <h4>Active Charities</h4>
                <p>8</p>
            </div>
        </section>
        <section class="chart">
            <h3>Donation Trends (Graph Placeholder)</h3>
        </section>
        <section class="donations">
            <h3>Recent Donations</h3>
            <table>
                <thead>
                    <tr>
                        <th>Donor</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>$200</td>
                        <td>Feb 20, 2025</td>
                    </tr>
                    <tr>
                        <td>Jane Smith</td>
                        <td>$150</td>
                        <td>Feb 18, 2025</td>
                    </tr>
                    <tr>
                        <td>Anonymous</td>
                        <td>$300</td>
                        <td>Feb 15, 2025</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
  )
}

export default page
