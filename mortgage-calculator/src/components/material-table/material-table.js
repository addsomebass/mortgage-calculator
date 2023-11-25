import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';


const constructRow = (row, index) => {
	if (!row.message) {
		return <TableRow
			key={index}
			sx={{'&:last-child td, &:last-child th': {border: 0}}}
		>
			<TableCell component="th" scope="row">{row.month}</TableCell>
			<TableCell component="th" scope="row">{row.interest}</TableCell>
			<TableCell component="th" scope="row">{row.principal}</TableCell>
			<TableCell component="th" scope="row">{row.extraPayment}</TableCell>
			<TableCell component="th" scope="row">{row.payment}</TableCell>
			<TableCell component="th" scope="row">{row.balance}</TableCell>
		</TableRow>;
	} else {
		return <TableRow key={index}>
			<TableCell colSpan="100%" style={{textAlign: 'center', background: '#e0e0e0'}}>
				{/* This cell spans all columns and has a custom background */}
				{row.message}
			</TableCell>
		</TableRow>

	}
}

const MyMaterialTable = ({data}) => {
	return (
		<TableContainer component={Paper}>
			<Table sx={{minWidth: 650}} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Month</TableCell>
						<TableCell>Interest</TableCell>
						<TableCell>Principal</TableCell>
						<TableCell>Extra</TableCell>
						<TableCell>Payment</TableCell>
						<TableCell>Balance</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row, index) => (
						constructRow(row, index)
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default MyMaterialTable;
