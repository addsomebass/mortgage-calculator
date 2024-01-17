import React, { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';

const LoanTermsComponent = ({submitLoanTerms}) => {
	const [loanTerms, setLoanTerms] = useState({
		principalAmount: 100000,
		refinances: [{
			newRate: 7,
			newTerm: 12,
			startMonth: 1,
			downPayment: 200,
			extraPayment: 100
		}]
	});

	const handleChange = (event, index = null) => {
		const value = event.target.value;
		const name = event.target.name;

		// Convert to a number if it's one of the numeric fields
		const isNumericField = ['interestRate', 'principalAmount', 'termYears', 'newRate', 'newTerm', 'startMonth', 'downPayment', 'extraPayment'].includes(name);
		const numericValue = isNumericField && value !== '' ? parseFloat(value) : value;

		if (index !== null) {
			// Handle changes in refinances array
			const updatedRefinances = loanTerms.refinances.map((refinance, i) => {
				if (i === index) {
					return { ...refinance, [name]: numericValue };
				}
				return refinance;
			});
			setLoanTerms({ ...loanTerms, refinances: updatedRefinances });
		} else {
			// Handle change in main form
			setLoanTerms({ ...loanTerms, [name]: numericValue });
		}
	};


	const addRefinance = () => {
		setLoanTerms({
			...loanTerms,
			refinances: [...loanTerms.refinances, { newRate: 0, newTerm: 0, startMonth: 30, downPayment: 0, extraPayment: 0 }]
		});
	};

	const handleSubmit = () => {
		// Logic to handle submission
		console.log(loanTerms);
		submitLoanTerms(loanTerms);
	};

	return (
		<Paper style={{ padding: '20px', margin: '20px' }}>
			<Grid container spacing={3} alignItems="center">
				<Grid item xs={12}>
					<TextField
						label="Principal Amount ($)"
						variant="outlined"
						fullWidth
						name="principalAmount"
						value={loanTerms.principalAmount}
						onChange={handleChange}
					/>
				</Grid>

				{/* Refinance Fields */}
				{loanTerms.refinances.map((refinance, index) => (
					<React.Fragment key={index}>
						<Grid item xs={2.4}>
							<TextField
								label="Interest Rate (%)"
								variant="outlined"
								fullWidth
								name="newRate"
								value={refinance.newRate}
								onChange={(e) => handleChange(e, index)}
								InputProps={{
									inputProps: {
										step: 0.01, // Allows values with two decimal places
										type: 'number', // Specifies the input type as number
									},
								}}
							/>
						</Grid>
						<Grid item xs={2.4}>
							<TextField
								label="Term (Years)"
								variant="outlined"
								fullWidth
								name="newTerm"
								value={refinance.newTerm}
								onChange={(e) => handleChange(e, index)}
							/>
						</Grid>
						<Grid item xs={2.4}>
							<TextField
								label="Starting Month"
								variant="outlined"
								fullWidth
								name="startMonth"
								value={refinance.startMonth}
								onChange={(e) => handleChange(e, index)}
							/>
						</Grid>
						<Grid item xs={2.4}>
							<TextField
								label="Down Payment ($)"
								variant="outlined"
								fullWidth
								name="downPayment"
								value={refinance.downPayment}
								onChange={(e) => handleChange(e, index)}
							/>
						</Grid>
						<Grid item xs={2.4}>
							<TextField
								label="Extra Payment ($)"
								variant="outlined"
								fullWidth
								name="extraPayment"
								value={refinance.extraPayment}
								onChange={(e) => handleChange(e, index)}
							/>
						</Grid>
					</React.Fragment>
				))}

				{/* Add Refinance Button */}
				<Grid item xs={12}>
					<Button variant="outlined" onClick={addRefinance}>
						Add Refinance
					</Button>
				</Grid>

				{/* Submit Button */}
				<Grid item xs={12}>
					<Button variant="contained" color="primary" onClick={handleSubmit}>
						Submit
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default LoanTermsComponent;
