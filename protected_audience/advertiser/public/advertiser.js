document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.view-product');

    buttons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const productCard = event.target.closest('.product-card');
            const interestGroup = productCard.getAttribute('data-interest-group');
            await addToInterestGroup(interestGroup);
        });
    });
});

async function addToInterestGroup(group) {
    try {
        const interestGroupDetails = {
            owner: 'https://localhost:3000/',  // The origin of your website
            name: group,
            biddingLogicUrl: `https://localhost:3000/bid.js`,
            ads: [
            {
                renderURL: `https://localhost:3000/ads/default-ad.html`,
                metadata: {
                    adName: 'default-ad',
                },
            },
            ],
            lifetimeMs: 7 * 24 * 60 * 60,  // 7 days in milliseconds
        };
        localStorage.setItem('interestGroup', JSON.stringify(group));

        navigator.joinAdInterestGroup(interestGroupDetails); // 30 days in seconds
        console.log(`Successfully joined interest group: ${group}`);
    } catch (error) {
        console.error(`Error joining interest group: ${error}`);
    }
};