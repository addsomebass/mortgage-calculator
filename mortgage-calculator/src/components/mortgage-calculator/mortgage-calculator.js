'use client';

export class MortgageCalculator {

	calculateMortgageWithRefinances(loanTerms) {


		let balance = loanTerms.principalAmount;
		let tableData = [];

		let totalInterest = 0;
		let totalPrincipal = 0;

		let refinances = loanTerms.refinances;
		let finalPayment = false;


		for (let i = 0; i < refinances.length; i++) {
			if (finalPayment) break;

			let refinance = refinances[i];


			const monthlyRate = refinance.newRate / 12 / 100;
			const totalPayments = refinance.newTerm * 12;
			const monthlyPayment = balance * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);


			for (let month = 1; month <= totalPayments; month++) {

				if (month === 1 && refinance.downPayment && refinance.downPayment > 0) {

					tableData.push({
						message: 'Downpayment for ' + refinance.downPayment + ' (' + balance.toFixed(0) + ' -> ' + (balance - refinance.downPayment).toFixed(0) + ')'
					});

					balance -= refinance.downPayment;
				}

				if (i + 1 < refinances.length && month >= refinances[i + 1].startMonth) {
					let newRefinance = refinances[i + 1];

					tableData.push({
						message: 'Refinanced for ' + newRefinance.newRate + '%'
					});

					break;


				}

				const interestPayment = balance * monthlyRate;

				const principalPayment = monthlyPayment - interestPayment;

				const extraPayment = refinance.extraPayment;






				finalPayment = (balance - principalPayment - extraPayment) < 0;

				if (finalPayment) {
					let finalPrincipalPayment =
						balance - principalPayment >= 0
							? principalPayment
							: principalPayment - (Math.abs(balance - principalPayment));

					let finalExtraPayment = finalPrincipalPayment !== principalPayment
						? 0
						: extraPayment - Math.abs(balance - principalPayment - extraPayment);

					balance = balance - finalPrincipalPayment - finalExtraPayment;

					totalInterest += interestPayment;
					totalPrincipal = totalPrincipal + finalPrincipalPayment + finalExtraPayment;

					tableData.push({
						month: month + refinance.startMonth - 1,
						interest: interestPayment.toFixed(2),
						principal: finalPrincipalPayment.toFixed(2),
						extraPayment: finalExtraPayment.toFixed(2),
						payment: (interestPayment + finalPrincipalPayment + finalExtraPayment).toFixed(2),
						balance: balance.toFixed(2)
					});

					break;

				} else {
					balance = balance - principalPayment - extraPayment;

					totalInterest += interestPayment;
					totalPrincipal = totalPrincipal + principalPayment + extraPayment;


					tableData.push({
						month: month + refinance.startMonth - 1,
						interest: interestPayment.toFixed(2),
						principal: principalPayment.toFixed(2),
						extraPayment: extraPayment.toFixed(2),
						payment: (monthlyPayment + extraPayment).toFixed(2),
						balance: balance.toFixed(2)
					});
				}
			}

		}

		tableData.push({
			message: 'Totals'
		});

		const totalPayment = totalInterest + totalPrincipal;


		tableData.push({
			month: '',
			interest: totalInterest.toFixed(2),
			principal: totalPrincipal.toFixed(2),
			extraPayment: 0,
			payment: totalPayment.toFixed(2),
			balance: balance.toFixed(2)
		});


		return tableData;

	}
}

