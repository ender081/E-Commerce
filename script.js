const products = [
            {
                id: 1,
                title: "Wireless Headphone Bluetooth Over-Ear",
                category: "Elektronik",
                price: 450000,
                rating: 4.8,
                reviews: 124,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
            },
            {
                id: 2,
                title: "Smartwatch Sport Minimalis Waterproof",
                category: "Elektronik",
                price: 890000,
                rating: 4.7,
                reviews: 89,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
            },
            {
                id: 3,
                title: "Kaos Polo Katun Premium Unisex",
                category: "Pakaian",
                price: 135000,
                rating: 4.9,
                reviews: 210,
                image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80"
            },
            {
                id: 4,
                title: "Jaket Denim Classic Casual",
                category: "Pakaian",
                price: 320000,
                rating: 4.6,
                reviews: 67,
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80"
            },
            {
                id: 5,
                title: "Jam Tangan Elegan High Grade",
                category: "Aksesoris",
                price: 1250000,
                rating: 4.9,
                reviews: 45,
                image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80"
            },
            {
                id: 6,
                title: "Kacamata Hitam Anti UV Polarized",
                category: "Aksesoris",
                price: 180000,
                rating: 4.5,
                reviews: 156,
                image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80"
            },
            {
                id: 7,
                title: "Buku Atomic Habits - James Clear",
                category: "Buku",
                price: 98000,
                rating: 5.0,
                reviews: 340,
                image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80"
            },
            {
                id: 8,
                title: "Ransel Waterproof Laptop 15 Inch",
                category: "Aksesoris",
                price: 275000,
                rating: 4.7,
                reviews: 98,
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80"
            }
        ];

        // State Aplikasi
        let cart = [];
        let activeCategory = "Semua";
        let searchQuery = "";
        const shippingFee = 15000;

        // Format Rupiah
        const formatRupiah = (number) => {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0
            }).format(number);
        };

        // Render Produk ke Grid
        const renderProducts = () => {
            const productGrid = document.getElementById('product-grid');
            const emptyState = document.getElementById('empty-state');
            const productCount = document.getElementById('product-count');

            // Filtering
            const filteredProducts = products.filter(p => {
                const matchesCategory = activeCategory === "Semua" || p.category === activeCategory;
                const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            });

            productCount.innerText = `Menampilkan ${filteredProducts.length} produk`;

            if (filteredProducts.length === 0) {
                productGrid.innerHTML = "";
                emptyState.classList.remove('hidden');
                return;
            }

            emptyState.classList.add('hidden');
            productGrid.innerHTML = filteredProducts.map(product => `
                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
                    <div class="relative overflow-hidden bg-slate-100 aspect-square">
                        <img src="${product.image}" alt="${product.title}" 
                             onerror="this.onerror=null; this.src='https://placehold.co/400x400/e2e8f0/64748b?text=Gambar+Produk';"
                             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <span class="absolute top-3 left-3 bg-white/80 backdrop-blur-md text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                            ${product.category}
                        </span>
                    </div>
                    <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                            <div class="flex items-center space-x-1 text-amber-400 text-xs mb-1">
                                <i class="fa-solid fa-star"></i>
                                <span class="font-bold text-slate-700">${product.rating}</span>
                                <span class="text-slate-400">(${product.reviews})</span>
                            </div>
                            <h3 class="font-semibold text-slate-800 text-sm sm:text-base line-clamp-2 hover:text-blue-600 transition">
                                ${product.title}
                            </h3>
                        </div>
                        <div class="pt-2 flex items-center justify-between border-t border-slate-100">
                            <div>
                                <span class="text-xs text-slate-400 block">Harga</span>
                                <span class="text-base font-bold text-slate-900">${formatRupiah(product.price)}</span>
                            </div>
                            <button onclick="addToCart(${product.id})" class="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition flex items-center justify-center">
                                <i class="fa-solid fa-cart-plus text-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        };

        // Tambah ke Keranjang
        const addToCart = (productId) => {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            updateCartUI();
            showToast(`"${product.title.substring(0, 20)}..." masuk keranjang!`);
        };

        // Update Jumlah Item Keranjang
        const updateQuantity = (productId, change) => {
            const item = cart.find(i => i.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    cart = cart.filter(i => i.id !== productId);
                }
            }
            updateCartUI();
        };

        // Hapus Item
        const removeFromCart = (productId) => {
            cart = cart.filter(i => i.id !== productId);
            updateCartUI();
        };

        // Update UI Keranjang
        const updateCartUI = () => {
            const cartCountBadge = document.getElementById('cart-count');
            const cartContainer = document.getElementById('cart-items-container');
            const cartEmptyView = document.getElementById('cart-empty-view');
            const cartFooter = document.getElementById('cart-footer');
            const cartSubtotal = document.getElementById('cart-subtotal');
            const cartTotal = document.getElementById('cart-total');

            // Update Badge Count Total Items
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountBadge.innerText = totalItems;

            if (cart.length === 0) {
                cartContainer.innerHTML = "";
                cartEmptyView.classList.remove('hidden');
                cartFooter.classList.add('hidden');
                return;
            }

            cartEmptyView.classList.add('hidden');
            cartFooter.classList.remove('hidden');

            // Render Items
            cartContainer.innerHTML = cart.map(item => `
                <div class="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-cover rounded-lg bg-white">
                    <div class="flex-1 min-w-0">
                        <h4 class="text-xs font-semibold text-slate-800 truncate">${item.title}</h4>
                        <p class="text-xs font-bold text-blue-600 mt-1">${formatRupiah(item.price)}</p>
                        <div class="flex items-center space-x-2 mt-2">
                            <button onclick="updateQuantity(${item.id}, -1)" class="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center text-xs font-bold">-</button>
                            <span class="text-xs font-bold text-slate-700 w-4 text-center">${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)" class="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center text-xs font-bold">+</button>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${item.id})" class="text-slate-400 hover:text-red-500 p-1 transition">
                        <i class="fa-regular fa-trash-can text-sm"></i>
                    </button>
                </div>
            `).join('');

            // Hitung Subtotal & Total
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const total = subtotal + shippingFee;

            cartSubtotal.innerText = formatRupiah(subtotal);
            cartTotal.innerText = formatRupiah(total);
            document.getElementById('modal-checkout-total').innerText = formatRupiah(total);
        };

        // Toast Notification Function
        const showToast = (message) => {
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toast-message');
            toastMsg.innerText = message;
            
            toast.classList.remove('translate-y-20', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');

            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        };

        // Event Listeners initialization
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();

            // Category Filter Click
            const categoryButtons = document.querySelectorAll('.category-btn');
            categoryButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    categoryButtons.forEach(b => {
                        b.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
                        b.classList.add('bg-white', 'text-slate-600', 'hover:bg-slate-100', 'border', 'border-slate-200');
                    });
                    
                    const target = e.currentTarget;
                    target.classList.remove('bg-white', 'text-slate-600', 'hover:bg-slate-100', 'border', 'border-slate-200');
                    target.classList.add('bg-blue-600', 'text-white', 'shadow-sm');

                    activeCategory = target.getAttribute('data-category');
                    renderProducts();
                });
            });

            // Search Input Event
            const handleSearch = (e) => {
                searchQuery = e.target.value;
                renderProducts();
            };
            document.getElementById('search-input').addEventListener('input', handleSearch);
            document.getElementById('search-input-mobile').addEventListener('input', handleSearch);

            // Cart Drawer Controls
            const cartBtn = document.getElementById('cart-btn');
            const closeCartBtn = document.getElementById('close-cart-btn');
            const cartDrawer = document.getElementById('cart-drawer');
            const cartBackdrop = document.getElementById('cart-drawer-backdrop');

            const openCart = () => {
                cartDrawer.classList.remove('translate-x-full');
                cartBackdrop.classList.remove('opacity-0', 'pointer-events-none');
            };

            const closeCart = () => {
                cartDrawer.classList.add('translate-x-full');
                cartBackdrop.classList.add('opacity-0', 'pointer-events-none');
            };

            cartBtn.addEventListener('click', openCart);
            closeCartBtn.addEventListener('click', closeCart);
            cartBackdrop.addEventListener('click', closeCart);

            // Modal Checkout Controls
            const checkoutBtn = document.getElementById('checkout-btn');
            const closeCheckoutBtn = document.getElementById('close-checkout-btn');
            const checkoutModal = document.getElementById('checkout-modal');
            const checkoutForm = document.getElementById('checkout-form');

            checkoutBtn.addEventListener('click', () => {
                closeCart();
                checkoutModal.classList.remove('opacity-0', 'pointer-events-none');
                checkoutModal.querySelector('div').classList.remove('scale-95');
                checkoutModal.querySelector('div').classList.add('scale-100');
            });

            const closeCheckout = () => {
                checkoutModal.classList.add('opacity-0', 'pointer-events-none');
                checkoutModal.querySelector('div').classList.remove('scale-100');
                checkoutModal.querySelector('div').classList.add('scale-95');
            };

            closeCheckoutBtn.addEventListener('click', closeCheckout);

            // Submit Checkout Form
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                closeCheckout();
                
                // Show Success Modal
                const successModal = document.getElementById('success-modal');
                successModal.classList.remove('opacity-0', 'pointer-events-none');
                successModal.querySelector('div').classList.remove('scale-95');
                successModal.querySelector('div').classList.add('scale-100');

                // Reset Cart
                cart = [];
                updateCartUI();
                checkoutForm.reset();
            });

            // Close Success Modal
            document.getElementById('close-success-btn').addEventListener('click', () => {
                const successModal = document.getElementById('success-modal');
                successModal.classList.add('opacity-0', 'pointer-events-none');
                successModal.querySelector('div').classList.remove('scale-100');
                successModal.querySelector('div').classList.add('scale-95');
            });
        });