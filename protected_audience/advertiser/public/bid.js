function generateBid(interestGroup, auctionSignals, perBuyerSignals, trustedBiddingSignals, browserSignals) {
    const [testAd] = interestGroup.ads;
  
    return {
      bid: 1, // Arbitrary bid value
      ad: {
        adName: testAd?.metadata?.adName,
      },
      render: testAd?.renderURL,
    };
  }
  
  function reportWin() {
    console.log('report win');
  };