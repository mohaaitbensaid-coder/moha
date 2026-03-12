class APIClient {
    constructor() {
        this.baseUrl = window.location.origin.includes('localhost') ? 'http://localhost:3000/api' : '/api';
    }

    async request(endpoint, options = {}) {
        const token = localStorage.getItem('hrfa_token');
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error occurred');
        return data;
    }

    async login(email, password) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }

    async register(data) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getArtisans(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/artisans?${query}`);
    }

    async getArtisanById(id) {
        return this.request(`/artisans/${id}`);
    }

    async createBooking(bookingData) {
        return this.request('/bookings', {
            method: 'POST',
            body: JSON.stringify(bookingData),
        });
    }

    async getBookings() {
        return this.request('/bookings');
    }

    async getArtisanBookings() {
        return this.request('/bookings/artisan');
    }

    async updateBookingStatus(id, status) {
        return this.request(`/bookings/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        });
    }

    async updateProfile(profileData) {
        return this.request('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData),
        });
    }

    async getMessages(conversationId) {
        return this.request(`/messages/${conversationId}`);
    }

    async sendMessage(messageData) {
        return this.request('/messages', {
            method: 'POST',
            body: JSON.stringify(messageData),
        });
    }

    // Tools Marketplace Logic (Mock Frontend)
    async getTools(params = {}) {
        const mockTools = [
            {
                id: 1,
                name: "Bosch Professional GSR 18V-55",
                brand: "Bosch",
                category: "power",
                categoryLabel: "أدوات كهربائية",
                description: "مثقاب لاسلكي احترافي 18 فولت، محرك بدون فرش، عزم دوران 55 نيوتن متر.",
                price: 1850,
                spec: "18V Lithium-Ion",
                image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80",
                badge: "Pro Choice",
                stock: true
            },
            {
                id: 2,
                name: "Makita HR2470 Rotary Hammer",
                brand: "Makita",
                category: "power",
                categoryLabel: "أدوات كهربائية",
                description: "مطرقة دوارة 780 واط، 3 أوضاع تشغيل، سرعة متغيرة.",
                price: 2100,
                spec: "780W / 24mm",
                image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80",
                badge: "New",
                stock: true
            },
            {
                id: 3,
                name: "Stanley Hand Tool Set (42pcs)",
                brand: "Stanley",
                category: "hand",
                categoryLabel: "أدوات يدوية",
                description: "مجموعة أدوات يدوية فاخرة تتضمن مفكات، كماشات، ومطرقة.",
                price: 750,
                spec: "High Carbon Steel",
                image: "https://images.unsplash.com/photo-1530124560676-470659cb517b?auto=format&fit=crop&q=80",
                badge: "",
                stock: true
            },
            {
                id: 4,
                name: "Ingco Digital Multimeter",
                brand: "Ingco",
                category: "measurement",
                categoryLabel: "أدوات القياس",
                description: "جهاز قياس رقمي دقيق مع شاشة LCD، مثالي للكهربائيين.",
                price: 280,
                spec: "Cat III 600V",
                image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80",
                badge: "New",
                stock: true
            },
            {
                id: 5,
                name: "Safety Helmet & Vest Set",
                brand: "SafetyPro",
                category: "safety",
                categoryLabel: "السلامة",
                description: "طقم حماية يتضمن خوذة بفتحات تهوية وسترة عاكسة عالية الوضوح.",
                price: 190,
                spec: "ANSI Certified",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80",
                badge: "",
                stock: true
            },
            {
                id: 6,
                name: "Makita 18V LXT Circular Saw",
                brand: "Makita",
                category: "power",
                categoryLabel: "أدوات كهربائية",
                description: "منشار دائري لاسلكي عالي الأداء، قطر نصل 165 مم.",
                price: 2450,
                spec: "5000 RPM",
                image: "https://images.unsplash.com/photo-1513467655676-561b7d489a88?auto=format&fit=crop&q=80",
                badge: "Pro Choice",
                stock: true
            }
        ];

        // Simulate API delay
        await new Promise(r => setTimeout(r, 600));

        let filtered = mockTools;
        if (params.category) filtered = filtered.filter(t => t.category === params.category);
        if (params.brand) filtered = filtered.filter(t => t.brand.toLowerCase() === params.brand.toLowerCase());
        if (params.q) filtered = filtered.filter(t => t.name.toLowerCase().includes(params.q.toLowerCase()));
        if (params.minPrice) filtered = filtered.filter(t => t.price >= params.minPrice);
        if (params.maxPrice) filtered = filtered.filter(t => t.price <= params.maxPrice);

        return { success: true, data: filtered };
    }

    async getToolById(id) {
        const response = await this.getTools();
        const tool = response.data.find(t => t.id === parseInt(id));
        return { success: !!tool, data: tool };
    }
}
const api = new APIClient();
