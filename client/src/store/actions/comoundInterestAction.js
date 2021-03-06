export const PRINT_COMPOUND_INTEREST = "PRINT_COMPOUND_INTEREST"

export const compoundCalculator = (initialInvestment, monthlyContribution, years, interestRate) => dispatch => {
    let calculate = function(){
        //set the initial 
        let contribution = initialInvestment + monthlyContribution;
        let totalContribution = initialInvestment + monthlyContribution;
        let compoundAnnually = interestRate / 12; // this is annaully interest only
        let monthlyInterest = Number(compoundAnnually.toFixed(1)); // make it decimal

        //first month result
        let interest = (contribution * monthlyInterest) / 100;
        let totalBalance = contribution + interest;
        let totalInterest = interest
        let numberOfMounts = years * 12;
        let index = 1; // start at 1 because we added first month to result

        // date 
        let options = { month: 'short', year: 'numeric' };
        let newDate = new Date()
        let thisMonth = newDate.setMonth(newDate.getMonth())
        thisMonth = newDate.toLocaleDateString("en-US", options)
        let monthNum = newDate.getMonth() +1
        let yearOnly = newDate.getFullYear()
        
        //result
        let mouthResult = [{monthNum, yearOnly, thisMonth, totalContribution, interest, totalInterest, totalBalance}];

        while (index < numberOfMounts) {
            //calculate compound interest
            interest = ((totalBalance + monthlyContribution) * monthlyInterest) / 100;
            interest = Number(interest.toFixed(2)); // make it decimal

            // update total
            totalBalance = totalBalance + monthlyContribution + interest;
            totalBalance = Number(totalBalance.toFixed(2)); // make it decimal

            totalContribution += monthlyContribution
            totalContribution = Number(totalContribution.toFixed(2));

            totalInterest += interest
            totalInterest = Number(totalInterest.toFixed(2)); // make it decimal

            thisMonth = newDate.setMonth(newDate.getMonth() + 1)
            thisMonth = newDate.toLocaleDateString("en-US", options)
            monthNum = newDate.getMonth() + 1
            yearOnly = newDate.getFullYear()

            mouthResult.push({monthNum, yearOnly, thisMonth, totalContribution, interest, totalInterest, totalBalance });
            

            index ++;
        }

        
        return mouthResult
    }
    
    return dispatch({
        type: PRINT_COMPOUND_INTEREST,
        payload: calculate()
    })
    
}
