# automated-donation-platform
## Project Overview
The Automated Donation Platform is designed to facilitate recurring and one-time donations to charities focused on providing sanitary products, clean water, and hygiene facilities to school-going girls in sub-Saharan countries. This platform aims to ensure sustainable funding for organizations dedicated to addressing menstrual hygiene challenges and improving school attendance among girls
## Problem Statement
Many school-going girls in sub-Saharan Africa lack access to sanitary pads and hygiene supplies, leading to frequent school absences. A 2016 study by the Ministry of Education revealed that girls from low-income families miss approximately 20% of school days annually due to a lack of sanitary towels.

### Solution 

* The platform allows donors to:

* Make one-time or recurring donations.

* Support multiple charities focused on hygiene and sanitation.

* Receive impact updates and reports on how donations are utilized.

  The system automates the donation process, ensuring continuous funding to help organizations maintain sustainable support for beneficiaries.

## Technology stack
#### Backend
* Python Flask (Backend API)

* PostgreSQL (Database)

* Flask-JWT-Extended (Authentication)

* SQLAlchemy (ORM)

#### Frontend 

* React.js (User Interface)

* Redux Toolkit (State Management)

* Tailwind CSS (Styling)

  ####  

Additional Dependencies:

* PayPal/Stripe API (Payment Processing)

* Figma/Framer/Adobe XD (Wireframing & UI/UX Design)

* Jest & Minitest (Testing Frameworks)

### User Roles
#### Donor:
* Browse charities.
* Create an account.
* Select and donate to a charity.
* Set up recurring or one-time donations.
* Choose to donate anonymously or publicly.
* Receive monthly donation reminders.
* View impact stories.
* Donate via PayPal, Stripe, or other payment options.


### Charity:

* Apply for approval to be listed on the platform.

* Manage charity details upon approval.

* View donations from non-anonymous donors.

* Track total donations.

* Share impact stories.

* Maintain records of beneficiaries and provided inventory.


#### Administrator:

* Review and process charity applications.

* Approve or reject charity applications.

* Manage platform charities, including removing inactive ones.


#### System Requirements
To run this project, ensure you have the following installed:

* Windows (WSL) or Linux

* Node.js (Latest LTS version recommended)

* Python 3.8+

* PostgreSQL

* npm or yarn (For frontend dependencies)

* pip (For backend dependencies)



Installation & Setup

Backend (Flask API)

Clone the repository:

git clone https://github.com/your-repo/automated-donation-platform.git
cd automated-donation-platform

Navigate to the backend directory:

cd backend

Create a virtual environment and activate it:
``bash 
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
``

Install dependencies:
``bash
pip install -r requirements.txt
``
Set up the database:
``bash
flask db upgrade
``
Run the backend server:
``bash
flask run
``
Frontend (Next js)

1 Navigate to the frontend directory:
``bash
cd carebridge
``
Install dependencies:
``bash
npm install  # Or use `yarn install`
``

Start the frontend server:
``bash
npm run dev  # Or use `yarn start`
``

## Contribution

We welcome contributions to improve this platform. Feel free to fork the repository, make changes, and submit pull requests.

## License

This project is open-source and available under the MIT License.

### Conclusion 
By automating donations and improving transparency, this platform enhances charitable giving and ensures sustainable support for menstrual hygiene initiatives. Together, we can create a future where no girl misses school due to a lack of hygiene supplies.




