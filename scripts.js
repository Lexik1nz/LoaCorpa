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

function getPrice(region, item, regionID) {
    
    const buttons = ['NAE', 'NAW', 'EUW', 'EUC', 'SA']
    for (x = 0; x < buttons.length; x++) {
        document.getElementById(buttons[x]).setAttribute('style', '')
    }

    let url = 'https://www.lostarkmarket.online/api/export-market-live/';
    let currentRegion = region;
    range = (fullDict.Items[item].ingredientIds).length;
    for (x=0; x<range; x++){
      let currentIngID = fullDict.Items[item].ingredientIds[x];
      let currentItem = 'ids=' + currentIngID;
      let currentUrl = url + currentRegion + currentItem;
      let idPlusOne = x+1;
      let htmlIngID = 'ing' + idPlusOne;
      fetch(currentUrl)
      .then((data) => data.json())
      .then((data) => {
        data.forEach((item) => {
          document.getElementById(htmlIngID).value = item.recentPrice;
        });
      })
      .catch((e) => console.error(e));
    }

    let recipeID = fullDict.Items[item].ids;
    let currentRecipe = 'ids=' + recipeID;
    let recipeItemUrl = url + currentRegion + currentRecipe;
    fetch(recipeItemUrl)
      .then((data) => data.json())
      .then((data) => {
        document.getElementById('salePrice').value = data[0].recentPrice;
      })

    document.getElementById(regionID).setAttribute('style', 'border-color:var(--bs-gray900)');
  }

function auctionProfit() {
    let marketPrice = document.getElementById('marketPrice').value
    let bidPrice = document.getElementById('bidPrice').value

    let marketTax = Math.ceil(marketPrice * .05)
    let recommendedBidShare = Math.floor(marketPrice * .8)

    let fourPersonBidShare = Math.floor(bidPrice/3)
    let eightPersonBidShare = Math.floor(bidPrice/7)
    
    document.getElementById('ahTax').innerHTML = marketTax
    document.getElementById('fourPersonBidValue').innerHTML = fourPersonBidShare
    document.getElementById('eightPersonBidValue').innerHTML = eightPersonBidShare
    document.getElementById('recommendedBid').innerHTML = recommendedBidShare
}



const fullDict = {
    Items:
        {"Atropine":
            {"ingredients": ["Shy Wild Flower", "Bright Wild Flower", "Wild Flower", "Strong Irong Ore", "Rare Relic"],
            "ingredAmount": [24, 6, 48, 2, 2],
            "ingredBundleAmount": [10, 10, 100, 10, 10],
            "ingredientIds": ['6882604', '6882107', '6882101', '6882104', '6885508'],
            "craftingCost": 30,
            "amountCrafted": 3,
            "ids": "101291"
            },
        "Dark Grenade":
            {"ingredients": ["Exquisite Mushroom", "Fresh Mushroom", "Tender Timber", "Crude Mushroom"],
            "ingredAmount": [3, 12, 3, 24],
            "ingredBundleAmount": [10, 10, 10, 100],
            "craftingCost": 15,
            "amountCrafted": 3,
            "name": "Dark Grenade"
            },
        "Corrosive Bomb":
            {"ingredients": ["Exquisite Mushroom", "Fresh Mushroom", "Heavy Iron ore", "Crude Mushroom"],
            "ingredAmount": [4, 12, 6, 32],
            "ingredBundleAmount": [10, 10, 10, 100],
            "craftingCost": 15,
            "amountCrafted": 3,
            "name": "Corrosive Bomb"
            },
        "Stimulant":
            {"ingredients": ["Exquisite Mushroom", "Fresh Mushroom", "Sturdy Timber", "Rare Relic", "Crude Mushroom"],
            "ingredAmount": [5, 20, 2, 4, 40],
            "ingredBundleAmount": [10, 10, 10, 10, 100],
            "ingredientIds": ['6882207', '6882204', '6884407', '6885508', '6882201'],
            "craftingCost": 30,
            "amountCrafted": 3,
            "name": "Stimulant",
            'ids': '101072'
            },
        "Basic Oreha (Fishing)":
            {"ingredients": ["Oreha Solar Carp", "Natural Pearl", "Fish"],
            "ingredAmount": [10, 40, 80],
            "ingredBundleAmount": [10, 10, 100],
            'ingredientIds': ['6885708', '6882002', '6882601'],
            "craftingCost": 205,
            "amountCrafted": 30,
            "name": "Oreha Fusion Mats",
            'ids': '6861008'
            },
        "Basic Oreha (Hunting)":
            {"ingredients": ["Oreha Thick Meat", "Tough Leather", "Thick Raw Meat"],
            "ingredAmount": [10, 40, 80],
            "ingredBundleAmount": [10, 10, 100],
            'ingredientIds': ['6885608', '6882505', '6882304'],
            "craftingCost": 205,
            "amountCrafted": 30,
            "name": "Oreha Fusion Mats",
            'ids': '6861008'
            },
        "Basic Oreha (Excavating)":
            {"ingredients": ["Oreha Relic", "Rare Relic", "Ancient Relic"],
            "ingredAmount": [8, 26, 64],
            "ingredBundleAmount": [10, 10, 100],
            "ingredientIds": ['6882605', '6885508', '6882701'],
            "craftingCost": 205,
            "amountCrafted": 30,
            "name": "Oreha Fusion Mats",
            'ids': '6861008'
            },
        "Tool Crafting Part":
            {"ingredients": ["Strong Iron Ore", "Sturdy Timber", "Heavy Iron Ore", "Tender Timber"],
            "ingredAmount": [22, 22, 88, 88],
            "ingredBundleAmount": [10, 10, 10, 10],
            "craftingCost": 20,
            "amountCrafted": 30,
            "name": "Tool Crafting Part",
            'ids': '6882301'
            }
        }
    }