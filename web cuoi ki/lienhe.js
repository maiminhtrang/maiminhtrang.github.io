document.addEventListener('DOMContentLoaded', () => {
    const btnSelects = document.querySelectorAll('.btn-select');
    const tableCountInput = document.getElementById('table-count');
    const billItemsContainer = document.getElementById('bill-items');
    const totalPriceDisplay = document.getElementById('total-price-display');
    
    let cart = [];

    tableCountInput.addEventListener('change', () => {
        updateBill();
    });

    btnSelects.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = {
                id: Date.now(),
                type: btn.dataset.type,
                name: btn.dataset.name,
                price: parseInt(btn.dataset.price)
            };
            
            if (item.type === 'fixed') {
                const exists = cart.find(i => i.name === item.name);
                if (!exists) {
                    cart.push(item);
                }
            } else {
                cart = cart.filter(i => i.type !== 'per-table');
                cart.push(item);
            }
            
            updateBill();
        });
    });

    function updateBill() {
        billItemsContainer.innerHTML = '';
        let total = 0;
        const numTables = parseInt(tableCountInput.value) || 0;

        if (cart.length === 0) {
            billItemsContainer.innerHTML = '<p class="bill-empty">Chưa có dịch vụ nào được chọn</p>';
        } else {
            cart.forEach(item => {
                let currentItemPrice = 0;
                let priceLabel = "";

                if (item.type === 'fixed') {
                    currentItemPrice = item.price;
                    priceLabel = formatMoney(item.price);
                } else {
                    currentItemPrice = item.price * numTables;
                    priceLabel = `${formatMoney(item.price)} x ${numTables} mâm`;
                }

                total += currentItemPrice;

                const row = document.createElement('div');
                row.className = 'bill-item-row';
                row.innerHTML = `
                    <span class="bill-item-name">${item.name}</span>
                    <span class="bill-item-val">${priceLabel}</span>
                    <i class="fas fa-times-circle btn-remove-item" data-id="${item.id}"></i>
                `;
                billItemsContainer.appendChild(row);
            });
        }

        totalPriceDisplay.textContent = formatMoney(total);

        document.querySelectorAll('.btn-remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                cart = cart.filter(i => i.id !== id);
                updateBill();
            });
        });
    }

    function formatMoney(num) {
        return new Intl.NumberFormat('vi-VN').format(num) + " đ";
    }
});