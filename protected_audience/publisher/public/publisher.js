const runAuction = async (sspUrl, dspUrl) => {
    const resolveToConfig = typeof window.FencedFrameConfig !== 'undefined';
  
    const auctionConfig = {
        seller: `${sspUrl}`,
        decisionLogicURL: `https://localhost:3001/decision-logic.js`, // Correct property name
        interestGroupBuyers: [dspUrl],
        auctionSignals: { isControversial: true },
        sellerSignals: { key: 'value' },
        sellerTimeout: 100,
        perBuyerSignals: {
            [dspUrl]: { windowInnerHeight: window.innerHeight },
        },
        perBuyerTimeouts: {
            '*': 50,
        },
        resolveToConfig: true
    };
  
    console.log('auctionConfig = ', JSON.stringify(auctionConfig));
  
    try {
        const selectedAd = await navigator.runAdAuction(auctionConfig);
        console.log(selectedAd);
  
        const frame = document.getElementById('protected-audience-ad');    
    
        if (resolveToConfig && selectedAd instanceof FencedFrameConfig) {
            frame.config = selectedAd;
        } else {
            frame.src = selectedAd;
        }
    } catch (error) {
        console.error('Error running auction:', error);
    }
  };
  