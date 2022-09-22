function calculate(item){

    let craftingReduction = document.getElementById('craftingReduction').value
    let craftingPercent = (100 - craftingReduction) / 100
    let craftingCost = Math.floor((fullDict['Items'][item]['craftingCost']) * craftingPercent)
    let totalMatCost = 0
    let ingredientAmount = fullDict['Items'][item]['ingredAmount']
    let ingredientBundleAmount = fullDict['Items'][item]['ingredBundleAmount']
    let index = fullDict['Items'][item]['ingredients'].length
    let ingredients = [document.getElementById('ing1').value,
                       document.getElementById('ing2').value, 
                       document.getElementById('ing3').value, 
                       document.getElementById('ing4').value, 
                       document.getElementById('ing5').value]
    for (let x = 0; x < index; x++){
        totalMatCost += (ingredients[x]/ingredientBundleAmount[x]) * ingredientAmount[x]
        console.log('Index ' + x + ', Ingredient cost ' + ingredients[x] + ', Total mat cost ' + totalMatCost)
        console.log('Crafting percent ' + craftingPercent + ', Crafting cost ' + craftingCost)
    }

    let totalCraftCost = (totalMatCost + craftingCost).toFixed(2)
    let salePrice = document.getElementById('salePrice').value
    let amountCrafted = fullDict['Items'][item]['amountCrafted']
    let ahTotalSalePrice = salePrice * amountCrafted

    let deposit = Math.ceil(salePrice * .05)

    let farmedMatsValue = (ahTotalSalePrice - (deposit * amountCrafted) - craftingCost).toFixed(2)
    let boughtMatsValue = (ahTotalSalePrice - (deposit * amountCrafted) - totalCraftCost).toFixed(2)

    document.getElementById('totalMatCost').innerHTML = 'Total material cost: ' + (totalMatCost).toFixed(2)
    document.getElementById('craftingCost').innerHTML = 'Crafting cost: ' + craftingCost
    document.getElementById('totalCraftCost').innerHTML = 'Total crafting cost: ' + totalCraftCost
    
    if (farmedMatsValue > 0){
        document.getElementById('farmedMats').innerHTML = 'Farmed mats: ' + farmedMatsValue
        document.getElementById("farmedMats").className = "text-success"
    }
    else{
        document.getElementById('farmedMats').innerHTML = 'Farmed mats: ' + farmedMatsValue
        document.getElementById("farmedMats").className = "text-danger"
    }
    
    if (boughtMatsValue > 0){
        document.getElementById('boughtMats').innerHTML = 'Bought mats: ' + boughtMatsValue
        document.getElementById("boughtMats").className = "text-success"
    }
    else{
        document.getElementById('boughtMats').innerHTML = 'Bought mats: ' + boughtMatsValue
        document.getElementById("boughtMats").className = "text-danger"
    }  
}


