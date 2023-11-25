'use client';

import MyMaterialTable from "@/components/material-table/material-table";
import {MortgageCalculator} from "@/components/mortgage-calculator/mortgage-calculator";
import LoanTerms from "@/components/loan-terms/loan-terms";
import {useState} from "react";

export default function Home() {

	const [loanTerms, submitLoanTerms] = useState({
		principalAmount: 0,
		downPayment: 0,
		refinances: [{
			newRate: 7,
			newTerm: 12,
			startMonth: 1,
			extraPayment: 0,
		}]
	});



	let calc = new MortgageCalculator();

	let data = calc.calculateMortgageWithRefinances( loanTerms);

	return (
		<div>
			<LoanTerms submitLoanTerms={submitLoanTerms}></LoanTerms>

			<MyMaterialTable data={data}/>
		</div>
	)
}
